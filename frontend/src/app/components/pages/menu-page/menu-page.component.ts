import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'menu',
  templateUrl: './menu-page.component.html',
  styleUrl: './menu-page.component.css'
})
export class MenuPageComponent implements OnInit{
  foods:Food[] = [];
  cartService: any;
  router: any;
  constructor(private foodService:FoodService, activatedRoute:ActivatedRoute) {
    let foodsObservable: Observable<Food[]>;
    activatedRoute.params.subscribe((params) => {
      if(params.searchTerm)
        foodsObservable = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
      else if(params.tag)
        foodsObservable = this.foodService.getAllFoodsByTag(params.tag);
      else
      foodsObservable = foodService.getAll();

      foodsObservable.subscribe((serverFoods) => {
        this.foods = serverFoods;
    })
  })
  }

  ngOnInit(): void {

  }

  addToCart(){
    this.cartService.addToCart(this.food);
    this.router.navigateByUrl('/cart-page');
  }
  food(food: any) {
    throw new Error('Method not implemented.');
  }
}
