import { Component, Input, OnInit, inject } from '@angular/core';
import { ControlContainer, ReactiveFormsModule } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { Plan } from '../../utils/models/plan.model';
import { PlanDuration } from '../../utils/models/state.model';
import { DurationPipe } from '../../utils/pipes/duration.pipe';
import { CardDirective } from '../../utils/directives/card.directive';
import { ItemPriceComponent } from '../item-price/item-price.component';
import { controlParentProvider } from '../../../app.config';
import { Form } from '../../utils/models/form.model';


@Component({
  selector: 'form-plans',
  standalone: true,
  imports: [ReactiveFormsModule, ItemPriceComponent, CardDirective, DurationPipe, AsyncPipe],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
  viewProviders: [controlParentProvider]
})
export class PlansComponent implements OnInit {

  // Deps
  planFormControl = (inject(ControlContainer).control as Form["selectedPlan"]).controls.name;

  // Input variables
  @Input({ required: true }) public duration!: PlanDuration;
  @Input({ required: true }) plans!: Plan[];

  ngOnInit(): void {
    // Set default value
    if (this.planFormControl.value === this.planFormControl.defaultValue)
      this.planFormControl.setValue(this.plans[0].name);
  }

}
