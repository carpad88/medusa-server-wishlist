import { Router, json } from 'express'
import wishlist from './wishlist'

export default () => {
  const app = Router()

  wishlist(app)

  return app
}
