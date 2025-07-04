import express from "express"
import passport from 'passport'
import LocalStrategy from 'passport-local'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import { Mongo } from "../database/mongo.js"
import { ObjectId } from 'mongodb'

const collectionName = 'users'

const authRouter = express.Router()

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, callback) => {
    const user = await Mongo.db
    .collection(collectionName)
    .findOne({ email: email })

     if(!user) {
        return callback(null, false)
    }

      const saltBuffer = user.salt.buffer

      crypto.pbkdf2(password, saltBuffer, 310000, 16, 'sha256', (error, hashedPassword) => {
        if(error) {
            return callback(error)
        }

         const userPassowrdBuffer = Buffer.from(user.password.buffer)

        if(!crypto.timingSafeEqual(userPassowrdBuffer, hashedPassword)) {
            return callback(null, false)
        }

        const { password, salt, ...rest } = user

        return callback(null, rest)
    })
}))
