from django.urls import include, path
from rest_framework.authtoken.views import ObtainAuthToken

from users.views import CreateCustomUser, RetrieveCustomUserById, RetrieveAuthenticatedUserByToken

urlpatterns = [
    path('create',CreateCustomUser.as_view()),
    path('retrieve/<int:id>',RetrieveCustomUserById.as_view()),
    path('retrieve/', RetrieveAuthenticatedUserByToken.as_view()),
    path('auth',ObtainAuthToken.as_view()),

]