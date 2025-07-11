from django.core.management.base import BaseCommand
from recipes.models import Ingredient

class Command(BaseCommand):
    help = 'Load 10 additional ingredients (excluding existing ones) into the database'

    def handle(self, *args, **options):
        ingredients = [
            'Chicken breast',
            'Milk (cow)',
            'Butter',
            'Rice (white)',
            'Pasta (spaghetti)',
            'Potato',
            'Apple',
            'Banana',
            'Olive oil',
            'Salt',
        ]

        created_count = 0
        for item in ingredients:
            obj, created = Ingredient.objects.get_or_create(name=item)
            if created:
                created_count += 1

        self.stdout.write(self.style.SUCCESS(f'Successfully loaded {created_count} new ingredients.'))
