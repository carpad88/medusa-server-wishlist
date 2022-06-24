import { EntityRepository, Repository } from "typeorm"
import { WishlistItem } from '../models/wishlist-item';

@EntityRepository(WishlistItem)
export class WishlistItemRepository extends Repository<WishlistItem> { }
