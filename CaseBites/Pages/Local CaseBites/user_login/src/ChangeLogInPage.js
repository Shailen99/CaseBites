import React from "react";

const ChangeLogInPage = () => {
  return (
    <div>
      <center>
        <h1 style={{ fontSize: "50px" }}>Log In As A Restaurant or Customer</h1>
      </center>
      <div style={{ alignContent: "left", float: "left", marginLeft: "50px" }}>
        <div class="restaurantLogIn">
          <a href="/reslogin" style={{ fontSize: "30px" }}>
            {" "}
            <p>Log in as a Restaurant Owner</p>
            <img
              src="https://live.staticflickr.com/65535/51061371327_605731f843_b.jpg"
              alt="..."
              width="775px"
            />
          </a>
        </div>
      </div>
      <div style={{ marginTop: "60px" }}>
        <div class="customerLogIn">
          <a href="/Login" style={{ fontSize: "30px" }}>
            <p>Log in as a Customer</p>
            <img
              src="https://assets.bonappetit.com/photos/610aa6ddc50e2f9f7c42f7f8/16:9/w_2560%2Cc_limit/Savage-2019-top-50-busy-restaurant.jpg"
              alt="..."
              width="750px"
              height="520px"
            />
          </a>
        </div>
      </div>
    </div>
  );
};
export default ChangeLogInPage;
