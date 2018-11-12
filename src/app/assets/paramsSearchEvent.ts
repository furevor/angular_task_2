import { ParamsEvent } from './paramsEvent';
import { Car } from '../car';

export class ParamsSearchEvent implements ParamsEvent {
  searchItem: any;

  constructor(element: Car) {
    this.searchItem = element;
  }

}