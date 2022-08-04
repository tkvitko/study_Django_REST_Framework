from django.core.management.base import BaseCommand, CommandError
from authapp.models import CustomUser as User
from django.contrib.auth.hashers import make_password


class Command(BaseCommand):
    help = 'Adds user'

    def handle(self, *args, **options):
        """
        Function to create user from user's input
        """

        username = input('Enter username: ')
        password = input('Enter password: ')
        email = input('Enter email: ')
        is_staff = bool(input('Enter is_staff (0/1): '))

        # hash password to save in database
        password_hashed = make_password(password=password)

        # user adding to database
        try:
            user_obj_new = User.objects.create(
                username=username,
                password=password_hashed,
                email=email,
                is_staff=is_staff
            )
            self.stdout.write(self.style.SUCCESS('User successfully created: "%s"' % user_obj_new))

        except Exception as e:
            self.stdout.write(self.style.ERROR('Cant create user: "%s"' % e))
