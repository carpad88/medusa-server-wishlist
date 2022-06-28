import { EntityRepository, Repository } from "typeorm"
import { Wishlist } from "../models/wishlist"

@EntityRepository(Wishlist)
export class WishlistRepository extends Repository<Wishlist> { }
