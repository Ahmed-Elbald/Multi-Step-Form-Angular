import { Component, Input, inject } from '@angular/core';
import { ErrorMsgComponent } from '../error-msg/error-msg.component';
import { AbstractControl, ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { constants } from '../../../shared/constants';

@Component({
  selector: 'form-textbox',
  standalone: true,
  imports: [ErrorMsgComponent, ReactiveFormsModule],
  templateUrl: './textbox.component.html',
  styleUrl: './textbox.component.scss',
  viewProviders: [constants.controlParentProvider],
})
export class TextboxComponent {

  // Deps
  private controlContainer = inject(ControlContainer).control;

  // Input variables
  @Input() name = "";
  @Input() type = "text";
  @Input() placeholder = "";
  @Input() autoComplete = "";
  @Input() isRequired = true;
  @Input() defaultFocus = false;
  @Input({ required: true }) label = "";

  // Public fields
  public control: AbstractControl | undefined | null = undefined;

  ngAfterViewInit() {
    this.control = this.controlContainer?.get(this.name)
  }

}
