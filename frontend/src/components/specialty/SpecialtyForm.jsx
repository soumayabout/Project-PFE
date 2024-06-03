import React, { Fragment } from "react";
import { Form, useActionData, redirect, json } from "react-router-dom";
import Input from "./../UI/inputs/Input";
import Button from "./../UI/buttons/Button";
import { AppURL } from "../../apis/AppURL";
import axios from "axios";

function SpecialtyForm({ method, specialty }) {
  const data = useActionData();

  return (
    <Fragment>
      <h2>{specialty ? "Modifier une spécialité" : "Ajouter une spécialité"}</h2>
      <Form method={method}>
        {data && data.errors && (
          <ul>
            {Object.values(data.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        <Input
          label="Nom de la spécialité"
          type="text"
          name="specialty_name"
          className="form-control"
          defaultValue={specialty ? specialty.data.specialty_name : ""}
          required
        />
        <Input
          textarea
          label="Description"
          name="specialty_description"
          className="form-control"
          defaultValue={specialty ? specialty.data.specialty_description : ""}
          required
        />
        <div className="actions">
          <Button
            text={
              data && data.state === "submitting"
                ? "En cours..."
                : specialty ? "Modifier" : "Enregistrer"
            }
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

export default SpecialtyForm;


export async function action({ request, params }) {
  const method = request.method;
  const data = await request.formData();

  const specialtyData = {
    specialty_name: data.get("specialty_name"),
    specialty_description: data.get("specialty_description"),
  };

  let url = AppURL.storeSpecialty();

  if (method === "PUT") {
    url = AppURL.updateSpecialty(params.id);
  }

  const response = await fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(specialtyData),
  });

  if (response.status === 422) {
    return response;
  }

  if (!response.ok) {
    throw new Error("Could not save specialty.");
  }

  return redirect("/admin/specialties");
}

export async function loader({ params }) {
  try {
    const response = await axios.get(AppURL.showSpecialty(params.id));
    const specialty = response.data;

    return json({ specialty }, { status: 200 });
  } catch (error) {
    return json(
      {
        specialty: {},
        message:
          "Une erreur est survenue lors de la récupération de la specilalite.",
      },
      { status: 500 }
    );
  }
}
