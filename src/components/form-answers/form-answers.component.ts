import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared-service.service';
import { ANSWER_TYPE } from '../form-builder/form-builder.type';

@Component({
  selector: 'app-form-answers',
  standalone: true,
  imports: [],
  templateUrl: './form-answers.component.html',
  styleUrl: './form-answers.component.scss'
})
export class FormAnswersComponent {
  constructor(private router: Router, private sharedService: SharedService) { }
  questions: any[] = [];
  answerType = ANSWER_TYPE;

  ngOnInit() {
    this.sharedService.currentQuestions.subscribe(questions => {
      this.questions = questions
    });
  }

  goBack() {
    this.router.navigate(['/form/builder'])
  }
}
