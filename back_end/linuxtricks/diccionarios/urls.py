from django.conf.urls import url

from . import views

urlpatterns = [
    # /diccionarios/
    url(r'^$', views.index, name='index'),
    # /diccionarios/$id/
    url(r'^(?P<diccionario_id>[0-9]+)/$', views.comandos, name='comandos'),
    # /diccionarios/$id/comando/$id
    url(r'^(?P<diccionario_id>[0-9]+)/comando/(?P<comando_id>[0-9]+)/$', views.comandoPorId, name='comandoPorId'),
]
