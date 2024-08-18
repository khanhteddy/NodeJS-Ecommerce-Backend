'use strict'

const { token } = require("morgan")
const keytokenModel = require("../models/keytoken.model")

class KeyTokenService {

    static createKeyToken =  async ({userId, publicKey, privateKey}) => {
        try {
            // RSA
            //const publicKeyString = publicKey.toString()
            const tokens = await keytokenModel.create({
                user: userId,
                publicKey,
                privateKey
            })
            return token ? tokens.publicKey : null
        } catch (error) {
            return error
        }
    }
}

module.exports = KeyTokenService