# Generated by Django 5.0.3 on 2024-04-18 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('courses', '0007_quesmodel_quiz_alter_quiz_course_delete_quizquestion'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quesmodel',
            name='op1',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='quesmodel',
            name='op2',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='quesmodel',
            name='op3',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='quesmodel',
            name='op4',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
