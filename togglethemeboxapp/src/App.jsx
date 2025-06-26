import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {

  let [theme,setTheme] = useState(localStorage.getItem("theme")||"light");
  function handletheme(){
    if(theme=="light") setTheme("dark")
    else setTheme("light")

    localStorage.setItem("theme",theme);
  }
  return (
    <>
          <h3>
            welcome to my React App
            <button onClick={handletheme}>ToggleTheme</button>
            <ThemedBox theme={theme}>
              <div>
                <h5>Im here</h5>
                <p>lorem 10

                </p>
                <ul>
                  <li>list1</li>
                  <li>list2</li>
                  <li>list3</li>
                  <li>list4</li>
                  <li>list5</li>
                </ul>
              </div>
            </ThemedBox>
            <ThemedBox theme={theme}>
                   <div>
                    <ul>
                      <li>item1</li>
                      <li>item2
                        <div><ThemedBox theme={theme=="light"?"dark":"light"}>
                          <h4>My list inner theme</h4>
                          <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                          </ul>
                          </ThemedBox></div>
                      </li>
                      <li>item3</li>
                      <li>item4</li>
                    </ul>
                   </div>

            </ThemedBox>

          </h3>
    </>
  )
}

function ThemedBox({theme,children}){

 
return(
  <>
  <div style={{backgroundColor:theme=="light"?"gray":"brown",color:theme=="light"?"white":"pink"}}>
    {children}
  </div>
  
  </>
)
    

}

export default App
