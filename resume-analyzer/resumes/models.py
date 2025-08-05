from django.db import models

class Resume(models.Model):
    file = models.FileField(upload_to='resumes/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

class JobApplication(models.Model):
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    application_date = models.DateField(auto_now_add=True)
    status = models.CharField(
        max_length=50,
        choices=[('Applied', 'Applied'), ('Interview', 'Interview'), ('Offer', 'Offer'), ('Rejected', 'Rejected')],
        default='Applied'
    )
    notes = models.TextField(blank=True)
    resume_score = models.IntegerField(default=0)
    skills_matched = models.TextField(blank=True)
    link = models.URLField(blank=True)

    def __str__(self):
        return f"{self.company} - {self.position}"

    


class JobApplication(models.Model):
    company = models.CharField(max_length=100)
    position = models.CharField(max_length=100)
    application_date = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=50, default='Applied')
    link = models.URLField(blank=True)

    def __str__(self):
        return f"{self.company} - {self.position}"
