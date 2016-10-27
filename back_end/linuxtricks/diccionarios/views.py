from django.shortcuts import render
from django.http import HttpResponse

from .models import diccionario

# Create your views here.

def index(request):
    lista = diccionario.objects.order_by('-diccionario_nombre')
    output = ', '.join([q.diccionario_nombre for q in lista])
    return HttpResponse(output)
