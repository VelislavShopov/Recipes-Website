from django.contrib import admin

from recipes.models import Recipe, Rating

# Register your models here.
admin.site.register(Recipe)
admin.site.register(Rating)