import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { SubjectService } from '../shared/subject/subject.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  subject: any = {};
  sub: Subscription;
  constructor(private route: ActivatedRoute,
              private router: Router,
              private subjectService: SubjectService,) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.subjectService.get(id).subscribe((subject: any) => {
          if (subject) {
            this.subject = subject;
            this.subject.href = subject._links.self.href;
          } else {
            console.log(`Subject with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/subject-list']);
  }

  save(form: NgForm) {
    this.subjectService.save(form).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.subjectService.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
