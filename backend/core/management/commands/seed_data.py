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
                "description": "Lumina enhances modern living spaces through AI-adaptive lighting solutions that sync with your circadian rhythm. Our flagship panels offer mood-based ambience control, energy efficiency, and seamless smart home integration, making every moment at home visually perfect.",
                "launch_date": date(2024, 6, 15),
                "status": "revenue",
                "order": 1,
                "website_url": "https://lumina.example.com"
            },
            {
                "name": "Velvet & Oak",
                "one_liner": "Timeless craftsmanship for the modern estate.",
                "description": "Velvet & Oak bridges the gap between heritage artistry and contemporary minimalism. Utilizing strictly ethically sourced timber and premium fabrics, each piece is a testament to durability and style. Our collections are curated to transform houses into legacies.",
                "launch_date": None,
                "status": "manufacturing",
                "order": 2,
                "website_url": "https://velvetandoak.example.com"
            },
            {
                "name": "Aura Scent",
                "one_liner": "Personalized olfactory experiences driven by AI.",
                "description": "Aura Scent uses advanced machine learning to design fragrances that are uniquely yours. From home diffusers to personal perfumes, we create sustainable scents that evoke your most cherished memories and elevate your daily rituals.",
                "launch_date": None,
                "status": "ideation",
                "order": 3,
                "website_url": ""
            },
            {
                "name": "Urban Harvest",
                "one_liner": "Farm-to-table, right from your living room.",
                "description": "Revolutionizing urban nutrition with sleek, automated hydroponic units. Urban Harvest allows anyone to grow pesticide-free, nutrient-rich greens in the comfort of their apartment with zero hassle.",
                "launch_date": None,
                "status": "manufacturing",
                "order": 4,
                "website_url": "https://urbanharvest.example.com"
            },
            {
                "name": "Nova Sleep",
                "one_liner": "Engineering the perfect night's rest.",
                "description": "Backed by sleep science, Nova Sleep creates ergonomic mattresses and bedding that adapt to your body temperature and posture. Wake up ready to conquer the day with our restorative technology.",
                "launch_date": date(2023, 11, 1),
                "status": "revenue",
                "order": 5,
                "website_url": "https://novasleep.example.com"
            }
        ]

        for data in brands_data:
            Brand.objects.create(**data)
            self.stdout.write(f"Created brand: {data['name']}")

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
