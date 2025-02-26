import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  combineLatest,
    filter,
    debounceTime,
  forkJoin,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
} from 'rxjs';
import { MockDataService } from './mock-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  searchTermByCharacters = new Subject<string>();
  charactersResults$!: Observable<any>;
  planetAndCharactersResults$!: Observable<any>;
  isLoading: boolean = false;
  subscriptions: Subscription[] = [];

  constructor(private mockDataService: MockDataService) {}

  ngOnInit(): void {
    this.initLoadingState();
    this.initCharacterEvents();
  }

  changeCharactersInput(element: any): void {
    // 1.1. Add functionality to changeCharactersInput method. Changes searchTermByCharacters Subject value on input change.
    const inputValue: string = element.target.value;
        this.searchTermByCharacters.next(inputValue);

  }

  initCharacterEvents(): void {
    // 1.2. Add API call on each user input. Use mockDataService.getCharacters - to make get request.

    // 2. Since we don't want to spam our service add filter by input value and do not call API until a user enters at least 3 chars.

    // 3. Add debounce to prevent API calls until user stop typing.

      this.charactersResults$ = this.searchTermByCharacters.pipe(
          filter((value) => value.length >= 3), // 2. Filter input (min 3 chars)
          debounceTime(500), // 3. Debounce API calls
          switchMap((searchTerm) => this.mockDataService.getCharacters(searchTerm)) // Call API
      );
  }

  loadCharactersAndPlanet(): void {
    // 4. On clicking the button 'Load Characters And Planets', it is necessary to process two requests and combine the results of both requests into one result array. As a result, a list with the names of the characters and the names of the planets is displayed on the screen.
    // Your code should looks like this: this.planetAndCharactersResults$ = /* Your code */
      this.planetAndCharactersResults$ = forkJoin({
          characters: this.mockDataService.getCharacters(),
          planets: this.mockDataService.getPlanets(),
      }).pipe(
          map(({ characters, planets }) => [...characters, ...planets])
      );
  }

  initLoadingState(): void {
    /* 5.1. Let's add loader logic to our page. For each request, we have an observable that contains the state of the request. When we send a request the value is true, when the request is completed, the value becomes false. You can get value data with mockDataService.getCharactersLoader() and mockDataService.getPlanetLoader().

    - Combine the value of each of the streams.
    - Subscribe to changes
    - Check the received value using the areAllValuesTrue function and pass them to the isLoading variable. */
      const loadingSubscription = combineLatest([
          this.mockDataService.getCharactersLoader(),
          this.mockDataService.getPlanetLoader(),
      ]).subscribe(([charactersLoading, planetsLoading]) => {
          this.isLoading = this.areAllValuesTrue([charactersLoading, planetsLoading]);
      });

      this.subscriptions.push(loadingSubscription);
  }

  ngOnDestroy(): void {
    // 5.2 Unsubscribe from all subscriptions
      this.subscriptions.forEach((sub) => sub.unsubscribe());

  }

  areAllValuesTrue(elements: boolean[]): boolean {
    return elements.every((el) => el);
  }
}
