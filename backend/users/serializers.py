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

    def update(self, instance, validated_data):
        # Handle password update separately if needed
        password = validated_data.pop('password', None)
        if password is not None:
            instance.set_password(password)

        # Call the parent update method for other fields
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance