import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ANSWER_TYPE, Question } from './form-builder.type';
import { JsonPipe } from '@angular/common';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';
import { Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionModalComponent } from '../add-question-modal/add-question-modal.component';

@Component({
  selector: 'app-form-builder',
  standalone: true,
  imports: [FormsModule, JsonPipe, ReactiveFormsModule,],
  templateUrl: './form-builder.component.html',
  styleUrl: './form-builder.component.scss'
})
export class FormBuilderComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private sharedService: SharedService, public dialogRef: MatDialog) { }
  answerType = ANSWER_TYPE;

  ngOnInit() {
    this.sharedService.currentQuestions.subscribe(questions => {
      const prevQuestions = (questions || [])?.map(question => this.createQuestion(question.answerType, question.label, question.options?.map(option => option.option), question.allowOtherAnswer));
       
      this.form = this.formBuilder.group({
        questions: this.formBuilder.array(prevQuestions)
      });
    });
  }

  createQuestion(answerType: ANSWER_TYPE, label: string, options?: string[], allowOtherAnswer?: boolean, required?: boolean): FormGroup {
    return this.formBuilder.group({
      answerType: [answerType],
      label: [label],
      options: this.formBuilder.array(options?.map(option => this.formBuilder.group({
        option: [option],
        selected: [false]
      })) || []),
      allowOtherAnswer: [allowOtherAnswer || false],
      answer: ['', answerType === ANSWER_TYPE.Textarea && required ? Validators.required : null],
      other: [''],
      otherText: [''],
      required: [required || false]
    });
  }

  get questions(): FormArray {
    return this.form.get('questions') as FormArray;
  }

  get isFormInvalid() {
    const checkListQuestionsInvalid = this.questions.value.some((question: Question) => {
      if(question.required) {
        if(question.answerType === ANSWER_TYPE.CheckList) {
          if(question.other) {
            return question.otherText === '';
          }
  
          const noSelected = question.options?.every(option => !option.selected);
          return noSelected;
        }
      }

      return false;
    })
    return this.form.invalid || checkListQuestionsInvalid;
  }

  addNewQuestion() {
     const dialog = this.dialogRef.open(AddQuestionModalComponent,  {
      maxWidth: '350px',
    });

    dialog.afterClosed().subscribe(result => {
      if(result) {
        debugger
        const question = this.createQuestion(result.answerType, result.label, result.answerOptions, result.allowOtherAnswer, result.required);
        this.questions.push(question);
      }
    });
  }

  reviewAnswers() {
    this.sharedService.changeQuestions(this.form.get('questions')?.value);
    this.router.navigate(['/form/answers'])
  }
}
