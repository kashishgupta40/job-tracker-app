import React, { useState } from 'react';
import axios from 'axios';

const JobForm = ({ matchScore, skillsMatched, onSuccess }) => {
  const [form, setForm] = useState({
    company_name: '',
    job_title: '',
    status: 'Applied',
    notes: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/api/resumes/jobs/create/', {
        ...form,
        resume_score: matchScore,
        skills_matched: skillsMatched.join(', '),
      });
      onSuccess();
    } catch (err) {
      alert("Error saving job");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Add Job Application</h2>
      <input name="company_name" placeholder="Company" onChange={handleChange} />
      <input name="job_title" placeholder="Job Title" onChange={handleChange} />
      <textarea name="notes" placeholder="Notes" onChange={handleChange}></textarea>
      <select name="status" value={form.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interview</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button onClick={handleSubmit}>Save</button>
    </div>
  );
};

export default JobForm;

