module.exports.returnToResponse = (res, data, statusCode, err, message) => {
    if (err) {
        return res.status(statusCode).json({ data, err })
    }
    return res.status(statusCode).json({ data, message })
}