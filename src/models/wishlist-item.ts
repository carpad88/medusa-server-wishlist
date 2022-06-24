import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { Product } from '@medusajs/medusa/dist/models/product'
import { Wishlist } from './wishlist';


@Entity()
export class WishlistItem extends BaseEntity {
  @Index()
  @Column()
  wishlist_id: string

  @ManyToOne(() => Wishlist, (wishlist) => wishlist.items)
  @JoinColumn({name: "wishlist_id"})
  wishlist: Wishlist

  @Index()
  @Column()
  product_id: string

  @ManyToOne(() => Product)
  @JoinColumn({name: "product_id"})
  product: Product

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "item")
  }
}

