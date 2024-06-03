import React from 'react';
import classes from './DashboardStat.module.css';

function DashboardStat({ title, value, icon, bgColor }) {
  return (
    <div className={classes.statCard} style={{ backgroundColor: bgColor }}>
      <div className={classes.statIcon}>{icon}</div>
      <div className={classes.statContent}>
        <h5 className={classes.statTitle}>{title}</h5>
        <span className={classes.statValue}>{value}</span>
      </div>
    </div>
  );
}

export default DashboardStat;
