import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL, ORDER_TRACK_URL } from '../shared/constants/urls';
import { Order } from '../shared/models/Order';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  authService: any;
  private apiUrl = 'http://localhost:5000/api/orders';
  private ORDER_NEW_FOR_CURRENT_USER_URL = '${this.apiUrl}/newOrderForCurrentUser';
  createOrder(order: Order) {
    throw new Error('Method not implemented.');
  }
  
  
  
  constructor(private http: HttpClient) { }

  create(order:Order){
    return this.http.post<Order>(ORDER_CREATE_URL, order);
  }

  // getNewOrderForCurrentUser():Observable<Order>{
  //   return this.http.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
  // }
 
  // getNewOrderForCurrentUser(): Observable<Order> {
  //   return this.http.get<Order>(`${this.apiUrl}/newOrderForCurrentUser`);
  // }

  getNewOrderForCurrentUser(): Observable<Order> {
    return this.http.get<Order>(`${this.ORDER_NEW_FOR_CURRENT_USER_URL}`).pipe(
      catchError((error) => {
        console.error('Error fetching new order:', error);
        return throwError('Something went wrong. Please try again later.');
      })
    );
 }
  
  

  pay(order:Order):Observable<string>{
    return this.http.post<string>(ORDER_PAY_URL,order);
  }

  trackOrderById(id:number): Observable<Order>{
    return this.http.get<Order>(ORDER_TRACK_URL + id);
  }

}
export const environment = {
  apiUrl: 'http://localhost:5000/api'
};


