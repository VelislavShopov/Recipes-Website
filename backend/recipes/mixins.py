from django.db import models
from django.conf import settings

class UserMixin(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    class Meta:
        abstract = True

class PublicationMixin(models.Model):
    publication_date = models.DateField(auto_now_add=True)

    class Meta:
        abstract = True