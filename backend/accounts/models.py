from django.contrib.auth.models import AbstractUser
from django.core.validators import MinValueValidator
from django.db import models
from django_countries.fields import CountryField


# Create your models here.
class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

class Profile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE,related_name='profile')
    picture = models.ImageField(upload_to="profile_pics/", default="profile_pics/default_profile_picture.webp")
    country = CountryField(default='BG')
    birth_date = models.DateField(null=True, blank=True)