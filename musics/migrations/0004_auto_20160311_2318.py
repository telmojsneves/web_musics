# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-11 23:18
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('musics', '0003_auto_20160311_2317'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='musicmodel',
            options={'ordering': ('id',), 'verbose_name': ''},
        ),
    ]