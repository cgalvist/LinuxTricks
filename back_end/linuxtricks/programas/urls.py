from django.conf.urls import url

from . import views

urlpatterns = [
    # /programas/
    # /programas/?id=1
    url(r'^$', views.index, name='index'),
    # /programas/atajo/?id=1
    url(r'^atajo$', views.atajoPorId, name='atajoPorId'),
]
