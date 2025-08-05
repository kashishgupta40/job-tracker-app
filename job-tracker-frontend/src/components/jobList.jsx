// src/components/JobList.jsx
/*
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    company: '',
    position: '',
    status: '',
    notes: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const token = localStorage.getItem('token');

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/jobs', {
        headers: { Authorization: token },
      });
      setJobs(res.data);
      setFilteredJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/jobs/${id}`, {
        headers: { Authorization: token },
      });
      fetchJobs();
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  const startEdit = (job) => {
    setEditingId(job._id);
    setEditForm({
      company: job.company,
      position: job.position,
      status: job.status,
      notes: job.notes,
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({ company: '', position: '', status: '', notes: '' });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/jobs/${editingId}`, editForm, {
        headers: { Authorization: token },
      });
      fetchJobs();
      cancelEdit();
    } catch (err) {
      alert("Failed to save changes");
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    applyFilters(query, statusFilter);
  };

  const handleStatusFilter = (e) => {
    const filter = e.target.value;
    setStatusFilter(filter);
    applyFilters(searchQuery, filter);
  };

  const applyFilters = (query, status) => {
    let results = [...jobs];

    if (query) {
      results = results.filter(job =>
        job.company.toLowerCase().includes(query) ||
        job.position.toLowerCase().includes(query)
      );
    }

    if (status) {
      results = results.filter(job => job.status === status);
    }

    setFilteredJobs(results);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Tracked Jobs</h2>

      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search by company or position"
          value={searchQuery}
          onChange={handleSearch}
        />
        <select value={statusFilter} onChange={handleStatusFilter}>
          <option value="">All Statuses</option>
          <option value="applied">Applied</option>
          <option value="interview">Interview</option>
          <option value="offer">Offer</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {filteredJobs.length === 0 ? (
        <p>No jobs found</p>
      ) : (
        <ul>
          {filteredJobs.map((job) => (
            <li key={job._id}>
              {editingId === job._id ? (
                <div>
                  <input
                    name="company"
                    value={editForm.company}
                    onChange={handleEditChange}
                    placeholder="Company"
                  />
                  <input
                    name="position"
                    value={editForm.position}
                    onChange={handleEditChange}
                    placeholder="Job Title"
                  />
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleEditChange}
                  >
                    <option value="applied">Applied</option>
                    <option value="interview">Interview</option>
                    <option value="offer">Offer</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <textarea
                    name="notes"
                    value={editForm.notes}
                    onChange={handleEditChange}
                    placeholder="Notes"
                  />
                  <button onClick={saveEdit}>Save</button>
                  <button onClick={cancelEdit}>Cancel</button>
                </div>
              ) : (
                <div>
                  <strong>{job.company}</strong> - {job.position}<br />
                  Status: <strong>{job.status}</strong><br />
                  Skills: {job.skills_matched} | Score: {job.resume_score}<br />
                  Notes: {job.notes}<br />
                  <button onClick={() => startEdit(job)}>Edit</button>
                  <button onClick={() => deleteJob(job._id)}>Delete</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;
*/
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/resumes/jobs/');
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  const deleteJob = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/resumes/jobs/${id}/delete/`);
      fetchJobs();
    } catch (err) {
      alert("Failed to delete job");
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:8000/api/resumes/jobs/${id}/update/`, {
        status: newStatus,
      });
      fetchJobs();
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  return (
    <div>
      <h2>Tracked Jobs</h2>
      {jobs.length === 0 ? <p>No jobs yet</p> : (
        <ul>
          {jobs.map((job) => (
            <li key={job.id}>
              <strong>{job.company_name}</strong> - {job.job_title}<br />
              Status:
              <select
                value={job.status}
                onChange={(e) => updateStatus(job.id, e.target.value)}
              >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
              </select>
              <br />
              Skills: {job.skills_matched} | Score: {job.resume_score}<br />
              <button onClick={() => deleteJob(job.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default JobList;



