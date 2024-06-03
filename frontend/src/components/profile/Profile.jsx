import React, { useState, useEffect } from "react";
import { redirect } from "react-router-dom";
import "./Profile.css";
import Input from "../UI/inputs/Input";
import { checkTokenValidity } from "../../utils/auth";

function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const { name, email, role } = JSON.parse(userData);
      setName(name);
      setEmail(email);
      setRole(role);
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Profil</h2>
      </div>
      <div className="profile-info">
        <div className="profile-field">
          <label htmlFor="name" className="profile-label">Nom</label>
          <Input
            id="name"
            type="text"
            name="name"
            className="profile-input"
            defaultValue={name}
            readOnly
          />
        </div>
        <div className="profile-field">
          <label htmlFor="email" className="profile-label">Email</label>
          <Input
            id="email"
            type="text"
            name="email"
            className="profile-input"
            defaultValue={email}
            readOnly
          />
        </div>
        <div className="profile-field">
          <label htmlFor="role" className="profile-label">Rôle</label>
          <Input
            id="role"
            type="text"
            name="role"
            className="profile-input"
            defaultValue={role}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;

export const loader = async () => {
  const isAuthenticated = localStorage.getItem("token") !== null;
  const tokenValid = await checkTokenValidity();

  if (!isAuthenticated || !tokenValid) {
    return redirect("/login");
  }

  return <Profile />;
};
