from django.urls import include, path
from rest_framework.routers import DefaultRouter

from recipes import views

router = DefaultRouter()
router.register('', views.RecipeViewSet, basename='recipes')

urlpatterns = [
    path('newest/', views.NewestRecipesListView.as_view()),
    path('best-rated/', views.BestRatedRecipesListView.as_view()),
    path('u/<str:username>/', views.UserRecipeProfileListView.as_view()),

    path('',include(router.urls)),

]