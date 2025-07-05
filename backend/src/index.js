import express from 'express'
import cors from 'cors'
import { Mongo } from './database/mongo.js'
import { config } from 'dotenv'
import authRouter from './auth/auth.js'

config();


async function main() {

  const hostname = 'localhost'
  const port = 3000
  const app = express()
  
  // Agora process.env.MONGO_CS e process.env.MONGO_DB_NAME terão os valores do .env
  const mongoConnection = await Mongo.connect({ mongoConnectionString: process.env.MONGO_CS, mongoDbName: process.env.MONGO_DB_NAME })
  
  // O seu console.log(mongoConnection) aqui deveria mostrar "Connected to mongo" se tudo der certo
  console.log(mongoConnection) 
  
  app.use(express.json())
  app.use(cors())

  app.get('/', (req, res) => {
    res.send({
      sucess: true,
      statusCode: 200,
      body: 'Welcome to MyGastronomy!'
    })
  })

   // routes
    app.use('/auth', authRouter)
    app.use('/users', usersRouter)
    /*app.use('/plates', platesRouter)
    app.use('/orders', ordersRouter)*/

  app.listen(port, () => {
    console.log(`Server running on: http://${hostname}:${port}`)
  })
}
main()