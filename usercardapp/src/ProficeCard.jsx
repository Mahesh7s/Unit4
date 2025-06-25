import { useState } from "react";
import React from "react";
export default function ProfileCard({name="Default age",age="17",bio="Defalut bio with behaviour"}){
    return(
		<>

		<div style={{border:"2px solid", width:"30%", height:"500px", boxSizing: 'border-box', wordBreak:"break-word", padding:"10px"}}>
			<div><h4>Name:{name}</h4>
			<p><b>Age:{age}</b></p>

			<div><b>Bio:</b>< Bio bio={bio}/></div>
			</div>
		</div>
		</>
	)


}

function Bio({bio}){
	let [full,setFull] = useState(false);

	  const toggleBio = () => setFull((prev) => !prev);


	function displayText(){
		if(bio.length==0) return "";
		if(full || bio.length<=0) return bio;
		return bio.slice(0,30)+" ...";
	}


	return(
		<p>
            {displayText()}{" "}
      {bio.length > 100 && (
        <span
          style={{ color: "blue", cursor: "pointer", textDecoration: "underline" }}
          onClick={toggleBio}
        >
          {full ? "Read Less" : "Read More"}
        </span>
      )}
    </p>
	)
}