import { BaseService } from 'medusa-interfaces'
import { MedusaError } from 'medusa-core-utils'

class WishlistService extends BaseService {
  constructor({ manager, wishlistRepository, wishlistItemRepository }) {
    super()
    this.manager_ = manager
    this.wishlistRepository_ = wishlistRepository
    this.wishlistItemRepository_ = wishlistItemRepository
  }

  async retrieve(id) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistRepository = transactionManager.getCustomRepository(this.wishlistRepository_)
      const [wishlist] = await wishlistRepository.find({
        where: { id },
        relations: ['items', 'items.product']
      })

      if (!wishlist) {
        throw new MedusaError(MedusaError.Types.NOT_FOUND, `Wishlist with ${ id } was not found`)
      }

      return wishlist
    })
  }

  async create(payload) {
    return await this.atomicPhase_(async (transactionManager) => {

      if (!payload.region_id) {
        throw new MedusaError(MedusaError.Types.INVALID_DATA, `A region_id must be provided when creating a wishlist`)
      }

      const wishlistRepository = transactionManager.getCustomRepository(this.wishlistRepository_)
      const createdWishlist = wishlistRepository.create(payload)
      const { id } = await wishlistRepository.save(createdWishlist)

      const [wishlist] = await wishlistRepository.find({
        where: { id },
        relations: ['items', 'items.product']
      })

      return wishlist
    })
  }

  async addWishItem(wishlist_id, product_id) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistItemRepository = transactionManager.getCustomRepository(this.wishlistItemRepository_)
      const wishlistRepository = transactionManager.getCustomRepository(this.wishlistRepository_)

      const [item] = await wishlistItemRepository.find({ where: { wishlist_id, product_id } })

      if (!item) {
        const createdItem = wishlistItemRepository.create({ wishlist_id, product_id })
        await wishlistItemRepository.save(createdItem)
      }

      const [wishlist] = await wishlistRepository.find({
        where: { id: wishlist_id },
        relations: ['items', 'items.product']
      })
      return wishlist
    })
  }

  async removeWishItem(id) {
    return await this.atomicPhase_(async (transactionManager) => {
      const wishlistItemRepository = transactionManager.getCustomRepository(this.wishlistItemRepository_)
      const wishlistRepository = transactionManager.getCustomRepository(this.wishlistRepository_)
      const [item] = await wishlistItemRepository.find({ where: { id } })
      const wishlist_id = item.wishlist_id

      if (item) {
        await wishlistItemRepository.remove(item)
      }

      const [wishlist] = await wishlistRepository.find({
        where: { id: wishlist_id },
        relations: ['items', 'items.product']
      })
      return wishlist
    })
  }
}

export default WishlistService
