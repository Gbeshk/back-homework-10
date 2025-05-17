module.exports = (req, res, next) => {
    const key = req.headers['key']
    if(!key){
        return res.status(400).json({error: 'key is required'})
    }
    next()
}