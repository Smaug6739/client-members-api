
module.exports = async (req, res, next) => {
    try {
        let userPermissions = [];
        const permissions = [
            { value: 16, permission: 'BAN_MEMBERS' },
            { value: 8, permission: 'DELETE_MEMBERS' },
            { value: 4, permission: 'UPDATE_MEMBERS' },
            { value: 2, permission: 'VIEW_MEMBERS' },
            { value: 1, permission: 'ADMINISTRATOR' },
        ]
        for (let permission of permissions) {
            const rest = req.session.user.userPermissions % permission.value;
            if (rest == 0 && req.session.user.userPermissions != 0) {
                userPermissions.push(permission.permission);
                break;
            }
            if (rest < req.session.user.userPermissions) {
                userPermissions.push(permission.permission);
                req.session.user.userPermissions = rest
            }
        }
        req.user = {
            permissions: userPermissions
        }
        if (userPermissions.length) next()
        else throw 'Bad permissions'
    } catch (err) {
        res.status(401).redirect('/')
    }
};