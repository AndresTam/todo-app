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
const password = document.getElementById('password')
const btnLogin = document.getElementById('btnLogin')

//------------------------- Login Function -------------------------//
function UserAuthentication(){
    get(child(dbref, 'users/' + user.value)).then((snapshot) => {
        if(snapshot.exists()){
            if(password.value == snapshot.val().password){
                localStorage.setItem('user', user.value)
                window.open("../principal.html", "_self")
                console.log('exist')
            } else{
                alert('Contraseña Incorrecta')
            }
        } else{
            alert('El usuario no existe')
        }
    })
    .catch((error) => {
        alert('Ha ocurrido un error' + error)
    })
}

btnLogin.addEventListener('click', UserAuthentication)