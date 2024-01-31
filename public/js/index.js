const socket = io();

Swal.fire({
    title: "Ingrese su nombre de Usuario",
    input: "text",
    inputValidator:(value)=>{
        if(!value){
            return "ingresa el nombre de usuario"
        }
    },
}).then(data=>{
    userName = data.value
    console.log(userName)
    data = data
})

const inputData = document.getElementById('inputData')
const outputData = document.getElementById('outputData')

inputData.addEventListener('keyup', (e) =>{
    if(e.key === 'Enter'){
        if(inputData.value.trim()){
            socket.emit('message', {user: userName, data: inputData.value})
        }
    }
});

socket.on('messageLogs', data =>{
    let messages = '';
    data.forEach(message =>{
        messages+=`${message.user} dice: ${message.data} <br/>`
    })
    outputData.innerHTML = messages;
})