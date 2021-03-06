# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-10-27 02:42
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='atajo',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('atajo_descripcion', models.CharField(max_length=50)),
                ('atajo_combinacion', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='categoria',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categoria_nombre', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='programa',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('programa_nombre', models.CharField(max_length=50)),
                ('programa_descripcion', models.CharField(max_length=100)),
                ('programa_logo', models.CharField(max_length=50)),
            ],
        ),
        migrations.AddField(
            model_name='atajo',
            name='categoria',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programas.categoria'),
        ),
        migrations.AddField(
            model_name='atajo',
            name='programa',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='programas.programa'),
        ),
    ]
