from django.db import models

class Brand(models.Model):
    STATUS_CHOICES = [
        ('ideation', 'Ideation'),
        ('manufacturing', 'Manufacturing Setup'),
        ('revenue', 'Revenue Generating'),
    ]

    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='brands/logos/')
    hero_image = models.ImageField(upload_to='brands/hero/')
    one_liner = models.CharField(max_length=255, help_text="Short impactful description", default="")
    description = models.TextField(help_text="Detailed description")
    launch_date = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='ideation')
    website_url = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name

class Founder(models.Model):
    name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    photo = models.ImageField(upload_to='founders/')
    bio = models.TextField()
    vision_quote = models.CharField(max_length=500, blank=True, help_text="Short vision quote")
    linkedin_url = models.URLField(blank=True, null=True)
    twitter_url = models.URLField(blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name
