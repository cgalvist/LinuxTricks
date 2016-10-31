from django.conf.urls import url

from . import views

urlpatterns = [
    # /programas/
    url(r'^$', views.index, name='index'),
    # /programas/$id/
    url(r'^(?P<programa_id>[0-9]+)/$', views.atajos, name='atajos'),
    # /programas/$id/atajo/$id
    url(r'^(?P<programa_id>[0-9]+)/atajo/(?P<atajo_id>[0-9]+)/$', views.atajoPorId, name='atajoPorId'),
]
