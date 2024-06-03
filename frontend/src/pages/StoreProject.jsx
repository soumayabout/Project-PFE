import React from "react";
import Card from "../components/UI/cards/Card";
import ProjectForm from "../components/project/ProjectForm";

function StoreProject() {
  return (
    <div>
      <Card>
        <ProjectForm method="POST" />
      </Card>
    </div>
  );
}

export default StoreProject;
