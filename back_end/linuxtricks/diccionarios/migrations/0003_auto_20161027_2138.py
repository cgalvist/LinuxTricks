# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-10-27 21:38
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('diccionarios', '0002_auto_20161027_2102'),
    ]

    operations = [
        migrations.RenameField(
            model_name='ejemplo',
            old_name='explicacion',
            new_name='descripcion',
        ),
    ]
