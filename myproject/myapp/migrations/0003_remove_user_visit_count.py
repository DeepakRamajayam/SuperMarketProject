# Generated by Django 5.1 on 2024-08-13 15:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0002_alter_admin_id_alter_employee_id_alter_product_id_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='visit_count',
        ),
    ]
