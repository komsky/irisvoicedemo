import express from 'express'
import * as routes from './routes'

const app = express()

Object.entries(routes).forEach(([ k, v ]) => app.use(`/${k}`, v))

export default app
