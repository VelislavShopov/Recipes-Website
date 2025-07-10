from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .models import Profile

# Register your models here.
UserModel = get_user_model()

@admin.register(UserModel)
class UserModelAdmin(UserAdmin):
    ...

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user','country')
    list_filter = ('country',)
    search_fields = ('user__username','country')

