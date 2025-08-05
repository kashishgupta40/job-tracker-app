// src/components/Analytics.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart, ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Analytics = () => {
  const [jobs, setJobs] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/jobs', {
          headers: { Authorization: token },
        });
        setJobs(res.data);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    };

    fetchJobs();
  }, []);

  const statusCount = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const scoreDistribution = {
    "0-25": 0,
    "26-50": 0,
    "51-75": 0,
    "76-100": 0,
  };

  jobs.forEach((job) => {
    const score = job.resume_score || 0;
    if (score <= 25) scoreDistribution["0-25"]++;
    else if (score <= 50) scoreDistribution["26-50"]++;
    else if (score <= 75) scoreDistribution["51-75"]++;
    else scoreDistribution["76-100"]++;
  });

  return (
    <div style={{ marginTop: '30px' }}>
      <h2>Job Analytics</h2>

      <div style={{ width: '50%', marginBottom: '30px' }}>
        <Bar
          data={{
            labels: Object.keys(statusCount),
            datasets: [
              {
                label: 'Applications per Status',
                data: Object.values(statusCount),
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
              },
            ],
          }}
          options={{
            responsive: true,
            plugins: {
              legend: { display: false },
            },
          }}
        />
      </div>

      <div style={{ width: '50%' }}>
        <Pie
          data={{
            labels: Object.keys(scoreDistribution),
            datasets: [
              {
                label: 'Resume Match Score Distribution',
                data: Object.values(scoreDistribution),
                backgroundColor: ['#17a2b8', '#6f42c1', '#20c997', '#fd7e14'],
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default Analytics;
