from django.urls import include, path
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.routers import DefaultRouter

from users import views

router = DefaultRouter()
router.register('', views.CustomUserViewSet, basename='users')

urlpatterns = [
    path('',include(router.urls)),
    path('auth',ObtainAuthToken.as_view()),
]