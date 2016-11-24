from django.conf.urls import url

from . import views

urlpatterns = [
    # /diccionarios/
    # /diccionarios/?id=1
    url(r'^$', views.index, name='index'),
    # /diccionarios/comando/?id=1
    url(r'^comando$', views.comandoPorId, name='comandoPorId'),
]
