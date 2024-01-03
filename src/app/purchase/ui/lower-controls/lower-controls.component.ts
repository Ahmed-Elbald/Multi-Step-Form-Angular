import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Step } from '../../utils/models/step.model';
import { LinkPipe } from '../../utils/pipes/link.pipe';

@Component({
  selector: 'form-lower-controls',
  standalone: true,
  imports: [LinkPipe],
  templateUrl: './lower-controls.component.html',
  styleUrl: './lower-controls.component.scss'
})
export class LowerControlsComponent {

  // Input variables
  @Input({ required: true }) public currentStepIndex: number = 0;
  @Input({ required: true }) public steps: Step[] = [];

  // Outputs
  @Output() public stepChange = new EventEmitter<{ event: MouseEvent, index: number }>();

  // Public methods
  goBack(clickEvent: MouseEvent) {
    this.stepChange.emit({ event: clickEvent, index: this.currentStepIndex - 1 });
  }

  goForward(clickEvent: MouseEvent) {
    this.stepChange.emit({ event: clickEvent, index: this.currentStepIndex + 1 });
  }

  confirm(clickEvent: MouseEvent) {
    this.stepChange.emit({ event: clickEvent, index: -1 });
  }

}
