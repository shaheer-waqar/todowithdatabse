
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
const app = firebase.initializeApp(firebaseConfig);


  let showList = document.getElementById("showList");


  firebase.database().ref("todos").on("child_added",(data)=>{
    let showListDiv = document.createElement("DIv");
    showListDiv.setAttribute("class","show-list-div");
    let taskPara = document.createElement("P");
    let paraVal = document.createTextNode(data.val().value);
    todoInp.value = "";
    taskPara.appendChild(paraVal);
    showListDiv.appendChild(taskPara);

    let taskBtn = document.createElement("DIV");
    taskBtn.setAttribute("class","task-btn")
    let editBtn = document.createElement("BUTTON");
    editBtn.setAttribute("onclick","editTask(this)");
    let editTex = document.createTextNode("Edit");
    editBtn.appendChild(editTex);
    taskBtn.appendChild(editBtn);

    let delBtn = document.createElement("BUTTON");
    delBtn.setAttribute("onclick","delTask(this)");
    delBtn.setAttribute("id",data.val().key)
    let delTex = document.createTextNode("Del");
    delBtn.appendChild(delTex);
    taskBtn.appendChild(delBtn);

    showListDiv.appendChild(taskBtn);
    showList.appendChild(showListDiv);
  })

//   function getValue() {
//     let refrence = ref(database,"todo/");
//     onValue(refrence,function(data){
//         console.log(data.val().value);
//     })
//   }

//   getValue();




  window.AddTodo = function (){

    let todoInp = document.getElementById("todoInp");

    if (todoInp.value == ""){
      alert("enter your task")
      return
    }else{
      let key = firebase.database().ref("todos").push().key;

      let todoobj = {
        value:todoInp.value,
        key:key
      }

    firebase.database().ref("todos").child(key).set(todoobj);
    }
    
  }

  window.delTask = function(d){
    firebase.database().ref("todos").child(d.id).remove();
    d.parentNode.parentNode.remove();
  }

  window.editTask = function (e){
    let editVal = e.parentNode;
    let paraEdit = editVal.parentNode.firstChild
    let editInp = document.createElement("INPUT");
    editInp.value = paraEdit.textContent;
    paraEdit.appendChild(editInp);
    paraEdit.firstChild.nodeValue = "";

    let saveBtn = document.createElement("Button");
    saveBtn.setAttribute("onclick","saveTask(this)");
    saveBtn.setAttribute("id",editVal.childNodes[1].id)
    let savBtnTex = document.createTextNode("Save");
    saveBtn.appendChild(savBtnTex);
    editVal.prepend(saveBtn);
    editVal.firstChild.nextSibling.style.display = "none";

  }
  window.saveTask = function(s){
    let saveValue = s.parentNode;
    let savePara = saveValue.parentNode.firstChild;
    if (savePara.firstChild.nextSibling.value === "" ){
        alert("write something");
    }else{
        let editTodo ={
            value:savePara.firstChild.nextSibling.value,
            key:s.id
        }
        firebase.database().ref("todos").child(s.id).set(editTodo);
        savePara.textContent = savePara.firstChild.nextSibling.value;
        saveValue.childNodes[1].style.display = "inline-block";
        saveValue.childNodes[0].remove();
    }
  }

  window.clearAll = function (){
    showList.innerHTML = "";
    firebase.database().ref("todos").remove();
  }






