//MAIN BACKEN EBTRYPOINT FILE

import express from "express"
import { ConnectDB } from "./db/index.js"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.js"

dotenv.config()
const app = express()
const port = process.env.PORT || 5000
app.use(express.json()) //allow us to parse incoming requests:req.body

app.use("/api/auth", authRoutes)

app.listen(port, () => {
  ConnectDB()
  console.log(`App running on port ${port}.`)
})
