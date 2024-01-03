import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './purchase/feature/form/form.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
}
