import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  cartItems: Map<string, CartItem> = new Map<string, CartItem>();

  totalPrice: Subject<number> = new Subject<number>
  totalQuantity: Subject<number> = new Subject<number>

  constructor() {
  }

  addToCart(theCartItem: CartItem) {
    const existingCartItem = this.cartItems.get(theCartItem.id);

    if (existingCartItem) {
      // Item already in cart, increment quantity
      existingCartItem.quantity++;
    } else {
      // New item, add to the map
      this.cartItems.set(theCartItem.id, theCartItem);
    }

    // Recalculate totals
    this.computeCartTotals();
  }

  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;

    // Sum up totals from the map values
    for (let cartItem of this.cartItems.values()) {
      totalPriceValue += cartItem.quantity * cartItem.unitPrice;
      totalQuantityValue += cartItem.quantity;
    }

    // Publish new totals
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;

    if (theCartItem.quantity === 0) {
      this.remove(theCartItem);
    } else {
      // Recalculate cart totals
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    // Remove the item from the map using its id
    this.cartItems.delete(theCartItem.id);

    // Recalculate cart totals
    this.computeCartTotals();
  }
}
