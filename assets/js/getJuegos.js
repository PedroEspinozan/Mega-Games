export const getJuegos = async() => {
	try {
		const response = await fetch("https://jueguitos-api.onrender.com/");
		const data = await response.json();

		return data.jueguitos;
	} catch(error) {
		console.log(`El error es: ${error}`);
	}
}