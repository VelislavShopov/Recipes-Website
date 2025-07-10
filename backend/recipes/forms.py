from .models import Recipe
from django import forms

from .utils import create_slug_for_recipe


class RecipeCreateForm(forms.ModelForm):
    class Meta:
        model = Recipe
        exclude = ['slug']

    def save(self, commit=True):
        instance = super().save(commit=False)
        instance.slug = create_slug_for_recipe(instance)
        if commit:
            instance.save()
        return instance