from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from users.models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    country = CountryField()
    class Meta:
        model = CustomUser
        fields = "__all__"