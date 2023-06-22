const form = document.querySelector('#miFormulario');
const API_URL = "https://codelabsserver-production.up.railway.app"

form.addEventListener('submit', (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('file', form.elements.file.files[0]);
  
    fetch(`${API_URL}/codelabs/publicar`, {
      method: 'POST',
      
      body: formData
    })
    .then(async (response) => {
      const resp = await response.json()
      if (response.ok) {
          console.log('Archivo ZIP con Markdown enviado correctamente');
          alert("Ok")
          
      } else {
        console.log('Error al enviar el archivo ZIP con Markdown');
       
        console.log(JSON.parse(resp.message))
        alert("No ok :(")
      }
    })
    .catch(error => {
      console.log('Error en la solicitud: ', error);
    });
  });


  /**
   * headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
   */