import React from "react";
import Card from "../components/UI/cards/Card";
import ProjectForm from "../components/project/ProjectForm";
import { useLoaderData } from "react-router-dom";

function UpdateProject() {
  const data = useLoaderData();
  return (
    <div>
      <Card>
        <ProjectForm method="put" project={data.project} />
      </Card>
    </div>
  );
}

export default UpdateProject;
