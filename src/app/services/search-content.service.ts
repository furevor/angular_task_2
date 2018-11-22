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

    constructor() {
        this.carsSrorage = new BehaviorSubject<Car[]>(null);
        // this.cars$ = of(Math.random()).pipe(tap(val => console.log('tell me your share secret')));
    }

    getCarsFromService(): void {
        // here you can send http data request, subscribe it and push next value to BehaviorSubject
        this.carsSrorage.next(CARS);
    }

    getCars(): Observable<Car[]> {
        return this.carsSrorage.asObservable();
    }


}
