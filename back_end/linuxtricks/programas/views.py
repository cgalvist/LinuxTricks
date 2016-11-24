from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from .models import programa
from .models import categoria
from .models import atajo

# lista inicial de programas o datos de un programa especifico
def index(request):
    id = request.GET.get('id', 0)

    if (id == 0):
        lista = programa.objects.all()
        output = [{'id': item.pk, 'nombre': item.nombre, 'descripcion': item.descripcion, 'logo': item.logo} for item in lista]
    else:
        item = programa.objects.get(pk = id)
        lista = atajo.objects.filter(programa = id)
        output = {'id': item.pk, 'nombre': item.nombre, 'atajos': [{'id': item2.pk, 'categoria': categoria.objects.get(pk = item2.categoria.pk).nombre, 'descripcion': item2.descripcion, 'combinacion': item2.combinacion} for item2 in lista]}

    return JsonResponse(output, safe=False)

# datos de un atajo
def atajoPorId(request):
    id = request.GET.get('id', 0)

    if (id == 0):
        output = {'message': 'insert params'}
    else:
        item = atajo.objects.get(pk = id)
        output = {'id': item.pk, 'categoria': categoria.objects.get(pk = item.categoria.pk).nombre, 'descripcion': item.descripcion, 'combinacion': item.combinacion}

    return JsonResponse(output, safe=False)
