# Generated by Django 5.2.3 on 2025-07-09 12:34

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0005_alter_customuser_email'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='customuser',
            name='country',
        ),
    ]
