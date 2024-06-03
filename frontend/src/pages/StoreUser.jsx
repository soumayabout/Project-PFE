import React from "react";
import Card from "./../components/UI/cards/Card";
import RegisterForm from "../components/auth/RegisterForm";

function StoreUser() {
  return (
    <div>
      <Card>
        <RegisterForm method="POST" />
      </Card>
    </div>
  );
}

export default StoreUser;
