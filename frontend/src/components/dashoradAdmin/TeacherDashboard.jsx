import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaChalkboardTeacher, FaUserGraduate, FaThList } from 'react-icons/fa';
import Card from '../UI/cards/Card';
import Chart from './Chart';
import './DashboardStat.css';

function TeacherDashboard() {
  const [projects, setProjects] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const [projectsResponse, specialtiesResponse] = await Promise.all([
          axios.get('/api/teacher/projects', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('/api/specialties', {
            headers: { Authorization: `Bearer ${token}` },
          })
        ]);

        setProjects(projectsResponse.data.projects);
        setSpecialties(specialtiesResponse.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const generateChartData = (projects) => {
    const specialtyCount = {};
    projects.forEach((project) => {
      const specialty = project.specialty ? project.specialty.specialty_name : 'Autres';
      specialtyCount[specialty] = (specialtyCount[specialty] || 0) + 1;
    });

    return {
      labels: Object.keys(specialtyCount),
      datasets: [
        {
          label: 'Nombre de projets',
          data: Object.values(specialtyCount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <React.Fragment>
      <h1>Tableau de bord professeur</h1>
      <div className="dashboard-container">
        <div className="stats-container">
          <Card>
            <div className="stat-card">
              <div className="stat-icon">
                <FaBook />
              </div>
              <div className="stat-content">
                <h5 className="stat-title">Total des projets</h5>
                <span className="stat-value">{projects.length}</span>
              </div>
            </div>
          </Card>
          <Card>
            <div className="stat-card">
              <div className="stat-icon">
                <FaThList />
              </div>
              <div className="stat-content">
                <h5 className="stat-title">Total des spécialités</h5>
                <span className="stat-value">{specialties.length}</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="charts-container">
          <Card title="Projets par spécialité">
            <Chart type="bar" data={generateChartData(projects)} />
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

export default TeacherDashboard;
