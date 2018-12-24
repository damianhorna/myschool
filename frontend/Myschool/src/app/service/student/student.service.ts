import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  public API = '//localhost:8080';
  public TEACHER_API = this.API + '/students';

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


  putClazz(student, clazzHref) {
    console.log("put clazz", clazzHref)
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(student.href + '/clazz', clazzHref, {headers: headers});
  }

  deleteClazz(student) {
    return this.http.delete(student.href + '/clazz');
  }
}
