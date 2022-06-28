import { Router, json } from 'express'
import wishlist from './wishlist'
import cors from 'cors'
import { projectConfig } from '../../medusa-config'

const corsOptions = {
  origin: projectConfig.store_cors.split(','),
  credentials: true
}

export default () => {
  const app = Router()
  app.use(cors(corsOptions))

  wishlist(app)

  return app
}
