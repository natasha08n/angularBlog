import { Component, OnInit }                        from '@angular/core';
import { Inject }                                   from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClickSignUp(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}
