from __future__ import unicode_literals

from django.db import models

# Create your models here.

class programa(models.Model):
    programa_nombre = models.CharField(max_length=50)
    programa_descripcion = models.CharField(max_length=100)
    programa_logo = models.CharField(max_length=50)

class categoria(models.Model):
    categoria_nombre = models.CharField(max_length=50)
    
class atajo(models.Model):
    programa = models.ForeignKey(programa)
    categoria = models.ForeignKey(categoria)
    atajo_descripcion = models.CharField(max_length=50)
    atajo_combinacion = models.CharField(max_length=100)
