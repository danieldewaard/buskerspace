# -*- coding: utf-8 -*-
# Generated by Django 1.9.8 on 2016-08-01 23:16
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0007_busker_pw_hash'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='event_duration',
            field=models.DecimalField(decimal_places=1, default=1.0, max_digits=3),
        ),
    ]
