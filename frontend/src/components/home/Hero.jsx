import React from 'react';
import { useNavigate } from 'react-router-dom';
import slider1 from '../../assets/img/slider1.jpg';
import { FaUserShield, FaChalkboardTeacher, FaUserGraduate } from 'react-icons/fa';
import styles from './Hero.module.css';

const Hero = () => {
  const navigate = useNavigate();

  const handleAdminAccess = () => {
    navigate('/');
  };

  const handleTeacherAccess = () => {
    navigate('/');
  };

  const handleStudentAccess = () => {
    navigate('/');
  };

  return (
    <div className={`${styles.container} bg-white`}>
      <main className="container py-5">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8 col-lg-6 text-center">
            <div className={styles.imageSlider}>
              <div className={styles.slide}>
                <img src={slider1} alt="Slider 1" className="img-fluid" />
              </div>
            </div>
            <h1 className="display-4 fw-bold mt-4 text-dark">
              Système de Gestion des Choix de PFE
            </h1>
          </div>
        </div>
        <div className="row g-4">
          <div className="col-md-4 d-flex">
            <div className="card text-dark bg-light shadow-lg flex-fill">
              <div className={`${styles.cardBody} card-body`}>
                <div className={`${styles.iconContainer} mb-3`}>
                  <FaUserShield className={styles.icon} />
                </div>
                <h2 className="h4 card-title fw-bold">Espace Administrateur</h2>
                <p className="card-text">Gérez les choix de PFE, les étudiants et les enseignants.</p>
                <button className={`btn btn-primary ${styles.cardButton}`} onClick={handleAdminAccess}>
                  Accéder
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card text-dark bg-light shadow-lg flex-fill">
              <div className={`${styles.cardBody} card-body`}>
                <div className={`${styles.iconContainer} mb-3`}>
                  <FaChalkboardTeacher className={styles.icon} />
                </div>
                <h2 className="h4 card-title fw-bold">Espace Enseignant</h2>
                <p className="card-text">Proposez des sujets de PFE et suivez les choix des étudiants.</p>
                <button className={`btn btn-primary ${styles.cardButton}`} onClick={handleTeacherAccess}>
                  Accéder
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4 d-flex">
            <div className="card text-dark bg-light shadow-lg flex-fill">
              <div className={`${styles.cardBody} card-body`}>
                <div className={`${styles.iconContainer} mb-3`}>
                  <FaUserGraduate className={styles.icon} />
                </div>
                <h2 className="h4 card-title fw-bold">Espace Étudiant</h2>
                <p className="card-text">Choisissez et réservez vos sujets de PFE préférés.</p>
                <button className={`btn btn-primary ${styles.cardButton}`} onClick={handleStudentAccess}>
                  Accéder
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Hero;
