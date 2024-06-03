import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ANSWER_TYPE } from '../form-builder/form-builder.type';

@Component({
  selector: 'app-add-question-modal',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './add-question-modal.component.html',
  styleUrl: './add-question-modal.component.scss'
})
export class AddQuestionModalComponent {
  formModal = {
    required: false,
    allowOtherAnswer: false,
    answerType: ANSWER_TYPE.Textarea,
    answerOptions: [''],
    label: ''
  }
  answerType = ANSWER_TYPE;

  constructor(public dialogRef: MatDialogRef<AddQuestionModalComponent>) {}

  ngOnInit() {
  }

  addAnotherAnswer() {
    this.formModal.answerOptions.push('');
  }

  toggleAnswerType() {
    this.formModal.answerType = this.formModal.answerType === ANSWER_TYPE.Textarea ? ANSWER_TYPE.CheckList : ANSWER_TYPE.Textarea;
  }

  get isFormInvalid() {
    return !this.formModal.label
  }

  trackByFn(index: number) {
    return index; 
  }

  submit() {
    this.dialogRef.close(this.formModal);
  }
}
