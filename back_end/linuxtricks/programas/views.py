from django.shortcuts import render
from django.http import HttpResponse

from .models import programa

# Create your views here.

def index(request):
    lista = programa.objects.order_by('-programa_nombre')
    output = ', '.join([q.programa_nombre for q in lista])
    return HttpResponse(output)

