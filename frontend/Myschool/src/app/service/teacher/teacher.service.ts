import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TeacherService {

  public API = '//localhost:8080';
  public TEACHER_API = this.API + '/teachers';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.TEACHER_API)
  }

  save(teacher): Observable<any> {
    let result: Observable<Object>;
    if (teacher['href']) {
      result = this.http.put(teacher.href, teacher);
    } else {
      result = this.http.post(this.TEACHER_API, teacher);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
