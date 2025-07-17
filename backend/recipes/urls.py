from django.urls import include, path
from rest_framework.routers import DefaultRouter

from recipes import views
from recipes.views import DestroyRecipeView, RecipeListView, IngredientsListView, CreateRecipe, RetrieveRecipeBySlug, \
    CreateRatingForRecipeView, DestroyRatingView, UpdateRecipeView, DeleteIngredientFromRecipeView, \
    AddIngredientToRecipeView

urlpatterns = [
    path('', RecipeListView.as_view()),
    path('create/',CreateRecipe.as_view()),
    path('newest/', views.NewestRecipesListView.as_view()),
    path('best-rated/', views.BestRatedRecipesListView.as_view()),
    path('u/<str:username>/', views.UserRecipeProfileListView.as_view()),

    path('<int:pk>/', include([
        path('delete/', DestroyRecipeView.as_view()),
        path('edit/', UpdateRecipeView.as_view()),
        path('delete-ingredient/<int:ingredient_pk>/', DeleteIngredientFromRecipeView.as_view()),
        path('add-ingredient/<int:ingredient_pk>/', AddIngredientToRecipeView.as_view()),
    ])),
    path('longest-cooking-time/', views.LongestCookingTimeView.as_view()),
    path('ingredients/', IngredientsListView.as_view()),
    path('<slug:slug>/', include([
        path('',RetrieveRecipeBySlug.as_view()),
        path('ratings/', include([
            path('create/', CreateRatingForRecipeView.as_view()),
            path( '<int:pk>/', include([
                path('delete/', DestroyRatingView.as_view()),
            ])),
        ])),

    ])),
]