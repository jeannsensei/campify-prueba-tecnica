import { isStartTimeGreaterThanEndTime } from './../../utils/isStartTimeGreater';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

const SESSION_KEY = 'session';

export const isStartTimeGreater: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const startTime = control.get('startTime')?.value;
  const endTime = control.get('endTime')?.value;
  if (isStartTimeGreaterThanEndTime(startTime, endTime))
    return { timeMismatch: true };
  return null;
};

export class TimeErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const startTime = form?.form.controls['startTime'];
    const endTime = form?.form.controls['endTime'];
    const isSubmitted = form && form.submitted;

    if (isStartTimeGreaterThanEndTime(startTime?.value, endTime?.value))
      return true;

    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
}

@Component({
  selector: 'app-add-session-form',
  templateUrl: './add-session-form.component.html',
  styleUrls: ['./add-session-form.component.scss'],
})
export class AddSessionFormComponent implements OnInit {
  sessionForm: FormGroup = this.fb.group(
    {
      name: [null, Validators.required],
      startDate: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
    },
    { validators: [isStartTimeGreater] }
  );
  timeMatcher = new TimeErrorStateMatcher();

  constructor(public dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.setFormInfo();
  }

  closeDialog(): void {
    this.dialog.closeAll();
  }

  get f() {
    return this.sessionForm.controls;
  }

  onSubmit() {
    if (this.sessionForm.invalid) {
      this.sessionForm.markAllAsTouched();
      return;
    }

    localStorage.setItem(SESSION_KEY, JSON.stringify(this.sessionForm.value));
    this.closeDialog();
  }

  setFormInfo() {
    const savedSessionForm = localStorage.getItem(SESSION_KEY);
    if (!savedSessionForm) return;

    const data = JSON.parse(savedSessionForm);
    this.sessionForm.controls['name'].setValue(data.name);
    this.sessionForm.controls['startDate'].setValue(data.startDate);
    this.sessionForm.controls['startTime'].setValue(data.startTime);
    this.sessionForm.controls['endTime'].setValue(data.endTime);
  }
}
