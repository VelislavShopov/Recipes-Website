from django.urls import include, path
from rest_framework.routers import DefaultRouter

from recipes import views
from recipes.views import DestroyRecipeView, RecipeListView, IngredientsListView, CreateRecipe

urlpatterns = [
    path('', RecipeListView.as_view()),
    path('create/',CreateRecipe.as_view()),
    path('newest/', views.NewestRecipesListView.as_view()),
    path('best-rated/', views.BestRatedRecipesListView.as_view()),
    path('u/<str:username>/', views.UserRecipeProfileListView.as_view()),

    path('<int:pk>/', include([
        path('delete/', DestroyRecipeView.as_view()),
    ])),
    path('ingredients/', IngredientsListView.as_view()),
]