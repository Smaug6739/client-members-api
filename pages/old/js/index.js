//var div = document.getElementById('myDiv');
async function fetchUser() {
    const req = await fetch('/usersession')
    req.json().then(async user => {
        if (user) {
            document.getElementById("form-inscription").style.display = "none"
            document.getElementById("nav-button-login").style.display = "none"
            if (!user.userAdmin) document.getElementById("nav-button-admin").style.display = "none"

        } else {
            document.getElementById("user-connected").style.display = "none"
            document.getElementById("nav-button-disconnection").style.display = "none"
            document.getElementById("nav-button-admin").style.display = "none"

        }
    })
}

//fetchUser()