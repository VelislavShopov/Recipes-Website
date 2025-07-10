from django.contrib import admin

from recipes.forms import RecipeCreateForm
from recipes.models import Recipe, Rating, Ingredient


# Register your models here.
@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name','user','publication_date')
    list_filter = ('user__username','publication_date')
    search_fields = ('name','user__username')

    form = RecipeCreateForm

    readonly_fields = ('slug',)


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('user','recipe','stars')
    list_filter = ('stars',)

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    ...