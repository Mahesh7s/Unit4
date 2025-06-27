import React, { createContext, useContext, useState } from "react";

export let ThemeContext = createContext();

export default function Theme({children}){

let [theme,setTheme] = useState("light")

function toggleTheme(){
	if(theme=="light"){
		setTheme("dark")
	}else{
		setTheme("light")
	}
}
return(
	<ThemeContext.Provider value={{theme,toggleTheme}}>
		{children}
	</ThemeContext.Provider>
)


}

