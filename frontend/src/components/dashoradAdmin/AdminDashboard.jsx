import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BiUser, BiListUl } from 'react-icons/bi';
import Card from '../UI/cards/Card';
import BarChart from './BarChart';
import PieChart from './PieChart';
import './DashboardStat.css';

function AdminDashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalSpecialties, setTotalSpecialties] = useState(0);
  const [usersByRole, setUsersByRole] = useState([]);
  const [projectsByStatus, setProjectsByStatus] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const [usersResponse, specialtiesResponse, projectsResponse] = await Promise.all([
          axios.get('/api/admin/users/total', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/admin/specialties/total', { headers: { Authorization: `Bearer ${token}` } }),
          axios.get('/api/admin/projects/status', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        setTotalUsers(usersResponse.data.total);
        setTotalSpecialties(specialtiesResponse.data.total);
        setUsersByRole(usersResponse.data.usersByRole);
        setProjectsByStatus(projectsResponse.data.projectsByStatus);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <div className="stats-container">
        <Card>
          <div className="stat-card">
            <div className="stat-icon">
              <BiUser />
            </div>
            <div className="stat-content">
              <h5 className="stat-title">Total Users</h5>
              <span className="stat-value">{totalUsers}</span>
            </div>
          </div>
        </Card>
        <Card>
          <div className="stat-card">
            <div className="stat-icon">
              <BiListUl />
            </div>
            <div className="stat-content">
              <h5 className="stat-title">Total Specialties</h5>
              <span className="stat-value">{totalSpecialties}</span>
            </div>
          </div>
        </Card>
      </div>
      <div className="charts-container">
        <Card title="Users by Role">
          <BarChart data={usersByRole} />
        </Card>
        <Card title="Projects by Status">
          <PieChart data={projectsByStatus} />
        </Card>
      </div>
    </div>
  );
}

export default AdminDashboard;
