import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {


  public API = '//localhost:8080';
  public CLASSROOM_API = this.API + '/classrooms';
  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.CLASSROOM_API)
  }

  save(classroom): Observable<any> {
    let result: Observable<Object>;
    if (classroom['href']) {
      result = this.http.put(classroom.href, classroom);
    } else {
      result = this.http.post(this.CLASSROOM_API, classroom);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
