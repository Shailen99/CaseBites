import React, { useEffect, useState } from "react";

const changeLogInPage = () => {
  return (
    <div>
      <center>
        <h1>Log In As A Restaurant or Customer</h1>
      </center>
      <div class="restaurantLogIn">
       <a href = "./"> <p>Log in as restaurant</p></a>
      </div>
      <div class="customerLogIn">
      <a href = "/Login"><p>Log in as customer</p></a>
      </div>
    </div>
  );
};
export default changeLogInPage;
