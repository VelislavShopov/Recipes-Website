from django.contrib.auth import get_user_model
from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from users.models import CustomUser

UserModel = get_user_model()

class CustomUserUsername(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('username','id')


class CustomUserSerializer(serializers.ModelSerializer):
    country = CountryField()
    class Meta:
        model = UserModel
        fields = "__all__"

    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)
        return user