import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm"

import { Customer } from "@medusajs/medusa/dist/models/customer"
import { Region } from "@medusajs/medusa/dist/models/region"
import { BaseEntity } from "@medusajs/medusa"
import { generateEntityId } from "@medusajs/medusa/dist/utils"
import { WishlistItem } from './wishlist-item'

@Entity()
export class Wishlist extends BaseEntity {
  readonly object = "wishlist"

  @OneToMany(() => WishlistItem, (wishlistItem) => wishlistItem.wishlist, {
    onDelete: "CASCADE",
  })
  items: WishlistItem[]

  @Index()
  @Column()
  region_id: string

  @ManyToOne(() => Region)
  @JoinColumn({name: "region_id"})
  region: Region

  @Index()
  @Column({nullable: true})
  customer_id: string

  @ManyToOne(() => Customer)
  @JoinColumn({name: "customer_id"})
  customer: Customer

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, "wish")
  }
}
