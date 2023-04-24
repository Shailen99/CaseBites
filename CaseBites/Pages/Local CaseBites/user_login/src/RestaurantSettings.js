import React, { useEffect, useState } from "react";

const RestaurantSettings = () => {
  return (
    <>
      {" "}
      <center>
        <h1>Edit Your Settings</h1>
      </center>
      <div class="settingsForm"></div>
      <h2>Edit Settings</h2>
      <form>
        <label for="WorkingHours">Working Hours:</label>
        <input type="text" name="workingHours"></input>
        <label for="PopularItems">Popular Items</label>
        <input type="text" name="PopularItems"></input>
        <label for="transactionType">Change Transaction Types</label>
        <input type="text" name="transactionType"></input>
        <label for="phoneNum">Change Phone Number</label>
        <input type="text" name="phoneNum"></input>
        <label for="email">Change Email</label>
        <input type="text" name="email"></input>
        <button name="submit"></button>
      </form>
    </>
  );
};
export default RestaurantSettings;
