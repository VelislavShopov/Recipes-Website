from collections import defaultdict

from django.db.models import Avg, Count, F, FloatField, ExpressionWrapper
from django.utils.text import slugify

from .models import Recipe, Rating

def get_best_recipes():
    C = Rating.objects.aggregate(avg_rating=Avg('stars'))['avg_rating'] or 0

    rating_counts = Recipe.objects.annotate(num_ratings=Count('ratings')).values_list('num_ratings', flat=True)
    m = sorted(rating_counts)[int(len(rating_counts) * 0.6)] if rating_counts else 0

    recipes = Recipe.objects.annotate(
        R=Avg('ratings__stars'),
        v=Count('ratings')
    ).annotate(
        WR=ExpressionWrapper(
            (F('v') / (F('v') + m)) * F('R') + (m / (F('v') + m)) * C,
            output_field=FloatField()
        )
    ).order_by('-WR')

    return recipes


def create_filters_dict(request):
    filters = {}
    query_params = request.GET
    for key in query_params:
        if key in ['page', 'ordering','q','min_range','max_range']:  # ignore pagination or other keys
            continue

        values = query_params.getlist(key)

        # If only one value, use exact match
        filters[f"{key}__in"] = values

    if "q" in query_params:
        filters["name__icontains"] = query_params["q"]

    if "min_range" in query_params:
        filters["cooking_time__gte"] = query_params["min_range"]

    if "max_range" in query_params:
        filters["cooking_time__lte"] = query_params["max_range"]

    return filters


def create_slug_for_recipe(name):
    base_slug = slugify(name)
    slug = base_slug
    num = 1
    while Recipe.objects.filter(slug=slug).exists():
        slug = f"{base_slug}-{num}"
        num += 1
    return slug

def suffix_of_day(day):
    if 11 <= day <= 13:
        return "th"
    last = day % 10
    if last == 1:
        return "st"
    elif last == 2:
        return "nd"
    elif last == 3:
        return "rd"
    else:
        return "th"