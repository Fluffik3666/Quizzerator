import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";



const firebaseConfig = {
    apiKey: "AIzaSyDtDf_axVxEN4A7l82c6YU9JKDH_B3cvrM",
    authDomain: "quizzerator.firebaseapp.com",
    databaseURL: "https://quizzerator-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "quizzerator",
    storageBucket: "quizzerator.firebasestorage.app",
    messagingSenderId: "643394311206",
    appId: "1:643394311206:web:39b5fa26801cee684042e7",
    measurementId: "G-XGDKKC88LQ"
};

const app = initializeApp(firebaseConfig);
async function onPageLoad() {
    let session_user = JSON.parse(await fetch('/authenticator', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({"mode": "getsessioninfo"})
      })
      .then(response => response.text())
      .catch(error => {
        console.error('Error:', error);
      }))
    
    console.log(session_user)
    if (session_user["email"] !="") {
        document.querySelector(".signup").hidden = true
        document.querySelector(".login").hidden = true
        document.querySelector(".signout").hidden = false
    }
    else{
        document.querySelector(".signup").hidden = false
        document.querySelector(".login").hidden = false
        document.querySelector(".signout").hidden = true
    }
        
}
async function login_user() {
    const auth = getAuth();
    let _email = document.querySelector(".login_emailInput").value
    let _password = document.querySelector(".login_passwordInput").value
    
    let user_info = await signInWithEmailAndPassword(auth, _email, _password)
    .then((userCredential) => {
        // Signed in 
        return userCredential
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return "Could not sign in"
    });

    console.log(user_info)

    if (user_info != "Could not sign in"){
        fetch('/authenticator', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({mode: "signin", userinfo: user_info})
            })
            .then(response => response.text())
            .catch(error => {
            console.error('Error:', error);
            });
    }
    post("/", {
    })
}
window.addEventListener("DOMContentLoaded", () => {
const loginButton = document.getElementById("loginButton");
loginButton.addEventListener("click", login_user);
});
window.addEventListener("DOMContentLoaded", () => {
const loginButton = document.getElementById("signupButton");
loginButton.addEventListener("click", signup);
});

window.addEventListener("DOMContentLoaded", () => {
const loginButton = document.getElementById("signOutButton");
loginButton.addEventListener("click", signout);
});

window.addEventListener("DOMContentLoaded", () => {
    onPageLoad()
});
async function signup(){
    let _email = document.querySelector(".emailInput").value
    let _password = document.querySelector(".passwordInput").value
    let uuid = await fetch('/authenticator', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({mode: "signup", email: _email, password: _password})
    })
    .then(response => response.text())
    .catch(error => {
    console.error('Error:', error);
    });
    
    console.log(uuid)

    post("/", {
    })

}

async function signout(){
    let uuid = await fetch('/authenticator', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({mode: "signout"})
    })
    .then(response => response.text())
    .catch(error => {
    console.error('Error:', error);
    });
    
    console.log(uuid)

    post("/", {
    })

}

function post(path, params, method='POST') {
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
  
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const hiddenField = document.createElement('input');
        hiddenField.type = 'hidden';
        hiddenField.name = key;
        hiddenField.value = params[key];
  
        form.appendChild(hiddenField);
      }
    }
  
    document.body.appendChild(form);
    form.submit();
  }
  