import React from "react";

const ChangeLogInPage = () => {
  return (
    <div>
      <center>
        <h1>Log In As A Restaurant or Customer</h1>
      </center>
      <div class="restaurantLogIn">
        <a href="/reslogin" style={{ fontSize: "30px" }}>
          {" "}
          <p>Log in as a restaurant owner</p>
        </a>
      </div>
      <div class="customerLogIn">
        <a href="/Login" style={{ fontSize: "30px" }}>
          <p>Log in as a customer</p>
        </a>
      </div>
    </div>
  );
};
export default ChangeLogInPage;
