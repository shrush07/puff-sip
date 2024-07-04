import { Food } from "./app/shared/models/Food";
import { Tag } from "./app/shared/models/Tag";

export const sample_foods: Food[] =[
    {
        id: '1',
        name: 'Coffee',
        price: 120.00,
        imageUrl: 'assets/images/coffee1.png',
        tags: ['coffee'],
        favorite: false,
    },
    {
        id: '2',
        name: 'Mocktail',
        price: 120.00,
        imageUrl: 'assets/images/juice1.png',
        tags: ['mocktail'],
        favorite: false,
    },
    {
        id: '3',
        name: 'Puff',
        price: 120.00,
        imageUrl: 'assets/images/puff1.png',
        tags: ['puff'],
        favorite: false,
    },
    {
        id: '4',
        name: 'Coffee',
        price: 120.00,
        imageUrl: 'assets/images/coffee2.png',
        tags: ['coffee'],
        favorite: true,
    },
]

export const sample_tags:Tag[] = [
    { name: 'All', count: 4 },
    { name: 'Coffee', count: 2 },
    { name: 'Mocktail', count: 1 },
    { name: 'Puff', count: 1 },
  ]