const API_URL = "https://codelabsserver-production.up.railway.app"
const LOCAL_HOST_URL = "http://localhost:3000"
const codelab = document.getElementById('codelab')

// Obtener la cadena de consulta de la URL actual
var queryString = window.location.search;

// Crear un objeto URLSearchParams a partir de la cadena de consulta
var searchParams = new URLSearchParams(queryString);

// Obtener el valor del parámetro "name"
var nombre = searchParams.get('nombre');

const getCodelabByName = ()=>{
    fetch(`${API_URL}/codelabs/buscar${nombre}`)
        .then(async(resp) => {
            const response = await resp.json()
            if(resp.ok)
                codelab.innerHTML = response.data
        }).catch(error => 
            codelab.innerHTML = 
                `<p>Ha ocurrido un error ${error}</p>`    
        )
  }
