from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CustomUserSerializer, CustomAuthTokenSerializer, ProfileSerializer
from .models import Profile
# Create your views here.

UserModel = get_user_model()

class CustomObtainAuthToken(ObtainAuthToken):
    serializer_class = CustomAuthTokenSerializer


class CreateCustomUser(CreateAPIView):
    model = UserModel
    serializer_class = CustomUserSerializer


class RetrieveCustomUserById(RetrieveAPIView):
    queryset = UserModel.objects.all()
    serializer_class = CustomUserSerializer

class RetrieveCustomUserByUsername(RetrieveAPIView):
    queryset = UserModel.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'username'

class RetrieveAuthenticatedUserByToken(APIView):
    permission_classes = [IsAuthenticated]

    serializer_class = CustomUserSerializer

    def get(self, request,*args,**kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)


class RetrieveProfileByUsername(RetrieveAPIView):
    lookup_field = 'username'
    serializer_class = ProfileSerializer
    def get_object(self):
        user = UserModel.objects.get(username=self.kwargs['username'])
        return Profile.objects.get(user=user)
