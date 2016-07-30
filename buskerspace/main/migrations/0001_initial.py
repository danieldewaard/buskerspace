# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-07-30 05:49
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Busker',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('busker_desc', models.CharField(max_length=3000)),
                ('genre', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('event_datetime', models.DateTimeField()),
                ('event_title', models.CharField(max_length=200)),
                ('event_desc', models.CharField(max_length=1000)),
                ('event_lat', models.DecimalField(decimal_places=5, max_digits=8)),
                ('event_lng', models.DecimalField(decimal_places=5, max_digits=8)),
                ('busker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Busker')),
            ],
        ),
        migrations.CreateModel(
            name='Following',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('busker', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Busker')),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.CharField(max_length=100)),
            ],
        ),
        migrations.AddField(
            model_name='following',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.User'),
        ),
        migrations.AddField(
            model_name='busker',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.User'),
        ),
    ]