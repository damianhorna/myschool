import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GradeService {

  public API = '//localhost:8080';
  public GRADE_API = this.API + '/grades';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.GRADE_API)
  }

  save(grade): Observable<any> {
    if (grade['href']) {
      return this.http.put(grade.href, grade);
    } else {
      return this.http.post(this.GRADE_API, grade);
    }
  }

  remove(href: string) {
    return this.http.delete(href);
  }

  putLesson(gradeHref, lessonHref){
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(gradeHref + '/lesson', lessonHref, {headers: headers});
  }

  putStudent(gradeHref, studentHref){
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(gradeHref + '/student', studentHref, {headers: headers});
  }

  putTest(gradeHref, testHref){
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(gradeHref + '/test', testHref, {headers: headers});
  }

  putTeacher(gradeHref, teacherHref) {
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(gradeHref + '/teacher', teacherHref, {headers: headers});
  }

  deleteTeacher(grade){
    return this.http.delete(grade.href + '/teacher');
  }
}
