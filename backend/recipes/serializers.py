from django.db.models import Avg
from django.utils.text import slugify
from rest_framework import serializers
from rest_framework.fields import SerializerMethodField
from rest_framework.validators import UniqueTogetherValidator

from recipes.models import Recipe, Ingredient, Rating
from accounts.serializers import CustomUserUsername
from recipes.utils import create_slug_for_recipe, suffix_of_day


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'
        validators = [
            UniqueTogetherValidator(
                queryset=Rating.objects.all(),
                fields=['user', 'recipe'],
            )
        ]


class RecipeSerializer(serializers.ModelSerializer):
    publication_date_time = SerializerMethodField(read_only=True)

    def get_publication_date_time(self, obj):
        publication_date_time = obj.publication_date_time
        suffix = suffix_of_day(publication_date_time.day)
        return publication_date_time.strftime(f"%H:%M, %d{suffix} %B %Y")






    ratings = RatingSerializer(many=True, read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True)
    user = CustomUserUsername(read_only=True)
    avg_stars = SerializerMethodField()

    def get_avg_stars(self, obj):
        ratings = obj.ratings.all()

        if ratings.exists():
            return round(ratings.aggregate(Avg('stars'))['stars__avg'],2)

        return 0

    class Meta:
        model = Recipe
        fields = '__all__'

        read_only_fields = ('slug',)

    def create(self, validated_data):
        validated_data['slug'] = create_slug_for_recipe(validated_data.get('name'))
        return super().create(validated_data)


class RecipeShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id','name','description','image','publication_date_time',)