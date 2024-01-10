import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { PlanDuration } from '../../utils/models/state.model';
import { controlParentProvider } from '../../../app.config';

@Component({
  selector: 'form-duration-switch',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './duration-switch.component.html',
  styleUrl: './duration-switch.component.scss',
  viewProviders: [controlParentProvider]
})
export class DurationSwitchComponent {

  // Input variable
  @Input({ required: true }) public planDuration!: PlanDuration;

  // Outputs
  @Output() public durationChange = new EventEmitter<PlanDuration>();

  // Public methods
  onDurationChange(currentPlanDuration: PlanDuration) {
    this.durationChange.emit(currentPlanDuration);
  }

}
