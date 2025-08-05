from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, status
from .models import JobApplication
from .serializers import JobApplicationSerializer
import fitz  # PyMuPDF
import re

# Define keywords for skill extraction
SKILL_KEYWORDS = [
    'python', 'java', 'javascript', 'react', 'node', 'express', 'mongodb',
    'sql', 'html', 'css', 'git', 'django', 'flask', 'docker', 'aws', 'azure',
    'c++', 'c#', 'linux', 'rest api', 'typescript', 'bootstrap', 'tailwind'
]

def extract_skills_from_text(text):
    """Extracts matching skills from resume text using keyword matching."""
    found = []
    for skill in SKILL_KEYWORDS:
        pattern = r'\b' + re.escape(skill) + r'\b'
        if re.search(pattern, text, re.IGNORECASE):
            found.append(skill.lower())
    return list(set(found))

@api_view(['POST'])
def ResumeUploadView(request):
    file = request.FILES.get('file')
    
    if not file:
        return Response({"error": "No file uploaded"}, status=400)

    try:
        # Extract text from PDF using PyMuPDF
        with fitz.open(stream=file.read(), filetype="pdf") as doc:
            text = ""
            for page in doc:
                text += page.get_text()

        # Extract skills from text
        skills = extract_skills_from_text(text)

        # Basic match score: based on number of matched skills
        total_possible = len(SKILL_KEYWORDS)
        match_score = int(len(skills) / total_possible * 100)

        return Response({
            "message": "Resume analyzed successfully",
            "analysis": {
                "skills": skills,
                "match_score": match_score
            }
        })

    except Exception as e:
        return Response({"error": str(e)}, status=500)


# Job APIs
class JobListView(generics.ListAPIView):
    queryset = JobApplication.objects.all().order_by('-id')
    serializer_class = JobApplicationSerializer

class JobCreateView(generics.CreateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer

class JobUpdateView(generics.UpdateAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer

class JobDeleteView(generics.DestroyAPIView):
    queryset = JobApplication.objects.all()
    serializer_class = JobApplicationSerializer
