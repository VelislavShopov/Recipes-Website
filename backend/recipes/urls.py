from django.urls import include, path
from rest_framework.routers import DefaultRouter

from recipes import views
from recipes.views import DestroyRecipeView, RecipeListView

urlpatterns = [
    path('', RecipeListView.as_view()),
    path('newest/', views.NewestRecipesListView.as_view()),
    path('best-rated/', views.BestRatedRecipesListView.as_view()),
    path('u/<str:username>/', views.UserRecipeProfileListView.as_view()),

    path('<int:pk>/', include([
        path('delete/', DestroyRecipeView.as_view()),
    ]))

]