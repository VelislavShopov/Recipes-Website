import json
from collections import defaultdict

from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView, get_object_or_404, DestroyAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from users.models import CustomUser
from util.permissions import RecipeOfUserPermission
from .models import Recipe, Ingredient
from .serializers import RecipeSerializer, RecipeShortSerializer, IngredientSerializer
from .utils import get_best_recipes, create_filters_dict

# Create your views here.
UserModel = get_user_model()


class CreateRecipe(CreateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def perform_create(self, serializer):
        ingredients_json = self.request.POST.get("ingredients")
        ingredients_json = json.loads(ingredients_json)
        ingredients = []
        for ingredient in ingredients_json:
            ingredients.append(Ingredient.objects.get(id=ingredient["id"]))

        serializer.save(user=self.request.user,ingredients=ingredients)

class RecipeListView(ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        filters = create_filters_dict(self.request)
        print(filters)
        return Recipe.objects.filter(**filters)



class DestroyRecipeView(DestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = (IsAuthenticated,RecipeOfUserPermission)

class NewestRecipesListView(ListAPIView):
    serializer_class = RecipeSerializer
    pagination_class = None
    def get_queryset(self):
        return Recipe.objects.all().order_by('-publication_date')[:10]

class BestRatedRecipesListView(ListAPIView):
    serializer_class = RecipeSerializer
    pagination_class = None
    def get_queryset(self):
        queryset = get_best_recipes()
        return queryset[:3]

class UserRecipeProfileListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RecipeShortSerializer

    lookup_field = 'username'
    lookup_url_kwarg = 'username'

    def get_queryset(self):
        lookup_value = self.kwargs.get(self.lookup_field)

        user = get_object_or_404(UserModel, **{self.lookup_field: lookup_value})

        return Recipe.objects.filter(user=user)


class IngredientsListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()

