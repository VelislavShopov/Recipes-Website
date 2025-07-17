import json

from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import ListAPIView, get_object_or_404, DestroyAPIView, CreateAPIView, RetrieveAPIView, \
    UpdateAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from accounts.permissions import ObjectOfUserPermission
from .models import Recipe, Ingredient, Rating
from .serializers import RecipeSerializer, IngredientSerializer, RatingSerializer
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


class RetrieveRecipeBySlug(RetrieveAPIView):
    lookup_field = 'slug'
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer


class UpdateRecipeView(UpdateAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = [IsAuthenticated, ObjectOfUserPermission]

class RecipeListView(ListAPIView):
    serializer_class = RecipeSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        filters = create_filters_dict(self.request)
        recipes = Recipe.objects.filter(**filters)
        return recipes



class DestroyRecipeView(DestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = (IsAuthenticated,ObjectOfUserPermission)

class NewestRecipesListView(ListAPIView):
    serializer_class = RecipeSerializer
    def get_queryset(self):
        return Recipe.objects.all().order_by('-publication_date_time')

    def get_paginated_response(self, data):
        self.paginator.page_size=9
        return super().get_paginated_response(data)

class BestRatedRecipesListView(ListAPIView):
    serializer_class = RecipeSerializer
    pagination_class = None
    def get_queryset(self):
        queryset = get_best_recipes()
        return queryset[:3]

class UserRecipeProfileListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RecipeSerializer

    lookup_field = 'username'
    lookup_url_kwarg = 'username'

    def get_queryset(self):
        lookup_value = self.kwargs.get(self.lookup_field)

        user = get_object_or_404(UserModel, **{self.lookup_field: lookup_value})
        return Recipe.objects.filter(user=user)


class IngredientsListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = IngredientSerializer
    queryset = Ingredient.objects.all()
    pagination_class = None

class CreateRatingView(CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer

class LongestCookingTimeView(APIView):
    def get(self, request, *args, **kwargs):
        longest_recipe = Recipe.objects.order_by('-cooking_time').first()
        return Response({'max_value': int(longest_recipe.cooking_time)})


class CreateRatingForRecipeView(CreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = (IsAuthenticated,)

    def create(self, request, *args, **kwargs):
        recipe = get_object_or_404(Recipe, slug=kwargs['slug'])
        serializer = self.get_serializer(
            data=request.data,
            context={
                'request': request,
                'user': request.user,
                'recipe': recipe
            }
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()  # calls create in serializer
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

class DestroyRatingView(DestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer
    permission_classes = (ObjectOfUserPermission,)



class DeleteIngredientFromRecipeView(APIView):
    permission_classes = (IsAuthenticated,ObjectOfUserPermission)
    def delete(self,request, *args, **kwargs):
        recipe = get_object_or_404(Recipe, pk=kwargs['pk'])
        ingredient = get_object_or_404(Ingredient, pk=kwargs['ingredient_pk'])
        recipe.ingredients.remove(ingredient)
        return Response(status=status.HTTP_204_NO_CONTENT)

class AddIngredientToRecipeView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, *args, **kwargs):
        recipe = get_object_or_404(Recipe, pk=kwargs['pk'])
        ingredient = get_object_or_404(Ingredient, pk=kwargs['ingredient_pk'])
        recipe.ingredients.add(ingredient)
        return Response(status=status.HTTP_204_NO_CONTENT)