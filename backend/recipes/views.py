from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from users.models import CustomUser
from .models import Recipe
from .serializers import RecipeSerializer, RecipeShortSerializer
from .utils import get_best_recipes


# Create your views here.

UserModel = get_user_model()
class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        if not request.user.is_authenticated:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        if request.user.pk != instance.user.pk:
            return Response(status=status.HTTP_403_FORBIDDEN)

        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)


class NewestRecipesListView(ListAPIView):
    serializer_class = RecipeSerializer
    def get_queryset(self):
        return Recipe.objects.all().order_by('-publication_date')[:10]

class BestRatedRecipesListView(ListAPIView):
    serializer_class = RecipeSerializer
    def get_queryset(self):
        queryset = get_best_recipes()
        return queryset[:3]

class UserRecipeProfileListView(ListAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RecipeShortSerializer

    lookup_field = 'username'
    lookup_url_kwarg = 'username'

    def get_queryset(self):
        lookup_value = self.kwargs.get(self.lookup_field)

        user = get_object_or_404(UserModel, **{self.lookup_field: lookup_value})

        return Recipe.objects.filter(user=user)




