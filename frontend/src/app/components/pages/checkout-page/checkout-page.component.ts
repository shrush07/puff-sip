import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from '../../../shared/models/Order';
import { CartService } from '../../../services/cart.service';
import { UserService } from '../../../services/user.service';
import { OrderService } from '../../../services/order.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {
  order:Order = new Order();
  checkoutForm!: FormGroup;
  constructor(cartService:CartService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private toastrService: ToastrService,
              private orderService: OrderService,
              private http: HttpClient,
              private router: Router) {
                const cart = cartService.getCart();
                this.order.items = cart.items;
                this.order.totalPrice = cart.totalPrice;
              }

  ngOnInit(): void {
    let {name, address, postalcode} = this.userService.currentUser;
    this.checkoutForm = this.formBuilder.group({
      name:[name, Validators.required],
      address:[address, Validators.required],
      postalcode: [postalcode]
    });
  }

  get fc(){
    return this.checkoutForm.controls;
  }
  

  createOrder() {
    if (this.checkoutForm.invalid) {
      this.toastrService.warning('Please fill the inputs', 'Invalid Inputs');
      return;
    }
  
    this.order.name = this.fc.name.value;
    this.order.address = this.fc.address.value;
    this.order.postalcode = this.fc.postalcode.value;
  
    console.log('Sending order:', JSON.stringify(this.order));
  
    this.orderService.create(this.order).subscribe({
      next: (createdOrder) => {
        console.log('Order created successfully:', createdOrder);
        this.toastrService.success('Order created successfully');
        this.router.navigateByUrl('/payment');
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error creating order:', error);
        console.error('Error details:', error.error);
        this.toastrService.error('Failed to create order. Please try again.');
      }
    });
  }
}