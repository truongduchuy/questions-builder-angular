import { Routes } from '@angular/router';
import { FormBuilderComponent } from '../components/form-builder/form-builder.component';
import { FormAnswersComponent } from '../components/form-answers/form-answers.component';

export const routes: Routes = [
    { path: '', redirectTo: '/form/builder', pathMatch: 'full' },
    { path: 'form/builder', component: FormBuilderComponent },
    { path: 'form/answers', component: FormAnswersComponent }
];
