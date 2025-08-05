from django.urls import path
from .views import ResumeUploadView, JobCreateView, JobListView, JobDeleteView, JobUpdateView

urlpatterns = [
    path('upload/', ResumeUploadView, name='upload_resume'),
    path('jobs/', JobListView.as_view(), name='job_list'),
    path('jobs/create/', JobCreateView.as_view(), name='create_job'),
    path('jobs/<int:pk>/update/', JobUpdateView.as_view(), name='update_job'),
    path('jobs/<int:pk>/delete/', JobDeleteView.as_view(), name='delete_job'),
]
