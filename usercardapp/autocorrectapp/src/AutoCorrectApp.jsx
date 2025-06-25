import React, { useState } from "react";


function CorrectedText({text,corrections}){
	
	let words=text.split(" ");
	let count=0;
    let cwords = words.map(word=>{
		let lower = word.toLowerCase();
		if(corrections[lower]){
			count++
			return corrections[lower];
		}
		return word;
	})
	return(
		<>
		  <div>
      <p><strong>Corrected Text:</strong> {cwords.join(" ")}</p>
      <p><strong>Words Corrected:</strong> {count}</p>
    </div>
		</>
	)
}






function Autocorrect(){
	let[inputText,swtInputText] = React.useState("");
	// let[allin,setall]=React.useState([])
	// function display(){
    //       setall([...allin,inputText]);
	// 	  swtInputText("")
	// }
	 const corrections = {
    "teh": "the",
    "recieve": "receive",
    "adress": "address",
    "wierd": "weird",
    "thier": "their"
  };

	return(
		<>
		<h2>AutoCorrect App</h2>
		<input type="text"   name="msg" placeholder="Enter the text"value={inputText} onChange={(e)=>swtInputText(e.target.value)} />
		<CorrectedText text={inputText} corrections={corrections} />
		
		</>
	)
}

export default Autocorrect
















// function CorrectedText({ text, corrections }) {
//   const words = text.split(" ");
//   let correctionCount = 0;

//   const correctedWords = words.map(word => {
//     const lowerWord = word.toLowerCase();
//     if (corrections[lowerWord]) {
//       correctionCount++;
//       return corrections[lowerWord];
//     }
//     return word;
//   });

//   return (
//     <div>
//       <p><strong>Corrected Text:</strong> {correctedWords.join(" ")}</p>
//       <p><strong>Words Corrected:</strong> {correctionCount}</p>
//     </div>
//   );
// }

// // ✅ Main Component: AutoCorrectApp
// function AutoCorrectApp() {
//   const [inputText, setInputText] = React.useState("");

//   const corrections = {
//     "teh": "the",
//     "recieve": "receive",
//     "adress": "address",
//     "wierd": "weird",
//     "thier": "their"
//   };

//   return (
//     <div style={{ padding: '20px', fontFamily: 'Arial' }}>
//       <h2>AutoCorrect App</h2>
//       <input
//         type="text"
//         value={inputText}
//         onChange={(e) => setInputText(e.target.value)}
//         placeholder="Type here..."
//         style={{ width: '100%', padding: '8px', fontSize: '16px' }}
//       />
//       <CorrectedText text={inputText} corrections={corrections} />
//     </div>
//   );
// }

//export default AutoCorrectApp;