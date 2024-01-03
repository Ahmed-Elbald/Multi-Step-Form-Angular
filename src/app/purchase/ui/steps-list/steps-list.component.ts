import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LetDirective } from '@ngrx/component';

import { LinkPipe } from '../../utils/pipes/link.pipe';
import { Step } from '../../utils/models/step.model';

@Component({
  selector: 'form-steps-list',
  standalone: true,
  imports: [LinkPipe, LetDirective],
  templateUrl: './steps-list.component.html',
  styleUrl: './steps-list.component.scss'
})
export class StepsListComponent {

  // Input variables
  @Input({ required: true }) public steps: Step[] = [];
  @Input({ required: true }) public currentStepIndex: number = 0;

  // Outputs
  @Output() public stepChange = new EventEmitter<{ event: MouseEvent, index: number }>();

  // Public methods
  navigateToStep(clickEvent: MouseEvent, index: number) {
    if (index === this.currentStepIndex) {
      clickEvent.preventDefault();
      return;
    };
    this.stepChange.emit({ event: clickEvent, index: index });
  }

}
