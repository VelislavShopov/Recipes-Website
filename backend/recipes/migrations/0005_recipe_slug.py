# Generated by Django 5.2.3 on 2025-07-05 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipes', '0004_alter_rating_recipe_alter_rating_stars_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='slug',
            field=models.SlugField(default='NOTHING', unique=True),
            preserve_default=False,
        ),
    ]
