from django.core.management.base import BaseCommand
from core.models import Brand, Founder
from django.core.files import File
from django.conf import settings
import os
from datetime import date

class Command(BaseCommand):
    help = 'Seeds the database with initial data'

    def handle(self, *args, **options):
        self.stdout.write('Seeding data...')
        
        # Clear existing data
        Brand.objects.all().delete()
        Founder.objects.all().delete()

        # Create Brands
        brands_data = [
            {
                "name": "Lumina",
                "one_liner": "Intelligence that illuminates your life.",
                "description": "Lumina enhances modern living spaces through AI-adaptive lighting solutions that sync with your circadian rhythm.",
                "launch_date": date(2024, 6, 15),
                "status": "revenue",
                "order": 1,
                "website_url": "https://lumina.example.com",
                "logo_filename": "lumina.png"
            },
            {
                "name": "Velvet & Oak",
                "one_liner": "Timeless craftsmanship for the modern estate.",
                "description": "Velvet & Oak bridges the gap between heritage artistry and contemporary minimalism.",
                "launch_date": None,
                "status": "manufacturing",
                "order": 2,
                "website_url": "https://velvetandoak.example.com",
                "logo_filename": "velvet-oak.png"
            },
            {
                "name": "Aura Scent",
                "one_liner": "Personalized olfactory experiences driven by AI.",
                "description": "Aura Scent uses advanced machine learning to design fragrances that are uniquely yours.",
                "launch_date": None,
                "status": "ideation",
                "order": 3,
                "website_url": "",
                "logo_filename": "aura-scent.png"
            },
            {
                "name": "Urban Harvest",
                "one_liner": "Farm-to-table, right from your living room.",
                "description": "Revolutionizing urban nutrition with sleek, automated hydroponic units.",
                "launch_date": None,
                "status": "manufacturing",
                "order": 4,
                "website_url": "https://urbanharvest.example.com",
                "logo_filename": "urban-harvest.png"
            },
            {
                "name": "Nova Sleep",
                "one_liner": "Engineering the perfect night's rest.",
                "description": "Backed by sleep science, Nova Sleep creates ergonomic mattresses and bedding.",
                "launch_date": date(2023, 11, 1),
                "status": "revenue",
                "order": 5,
                "website_url": "https://novasleep.example.com",
                "logo_filename": "nova-sleep.png"
            }
        ]

        # Path to frontend public folder where images are stored
        frontend_brands_path = os.path.join(settings.BASE_DIR, '../frontend/public/brands')

        for data in brands_data:
            logo_filename = data.pop('logo_filename', None)
            brand = Brand.objects.create(**data)
            
            if logo_filename:
                file_path = os.path.join(frontend_brands_path, logo_filename)
                if os.path.exists(file_path):
                    with open(file_path, 'rb') as f:
                        brand.logo.save(logo_filename, File(f), save=True)
                        self.stdout.write(f"Attached logo for {brand.name}")
                else:
                    self.stdout.write(self.style.WARNING(f"Logo file not found: {file_path}"))
            
            self.stdout.write(f"Created brand: {brand.name}")

        # Create Founders
        founders_data = [
            {
                "name": "Alex V.",
                "role": "CEO & Visionary",
                "bio": "Alex is a serial entrepreneur with a decade of experience in scaling D2C ventures. He previously co-founded 'NextGen Retail,' which was acquired by a Fortune 500 company. Alex believes in the power of vertical integration to deliver unmatched value to consumers. His leadership is defined by a relentless pursuit of innovation and operational excellence.",
                "vision_quote": "We aren't just building brands; we are crafting the future of how people live, interact, and experience their homes.",
                "linkedin_url": "https://linkedin.com/in/alex",
                "twitter_url": "https://twitter.com/alex",
                "order": 1
            },
            {
                "name": "Sarah J.",
                "role": "Chief Design Officer",
                "bio": "An award-winning industrial designer, Sarah has led design teams at top global design firms. She brings a human-centric approach to Alevate, ensuring that every product is not only functional but also emotionally resonant. Her work focuses on sustainability and the seamless fusion of technology and aesthetics.",
                "vision_quote": "Design is the silent ambassador of your brand. At Alevate, we ensure that ambassador speaks the language of elegance and utility.",
                "linkedin_url": "https://linkedin.com/in/sarah",
                "twitter_url": "https://twitter.com/sarah",
                "order": 2
            }
        ]

        for data in founders_data:
            Founder.objects.create(**data)
            self.stdout.write(f"Created founder: {data['name']}")

        self.stdout.write(self.style.SUCCESS('Successfully seeded data'))
