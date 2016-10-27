from __future__ import unicode_literals

from django.db import models

# Create your models here.

class diccionario(models.Model):
    diccionario_nombre = models.CharField(max_length=50)
    diccionario_descripcion = models.CharField(max_length=100)
    diccionario_logo = models.CharField(max_length=50)
    
class comando(models.Model):
    diccionario = models.ForeignKey(diccionario)
    comando_nombre = models.CharField(max_length=50)
    comando_descripcion = models.CharField(max_length=150)
    comando_sintaxis = models.CharField(max_length=50)
    
class opcion(models.Model):
    comando = models.ForeignKey(comando)
    opcion_nombre = models.CharField(max_length=50)
    opcion_descripcion = models.CharField(max_length=150)

class ejemplo(models.Model):
    comando = models.ForeignKey(comando)
    ejemplo_entrada = models.CharField(max_length=50)
    ejemplo_salida = models.CharField(max_length=50)
    ejemplo_explicacion = models.CharField(max_length=150)
