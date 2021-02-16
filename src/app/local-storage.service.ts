import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  public getItem(key: string) {
    return localStorage.getItem(key);
  }

  public setItem(key: string, value: object) {
    var previousContent: Array<object> = JSON.parse(this.getItem(key));

    if (!(previousContent instanceof Array)) {
      previousContent = [];
    }
    previousContent.push(value);
    localStorage.setItem(key, JSON.stringify(previousContent));
  }

  public clear() {
    localStorage.clear();
  }
}
