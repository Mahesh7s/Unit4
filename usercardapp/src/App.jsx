import { useState } from 'react'

import './App.css'
import ProfileCard from './ProficeCard'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div style={{display:"flex", gap:"20px"}}>
      <ProfileCard/>
      <ProfileCard  name="Mahesh" age={19} bio="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Atque nemo mollitia labore molestiae deserunt! Nostrum sunt facilis ex dolores iste aliquam est similique amet. Expedita iure velit commodi quam blanditiis dignissimos mollitia placeat nemo quasi dolor, quae nobis. Commodi odit sit, voluptatibus maiores accusamus alias ea adipisci possimus eos tempore ducimus molestiae cumque, obcaecati est expedita in, assumenda dicta ex unde enim quas deleniti. Ad ratione possimus incidunt animi, suscipit perspiciatis, beatae eius, porro pariatur maiores placeat deleniti odit ducimus in velit veniam delectus atque dolorem officia eos ex facere tempore laudantium? Molestiae consectetur aliquid eaque delectus nisi. Id, dicta.
"/>
</div>
    </>
  )
}

export default App