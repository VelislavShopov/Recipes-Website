from django.contrib import admin

from recipes.forms import RecipeCreateForm
from recipes.models import Recipe, Rating, Ingredient


# Register your models here.
@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('name','user','publication_date_time')
    list_filter = ('user__username','publication_date_time')
    search_fields = ('name','user__username')

    form = RecipeCreateForm

    readonly_fields = ('slug',)


@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('recipe','user','stars')
    list_filter = ('stars','recipe__name','user__username')
    search_fields = ('recipe__name','user__username')

    fieldsets = (
        ("Info", {'fields': ('recipe','user')}),
        ('Review', {'fields': ('stars',)}),
    )

    def get_readonly_fields(self, request, obj=None):
        if request.user.is_superuser:
            return self.readonly_fields

        return ['user','recipe']

@admin.register(Ingredient)
class IngredientAdmin(admin.ModelAdmin):
    ...