'use strict'

const { findById } = require("../services/apikey.service")

const HEADER = {
    API_KEY: 'x-api-key',
    AUTHORIZATION: 'authorization'
}

const apiKey = async (req, res, next) => {
    try {
        const key = req.headers[HEADER.API_KEY]?.toString()
        //console.log(`key::`, key)
        if(!key){
            return res.status(403).json({
                message: 'Forbidden Error 1'
            })
        }
        // check objKey
        // console.log(`key::`, key)
        const objKey = await findById(key)
        // console.log(`objKey new :::`, objKey)
        if(!objKey){
            return res.status(403).json({
                message: 'Forbidden Error 2'
            })
        }
        req.objKey = objKey
        return next()
        
    } catch (error) {
        console.log(`Error middleware::`, error)
    }
}

const permission = ( permissions ) => {
    return (req, res, next) => {
        if(!req.objKey.permissions){
            return res.status(403).json({
                message: 'Permission denied'
            })
        }

        console.log(`Permission1:: `, req.objKey.permissions)
        const validPermission = req.objKey.permissions.includes(permissions)
        if(!validPermission){
            return res.status(403).json({
                message: 'Permission denied'
            })
        }
        return next()
    }
}
module.exports = {
    apiKey,
    permission
}