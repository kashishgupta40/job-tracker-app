import { useState } from 'react';
import axios from 'axios';

export default function AddJobForm({ onJobAdded }) {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    link: '',
    status: 'Applied',
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/resumes/jobs/', formData);
      alert('Job added!');
      setFormData({ company: '', position: '', link: '', status: 'Applied' });
      if (onJobAdded) onJobAdded();
    } catch (err) {
      console.error(err);
      alert('Error adding job.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
      <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" required />
      <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Position" required />
      <input type="url" name="link" value={formData.link} onChange={handleChange} placeholder="Job Link" />
      <select name="status" value={formData.status} onChange={handleChange}>
        <option>Applied</option>
        <option>Interviewing</option>
        <option>Offer</option>
        <option>Rejected</option>
      </select>
      <button type="submit">Add Job</button>
    </form>
  );
}
