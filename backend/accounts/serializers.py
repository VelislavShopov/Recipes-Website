from django.contrib.auth import get_user_model, authenticate
from django_countries.serializer_fields import CountryField
from rest_framework import serializers

from .models import Profile

UserModel = get_user_model()

class CustomAuthTokenSerializer(serializers.Serializer):
    token = serializers.CharField(read_only=True)
    username = serializers.CharField(
        write_only=True
    )
    password = serializers.CharField(
        style={'input_type': 'password'},
        trim_whitespace=False,
        write_only=True
    )

    def validate(self,attrs):
        username = attrs.get('username')
        password = attrs.get('password')

        if username and password:
            user = authenticate(request=self.context.get('request'), username=username, password=password)

            if not user:
                raise serializers.ValidationError('Unable to log in with provided credentials.')
        else:
            raise serializers.ValidationError('Must include username/email and password.')

        attrs['user'] = user
        return attrs


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = "__all__"

    def create(self, validated_data):
        user = UserModel.objects.create_user(**validated_data)
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        exclude = ('user',)


class CustomUserWithProfile(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = UserModel
        fields = '__all__'