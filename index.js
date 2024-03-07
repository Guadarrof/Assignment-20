const userName= document.getElementById("nameForm");
const nameError = document.getElementById("nameError");
const email = document.getElementById("emailForm");
const emailError= document.getElementById("emailError");
const password= document.getElementById("passForm");
const passwordError= document.getElementById("passError");
const btnAddUser= document.getElementById("btnAddUser");
var userListTarget = document.getElementById("tableBody");


//Funciones para validar

function testStrings(strg){
    const regexp = new RegExp (/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ0-9\s.,]+$/);
    return (regexp.test(strg));
}

function inputLength(input, minLength, maxLength){
    if (input.length < minLength || input.length > maxLength){
        return false;
    }else{
        return true;
    }
}

function requiredInput(strg){
    if (strg.trim() ===''){
        return false;
    }else{
        return true;
    }
}

function mostrarMensajeError(htmlElementMsg, msg)
{
    htmlElementMsg.innerText = msg;
    htmlElementMsg.style.backgroundColor= "#ff7f5026";
    htmlElementMsg.style.display = "block";
    validUser = false;
}

function limpiarMensajeError(htmlElementMsg)
{
    htmlElementMsg.innerText = "";
    htmlElementMsg.style.display = "none";
}


//Validate Username

function validateName(strg){
    if (requiredInput(strg)){
        if(testStrings(strg)){        
            if(inputLength(userName.value, 2, 50)){ 
                limpiarMensajeError(nameError);  
            } else {
                let mensaje="Este campo requiere entre 2 y 50 caracteres.";
                mostrarMensajeError(nameError,mensaje);
            }
        }
        else{
            let mensaje="El siguiente campo requiere algunos caracteres alfabeticos.";
            mostrarMensajeError(nameError,mensaje);
        }
    }else{   
        let mensaje="Este campo es Obligatorio.";
        mostrarMensajeError(nameError,mensaje);  
    }
}

//Validate email

function testEmail(mail){
    const regexp = new RegExp ("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$");
    return (regexp.test(mail));
}

function validateEmail(mail){
    if (requiredInput(mail)){
        if(testEmail(mail)){
            limpiarMensajeError(emailError);
        }else{
            let mensaje="El siguiente campo debe ser completado en formato de email";
            mostrarMensajeError(emailError,mensaje);        
        }
    }else{
        let mensaje="Este campo es Obligatorio.";
        mostrarMensajeError(emailError,mensaje);
    }
}

//Validate Password

function testPass(pass){
    let regex = new RegExp("^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$");
    return (regex.test(pass));
}

function validatePassword(pass){
    if (pass.trim()===''){
        let mensaje="Este campo es Obligatorio.";
        mostrarMensajeError(passwordError,mensaje);
    }else{
        if(!testPass(pass)){
            let mensaje="Este campo debe contener 8 caracteres con al menos una mayuscula y un simbolo";
            mostrarMensajeError(passwordError,mensaje); 
        }else{
            limpiarMensajeError(passwordError);
        }
    }
}


function saveUser(user){
    let userList;
    if(localStorage.getItem("Users")){
        userList= JSON.parse(localStorage.getItem("Users"));
    }else{
        userList=[];
    }
    userList.push(user);
    localStorage.setItem("Users", JSON.stringify(userList));
    userListTarget.innerHTML = "";

    for (let eachUser of userList) {
        userListTarget.innerHTML += `
        <tr class="table_row">
            <td class="table_info-name">${eachUser.userName}</td>
            <td class="table_info-email">${eachUser.email}</td>
        </tr>`
    }

    alert ("Usuario creado con exito");
    cleanForm();
}

function cleanForm(){
    let inputsCollection=document.getElementsByTagName("input");
    for (let index = 0; index < inputsCollection.length; index++) {
        inputsCollection[index].value="";
    }
}

function submitUser(e){
    e.preventDefault();
    validUser=true;
    validateName(userName.value);
    validateEmail(email.value);
    validatePassword(password.value);
    if(validUser){
        const user={
            userName: userName.value,
            email: email.value,
        }
        saveUser(user);
    }
}

btnAddUser.addEventListener('click', submitUser);

