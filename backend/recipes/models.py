from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from django.conf import settings
from django.db.models import Avg
from django.utils.text import slugify

from recipes.mixins import UserMixin, PublicationMixin


# Create your models here.
class Recipe(UserMixin,PublicationMixin):
    name = models.CharField(max_length=100)
    ingredients = models.ManyToManyField("Ingredient", blank=True)
    type_dish = models.CharField(max_length=50)
    image = models.ImageField(upload_to="recipes/images/")

    description = models.TextField()

    slug = models.SlugField(unique=True)

    class TypeDishChoices(models.TextChoices):
        SALAD = "salad"
        SOUP = "soup"
        MAIN = "main"
        DESSERT = "dessert"



    @property
    def average_rating(self):
        return self.ratings.aggregate(avg=Avg('rating'))['avg']

    @property
    def ratings_count(self):
        return self.ratings.count()

class Ingredient(models.Model):
    name = models.CharField(max_length=100)


class Rating(UserMixin,PublicationMixin):
    stars = models.DecimalField(decimal_places=1, max_digits=2,validators=[MinValueValidator(0.0),MaxValueValidator(5.0)])
    comment = models.TextField(blank=True,null=True)
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE,related_name="ratings")

