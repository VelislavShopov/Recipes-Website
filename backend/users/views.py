from django.shortcuts import render
from rest_framework import viewsets

from users.models import CustomUser
from .serializers import CustomUserSerializer


# Create your views here.


class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer