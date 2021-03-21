
module.exports = async (req, res, next) => {
    try {
        if (!req.session || !req.session.user) throw 'Missing session'
        else if (req.session.user && req.session.user.userPermissions < 3) throw 'Missing permissions'
        next()
    } catch (err) {
        console.log(err);
        res.status(401).redirect('/')
        //json(checkAndChange(new Error('Requete non authentifiée')));
    }
};