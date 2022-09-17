from .base import *

DEBUG = False

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'todoapp',
        'USER': 'admin',
        'PASSWORD': 'password',
        'HOST': 'db',
        'PORT': '5432',
    }
}
