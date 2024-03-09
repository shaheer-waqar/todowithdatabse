  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
  import { getAuth,createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-auth.js";
  import { push,set,getDatabase,ref,onValue } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyDNVbfFyQMbu6G7wpK4IHCweiazZS4zMxA",
    authDomain: "shah-todo-app-database.firebaseapp.com",
    databaseURL: "https://shah-todo-app-database-default-rtdb.firebaseio.com",
    projectId: "shah-todo-app-database",
    storageBucket: "shah-todo-app-database.appspot.com",
    messagingSenderId: "624034620731",
    appId: "1:624034620731:web:654696036b11d84066431e",
    measurementId: "G-5W8NG2EZ70"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
  const database = getDatabase();
  const auth = getAuth();

  let userName = document.getElementById("userName");
  let userEmail = document.getElementById("userEmail");
  let userPassword = document.getElementById("userPassword");

  let model ={};

  window.sendData = function(e){
    e.preventDefault()
    model.userName= userName.value;
    model.email = userEmail.value;
    model.password = userPassword.value
    console.log(model);

    createUserWithEmailAndPassword(auth,model.email,model.password)
    .then(function(res){
        console.log(res.user.uid,"succes");
        model.id = res.user.uid;
        let refrence = ref(database ,`user/ ${model.id}`);
        set(refrence , model).then(function (dbRes){
            alert("user created");
            window.location.assign("../login/login.html");
        })
        .catch(function(dbErr){
            alert(dbErr.message);
        })
        
    userName.value = ""
    userEmail.value = ""
    userPassword.value = ""
    })
    .catch(function(err){
        console.log(err.message)
      })
  }
