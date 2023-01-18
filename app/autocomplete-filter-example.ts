import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * @title Filter autocomplete
 */
@Component({
  selector: 'autocomplete-filter-example',
  templateUrl: 'autocomplete-filter-example.html',
  styleUrls: ['autocomplete-filter-example.css'],
})
export class AutocompleteFilterExample implements OnInit {
  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.address)),
      map((address) =>
        address ? this._filter(address) : this.returnWholeArray(address)
      )
    );
  }

  returnWholeArray(address) {
    console.log(address);
    return this.options.slice();
  }

  options = [
    { id: '1', address: '123 Main Street Hollywood CA 90210' },
    { id: '2', address: '123 Main Street Unit 1 Hollywood CA 90210' },
    { id: '3', address: '45 Main Street Hollywood CA 90210' },
    { id: '4', address: '345 Main Street Unit 1 Hollywood CA 90210' },
  ];

  myControl = new FormControl();
  filteredOptions: Observable<any[]>;
  testStr = 'test test test';

  private _filter(value: string) {
    console.log('value', value);
    let toReturn = this.options.filter((option) =>
      option.address.toLowerCase().includes(value.toLowerCase())
    );
    console.log('toReturn', toReturn);
    return toReturn;
  }

  displayFn(selectedoption) {
    return selectedoption ? selectedoption.address : undefined;
  }

  update() {
    console.log(this.myControl.value.id);
  }
}
