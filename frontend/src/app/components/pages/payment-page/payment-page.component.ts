import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrls: ['./payment-page.component.css']
})
export class PaymentPageComponent implements OnInit {

  // constructor(private orderService: OrderService) {}
  // constructor(orderService: OrderService, router: Router) {
  //       orderService.getNewOrderForCurrentUser().subscribe({
  //         next: (order) => {
  //           this.order = order;
  //         },
  //         error:() => {
  //           router.navigateByUrl('/checkout');
  //         }
  //       })
  //    }
  
  // order!: Order;

  order: Order = {
    name: '', address: '', totalPrice: 0, items: [],
    _id: 0,
    paymentId: '',
    createdAt: '',
    status: '',
    postalcode: ''
  };
  


  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getNewOrderForCurrentUser().subscribe(
      order => {
        this.order = order;
      },
      error => {
        console.error('Error fetching new order:', error);
        if (error.status === 400) {
          console.error('Bad Request: Check if all required parameters are provided.');
        } else if (error.status === 404) {
          console.error('No new order found for the current user.');
        } else {
          console.error('An unexpected error occurred.');
        }
      } 
    );
  }


}