from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from .models import diccionario
from .models import comando
from .models import opcion
from .models import ejemplo

# lista inicial de diccionarios
def index(request):
    lista = diccionario.objects.all()

    output = [{'id': item.pk, 'nombre': item.nombre, 'descripcion': item.descripcion, 'logo': item.logo} for item in lista]
    return JsonResponse(output, safe=False)

# lista de comandos por diccionario
def comandos(request, diccionario_id):
    item = diccionario.objects.get(pk = diccionario_id)
    lista = comando.objects.filter(diccionario = diccionario_id)

    output = {'id': item.pk, 'nombre': item.nombre, 'comandos': [{'id': item2.pk, 'nombre': item2.nombre, 'descripcion': item2.descripcion} for item2 in lista]}
    return JsonResponse(output, safe=False)

# datos de un comando
def comandoPorId(request, diccionario_id, comando_id):
    item = comando.objects.get(pk = comando_id)
    listaOpciones = opcion.objects.filter(comando = comando_id)
    listaEjemplos = ejemplo.objects.filter(comando = comando_id)

    output = {'id': item.pk, 'titulo': item.nombre, 'descripcion': item.descripcion, 'sintaxis': item.sintaxis, 'opciones':[{'opcion': item2.comando, 'descripcion': item2.descripcion} for item2 in listaOpciones], 'ejemplos':[{'entrada': item2.entrada, 'salida': item2.salida, 'explicacion': item2.descripcion} for item2 in listaEjemplos]}
    return JsonResponse(output, safe=False)
