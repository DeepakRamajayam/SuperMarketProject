# management/admin.py

from django.contrib import admin
from .models import User, Admin, Supplier, Product, Employee

admin.site.register(User)
admin.site.register(Admin)
admin.site.register(Supplier)
admin.site.register(Product)
admin.site.register(Employee)
