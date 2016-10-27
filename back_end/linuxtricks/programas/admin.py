from django.contrib import admin

# Register your models here.
from .models import programa
from .models import categoria
from .models import atajo

admin.site.register(programa)
admin.site.register(categoria)
admin.site.register(atajo)
