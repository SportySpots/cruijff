import { observable } from 'mobx';
import { persist } from "./utils";

export const ASYNC_STORAGE_KEY = 'SpotFilterProviderState';

export class SpotFiltersStore {
  @observable maxDistance = 20;
  @observable allSports = true;

  // just ref, so don't mutate if you want updates (you should replace whole array).
  @observable.ref selectedSportIds = [] as string[];
}

const store = new SpotFiltersStore();
persist(store, ASYNC_STORAGE_KEY);

export default store;
