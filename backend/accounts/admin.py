from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .models import Profile

# Register your models here.
UserModel = get_user_model()

@admin.register(UserModel)
class UserModelAdmin(UserAdmin):
    def get_fieldsets(self, request, obj=None):
        if request.user.is_staff:
            return (('Info',{'fields': ('username', 'first_name', 'last_name','email')}),
                    ('Permissions',{'fields': ('is_staff', 'is_superuser', 'groups', 'user_permissions')}),)

        return super().get_fields(request, obj)


@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

    list_display = ('user','country')
    list_filter = ('country',)
    search_fields = ('user__username','country')

    fieldsets = (
        (None, {'fields': ('country','picture','birth_date')}),)

