from __future__ import unicode_literals

from django.db import models

# Create your models here.

class programa(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)
    logo = models.CharField(max_length=50)

class categoria(models.Model):
    nombre = models.CharField(max_length=50)

class atajo(models.Model):
    programa = models.ForeignKey(programa)
    categoria = models.ForeignKey(categoria)
    descripcion = models.CharField(max_length=50)
    combinacion = models.CharField(max_length=100)
