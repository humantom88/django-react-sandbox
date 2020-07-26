from django.contrib import admin
from django.db import models
from .models import Customer


# Register your models here.
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    u'''Customer admin class'''
    fieldsets = (
        (None, {
            'fields': (
              'first_name',
              'last_name',
              'email',
              'phone',
              'address',
              'description',
            )
        }),
    )
