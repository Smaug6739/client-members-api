exports.statusUser = (session) => {
    let userConnected = {
        auth: false,
        userPermissions: -1
    }
    /*if(!session || !session.user) { //User non connecté
        userConnected = {
            auth : false,
            userPermissions : -1,
            userAvatar : "default.png"
        }
        return userConnected;
    }
    else if(session.user.userPermissions && session.user.userAvatar){ //User connecté 
        userConnected = {
            auth : true,
            userPermissions : session.user.userPermissions,
            userAvatar : session.user.userAvatar
        }
        return userConnected;
    }else if(session.user.userPermissions){ //User connecté 
            userConnected = {
                auth : true,
                userPermissions : session.user.userPermissions,
                userAvatar : "default.png"
            }
        return userConnected;
        
    } else {
        userConnected = {
            auth : true,
            userPermissions : 1,
            userAvatar : "default.png"
        }
        return userConnected;;
    }*/
    if (!session || !session.user) { //User non connecté
        userConnected = {
            auth: false,
            userPermissions: -1,
            userAvatar: "default.png"
        }
        return userConnected;
    } else if (!session.user.userAvatar) {
        userConnected = {
            auth: true,
            userPermissions: session.user.userPermissions,
            userAvatar: "default.png"
        }
    } else {
        userConnected = {
            auth: true,
            userPermissions: session.user.userPermissions,
            userAvatar: session.user.userAvatar
        }
    }
    return userConnected;;

}