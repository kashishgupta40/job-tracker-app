// src/pages/Dashboard.jsx
import React, { useState } from 'react';
import ResumeUpload from '../components/ResumeUpload';
import JobForm from '../components/JobForm';
import JobList from '../components/JobList';

const Dashboard = ({ onLogout }) => {
  const [analysis, setAnalysis] = useState(null);

  return (
    <div>
      <h1>Job Tracker + Resume Analyzer</h1>
      <button onClick={onLogout}>Logout</button>
      <ResumeUpload onAnalysis={setAnalysis} />
      {analysis && (
        <>
          <p><strong>Match Score:</strong> {analysis.match_score}</p>
          <p><strong>Skills:</strong> {analysis.skills.join(', ')}</p>
          <JobForm
            matchScore={analysis.match_score}
            skillsMatched={analysis.skills}
            onSuccess={() => alert("Job saved!")}
          />
        </>
      )}
      <hr />
      <JobList />
    </div>
  );
};

export default Dashboard;
