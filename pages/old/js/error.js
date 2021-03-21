window.onload = function(){
    var str = window.location.href;
    var url = new URL(str);
    var error = url.searchParams.get("error");
    document.getElementById("error-message").innerHTML = error;
}
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