from django.urls import include, path
from rest_framework.authtoken.views import ObtainAuthToken

from accounts.serializers import CustomAuthTokenSerializer
from accounts.views import CreateCustomUser, RetrieveCustomUserById, RetrieveAuthenticatedUserByToken, \
    CustomObtainAuthToken

urlpatterns = [
    path('create',CreateCustomUser.as_view()),
    path('retrieve/<int:id>',RetrieveCustomUserById.as_view()),
    path('retrieve/', RetrieveAuthenticatedUserByToken.as_view()),
    path('auth',CustomObtainAuthToken.as_view()),

]