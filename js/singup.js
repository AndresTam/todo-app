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
const dbref = ref(db)
const user = document.getElementById('user')
const name = document.getElementById('name')
const password = document.getElementById('password')
const btnSingup = document.getElementById('btnSingup')


function userSingUp(){
    get(child(dbref, 'users/' + user.value)).then((snapshot) => {
        if(snapshot.exists()){
            alert('El ususario se encuentra registrado.')
        } else{
            set(ref(db, 'users/' + user.value),{
                name: name.value,
                password: password.value,
            })
            .then(() => {
                window.open("../index.html", "_self");
            })
            .catch((error) => {
                alert('Ha ocurrido un error' + error)
            })
        }
    })
    .catch((error) => {
        alert('Ha ocurrido un error' + error)
    })
}

btnSingup.addEventListener('click', userSingUp)