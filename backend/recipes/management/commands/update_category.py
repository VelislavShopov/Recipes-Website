from django.core.management.base import BaseCommand
from recipes.models import Ingredient

class Command(BaseCommand):
    help = 'Update type for existing ingredients'

    def handle(self, *args, **options):
        mapping = {
            'Egg': 'Dairy & Eggs',
            'Tomato': 'Vegetables',
            'Cucumber': 'Vegetables',
            'Onion': 'Vegetables',
            'Salmon': 'Meat & Fish',
            'Chicken breast': 'Meat & Fish',
            'Milk (cow)': 'Dairy & Eggs',
            'Butter': 'Dairy & Eggs',
            'Rice (white)': 'Grains & Cereals',
            'Pasta (spaghetti)': 'Grains & Cereals',
            'Potato': 'Vegetables',
            'Apple': 'Fruits',
            'Banana': 'Fruits',
            'Olive oil': 'Oils & Fats',
            'Salt': 'Spices & Seasonings',
        }

        updated_count = 0
        for name, type_value in mapping.items():
            try:
                ingredient = Ingredient.objects.get(name=name)
                ingredient.category = type_value
                ingredient.save()
                updated_count += 1
            except Ingredient.DoesNotExist:
                self.stdout.write(self.style.WARNING(f'Ingredient "{name}" not found.'))

        self.stdout.write(self.style.SUCCESS(f'Updated type for {updated_count} ingredients.'))
