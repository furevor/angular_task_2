import { Injectable } from '@angular/core';
import { CARS } from '../mock/mock-cars';
import { of, Observable, merge, BehaviorSubject } from "rxjs";
import { Car } from "../car";
import {share, tap} from "rxjs/operators";



@Injectable({
    providedIn: 'root'
})
export class SearchContentService {

    carsSrorage: BehaviorSubject<Car[]>;
    cars$: Observable<any>;

    constructor() {
        this.carsSrorage = new BehaviorSubject<Car[]>(null);
        this.cars$ = of(Math.random()).pipe(tap(val => console.log('tell me your share secret')));
    }

    getCarsFromService(): void {
        this.carsSrorage.next(CARS);
    }

    getCars(): Observable<Car[]> {
        // return this.carsSrorage.asObservable().pipe(share());
        return this.cars$;
    }


}
