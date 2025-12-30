from django.contrib import admin
from .models import Brand, Founder

@admin.register(Brand)
class BrandAdmin(admin.ModelAdmin):
    list_display = ('name', 'status', 'order')
    list_editable = ('status', 'order')
    search_fields = ('name',)

@admin.register(Founder)
class FounderAdmin(admin.ModelAdmin):
    list_display = ('name', 'role', 'order')
    list_editable = ('order',)
    search_fields = ('name',)
