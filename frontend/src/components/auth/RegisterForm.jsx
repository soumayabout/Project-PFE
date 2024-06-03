import React from "react";
import Input from "./../UI/inputs/Input";
import { Form, redirect, useActionData } from "react-router-dom";
import { AppURL } from "./../../apis/AppURL";
import Button from "../UI/buttons/Button";
import axios from "axios";

function RegisterForm({ method = "POST", user }) {
  const data = useActionData();
  return (
    <Form method={method}>
      <Input
        label="Nom"
        type="text"
        name="name"
        className="form-control"
        defaultValue={user ? user.data.name : ""}
        required
      />
      <Input
        label="Email"
        type="email"
        name="email"
        className="form-control"
        defaultValue={user ? user.data.email : ""}
        required
      />
      <Input
        label="Mot de passe"
        type="password"
        name="password"
        className="form-control"
        required
      />
      <Input
        label="Confirmer mot de passe"
        type="password"
        name="password_confirmation"
        className="form-control"
        required
      />
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <select
          name="role"
          id="role"
          className="form-control"
          defaultValue={user ? user.data.role : "etudiant"}
          required
        >
          <option value="admin">Admin</option>
          <option value="etudiant">Etudiant</option>
          <option value="professeur">Professeur</option>
        </select>
      </div>

      <div className="mt-5">
        <Button
          text={
            data && data.state === "submitting" ? "En cours..." : "Enregistrer"
          }
          type="submit"
          className="btn-primary"
          backgroundColor="#121481"
          textColor="#ffffff"
        />
      </div>
    </Form>
  );
}

export default RegisterForm;

export async function action({ request }) {
  try {
    const data = await request.formData();

    const registerData = {
      name: data.get("name"),
      email: data.get("email"),
      password: data.get("password"),
      password_confirmation: data.get("password_confirmation"),
      role: data.get("role"),
    };

    console.log("Register Data:", registerData);

    const response = await axios.post(AppURL.register(), registerData, {
      headers: {
        method: "POST",
        "Content-Type": "application/json",
      },
    });

    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);

    if (response.status === 422) {
      return response;
    }

    if (response.status !== 200) {
      throw new Error(response.data.message || "Could not save user.");
    }

    return redirect("/admin/users");
  } catch (error) {
    console.error("Error during user registration:", error);
    throw error;
  }
}
