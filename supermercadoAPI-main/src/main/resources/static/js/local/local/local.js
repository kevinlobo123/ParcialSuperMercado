//funciones propias de la app
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
   // const request = await fetch("api/auth/login",settings);
    //console.log(await request.text());
   // if(request.ok){
     //   location.href= "dashboard.html";
   // }
//}

function listar(){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/produtos",settings)
    .then(response => response.json())
    .then(function(data){
        
        //if(data.lenght>0){
            var productos = '';
            for(const producto of data){
                console.log(usuario.numeroPro)
                usuarios += '<tr>'+
                '<th scope="row">'+producto.id+'</th>'+
                '<td>'+usuario.numeroPro+'</td>'+
                '<td>'+usuario.nombre+'</td>'+
                '<td>'+usuario.descripProducto+'</td>'+
                '<td>'+usuario.valorProducto+'</td>'+
                '<td>'+usuario.fechavencProducto+'</td>'+
                '<td>'+
                  '<button type="button" class="btn btn-outline-danger" onclick="eliminaUsuario(\''+producto.id+'\')"><i class="fa-solid fa-user-minus"></i></button>'+
                  '<a href="#" onclick="verModificarUsuario(\''+producto.id+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
                  '<a href="#" onclick="verUsuario(\''+producto.id+'\')" class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
                '</td>'+
              '</tr>';
            }
            document.getElementById("listar").innerHTML = productos;
        //}
    })
}



async function sendData(path){
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

function eliminaProducto(id){
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/productos/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listar();
        alertas("Se ha eliminado el producto exitosamente!",2)
    })
}

function verModificarProducto(id){
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
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Modificar Producto</h1>'+
                '</div>'+
              
              '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+producto.id+'">'+
                '<label for="numeroPro" class="form-label">Numero Producto</label>'+
                '<input type="text" class="form-control" name="numeroPro" id="numeroPro" required value="'+producto.numeroPro+'"> <br>'+
                '<label for="nombre"  class="form-label">nombre</label>'+
                '<input type="text" class="form-control" name="nombre" id="nombre" required value="'+producto.nombre+'"> <br>'+
                '<label for="descripProducto" class="form-label">Descripcion Producto</label>'+
                '<input type="descripProducto" class="form-control" name="descripProducto" id="descripProducto" required value="'+producto.descripProducto+'"> <br>'+
                '<label for="valorProducto" class="form-label">Valor Producto</label>'+
                '<input type="valorProducto" class="form-control" name="valorProducto" id="valorProducto" required value="'+producto.valorProducto+'"> <br>'+
                '<label for="fechavencProducto" class="form-label">Fecha vencimiento del producto</label>'+
                '<input type="fechavencProducto" class="form-control" name="Fecha Producto" id="fechavencProducto" required value="'+producto.fechavencProducto+'"> <br>'+
                '<button type="button" class="btn btn-outline-warning" onclick="modificarProducto(\''+producto.id+'\')">Modificar</button>'+
            '</form>';
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
            myModal.toggle();
    })
}

async function modificarProducto(id){
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
    alertas("Se ha modificado el producto exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalProducto')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verProducto(id){
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
                cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Producto</h1>'+
                '</div>'+
                '<ul class="list-group">'+
                '<li class="list-group-item">Numero Producto: '+producto.numeroPro+'</li>'+
                '<li class="list-group-item">nombre: '+producto.nombre+'</li>'+
                '<li class="list-group-item">descripProducto: '+producto.descripProducto+'</li>'+
                '<li class="list-group-item">valorProducto: '+producto.valorProducto+'</li>'+
                '<li class="list-group-item">fechavencProducto: '+producto.fechavencProducto+'</li>'+
                '</ul>';
              
            }
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
            myModal.toggle();
    })
}

function alertas(mensaje,tipo){
    var color ="";
    if(tipo == 1){//success verde
        color="success"
    }
    else{//danger rojo
        color = "danger"
    }
    var alerta ='<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">'+
                    '<strong><i class="fa-solid fa-triangle-exclamation"></i></strong>' +
                    mensaje+
                    '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
                '</div>';
    document.getElementById("datos").innerHTML = alerta;
}

function registerForm(){
    cadena = '<div class="p-3 mb-2 bg-light text-dark">'+
                '<h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Registrar Producto</h1>'+
                '</div>'+
              
              '<form action="" method="post" id="myForm">'+
                              '<input type="hidden" name="id" id="id" value="'+producto.id+'">'+
                              '<label for="numeroPro" class="form-label">Numero Producto</label>'+
                              '<input type="text" class="form-control" name="numeroPro" id="numeroPro" required value="'+producto.numeroPro+'"> <br>'+
                              '<label for="nombre"  class="form-label">nombre</label>'+
                              '<input type="text" class="form-control" name="nombre" id="nombre" required value="'+producto.nombre+'"> <br>'+
                              '<label for="descripProducto" class="form-label">Descripcion Producto</label>'+
                              '<input type="descripProducto" class="form-control" name="descripProducto" id="descripProducto" required value="'+producto.descripProducto+'"> <br>'+
                              '<label for="valorProducto" class="form-label">Valor Producto</label>'+
                              '<input type="valorProducto" class="form-control" name="valorProducto" id="valorProducto" required value="'+producto.valorProducto+'"> <br>'+
                              '<label for="fechavencProducto" class="form-label">Fecha vencimiento del producto</label>'+
                              '<input type="fechavencProducto" class="form-control" name="Fecha Producto" id="fechavencProducto" required value="'+producto.fechavencProducto+'"> <br>'+
                              '<button type="button" class="btn btn-outline-warning" onclick="modificarProducto(\''+producto.id+'\')">Modificar</button>'+
                          '</form>';
            document.getElementById("contentModal").innerHTML = cadena;
            var myModal = new bootstrap.Modal(document.getElementById('modalProducto'))
            myModal.toggle();
}

async function registrarProducto(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/productos", {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha registrado el producto exitosamente!",1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalProducto')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function modalConfirmacion(texto,funcion){
    document.getElementById("contenidoConfirmacion").innerHTML = texto;
    var myModal = new bootstrap.Modal(document.getElementById('modalConfirmacion'))
    myModal.toggle();
    var confirmar = document.getElementById("confirmar");
    confirmar.onclick = funcion;
}