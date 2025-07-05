from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .serializers import CustomUserSerializer, CustomAuthTokenSerializer

# Create your views here.

UserModel = get_user_model()

class CustomObtainAuthToken(APIView):
    serializer_class = CustomAuthTokenSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})

class CreateCustomUser(CreateAPIView):
    model = UserModel
    serializer_class = CustomUserSerializer


class RetrieveCustomUserById(RetrieveAPIView):
    queryset = UserModel.objects.all()
    serializer_class = CustomUserSerializer

class RetrieveAuthenticatedUserByToken(APIView):
    permission_classes = [IsAuthenticated]

    serializer_class = CustomUserSerializer

    def get(self, request,*args,**kwargs):
        serializer = self.serializer_class(request.user)
        return Response(serializer.data)


