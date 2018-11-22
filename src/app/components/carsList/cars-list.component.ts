import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, ParamMap } from "@angular/router";
import { Car } from '../../car';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, switchMap, delay, tap, map, mergeMap, concatMap, concat, share } from 'rxjs/operators';
import { of, Observable, merge } from "rxjs";
import { Title } from "@angular/platform-browser";
import { ParamsEvent } from '../../assets/paramsEvent';
import { ParamsSearchEvent } from '../../assets/paramsSearchEvent';
import { SearchContentService } from "../../services/search-content.service";

@Component({
    selector: 'app-cars-list',
    templateUrl: './cars-list.component.html',
    styleUrls: ['./cars-list.component.css']
})
export class CarsListComponent implements OnInit, OnDestroy {

    carsList$: Observable<Car[]>;
    selectedElements$: Observable<string[]>;
    test$: Observable<string>;

    routeParamsResolver$: Observable<ParamsEvent>;


    constructor(private router: Router,
                private route: ActivatedRoute,
                private spinner: NgxSpinnerService,
                private titleService: Title,
                private searchService: SearchContentService) {}

    ngOnInit() {
        // searching for all cars list
        this.searchService.getCarsFromService();

        // set initial car list in component
        this.carsList$ = this.searchService.getCars().pipe(tap(val => console.log(val)));

        this.routeParamsResolver$ = this.route.paramMap.pipe(map(params => {
            // here is code for resolving params and creating different types events

            let type_ = params.get('type') ? params.get('type') : null;
            let name = params.get('name') ? params.get('name') : null;
            let id = params.get('id') ? params.get('id') : null;

            let validate = !!type_ || !!name || !!id;

            if (validate) {
                return new ParamsSearchEvent({name: name, type_: type_, id: id} as Car);
            }
        }));


        let searchResult$ = this.routeParamsResolver$.pipe(
            filter(evt => evt instanceof ParamsSearchEvent),
            mergeMap    (params => {
                return of(this.findElements(this.searchService.carsStorage.value, params['searchItem']));
            }),
            delay(1000 + Math.random() * 1000),
            share()
        );

        searchResult$.subscribe(results => {
            console.log('Here is new title - ' + this.getElementInfo(results[0]));
            this.titleService.setTitle(this.getElementInfo(results[0]));
        });

        this.selectedElements$ = searchResult$.pipe(
            map(results => results.map(elem => this.getElementInfo(elem))));

        let spinnerManager$: Observable<any> = merge(this.routeParamsResolver$, searchResult$);
        spinnerManager$.subscribe(val => {
          if(val instanceof ParamsSearchEvent) {
            this.spinner.show();
          }

          if(val instanceof Array) {
            this.spinner.hide();
          }

        });
    }

    getElementInfo(element) {
        return element['id'] + ' ' + element['name'];
    }

    ngOnDestroy() {
    }

    findElements(elements: Car[], params: Car): Car[] {
        let result = [];
        const keys = Object.keys(params).filter(key => params[key] !== null);
        if (keys.length > 0)
            result = elements;

        for (var key of keys) {
            if (key) {
                let searchKey = params[key].toLowerCase();
                result = result.filter(element => {
                    return element[key].toLowerCase() === searchKey;
                });
            }
        }
        return result;
    }

    onSelect(car: Car): void {
        this.router.navigate(['/carsList', {name: car.name, type: car.type_}]);
    }
}