import React from "react"
import { useContext } from "react";
import { UserContext } from "./Context";

export default function ProfileContext(){


	const { user } = useContext(UserContext);



  return (
    <div>
      <h2>👤 Profile Page</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}


