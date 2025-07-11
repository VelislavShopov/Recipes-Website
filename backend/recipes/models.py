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
    class TypeDishChoices(models.TextChoices):
        SALAD = "salad"
        SOUP = "soup"
        MAIN = "main"
        DESSERT = "dessert"
    type_dish = models.CharField(max_length=50,choices=TypeDishChoices)

    class CookingTimeChoices(models.TextChoices):
        ONE_FIVE_MINUTES = "1-5 minutes"
        FIVE_TEN_MINUTES = "5-10 minutes"
        TEN_FIFTEEN_MINUTES = "10-15 minutes"
        FIFTEEN_TWENTY_MINUTES = "15-20 minutes"
        TWENTY_THIRTY_MINUTES = "20-30 minutes"
        THIRTY_FORTYFIVE_MINUTES = "30-45 minutes"
        FOURTYFIVE_SIXTY_MINUTES = "45-60 minutes"

    cooking_time = models.CharField(max_length=50,choices=CookingTimeChoices,default=CookingTimeChoices.ONE_FIVE_MINUTES)
    image = models.ImageField(upload_to="recipes/images/")
    description = models.TextField()

    slug = models.SlugField(unique=True)

    def __str__(self):
        return self.name


    @property
    def average_rating(self):
        return self.ratings.aggregate(avg=Avg('rating'))['avg']

    @property
    def ratings_count(self):
        return self.ratings.count()

class Ingredient(models.Model):
    name = models.CharField(max_length=100,unique=True)

    class IngredientType(models.TextChoices):
        MEAT_FISH = "Meat & Fish"
        DAIRY_EGGS = "Dairy & Eggs"
        VEGETABLES = "Vegetables"
        FRUITS = "Fruits"
        GRAINS_CEREALS = "Grains & Cereals"
        OILS_FATS = "Oils & Fats"
        SPICES_SEASONINGS = "Spices & Seasonings"

    category = models.CharField(max_length=100,choices=IngredientType,default=IngredientType.MEAT_FISH)

    def __str__(self):
        return self.name


class Rating(UserMixin,PublicationMixin):
    stars = models.DecimalField(decimal_places=1, max_digits=2,validators=[MinValueValidator(0.0),MaxValueValidator(5.0)])
    comment = models.TextField(blank=True,null=True)
    recipe = models.ForeignKey(Recipe,on_delete=models.CASCADE,related_name="ratings")

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['recipe','user'],name="unique_recipe_user")
        ]

    def __str__(self):
        return f"{self.recipe} - {self.user} - {self.stars}"
