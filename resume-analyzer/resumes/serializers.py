from rest_framework import serializers
from .models import Resume, JobApplication

class ResumeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Resume
        fields = ['id', 'file', 'uploaded_at']

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = [
            'id',
            'company',
            'position',
            'application_date',
            'status',
            'notes',
            'resume_score',
            'skills_matched',
            'link'
        ]
