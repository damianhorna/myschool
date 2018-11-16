import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {SubjectService} from "../service/subject/subject.service";

@Component({
  selector: 'app-subject-edit',
  templateUrl: './subject-edit.component.html',
  styleUrls: ['./subject-edit.component.css']
})
export class SubjectEditComponent implements OnInit {
  subject: any = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private subjectService: SubjectService) {
  }

  ngOnInit() {
    this.subject = this.subjectService.editedSubject;
  }

  gotoList() {
    this.router.navigate(['/subject-list']);
  }

  save() {
    this.subjectService.save().subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove() {
    this.subjectService.remove().subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

}
