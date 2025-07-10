from django.urls import include, path
from rest_framework.authtoken.views import ObtainAuthToken

from accounts.serializers import CustomAuthTokenSerializer
from accounts.views import CreateCustomUser, RetrieveCustomUserById, RetrieveAuthenticatedUserByToken, \
    CustomObtainAuthToken, RetrieveProfileByUsername, RetrieveCustomUserByUsername

urlpatterns = [
    path('create',CreateCustomUser.as_view()),
    path('retrieve/',include([
        path('<int:pk>/',RetrieveCustomUserById.as_view()),
        path('<str:username>/',RetrieveCustomUserByUsername.as_view()),
    ])),
    path('retrieve/', RetrieveAuthenticatedUserByToken.as_view()),
    path('auth',CustomObtainAuthToken.as_view()),

    path('profiles/<str:username>/', RetrieveProfileByUsername.as_view()),

]