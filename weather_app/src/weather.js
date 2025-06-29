//code to fetch Data from waether aPI

let myAPIKey= `d28da8a3a94bad9ac0f7c263028ee4a9`
let baseURL = `https://api.openweathermap.org/data/2.5/`

 export default async function fetchWeather(city){

	let res = await fetch(`${baseURL}/weather?q=${city}&appid=${myAPIKey}`)
	let data = await res.json()
	return data

}
