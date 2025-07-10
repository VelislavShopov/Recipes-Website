from django.contrib.auth import get_user_model
from django.contrib.auth.backends import BaseBackend

UserModel = get_user_model()

class EmailBackend(BaseBackend):
    def authenticate(self,request,username = None,password=None,**kwargs):
        if username is None:
            username = kwargs.get('username')



        if username is None or password is None:
            return

        try:
            user = UserModel.objects.get(email=username)
        except UserModel.DoesNotExist:
            return

        if user.check_password(password) and self.user_can_authenticate(user):
            return user


    def user_can_authenticate(self,user):
        return getattr(user,'is_active',True)