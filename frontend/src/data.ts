import { Food } from "./app/shared/models/Food";
import { Tag } from "./app/shared/models/Tag";

export const sample_foods: Food[] =[
    {
        _id: '1',
        name: 'Coffee',
        price: 120.00,
        imageUrl: 'assets/images/coffee1.png',
        tags: ['Coffee'],
        favorite: false,
    },
    {
        _id: '2',
        name: 'Mocktail',
        price: 120.00,
        imageUrl: 'assets/images/juice1.png',
        tags: ['Mocktail'],
        favorite: false,
    },
    {
        _id: '3',
        name: 'Puff',
        price: 120.00,
        imageUrl: 'assets/images/puff1.png',
        tags: ['Puff'],
        favorite: false,
    },
    {
        _id: '4',
        name: 'Coffee',
        price: 120.00,
        imageUrl: 'assets/images/coffee2.png',
        tags: ['Coffee'],
        favorite: true,
    },
    {
        _id: '5',
        name: 'Mocktail',
        price: 120.00,
        imageUrl: 'assets/images/juice2.png',
        tags: ['Mocktail'],
        favorite: true,
    },
    {
        _id: '6',
        name: 'Coffee',
        price: 120.00,
        imageUrl: 'assets/images/coffee3.png',
        tags: ['Coffee'],
        favorite: true,
    },
    {
        _id: '7',
        name: 'Coffee',
        price: 120.00,
        imageUrl: 'assets/images/coffee4.png',
        tags: ['Coffee'],
        favorite: true,
    },
]

export const sample_tags:Tag[] = [
    { name: 'All', count: 7 },
    { name: 'Coffee', count: 4 },
    { name: 'Mocktail', count: 2 },
    { name: 'Puff', count: 1 },
  ]