from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from users.models import CustomUser

class CustomUserUsername(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('username','id')


class CustomUserSerializer(serializers.ModelSerializer):
    country = CountryField()
    class Meta:
        model = CustomUser
        fields = "__all__"

    def create(self, validated_data):
        # Pop the password out of validated_data
        password = validated_data.pop('password', None)

        # Create the user instance without the password first
        user = self.Meta.model(**validated_data)

        # Set the password using set_password() to hash it
        if password is not None:
            user.set_password(password)

        # Save the user to the database
        user.save()

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