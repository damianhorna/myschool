import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SubjectService {

  public API = '//localhost:8080';
  public SUBJECT_API = this.API + '/subjects';

  constructor(private http: HttpClient) {
  }


  getAll(): Observable<any> {
    return this.http.get(this.SUBJECT_API)
  }

  save(subject): Observable<any> {
    let result: Observable<Object>;
    if (subject['href']) {
      result = this.http.put(subject.href, subject);
    } else {
      result = this.http.post(this.SUBJECT_API, subject);
    }
    return result;
  }

  remove(href: string) {
    console.log("removing", href);
    return this.http.delete(href);
  }
}
