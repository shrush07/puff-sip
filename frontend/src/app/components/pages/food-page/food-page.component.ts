import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FoodService } from '../../../services/food.service';
import { CartService } from '../../../services/cart.service';
import { Food } from '../../../shared/models/Food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  route: any;
  constructor(private activatedRoute:ActivatedRoute, private foodService:FoodService,
    private cartService:CartService, private router: Router) {
    // activatedRoute.params.subscribe((params) => {
    //   if(params.id)
    //   foodService.getFoodById(params.id).subscribe(serverFood => {
    //     this.food = serverFood;
    //   });
    // })

    // this.activatedRoute.params.subscribe((params) => {
    //   if (params['id']) {
    //     this.foodService.getFoodById(params['id']).subscribe(
    //       (serverFood) => {
    //         this.food = serverFood;
    //       },
    //       (error) => {
    //         console.error('Error fetching food:', error);
    //       }
    //     );
    //   }
    // });
   }

   ngOnInit() {
    this.route.params.subscribe((params: { [x: string]: string; }) => {
      if (params['id']) {
        this.getFoodDetails(params['id']);
      } else {
        console.error('No ID parameter found in route');
        // Handle the case when no ID is provided, e.g., redirect to a list page
      }
    });
  }
  
  getFoodDetails(id: string) {
    this.foodService.getFoodById(id).subscribe(
      food => {
        console.log('Food details:', food);
        // Handle the food data
      },
      error => console.error('Error fetching food:', error)
    );
  }
  

  addToCart(){
    console.log("foodid",this.food);
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
}