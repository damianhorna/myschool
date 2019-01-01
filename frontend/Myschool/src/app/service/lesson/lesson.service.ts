import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LessonService {

  public API = '//localhost:8080';
  public TEACHER_API = this.API + '/lessons';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any> {
    return this.http.get(this.TEACHER_API)
  }

  getAbsences(sid): Observable<any> {
    return this.http.get(this.TEACHER_API + '/search/getAbsences?studentId=' + sid)
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

  putClazz(lessonHref, clazzHref) {
    console.log("put clazz", clazzHref);
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(lessonHref + '/clazz', clazzHref, {headers: headers});
  }

  putClassroom(lessonHref, classroomHref) {
    console.log("put classroom", classroomHref);
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(lessonHref + '/classroom', classroomHref, {headers: headers});
  }

  putSubject(lessonHref, subjectHref) {
    console.log("put subject", subjectHref);
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(lessonHref + '/subject', subjectHref, {headers: headers});
  }


  putTeacher(lessonHref, teacherHref) {
    console.log("put teacher", teacherHref)
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    return this.http.put(lessonHref + '/teacher', teacherHref, {headers: headers});
  }

  putPresentStudents(lessonHref, presentStudentsHrefs) {
    console.log(presentStudentsHrefs);
    let body = "";
    for (let href of presentStudentsHrefs) {
      body += href + "\n";
    }
    const headers = new HttpHeaders().set('Content-Type', 'text/uri-list; charset=utf-8');
    if (presentStudentsHrefs.length == 0) {
      return this.http.put(lessonHref + '/presentStudents', null, {headers: headers});
    } else {
      return this.http.put(lessonHref + '/presentStudents', body, {headers: headers});
    }
  }
}
