window.addEventListener('offline', event =>{
    console.log('usuario esta desconectado', event);
});


window.addEventListener('online', event =>{
    console.log('usuario esta conectado!! ALEGRIA!', event);
});

if( !navigator.onLine ){
    console.log('estoy sin conexion pero en el momento de carga!!');
}



if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../sw.js').then((message)=> {
        console.log('Service Worker esta listo!!!');
    });
} else {
    console.log('Service Worker no esta soportado en este browser');
}


function verPelicula(name){ // Llamado para armar el modal de las peliculas.
        {   
            fetch(`https://www.omdbapi.com/?t=${name}&apikey=${APIKEY}`)
            .then(resp=>{
                return resp.json();
            })
            .then(json=>{
                console.log(json)
              document.getElementById('imgModal').src = json.Poster;
              document.getElementById('tituloModal').innerText = json.Title;
              document.getElementById('writerModal').innerText = json.Writer;   
              document.getElementById('yearModal').innerText = json.Year;
              document.getElementById('actorsModal').innerText = json.Actors;
              document.getElementById('descripcionModal').innerText = json.Plot;   
              document.getElementById('directorModal').innerText = json.Director;
   
            })
            .catch(err=> {console.log(`Error: ${err}`)})
            .finally(ok=>{
                console.log(`Succes`);
            })
        }
}


function limpiarModal(){ // Limpiamos la modal del detalle de las peliculas
                document.getElementById('tituloModal').innerText = "";
                document.getElementById('descripcionModal').innerText = "";
                document.getElementById('imgModal').src = "";
                document.getElementById('writerModal').innerText = "";
                document.getElementById('yearModal').innerText = "";
                document.getElementById('actorsModal').innerText = "";
                document.getElementById('directorModal').innerText = "";
            }


function movieFav(name){ // Agregamos a peliculas favoritas.
    let existe = false;
    if(arrayFav.length > 0)
    {
        for (const i in arrayFav) {
            if(arrayFav[i] == name)
            {
                arrayFav.splice(i, 1);
                existe = true;
            }
        }

        if(!existe)
        {
        arrayFav.push(name)
        }
    }
    else
    {   
        arrayFav.push(name)
    }
}

function llenarModal(){ // Llenamos la modal de favoritos
 
    let cont = document.getElementById('peliFav');
    let html;

    cont.innerHTML = "";
    if(arrayFav.length > 0)
    {    document.getElementById('noFavs').innerText = "";
         for (const i in arrayFav) {
            html += `
            <label class="list-group-item py-3 pe-5">
                          <div class="col-xs-12 my-2">
                            <i class="fa-solid fa-trash float-end text-pink" onclick="borrarFav('${arrayFav[i]}')"></i>
                            <p id="favNombre" class="text-pink">${arrayFav[i]}</p>
                          </div>
                          </label>`
            // document.getElementById('favPoster').src = ;
            // document.getElementById('favNombre').innerText = arrayFav[i].name;
        }

        cont.innerHTML = html;
    }
    else
    {
        document.getElementById('noFavs').innerText = 'No hay favoritos aun.';
    }
}

function borrarFav(name){
 
        for (const i in arrayFav) {
            if(arrayFav[i] == name)
            {
                arrayFav.splice(i, 1);
                llenarModal();
            }
        }
}

function limpiarHome(){
    document.getElementById('contenedor-pelis').innerHTML = "";
}