from __future__ import unicode_literals

from django.db import models

# Create your models here.

class diccionario(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=100)
    logo = models.CharField(max_length=50)

class comando(models.Model):
    diccionario = models.ForeignKey(diccionario, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=150)
    sintaxis = models.CharField(max_length=50)

class opcion(models.Model):
    comando = models.ForeignKey(comando, on_delete=models.CASCADE)
    nombre = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=150)

class ejemplo(models.Model):
    comando = models.ForeignKey(comando, on_delete=models.CASCADE)
    entrada = models.CharField(max_length=50)
    salida = models.CharField(max_length=50)
    descripcion = models.CharField(max_length=150)
