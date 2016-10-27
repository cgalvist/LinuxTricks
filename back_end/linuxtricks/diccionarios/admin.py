from django.contrib import admin

# Register your models here.
from .models import diccionario
from .models import comando
from .models import opcion
from .models import ejemplo

admin.site.register(diccionario)
admin.site.register(comando)
admin.site.register(opcion)
admin.site.register(ejemplo)
