import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import Card from '../UI/cards/Card';
import Chart from './Chart';
import './DashboardStat.css';

function StudentDashboard() {
  const [enrolledProjects, setEnrolledProjects] = useState([]);
  const [totalSpecialties, setTotalSpecialties] = useState(0);
  const [courseGrades, setCourseGrades] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const [
          enrolledProjectsResponse,
          SpecialtiesResponse,
          gradesResponse,
        ] = await Promise.all([
          axios.get('/api/student/projects/enrolled', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('/api/student/Specialties/total', {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('/api/student/Specialties/grades', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setEnrolledProjects(enrolledProjectsResponse.data.projects);
        setTotalSpecialties(SpecialtiesResponse.data.total);
        setCourseGrades(gradesResponse.data.grades);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <React.Fragment>
      <h1>Tableau de bord étudiant</h1>
      <div className="dashboard-container">
        <div className="stats-container">
          <Card>
            <div className="stat-card">
              <div className="stat-icon">
                <FaBook />
              </div>
              <div className="stat-content">
                <h5 className="stat-title">Projets inscrits</h5>
                <span className="stat-value">{enrolledProjects.length}</span>
              </div>
            </div>
          </Card>
          <Card>
            <div className="stat-card">
              <div className="stat-icon">
                <FaChalkboardTeacher />
              </div>
              <div className="stat-content">
                <h5 className="stat-title">Total Specialties</h5>
                <span className="stat-value">{totalSpecialties}</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="charts-container">
          <Card title="Projets par spécialité">
            <Chart type="bar" data={generateProjectChartData(enrolledProjects)} />
          </Card>
          <Card title="Notes des cours">
            <Chart type="line" data={generateGradeChartData(courseGrades)} />
          </Card>
        </div>
      </div>
    </React.Fragment>
  );
}

function generateProjectChartData(projects) {
  const data = {
    labels: projects.map(project => project.specialty),
    datasets: [{
      label: 'Projets par spécialité',
      data: projects.map(project => project.count),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }],
  };
  return data;
}

// Fonction utilitaire pour générer les données du graphique des notes de cours
function generateGradeChartData(grades) {
  const data = {
    labels: grades.map(grade => grade.courseName),
    datasets: [{
      label: 'Notes des cours',
      data: grades.map(grade => grade.grade),
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
    }],
  };
  return data;
}

export default StudentDashboard;
