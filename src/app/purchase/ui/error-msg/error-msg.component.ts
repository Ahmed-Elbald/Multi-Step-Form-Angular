import { Component, Input, inject } from '@angular/core';
import { AbstractControl, ControlContainer } from '@angular/forms';
import { fadeInOut } from '../../utils/animations/form.animations';

@Component({
  selector: 'form-error-msg',
  standalone: true,
  imports: [],
  templateUrl: './error-msg.component.html',
  styleUrl: './error-msg.component.scss',
  animations: [fadeInOut]
})
export class ErrorMsgComponent {

  // Deps
  private controlContainer = inject(ControlContainer, { optional: true });

  // Input Variables
  @Input({ alias: "controlName", required: true }) name!: string;

  // Public fields
  public fc!: AbstractControl | null | undefined;

  public get message(): string {
    const errorKey = Object.keys(this.fc!.errors!)[0];
    switch (errorKey) {
    case "required":
      return "This field is required"
    case "email":
      return "Invalid email"
    case "pattern":
      return "Invalid phone number"
    default:
      return "Invalid input"
    }
  }

  // Public Methods
  ngAfterViewInit(): void {
    setTimeout(() => this.fc = this.controlContainer?.control?.get(this.name), 0)
  }

}
