import React from "react";
import SpecialtyForm from "../components/specialty/SpecialtyForm";
import Card from "../components/UI/cards/Card";

function StoreSpecialty() {
  return (
    <div>
      <Card>
        <SpecialtyForm method="POST" />
      </Card>
    </div>
  );
}

export default StoreSpecialty;
