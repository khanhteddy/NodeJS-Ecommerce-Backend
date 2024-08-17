'use strict'

const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require("./keyToken.service")
const { createTokenPair } = require("../auth/authUtils")
const { type } = require("node:os")
const { format } = require("node:path")
const { getInfoData } = require('../utils')

const RoleShop = {
    SHOP: 'SHOP',
    WRITE: 'WRITE',
    EDITOR: 'EDITOR',
    ADMIN: 'ADMIN'
}
class AccessService {
    static signUp = async ({name, email, password}) => {
        try {
            const holderShop =  await shopModel.findOne({email}).lean()
            if(holderShop){
                return {
                    code: '',
                    message: 'Shop already registered'
                }
            }
            const passwordHash = await bcrypt.hash(password,10)
            console.log(`passwordHash: `,passwordHash)
            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles: [RoleShop.SHOP]
            })
            console.log(newShop)
            if(newShop){
                const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa',{
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                })
                console.log(privateKey, publicKey)

                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })

                if(!publicKeyString){
                    return {
                        code: 'xxxx',
                        message: 'publicKeyString error'
                    }
                }
                console.log(`publicKeyString::`, publicKeyString)
                const publicKeyObject = crypto.createPublicKey(publicKeyString)
                console.log(`publicKeyObject::` , publicKeyObject)
                
                // create token pair
                const tokens = await createTokenPair({userId: newShop._id, email}, publicKeyString, privateKey)
                console.log(`Create Token Success::`, tokens)

                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({filed: ['_id', 'name', 'email'], object: newShop}),
                        tokens
                    }
                }
                // const tokens = await 
            }
            return {
                code: 200,
                metadata: null
            }

        } catch (error) {
            return {
                code: 'xxx', 
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService