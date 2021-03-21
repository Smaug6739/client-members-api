//var div = document.getElementById('myDiv');

async function fetchUserID(){
    const ID = document.location.href.split('/').reverse()[0]
    const req = fetch('http://localhost:8080/api/v1/members/' + ID).then(req =>{
        req.json().then(userInfos => {
            document.getElementById("form1").setAttribute("action",`/${userInfos.result.userID}/updatebyadmin`)
            document.getElementById("form2").setAttribute("action",`/${userInfos.result.userID}/deletebyadmin`)
    

    
                document.getElementById("pseudo").setAttribute("value",userInfos.result.pseudo)
                document.getElementById("password").setAttribute("value",userInfos.result.password)
                document.getElementById("lastName").setAttribute("value",userInfos.result.lastName)
                document.getElementById("firstName").setAttribute("value",userInfos.result.firstName)
                document.getElementById("age").setAttribute("value",userInfos.result.age)
                document.getElementById("email").setAttribute("value",userInfos.result.email)
                document.getElementById("phoneNumber").setAttribute("value",userInfos.result.phoneNumber)
        })
    }) 
}

fetchUserID()

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