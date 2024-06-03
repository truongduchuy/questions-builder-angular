import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormBuilderComponent } from '../components/form-builder/form-builder.component';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, FormBuilderComponent]
})
export class AppComponent {
  title = 'questions-form-builder';
}
