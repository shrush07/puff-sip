import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from '../shared/models/Cart';
import { CartItem } from '../shared/models/CartItem';
import { Food } from '../shared/models/Food';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);

  constructor() {}

  // addToCart(food: Food): void {
  //   let cartItem = this.cart.items.find((item) => item.food.id === food.id);
  //   console.log('Adding product to cart:', food);
  //   // if (cartItem)
  //   //   return;
  //   // this.cart.items.push(new CartItem(food));
  //   console.log('Current cart items:');
  //   this.cartSubject.next(this.cart);
  //   this.setCartToLocalStorage();

  //   if (cartItem) {
  //     cartItem.quantity += 1;
  //     cartItem.price = cartItem.quantity * cartItem.food.price;
  //     return;
  //   } else {
  //     this.cart.items.push(new CartItem(food));
  //   }
  // }

  addToCart(food: Food): void {
    console.log('Adding product to cart:', JSON.stringify(food, null, 2));
    console.log(
      'Current cart items:',
      JSON.stringify(this.cart.items, null, 2)
    );

    let cartItem = this.cart.items.find((item) =>
      this.isSameFood(item.food, food)
    );

    if (cartItem) {
      console.log('Item found in cart, updating quantity');
      cartItem.quantity += 1;
      cartItem.price = cartItem.quantity * cartItem.food.price;
    } else {
      console.log('Item not found in cart, adding new item');
      let newItem = new CartItem(food);
      this.cart.items.push(newItem);
      console.log('New item added:', JSON.stringify(newItem, null, 2));
    }

    console.log(
      'Updated cart items:',
      JSON.stringify(this.cart.items, null, 2)
    );
    this.setCartToLocalStorage();
  }

  private isSameFood(food1: Food, food2: Food): boolean {
    return (
      food1._id === food2._id &&
      food1.name === food2.name &&
      food1.price === food2.price
    );
  }

  // removeFromCart(foodId: string): void {
  //   this.cart.items = this.cart.items.filter((item) => item.food.id != foodId);
  //   this.setCartToLocalStorage();
  // }

  removeFromCart(foodId: string): void {
    console.log('Component: Removal process completed');
    console.log('Step 1: Attempting to remove product from cart with ID:', foodId);
    console.log('Step 2: Current cart items:', JSON.stringify(this.cart.items, null, 2));
  
    let itemRemoved = false;
    const newCartItems = [];
  
    for (let i = 0; i < this.cart.items.length; i++) {
      const item = this.cart.items[i];
      console.log(`Step 3: Checking item ${i}:`, JSON.stringify(item, null, 2));
      
      if (item.food._id === foodId && !itemRemoved) {
        console.log(`Step 4: Removing item ${i}`);
        itemRemoved = true;
      } else {
        console.log(`Step 5: Keeping item ${i}`);
        newCartItems.push(item);
      }
    }
  
    this.cart.items = newCartItems;
    console.log('Step 6: Updated cart items:', JSON.stringify(this.cart.items, null, 2));
  
    this.setCartToLocalStorage();
    console.log('Step 7: Cart updated in local storage');
  }

  changeQuantity(foodId: string, quantity: number): void {
    let cartItem = this.cart.items.find((item) => item.food._id === foodId);
    if (!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity * cartItem.food.price;
    this.setCartToLocalStorage();
  }

  clearCart(): void {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }

  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }

  getCart(): Cart {
    return this.cartSubject.value;
  }

  // private setCartToLocalStorage(): void {
  //   this.cart.totalPrice = this.cart.items.reduce(
  //     (prevSum, currentItem) => prevSum + currentItem.price,
  //     0
  //   );
  //   this.cart.totalCount = this.cart.items.reduce(
  //     (prevSum, currentItem) => prevSum + currentItem.quantity,
  //     0
  //   );

  //   const cartJson = JSON.stringify(this.cart);
  //   localStorage.setItem('Cart', cartJson);
  //   this.cartSubject.next(this.cart);
  //   console.log('Cart updated:', this.cart);
  // }

  private setCartToLocalStorage(): void {
    console.log('Step 8: Setting cart to local storage');
    this.cart.totalPrice = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.price,
      0
    );
    this.cart.totalCount = this.cart.items.reduce(
      (prevSum, currentItem) => prevSum + currentItem.quantity,
      0
    );
  
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
    console.log('Step 9: Cart updated:', JSON.stringify(this.cart, null, 2));
  }

  // private getCartFromLocalStorage(): Cart {
  //   const cartJson = localStorage.getItem('Cart');
  //   const cart = cartJson ? JSON.parse(cartJson) : new Cart();
  //   console.log('Cart loaded from local storage:', cart);
  //   return cart;
  // }

  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    if (cartJson) {
      let cart: Cart = JSON.parse(cartJson);
      cart.items = cart.items.map((item) => {
        let cartItem = new CartItem(item.food);
        cartItem.quantity = item.quantity;
        cartItem.price = item.price;
        return cartItem;
      });
      return cart;
    }
    return new Cart();
  }
}
