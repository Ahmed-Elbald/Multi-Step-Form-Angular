import { Component, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { LetDirective } from '@ngrx/component';

import { controlParentProvider } from '../../../app.config';
import { Form } from '../../utils/models/form.model';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';

@Component({
  selector: 'form-personal-info',
  standalone: true,
  imports: [ReactiveFormsModule, ErrorMsgComponent, LetDirective],
  templateUrl: './personal-info.component.html',
  styleUrl: './personal-info.component.scss',
  viewProviders: [controlParentProvider]
})
export class PersonalInfoComponent {

  // Deps
  public controlContainer = inject(ControlContainer).control as Form["personalInfo"];

  constructor() {
    this.controlContainer.parent?.dirty;
  }

}
