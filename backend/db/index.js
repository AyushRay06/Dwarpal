import mongoose from "mongoose"


//async as the DB is very far away and takes time to fo rwe
export const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    console.log(`DATABASE CONNECTED: ${conn.connection.host}`)
  } catch (hululu) {
    console.log("CONNECTION FAILED WITH THE DATBASE", hululu)
    process.exit(1) //process.exit(1) is a status code representing failure and process.exit(0) is for success
  }
}
