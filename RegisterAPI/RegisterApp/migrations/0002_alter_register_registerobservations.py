# Generated by Django 4.2.5 on 2023-09-08 16:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('RegisterApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='register',
            name='RegisterObservations',
            field=models.TextField(max_length=2548, null=True),
        ),
    ]