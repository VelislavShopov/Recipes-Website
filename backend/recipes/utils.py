from collections import defaultdict

from django.db.models import Avg, Count, F, FloatField, ExpressionWrapper
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

        # Example: map 'type_dish[]' to 'type_dish'
        cleaned_key = key.replace('[]', '')

        # If only one value, use exact match
        if len(values) == 1:
            filters[cleaned_key] = values[0]
        else:
            filters[f"{cleaned_key}__in"] = values

    return filters
