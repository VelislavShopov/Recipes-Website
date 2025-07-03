from rest_framework import serializers

from recipes.models import Recipe, Ingredient, Rating
from users.serializers import CustomUserUsername


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

class RecipeShortSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ('id','name','description','image','publication_date',)