import express from "express"
import helmet from "helmet"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
dotenv.config()

import logger from "./helpers/logger"

// Enviroment variables
const NODE_ENV = process.env.NODE_ENV || "dev"
const PORT = Number(process.env.PORT)

const app = express()

app.use(express.json())
app.use(helmet())
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }))
app.use(cors())
app.use(morgan(NODE_ENV == 'prod' ? 'combined' : 'dev'))

app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`)
})
