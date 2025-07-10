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
        if key in ['page', 'ordering']:  # ignore pagination or other keys
            continue

        values = query_params.getlist(key)

        # If only one value, use exact match
        filters[f"{key}__in"] = values

    return filters


def create_slug_for_recipe(name):
    base_slug = slugify(name)
    slug = base_slug
    num = 1
    while Recipe.objects.filter(slug=slug).exists():
        slug = f"{base_slug}-{num}"
        num += 1
    return slug