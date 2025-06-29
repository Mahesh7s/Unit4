let base = "https://www.omdbapi.com/?apikey=3dc03caf&type=movie";

async function fetchMovie(movie){
	let res = await fetch(`${base}&s=${movie}`);
	let data = await res.json();
	console.log(data)
	return data
}



export default fetchMovie;