import React, { useState } from 'react';
import ResumeUpload from './components/ResumeUpload';
import JobForm from './components/jobForm';
import JobList from './components/jobList';

function App() {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div>
      <h1>Job Tracker + Resume Analyzer</h1>

      {/* Django → Upload Resume */}
      <ResumeUpload onAnalysis={setAnalysis} />

      {/* Autofill form → MongoDB Save */}
      {analysis && (
        <>
          <p><strong>Match Score:</strong> {analysis.match_score}</p>
          <p><strong>Skills Matched:</strong> {analysis.skills.join(', ')}</p>
          <JobForm
            matchScore={analysis.match_score}
            skillsMatched={analysis.skills}
            onSuccess={() => {
              alert("Job saved!");
              setAnalysis(null); // clear after saving
            }}
          />
        </>
      )}

      <hr />

      {/* Node.js → Job CRUD */}
      <JobList />
    </div>
  );
}

export default App;


