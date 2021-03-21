//var div = document.getElementById('myDiv');
//const user = require("../../models/user");

async function updateTable(){
            const req = await fetch('http://localhost:8080/api/v1/members/')
            req.json().then(userInfos => {
            userInfos.result.forEach(element => {
              /*for (const property in element) {
                    console.log(`${property}: ${element[property]}`);
                }*/
                var userLigne =document.createElement("TR")
                var userCase1 = document.createElement("TD")
                var userCase2 = document.createElement('TD')
                var userCase3 = document.createElement('TD')
                var userCase4 = document.createElement('TD')
                userCase1.innerHTML = `<h5>${element.pseudo}</h5>`
                userCase2.innerHTML = `<p>${element.email}</p>`
                userCase3.innerHTML = `<p>${element.accountDate}</p>`
                userCase4.innerHTML = `<a class="btn btn-primary mt-3"href="/adminupdate/${element.userID}">Modiffier </a> <a class="btn btn-primary mt-3"href="/adminupdate/${element.userID}">Supprimer </a>`
                document.getElementById("user-table").appendChild(userLigne);
                userLigne.appendChild(userCase1)
                userLigne.appendChild(userCase2)
                userLigne.appendChild(userCase3)
                userLigne.appendChild(userCase4)
            });


        })
}
updateTable()

async function fetchUser(){
  const req = await fetch('/usersession')
  req.json().then( async user =>{
      if(user) {
          document.getElementById("nav-button-login").style.display = "none"
          if(!user.userAdmin) document.getElementById("nav-button-admin").style.display = "none"


      }else {
           console.log("no user connected");
           document.getElementById("nav-button-disconnection").style.display = "none"
           document.getElementById("nav-button-admin").style.display = "none"

      }
  })
}

fetchUser()


