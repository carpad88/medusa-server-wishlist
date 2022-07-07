import { json, Router } from 'express'

const route = Router()

export default (app) => {
  app.use('/store/wishlist', route)
  route.use(json())

  // Wishlist
  route.get('/:id', async (req, res) => {
    const wishlistService = req.scope.resolve('wishlistService')
    const wishlist = await wishlistService.retrieve(req.params.id)
    res.json(wishlist)
  })

  route.post('/', async (req, res) => {
    const wishlistService = req.scope.resolve('wishlistService')
    const payload = {region_id: req.body.region_id, customer_id: null}

    if (req.user && req.user.customer_id) {
      const customerService = req.scope.resolve("customerService")
      const customer = await customerService.retrieve(req.user.customer_id)
      payload.customer_id = customer.id
    }

    const wishlist = await wishlistService.create(payload)
    res.json(wishlist)
  })

  // Wishlist items
  route.post('/:id/wish-item', async (req, res) => {
    const wishlistService = req.scope.resolve('wishlistService')
    const wishlist = await wishlistService.addWishItem(req.params.id, req.body.product_id)
    res.json(wishlist)
  })

  route.delete('/:id/wish-item/:item_id', async (req, res) => {
    const wishlistService = req.scope.resolve('wishlistService')
    const wishlist = await wishlistService.removeWishItem(req.params.item_id)
    res.json(wishlist)
  })

  return app
}
