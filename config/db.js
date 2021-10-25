import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '.env' })

const conectarDB = async () => {
  try {
    await mongoose.connect(process.env.DB_MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    })
    console.log('DB Conectada')
  } catch (e) {
    console.log('ocurrio un error: ', e)
    process.exit(1) // detener la api
  }
}

export default conectarDB
