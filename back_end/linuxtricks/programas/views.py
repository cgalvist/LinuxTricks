from django.shortcuts import render
from django.http import HttpResponse
from django.http import JsonResponse

from .models import programa
from .models import categoria
from .models import atajo

# lista inicial de programas
def index(request):
    lista = programa.objects.all()

    output = [{'id': item.pk, 'nombre': item.nombre, 'descripcion': item.descripcion, 'logo': item.logo} for item in lista]
    return JsonResponse(output, safe=False)

# lista de atajos por programa
def atajos(request, programa_id):
    item = programa.objects.get(pk = programa_id)
    lista = atajo.objects.filter(programa = programa_id)

    output = {'id': item.pk, 'nombre': item.nombre, 'atajos': [{'id': item2.pk, 'categoria': categoria.objects.get(pk = item2.categoria).nombre, 'descripcion': item2.descripcion, 'combinacion': item2.combinacion} for item2 in lista]}
    return JsonResponse(output, safe=False)

# datos de un atajo
def atajoPorId(request, programa_id, atajo_id):
    item = atajo.objects.get(pk = atajo_id)

    output = {'id': item.pk, 'categoria': item.categoria, 'descripcion': item.descripcion, 'combinacion': item.combinacion}
    return JsonResponse(output, safe=False)
