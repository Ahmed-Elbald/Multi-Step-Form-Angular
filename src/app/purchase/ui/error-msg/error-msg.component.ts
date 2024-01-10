import { AfterViewInit, Component, Input, inject } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { fadeInOutAnimation } from '../../../shared/animations/form.animations';
import { formErrorMsgs } from '../../data-access/ui/errors';

@Component({
  selector: 'form-error-msg',
  standalone: true,
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss',
  animations: [fadeInOutAnimation()]
})
export class ErrorMsgComponent implements AfterViewInit {

  // Deps
  private controlContainer = inject(ControlContainer, { optional: true })?.control;

  // Input Variables
  @Input({ alias: "controlName", required: true }) name!: string;

  // Public fields
  public fc!: AbstractControl | null | undefined;

  public get message(): string {
    const errors = this.fc!.errors!
    const errorKey = Object.keys(errors)[0];
    return formErrorMsgs[errorKey](errors[errorKey])
  }

  // Public Methods
  ngAfterViewInit(): void {
    setTimeout(() => this.fc = this.controlContainer?.get(this.name), 0)
  }

}
