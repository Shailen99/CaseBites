import React from "react";
import "./Register.css";

const ChangeLogInPage = () => {
  return (

    <div className="register">
          <form className="register-form">

        <h1 className="register-heading">Log In As A Restaurant or Customer</h1>
      <div class="restaurantLogIn">
        <a href="/reslogin">
          <button className="register-button" type="submit">Log In as Restaurant</button>
        </a>
      </div>
      <div class="customerLogIn">
        <a href="/login">
        <button className="register-button" type="submit">Log In as Customer</button>
        </a>
      </div>
      </form>

    </div>
  );
};
export default ChangeLogInPage;
