from collections import defaultdict

from django.contrib.auth import get_user_model
from rest_framework import viewsets, status
from rest_framework.decorators import permission_classes
from rest_framework.generics import ListAPIView, get_object_or_404, DestroyAPIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from users.models import CustomUser
from util.permissions import RecipeOfUserPermission
from .models import Recipe
from .serializers import RecipeSerializer, RecipeShortSerializer
from .utils import get_best_recipes
# Create your views here.
UserModel = get_user_model()


class RecipeListView(ListAPIView):
    serializer_class = RecipeSerializer

    def get_queryset(self):
        filters_dict = defaultdict(list)

        for key, value in self.request.GET.items():
            if key.startswith('filters['):
                # Extract the field name between brackets
                field_start = key.find('[') + 1
                field_end = key.find(']')
                field_name = key[field_start:field_end]

                # Append the value to the list for that field
                filters_dict[field_name].append(value)

        # Convert to Django __in syntax
        final_filters = {}
        for field, values in filters_dict.items():
            if len(values) == 1:
                final_filters[field] = values[0]
            else:
                final_filters[f"{field}__in"] = values


        return Recipe.objects.filter(**final_filters)



class DestroyRecipeView(DestroyAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    permission_classes = (IsAuthenticated,RecipeOfUserPermission)

class NewestRecipesListView(ListAPIView):
    serializer_class = RecipeSerializer
    pagination_class = None
    def get_queryset(self):
        return Recipe.objects.all().order_by('-publication_date')[:10]

class BestRatedRecipesListView(ListAPIView):
    serializer_class = RecipeSerializer
    pagination_class = None
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




