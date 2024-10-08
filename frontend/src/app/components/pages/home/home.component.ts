import { Component, OnInit } from '@angular/core';
import { Food } from '../../../shared/models/Food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  foods:Food[] = [];
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
        this.foods = this.foods.slice(0, 4); // Only keep the first 4 items
    })
  })
  }

  logFood(food: any) {
    console.log('Clicked food:', food);
  }
  

  toggleFavorite(food: Food): void {
    this.foodService.toggleFavorite(food.name, !food.favorite).subscribe(
      (updatedFood) => {
        food.favorite = updatedFood.favorite;
      },
      (error) => {
        console.error('Error updating favorite status:', error);
      }
    );
  }
  
  ngOnInit(): void {
 
  }
}
