import { Component, OnInit, Input } from '@angular/core';
import { CallerService } from './api/caller.service';
import { Observable } from 'rxjs/Observable';
import { FormControl } from '@angular/forms';
import { catchError, map, tap, startWith, switchMap, debounceTime, distinctUntilChanged, takeWhile, first } from 'rxjs/operators';
import 'rxjs/add/operator/debounceTime';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [CallerService]
})
export class AppComponent implements OnInit {
  title = 'Sonar';
  locId: string;
  public properties;
  public searchResult;
  api_key: string = environment.api_key;

  searchTerm: FormControl = new FormControl();

  constructor(private _callerService: CallerService) {

    this.searchTerm.valueChanges
    .debounceTime(400)
    .subscribe(data => {
      console.log('this is the data', data);
      if (typeof(data) === 'object') { data = data.name; }
        this._callerService.search_word(data, this.api_key).subscribe(response => {
          console.log(response);
            this.searchResult = response;
            this.searchResult = this.searchResult.result.locations.elements;
        });
    });
  }

  ngOnInit() {
    // this.getProperties();
  }

  getProperties() {
    console.log('getProperties:', this.locId);
    console.log('search term', this.searchTerm);
    // if (this.locId !== undefined || null) {
        this._callerService.getProperties(this.searchTerm.value.place_id, this.api_key).subscribe(
          data => { this.properties = data;
                    this.properties = this.properties.result.properties.elements; },
          err => console.error(err),
          () => console.log('done loading properties', this.properties)
        );
      // }
  }

  // Dsed to display name and retain object values.
  displayFn(loc): string | undefined {
    return loc ? loc.name : undefined;
  }
}
