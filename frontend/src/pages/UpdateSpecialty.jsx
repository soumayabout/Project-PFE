import React from "react";
import SpecialtyForm from "./../components/specialty/SpecialtyForm";
import Card from "./../components/UI/cards/Card";
import { useLoaderData } from "react-router-dom";

function UpdateSpecialty() {
  const data = useLoaderData();
  console.log(data);
  return (
    <div>
      <Card>
        <SpecialtyForm method="PUT" specialty={data.specialty} />
      </Card>
    </div>
  );
}

export default UpdateSpecialty;
