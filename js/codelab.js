const API_URL = "https://codelabsserver-production.up.railway.app"
const LOCAL_HOST_URL = "http://localhost:3000"
const codelab = document.getElementById('codelab')
const contenido = document.getElementById('contenido')

var queryString = window.location.search;
var searchParams = new URLSearchParams(queryString);
var nombre = searchParams.get('nombre');

let listaContenido = []
let pagina = 1

console.log(listaContenido,pagina)

const getCodelabByName = ()=>{
    console.log("conecta",nombre)
    fetch(`${API_URL}/codelabs/buscar/${nombre}`)
        .then(async(resp) => {
            const response = await resp.json()
            if(resp.ok){
                contenido.innerHTML = contenidoComponent({content:response.data[0]})
                codelab.innerHTML = codelabComponet({content:response.data[pagina]})
            }  
        }).catch(error => 
            codelab.innerHTML = 
                `<p>Ha ocurrido un error ${error}</p>`    
        )
  }

//getCodelabByName()

const renderizar = ()=>{
    if(listaContenido.length === 0 ){
        console.log("conecta",nombre)
        fetch(`${API_URL}/codelabs/buscar/${nombre}`)
            .then(async(resp) => {
                const response = await resp.json()
                if(resp.ok){
                    listaContenido = [...response.data]
                    contenido.innerHTML = contenidoComponent({content:response.data[0]})
                    codelab.innerHTML = codelabComponet({content:response.data[pagina]})
                }  
            }).catch(error => 
                codelab.innerHTML = 
                    `<p>Ha ocurrido un error ${error}</p>`    
        )
    }
    codelab.innerHTML = listaContenido[pagina]
}

renderizar()
const setPagina = (pg=1)=>{
    pagina = pg
    renderizar()
}

const siguiente = ()=>{
    if(listaContenido.length-1 > pagina) {
        pagina +=1
        renderizar() 
    }
    console.log(listaContenido,pagina)
    
}
const anterior =()=>{
    if(pagina > 1) {
        pagina -=1
        renderizar()
    }
    console.log(listaContenido,pagina)
    
 
}
const codelabComponet = ({content=""})=>{
    return `<div class="d-flex flex-column">
        ${content}
    </div>`
}

const contenidoComponent = ({content=""})=>{
    const string = content
    // Buscar el inicio y el fin del contenido de la lista
    var inicio = string.indexOf("<h1 id=\"contenido\">Contenido:</h1>") + "<h1 id=\"contenido\">Contenido:</h1>".length;
    var fin = string.indexOf("</p>", inicio);

    var contenidoLista = string.substring(inicio, fin);

    var elementosLista = contenidoLista.replace("-", "").split("\n");

    var listaHTML = "<ul class='list-group'>";
    elementosLista.forEach(function(elemento) {
      if (elemento.trim() !== "") {
        listaHTML += "<li class='list-group-item'>" + elemento.trim() + "</li>";
      }
    });
    listaHTML += "</ul>";

    return listaHTML
}