var contraste = () => {
    //En esta función se esta haciendo que al momento de apretar 
    //el boton contraste se cambie el color de fondo de la pagina y los valores [0,1]
    let btn = document.getElementById('btnContraste')
    
    
    if(btn.value == '0'){
        let elements = document.getElementsByClassName('blanco')
        elements[0].classList.add('negro')
        elements[0].classList.remove('blanco')
        btn.value = '1';

    }
    
    else if(btn.value == '1'){
        let elements = document.getElementsByClassName('negro')
        elements[0].classList.add('blanco')
        elements[0].classList.remove('negro')
        btn.value = '0';
    }
}

var fuente = () => {
    //En esta función se esta haciendo que al momento de apretar el boton fuente 
    //cambie el tamaño de fuente a lo que se haya aplicado la clase en el HTML
    let btn = document.getElementById('btnFuente')
    
    if(btn.value == '0'){
        let elements = document.getElementsByClassName("small-letras")
        //Se guarda el largo del elemento en una variable
        const largo = elements.length;
        for (let i = 0; i < largo; i++){
            const element = elements[0]
            //Se reemplaza del elemento la clase small-letras por medium-letras
            element.classList.replace('small-letras','medium-letras')
        }
        btn.value = '1';
    }
    
    else if(btn.value == "1"){
        let elements = document.getElementsByClassName("medium-letras");
        const largo = elements.length;
        for (let i = 0; i < largo; i++){
            const element = elements[0]
            //Se reemplaza del elemento la clase medium-letras por large-letras
            element.classList.replace('medium-letras','large-letras')
        }
        btn.value = "2";
    }
    
    else if(btn.value == "2"){
        let elements = document.getElementsByClassName("large-letras")
        const largo = elements.length;
        for (let i = 0; i < largo; i++){
            const element = elements[0]
            //Se reemplaza del elemento la clase large-letras por small-letras
            element.classList.replace('large-letras','small-letras')
        }
        btn.value = "0"
    }
}



var modificar = (listadoNuevo) => {
    //Recupera los id del formulario y los guarda en variables para despues recuperarlas al momento de hacer click al boton editar
    let enombre = document.getElementById("nombre");
    let eapellido = document.getElementById("apellido");
    let ecorreo = document.getElementById("email");
    //let econtrasena = document.getElementById("password");
    let egenero = document.getElementById("genero");
    let etelefono = document.getElementById("phone");
    let eFechaNacimiento = document.getElementById("birthdaytime");
    let eBtnEditarUp = document.getElementById('btnEditar');
            
    let nombre = enombre.value;
    let apellido = eapellido.value;
    let correo = ecorreo.value;
    //let contra = econtrasena.value;
    let genero = egenero.value;
    let telefono = etelefono.value;
    let FechaNacimiento = eFechaNacimiento.value;
    let indice = eBtnEditarUp.value;
    
    //Guarda cada variable con su valor en ListadoNuevo por indice
    listadoNuevo[indice].nombre = nombre;
    listadoNuevo[indice].apellido = apellido;
    listadoNuevo[indice].correo = correo;
    //listadoNuevo[indice].contrasena = contra;
    listadoNuevo[indice].genero = genero;
    listadoNuevo[indice].telefono = telefono;
    listadoNuevo[indice].FechadeNacimiento = FechaNacimiento;
    //Se asigna el item personas, se transforma el listadoNuevo de lista a JSON [clave:valor]
    localStorage.setItem('personas',JSON.stringify(listadoNuevo));
    //Cargar la tabla de nuevo
    cargarTabla(listadoNuevo)
}

//Funcion Eliminar, Tiene como parametro listadoNuevo
var eliminar = (listadoNuevo)=>{
    //Recupera la id del boton eliminar y las guarda en una variable
    let eBtnEliminarUp = document.getElementById('btnEliminar');
    //Recupera el valor del boton eliminar y los guarda en la variable indice
    let indice = eBtnEliminarUp.value;
    console.log(listadoNuevo)
    //Filtra por indice al momento de recuperar datos al formulario
    lista = listadoNuevo.filter((p)=>p.id!=indice)
    lista = lista.map((p,index)=>{return {...p,'id':index}})
    
    console.log(lista)
    localStorage.setItem('personas',JSON.stringify(lista));
    cargarTabla(lista)
    //Hay veces que al momento de apretar el boton eliminar no me los elimina, 
    //pero al apretarlo de nuevo los elimina de la tabla-
}

var cargarTabla = (listadoNuevo) => {
    //Recupera los id del formulario y los guarda en variables 
    let eContenedorTabla = document.getElementById("contenedorTabla");
    let enombre = document.getElementById("nombre");
    let eapellido = document.getElementById("apellido");
    let ecorreo = document.getElementById("email");
    //let econtrasena = document.getElementById("password");
    let egenero = document.getElementById("genero");
    let etelefono = document.getElementById("phone");
    let eFechaNacimiento = document.getElementById("birthdaytime");
    //Carga Tabla con formato HTML
    render = "<table>"
    render += "<tr>"
    render += "<th>Nombre</th>"
    render += "<th>Apellido</th>"
    render += "<th>Correo</th>"
   // render += "<th>Contraseña</th>"
    render += "<th>Genero</th>"
    render += "<th>Telefono</th>"
    render += "<th>Fecha de Nacimiento</th>"
    render += "<th>Acciones</th>"
    render += "</tr>"
    for (let i= 0; i < listadoNuevo.length; i++){
        const element = listadoNuevo[i];
        render += "<tr>"
        render += "<td>"+element.nombre+"</td>"
        render += "<td>"+element.apellido+"</td>"
        render += "<td>"+element.correo+"</td>"
       // render += "<td>"+element.contrasena+"</td>"
        render += "<td>"+element.genero+"</td>"
        render += "<td>"+element.telefono+"</td>"
        render += "<td>"+element.FechadeNacimiento+"</td>"
        render += "<td>"
        render += "<button id='btnEditar"+i+"'>Editar</button>"
        render += "<button id='btnEliminar"+i+"'>Eliminar</button>"
        render += "</td>"
        render += "</tr>"
    }
    render += "</table>";
    eContenedorTabla.innerHTML = render;
    for (let i = 0; i < listadoNuevo.length; i++) {
        var eBtn = document.getElementById("btnEditar"+i);
        var eBtn2 = document.getElementById("btnEliminar"+i);
        let element = listadoNuevo[i]
        eBtn.addEventListener("click",()=>{
            //Guarda el valor de cada variable en otra
            enombre.value = element.nombre;
            eapellido.value = element.apellido;
            ecorreo.value = element.correo;
           // econtrasena.value = element.contrasena;
            egenero.value = element.genero;
            etelefono.value = element.telefono;
            eFechaNacimiento.value = element.FechadeNacimiento;
            
            let sEditar = "<button type='button' id='btnEditar' value='"+i+"'>Editar</button>";
            //Está recuperando el contenedorBtnExtra y la esta guardando en una variable
            let contenedorBoton = document.getElementById('contenedorBtnExtra');
            contenedorBoton.innerHTML = sEditar;
             //Está recuperando el btnEditar y la esta guardando en una variable
            let eBtnEditarUp = document.getElementById('btnEditar');
            //En esta parte se le esta añadiendo un evento en donde apretar el boton de eliminar 
            //se ejecuta la funcion modificar con el parametro lista=listadoNuevo
            eBtnEditarUp.addEventListener('click',()=>modificar(listadoNuevo))
        })
        eBtn2.addEventListener("click",()=>{
            //
            enombre.value = element.nombre;
            eapellido.value = element.apellido;
            ecorreo.value = element.correo;
            //econtrasena.value = element.contrasena;
            egenero.value = element.genero;
            etelefono.value = element.telefono;
            eFechaNacimiento.value = element.FechadeNacimiento;
            // Obtener la fecha actual
            var fecha = new Date();

            // Se recuperan cada datos de la fecha
            var dia = fecha.getDate();
            var mes = fecha.getMonth() + 1; // Los meses comienzan en 0, por lo que se suma 1
            var anio = fecha.getFullYear();

            
            var fechaFormateada = anio + '-' + ('0' + mes).slice(-2) + '-' + ('0' + dia).slice(-2);

            console.log(fechaFormateada); // Salida: "yyyy-mm-dd"
    
            let sEliminar = "<button type='button' id='btnEliminar' value='"+i+"'>Eliminar</button>";
            let contenedorBoton = document.getElementById('contenedorBtnExtra');
            contenedorBoton.innerHTML = sEliminar;
            let eBtnEliminarUp = document.getElementById('btnEliminar');
            //En esta parte se le esta añadiendo un evento en donde apretar el boton de eliminar 
            //se ejecuta la funcion eliminar con el parametro lista=listadoNuevo
            eBtnEliminarUp.addEventListener('click',()=>eliminar(listadoNuevo))
       
        }) 
    }
}

var registrar = () => {
    //En la Funcion se es guardando las variables del formulario el cual esta en el HTML
    let enombre = document.getElementById("nombre");
    let eapellido = document.getElementById("apellido");
    let ecorreo = document.getElementById("email");
    //let econtrasena = document.getElementById("password");
    let egenero = document.getElementById("genero");
    let etelefono = document.getElementById("phone");
    let eFechaNacimiento = document.getElementById("birthdaytime");
    //console.log(econtrasena)
    let nombre = enombre.value;
    let apellido = eapellido.value;
    let correo = ecorreo.value;
    //let contra = econtrasena.value;
    let genero = egenero.value;
    let telefono = etelefono.value;
    let FechaNacimiento = eFechaNacimiento.value;
    //console.log(contra)
    console.log(FechaNacimiento)
    
    // En esta variable se guardan todos los datos del formulario en una lista
    let persona = {"nombre":nombre, "apellido":apellido, "correo":correo, "genero":genero, "telefono": telefono, "FechadeNacimiento":FechaNacimiento}
    
    //En esta seccion hay una lista la cual recupera el item personas del localstorage
    let listadoPersonas=localStorage.getItem("personas");
    //
    let listadoAntiguo= JSON.parse(listadoPersonas);
    if(listadoAntiguo==null){
        listadoNuevo =[persona]
    }else{
        listadoNuevo = [...listadoAntiguo,persona]
    }
    //
    console.log(persona)
    console.log(listadoAntiguo)
    console.log(listadoNuevo)
    localStorage.setItem("personas",JSON.stringify(listadoNuevo));
    //TABLA
    cargarTabla(listadoNuevo)
    //
    }

var cargarDatos = () => {
    //En esta seccion hay una lista la cual recupera el item personas del localstorage
    let listadoPersonas = localStorage.getItem("personas");
    let listadoAntiguo = JSON.parse(listadoPersonas);
    cargarTabla(listadoAntiguo)
}
//En esta parte permite que los botones al hacer click en ellos suceda algo, y se cargen los Datos
//del formulario con la Tabla
document.getElementById("btn").addEventListener("click",registrar);
addEventListener("load", cargarDatos)
document.getElementById('btnContraste').addEventListener('click', contraste)
document.getElementById('btnFuente').addEventListener('click', fuente)