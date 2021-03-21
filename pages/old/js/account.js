//var div = document.getElementById('myDiv');
/*
async function fetchUserID(){
    const req = await fetch('/usersession')
    req.json().then( async usersession =>{
        console.log(usersession.userID)
        if(usersession) {

            const reqq = await fetch('http://localhost:8080/api/v1/members/' + usersession.userID)
            console.log(reqq)
            reqq.json().then(userInfos => {
            console.log(userInfos.result)

            document.getElementById("form1").setAttribute("action",`/${userInfos.result.userID}/update`)
            document.getElementById("form2").setAttribute("action",`/${userInfos.result.userID}/delete`)

            document.getElementById("pseudo").setAttribute("value",userInfos.result.pseudo)
            document.getElementById("password").setAttribute("value",userInfos.result.password)
            document.getElementById("lastName").setAttribute("value",userInfos.result.lastName)
            document.getElementById("firstName").setAttribute("value",userInfos.result.firstName)
            document.getElementById("age").setAttribute("value",userInfos.result.age)
            document.getElementById("email").setAttribute("value",userInfos.result.email)
            document.getElementById("phoneNumber").setAttribute("value",userInfos.result.phoneNumber)
            if(!usersession.userAdmin) document.getElementById("nav-button-admin").style.display = "none"

        })
            //NAV
            document.getElementById("nav-button-login").style.display = "none"
        }else {
            console.log("no user connected");
            //NAV
            document.getElementById("nav-button-disconnection").style.display = "none"
            document.getElementById("nav-button-admin").style.display = "none"

        }
    })
}

fetchUserID()
*/

async function fetchUserById(){
    const reqSession = await fetch('/usersession')
    console.log('test')
        
    
    reqSession.json().then( async resSession =>{
        if(resSession){
            const req = await fetch('http://localhost:8080/api/v1/members/'+ resSession.userID, { 
                method: 'POST',
                //body : JSON.stringify({a : "test"}),
                //headers: { 'Content-type': 'application/json' },
                //headers: {'Content-Type':'application/x-www-form-urlencoded'}, // this line is important, if this content-type is not set it wont work
                //body: "firstName=Nikhil&favColor=blue&password=easytoguess"
                body : JSON.stringify({a : "test"}),

                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
         
            req.json().then(userInfos => {
                /*console.log(userInfos)
                document.getElementById("form1").setAttribute("action",`/${userInfos.result.userID}/update`)
                document.getElementById("form2").setAttribute("action",`/${userInfos.result.userID}/delete`)

                document.getElementById("pseudo").setAttribute("value",userInfos.result.pseudo)
                document.getElementById("password").setAttribute("value",userInfos.result.password)
                document.getElementById("lastName").setAttribute("value",userInfos.result.lastName)
                document.getElementById("firstName").setAttribute("value",userInfos.result.firstName)
                document.getElementById("age").setAttribute("value",userInfos.result.age)
                document.getElementById("email").setAttribute("value",userInfos.result.email)
                document.getElementById("phoneNumber").setAttribute("value",userInfos.result.phoneNumber)*/
            })
        }

    })
}
fetchUserById()