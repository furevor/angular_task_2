import { Injectable } from '@angular/core';
import { CARS } from '../mock/mock-cars';
import { of, Observable, merge, BehaviorSubject } from "rxjs";
import { Car } from "../car";
import {share, tap} from "rxjs/operators";



@Injectable({
    providedIn: 'root'
})
export class SearchContentService {

    carsStorage: BehaviorSubject<Car[]>;

    constructor() {
        this.carsStorage = new BehaviorSubject<Car[]>(null);
    }

    getCarsFromService(): void {
        // here you can send http data request, subscribe it and push next value to BehaviorSubject
        this.carsStorage.next(CARS);
    }

    getCars(): Observable<Car[]> {
        return this.carsStorage.asObservable();
    }


}
