import { IObservableArray, observable } from 'mobx';
import { persist } from "./utils";

export const ASYNC_STORAGE_KEY = 'SpotFilterProviderState';

export class SpotFiltersStore {
  @observable maxDistance: number;
  @observable allSports: boolean;
  @observable selectedSportIds: IObservableArray<string>;
  constructor() {
    this.maxDistance = 20;
    this.allSports = true;
    this.selectedSportIds = [] as any;
  }
}

const store = new SpotFiltersStore();
persist(store, ASYNC_STORAGE_KEY);

export default store;
