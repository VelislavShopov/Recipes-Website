from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.conf import settings

from recipes.mixins import UserMixin, PublicationMixin


# Create your models here.
class Recipe(UserMixin,PublicationMixin):
    name = models.CharField(max_length=100)
    ingredients = models.ManyToManyField("Ingredient")
    type_dish = models.CharField(max_length=50)

    class TypeDishChoices(models.TextChoices):
        SALAD = "Salad"
        MAIN = "Main"
        DESSERT = "Dessert"


class Ingredient(models.Model):
    name = models.CharField(max_length=100)


class Rating(UserMixin,PublicationMixin):
    stars = models.DecimalField(decimal_places=1, max_digits=1,validators=[MinValueValidator(0.0),MaxValueValidator(5.0)])
    comment = models.TextField(blank=True,null=True)
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE)
