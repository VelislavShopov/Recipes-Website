# Generated by Django 5.2.3 on 2025-06-11 16:07

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0002_recipe_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='description',
            field=models.TextField(default=1),
            preserve_default=False,
        ),
    ]
