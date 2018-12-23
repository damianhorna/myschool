import {Component, Inject} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {ClazzService} from "../../../../service/clazz/clazz.service";

export interface ClazzData {
  href: string;
  name: string;
  teacher: any
}

@Component({
  selector: 'clazz-add-dialog',
  templateUrl: './clazz-add-dialog.html',
})
export class ClazzAddDialog {

  errorMsg: string;
  error = false;

  constructor(
    public dialogRef: MatDialogRef<ClazzAddDialog>,
    @Inject(MAT_DIALOG_DATA) public clazzData: ClazzData,
    private clazzService: ClazzService) {
    console.log(clazzData)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  validationSuccessful() {
    if (this.clazzData.name.match(/^\s*$/)) {
      this.error = true;
      this.errorMsg = 'class name may not be empty';
      return false;
    } else return true;
  }


  saveClass() {
    this.clazzService.save({
      href: this.clazzData.href,
      name: this.clazzData.name.trim(),
    }).subscribe(result => {
      this.dialogRef.close();
    }, error => {
      this.error = true;
      this.errorMsg = 'Class with given name already exists!';
      console.log(error)
    });
  }

  addClazz() {
    this.error = false;
    if (this.validationSuccessful()) {
      this.saveClass()
    }
  }
}
