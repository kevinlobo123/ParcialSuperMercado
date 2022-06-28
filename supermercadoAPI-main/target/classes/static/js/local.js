async function login(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    var settings={
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    }
    const request = await fetch("api/auth/login",settings);
    //console.log(await request.text());
    if(request.ok){
        const respuesta = await request.json();

        localStorage.token = respuesta.detail;

        localStorage.email = jsonData.email;
        location.href= "dashboard.html";
    }
}

async function sendUser(path){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(path, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    myForm.reset();
    console.log(await request.text())
}

async function sendData(path){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(path, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    myForm.reset();
    console.log(await request.text())
}


function listar(){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/productos",settings)
    .then(response => response.json())
    .then(function(data){

        var productos ='';
        for(const producto of data){
          console.log(producto.email)
          productos += '<tr>'+
          '<th scope="row">'+producto.id+'</th>'+
          '<td>'+producto.numeroPro+'</td>'+
          '<td>'+producto.nombre+'</td>'+
          '<td>'+producto.descripProducto+'</td>'+
          '<td>'+producto.valorProducto+'</td>'+
          '<td>'+producto.fechavencProducto+'</td>'+
          '<td>'+
            '<button type="button" class="btn btn-outline-danger" onclick="eliminarProducto(\''+producto.id+'\')"><i class="fa-solid fa-user-minus"></i></button>'+
            '<a href="#" onclick="traerModificarProducto(\''+producto.id+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
            '<a href="#" onclick="verProducto(\''+producto.id+'\')"class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
          '</td>'+
        '</tr>';
         }
         document.getElementById("listar").innerHTML=productos;

    })
}

function traerModificarProducto(id){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/productos/"+id,settings)
    .then(response => response.json())
    .then(function(producto){

        var cadena='';

        if(producto){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-user-pen"></i>Modificar Productos</h1></div>'+
            '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+producto.id+'">'+
                '<label for="numeroPro" class="form-label">numero de producto</label>'+
                '<input type="text" name="numeroPro" class="form-control" id="numeroPro" required value="'+producto.numeroPro+'"> <br>'+
                '<label for="nombre" class="form-label">Nombre</label>'+
                '<input type="text" name="nombre" class="form-control" id="nombre" required value="'+producto.nombre+'"> <br>'+
                '<label for="descripProducto" class="form-label">Descripcion del producto</label>'+
                '<input type="text" name="descripProducto" class="form-control" id="descripProducto" required value="'+producto.descripProducto+'"> <br>'+
                '<label for="valorProducto" class="form-label">Valor de Producto</label>'+
                '<input type="text" name="valorProducto" class="form-control" id="valorProducto" required value="'+producto.valorProducto+'"> <br>'+
                '<label for="fechavencProducto" class="form-label">Fecha vencimiento del producto</label>'+
                '<input type="text" name="fechavencProducto" class="form-control" id="fechavencProducto" required value="'+producto.fechavencProducto+'"> <br>'+
                '<button type="button" class="btn btn-outline-warning" onclick="modificarProducto(\''+producto.id+'\')">Modificar</button>'+
            '</form>';
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
         myModal.toggle();

    })
}

async function modificarProducto(id){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/productos/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha modificado el Producto Exitosamente!", 1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalProducto')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}


function eliminarProducto(id){
    validaToken()
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
        },
    }
    fetch("api/productos/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listar()
        alertas("Se ha Eliminado el producto exitosamente!", 2)
    })
}

async function sendSearch(path){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }

    const request = await fetch(path+"/"+jsonData["id"], {
        method: jsonData["metodo"],
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    console.log(await request.text())
}

function verProducto(id){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/productos/"+id,settings)
    .then(response => response.json())
    .then(function(producto){

        var cadena='';

        if(producto){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-user-pen"></i>Visualizar Productos</h1></div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Codigo del Producto:'+producto.numeroPro+'</li>'+
            '<li class="list-group-item">Nombre: '+producto.nombre+'</li>'+
            '<li class="list-group-item">Valor del Producto: '+producto.descripProducto+'</li>'+
            '<li class="list-group-item">Tipo de Producto: '+producto.valorProducto+'</li>'+
            '<li class="list-group-item">Cantidad: '+producto.fechavencProducto+'</li>'+
            '</ul>'+
            '<br>'
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
         myModal.toggle();

    })
}

function alertas(mensaje,tipo){
    var color="";
    if(tipo == 1 ){//success verde
        color = "success"

    }
    else{//danger rojo
        color = "danger"

    }
    var alerta = '<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">'+
                   '<strong><i class="fa-solid fa-triangle-exclamation"></i></strong>'+
                   mensaje+
                   '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
                 '</div>';
    document.getElementById("datos").innerHTML=alerta;


}

function salir(){
    localStorage.clear();
    location.href = "index.html"
}
function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}
