import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  isNumber(str){
    let re = new RegExp("^[0-9]+$");
    return re.test(str);
  }
}
