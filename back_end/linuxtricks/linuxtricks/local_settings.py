### local_settings.py
### configuraciones especificas del entorno
### entorno de desarrollo
### tomado de: http://www.sparklewise.com/django-settings-for-production-and-development-best-practices/
DEBUG = True
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'linuxtricks',
        'USER': 'root',
        'PASSWORD': 'root',
        'HOST': '127.0.0.1',
        'PORT': '3306',
    }
}
