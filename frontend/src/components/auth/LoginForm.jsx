import React, { Fragment } from "react";
import Input from "./../UI/inputs/Input";
import { Form } from "react-router-dom";
import { Button } from "react-bootstrap";
import axios from "axios";
import { redirect } from "react-router-dom";
import { AppURL } from "../../apis/AppURL";
function LoginForm() {
  return (
    <Fragment>
      <Form method="POST">
        <Input label="Email" type="email" name="email" required />
        <Input label="Mot de passe" type="password" name="password" required />
        <Button
          variant="primary"
          type="submit"
          style={{ backgroundColor: "#121481", color: "#ffffff" }}
        >
          Se Connecter
        </Button>
      </Form>
    </Fragment>
  );
}

export default LoginForm;


export async function action({ request }) {
  const formData = await request.formData();
  const loginData = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  try {
    const response = await axios.post(AppURL.login(), loginData, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      const { token, user } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      return redirect("/user/profile"); 
    } else {
      throw new Error(response.data.message || "Login failed");
    }
  } catch (error) {
    console.error("Login error:", error);
    return {
      error: error.response ? error.response.data.message : error.message,
    };
  }
}
