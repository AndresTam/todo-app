// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
import {getDatabase, ref, set, get, child, update, remove} from "https://www.gstatic.com/firebasejs/9.6.10/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB49HSm3C8gDwUnIEqp1n4qUhQPEmluOXs",
  authDomain: "se-todo-app.firebaseapp.com",
  databaseURL: "https://se-todo-app-default-rtdb.firebaseio.com",
  projectId: "se-todo-app",
  storageBucket: "se-todo-app.appspot.com",
  messagingSenderId: "932056952407",
  appId: "1:932056952407:web:19208264c378a2a551bd12"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();

//---------- App Variables ----------//
const templateCard = document.getElementById('template-carrito').content
const modalContent = document.getElementById('modal-content')
const btnInsert = document.getElementById('btn-insert')
const btnCancel = document.getElementById('btn-cancel')
const todoModal = document.getElementById('modal-todo')
const descModal = document.getElementById('modal-desc')
const fragment = document.createDocumentFragment()
const footTable = document.getElementById('foot')
const btnClose = document.getElementById('close')
const cards  = document.getElementById('cards')
const items  = document.getElementById('items')
const btnAdd = document.getElementById('add')
const dbref = ref(db)
var userName = document.getElementById('welcome')
var userNote = document.getElementById('notes')
var dataTodo = []
var dataArray = []
var dataLength = 0
var name = ''
var desc = ''
var user = localStorage.getItem('user')
var num = 0

if(user == ''){
    window.open("../index.html", "_self")
}

//------------------------- Get UserData Method -------------------------//
get(child(dbref,'users/'+ user)).then((snapshot) => {
    userName.textContent = 'Hola de nuevo ' + snapshot.val().name + '.'
})

//------------------------- Get TodoData Method -------------------------//
get(child(dbref,'todo/'+ user)).then((snapshot) => {
    dataTodo = JSON.stringify(snapshot)
    dataArray = JSON.parse(dataTodo)
    if(dataArray == null || dataArray == 'undefined' || dataArray == ''){
        dataLength = 0
    } else{
        dataLength = Object.values(dataArray).length
    }
    console.log(dataLength)
    if(dataLength > 1 || dataLength < 1){
        userNote.textContent = 'Tienes ' + dataLength + ' tareas.'
    } else{
        userNote.textContent = 'Tienes ' + dataLength + ' tarea.'
    }
    printCards(dataArray)
    if(dataLength > 0){
        footTable.style.display = 'none'
    } else{
        footTable.style.display = 'inline-block'
    }
})

//------------------------- Show TodoData Method -------------------------//
const printCards = data => {
    items.innerHTML = ''
    if(dataLength > 0){
        Object.values(data).forEach(todo => {
            templateCard.querySelectorAll('td')[0].textContent = todo.id
            templateCard.querySelectorAll('td')[1].textContent = todo.name
            templateCard.querySelectorAll('td')[2].textContent = todo.desc
            if(todo.state === true){
                templateCard.querySelector('.btn-state').textContent = 'Completo'
                templateCard.querySelector('.btn-state').style.background = '#16a78c'
                templateCard.querySelector('.btn-state').style.border = '#16a78c'
                templateCard.querySelector('.btn-state').style.color = '#ffffff'
            } else{
                templateCard.querySelector('.btn-state').textContent = 'Incompleto'
                templateCard.querySelector('.btn-state').style.background = 'red'
                templateCard.querySelector('.btn-state').style.border = 'red'
                templateCard.querySelector('.btn-state').style.color = '#ffffff'
            }
            templateCard.querySelector('.btn-edit').dataset.id = ''+todo.id
            templateCard.querySelector('.btn-delete').dataset.id = ''+todo.id
            templateCard.querySelector('.btn-state').dataset.id = ''+todo.id
            const clone = templateCard.cloneNode(true)
            fragment.appendChild(clone)
        })
        items.appendChild(fragment)
    }   
}

//------------------------- Button Actions Function -------------------------//
function btnActions(e){
    if(e.target.classList.contains('btn-state')){
        if(e.target.textContent == 'Completo'){
            update(ref(db, 'todo/' + user + '/' + e.target.dataset.id),{
                state: false,
            })
        } if(e.target.textContent == 'Incompleto'){
            update(ref(db, 'todo/' + user + '/' + e.target.dataset.id),{
                state: true,
            })
        }
        location.reload();
    } else if(e.target.classList.contains('btn-edit')){
        name = Object.values(dataArray)[e.target.dataset.id - 1].name
        desc = Object.values(dataArray)[e.target.dataset.id - 1].desc
        num = e.target.dataset.id
        todoModal.value = name
        descModal.value = desc
        btnInsert.dataset.id = 2
        btnInsert.textContent = 'Guardar'
        modalContent.style.display = 'flex'
    } else if(e.target.classList.contains('btn-delete')){
        remove(ref(db,'todo/' + user + '/' + e.target.dataset.id))
        location.reload();
    }
}

//------------------------- AddEventListener Section -------------------------//
items.addEventListener('click', e => {
    btnActions(e)
})

btnAdd.addEventListener('click', e => {
    modalContent.style.display = 'flex'
    btnInsert.textContent = 'Agregar'
    btnInsert.dataset.id = 1
    todoModal.textContent = ''
    descModal.textContent = ''    
})

btnCancel.addEventListener('click', e => {
    modalContent.style.display = 'none'
})

btnInsert.addEventListener('click', e =>{
    if(btnInsert.dataset.id == 1){
        if(todoModal.value != '' && descModal.value != ''){
            set(ref(db, 'todo/' + user + '/' + (dataLength + 1)),{
                id: dataLength + 1,
                name: todoModal.value,
                desc: descModal.value,
                state: false,
            })
            location.reload();
        } else{
            alert('Todos los datos deben ser llenados.')
        }
    } else if(btnInsert.dataset.id == 2){
        update(ref(db, 'todo/' + user + '/' + num), {
            name: todoModal.value,
            desc: descModal.value,
        })
        location.reload();
    }
})

btnClose.addEventListener('click', e => {
    localStorage.setItem('user', '')
    window.open("../index.html", "_self")
})
