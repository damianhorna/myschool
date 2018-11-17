import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {DialogData} from "../../subject-list/subject-list.component";
import {SubjectService} from "../../service/subject/subject.service";

@Component({
  selector: 'subject-add-dialog',
  templateUrl: 'subject-add-dialog.html',
})
export class SubjectAddDialog {

  name: string;

  constructor(
    public dialogRef: MatDialogRef<SubjectAddDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private subjectService: SubjectService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  addSubject(){
    this.subjectService.save({name : this.name}).subscribe(result => {
      console.log('subject addded')
    }, error => console.error(error));
  }
}
