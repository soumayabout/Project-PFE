import React, { Fragment } from "react";
import { Form, useActionData, redirect, json, useLoaderData } from "react-router-dom";
import Input from "./../UI/inputs/Input";
import Button from "./../UI/buttons/Button";
import { AppURL } from "../../apis/AppURL";
import axios from "axios";
import { getUserId } from "../../utils/auth";

function ProjectForm({ method, project }) {
  const data = useActionData();
  const { specialties } = useLoaderData();

  return (
    <Fragment>
      <h2>{method === "put" ? "Modifier un projet" : "Créer un projet"}</h2>
      <Form method={method} >
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err, index) => (
              <li key={index}>{err}</li>
            ))}
          </ul>
        )}
        <select
          name="specialty_id"
          className="form-control"
          defaultValue={project ? project.specialty_id : ""}
        >
          <option value="" hidden>
            Choisir une spécialité
          </option>
          {specialties &&
            Array.isArray(specialties) &&
            specialties.map((specialty) => (
              <option key={specialty.id} value={specialty.id}>
                {specialty.specialty_name}
              </option>
            ))}
        </select>
        <Input
          label="Titre de projet"
          type="text"
          name="project_name"
          className="form-control"
          defaultValue={project ? project.project_name : ""}
          required
        />
        <Input
          textarea
          label="Description"
          name="project_description"
          className="form-control"
          defaultValue={project ? project.project_description : ""}
          required
        />
        <div className="actions">
          <Button
            text={data && data.state === "submitting" ? "En cours..." : "Enregistrer"}
            type="submit"
            className="btn-primary"
            backgroundColor="#121481"
            textColor="#ffffff"
          />
        </div>
      </Form>
    </Fragment>
  );
}

export default ProjectForm;


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();
  const userId = getUserId();

  const projectData = {
    user_id: userId,
    specialty_id: data.get("specialty_id"),
    project_name: data.get("project_name"),
    project_description: data.get("project_description"),
  };

  let url = AppURL.storeProject();

  if (method === "PUT") {
    url = AppURL.updateProject(params.id);
  }

  console.log("req method : ", method);
  console.log("Req Url : ", url);

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(projectData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Error("Could not save project.");
  }

  return redirect("/teacher/projects");
}

export async function loader({ params }) {
  try {
    const specialtiesResponse = await axios.get(AppURL.listSpecialties());
    const specialties = specialtiesResponse.data.data;

    let project = null;
    if (params.id) {
      const projectResponse = await axios.get(AppURL.showProject(params.id));
      project = projectResponse.data.data;
    }

    return json({ specialties, project }, { status: 200 });
  } catch (error) {
    return json(
      {
        specialties: [],
        message: "Une erreur est survenue lors de la récupération des données.",
      },
      { status: 500 }
    );
  }
}

