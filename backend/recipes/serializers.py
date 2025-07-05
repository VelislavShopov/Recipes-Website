from django.utils.text import slugify
from rest_framework import serializers

from recipes.models import Recipe, Ingredient, Rating
from accounts.serializers import CustomUserUsername


class IngredientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ingredient
        fields = '__all__'

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = '__all__'

class RecipeSerializer(serializers.ModelSerializer):
    publication_date = serializers.DateField(format="%Y-%m-%d",read_only=True)
    ratings = RatingSerializer(many=True, read_only=True)
    ingredients = IngredientSerializer(many=True, read_only=True)
    user = CustomUserUsername(read_only=True)
    class Meta:
        model = Recipe
        fields = '__all__'

        read_only_fields = ('slug',)

    def create(self, validated_data):
        name = validated_data.get('name')
        base_slug = slugify(name)
        slug = base_slug
        num = 1
        while Recipe.objects.filter(slug=slug).exists():
            slug = f"{base_slug}-{num}"
            num += 1
        validated_data['slug'] = slug
        return super().create(validated_data)


class RecipeShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id','name','description','image','publication_date',)