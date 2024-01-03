import { Component, Input, inject } from '@angular/core';
import { constants } from '../../../shared/constants';
import { Plan } from '../../utils/models/plan.model';
import { PlanDuration } from '../../utils/models/state.model';
import { DurationPipe } from '../../utils/pipes/duration.pipe';
import { ReactiveFormsModule } from '@angular/forms';
import { CardDirective } from '../../utils/directives/card.directive';
import { ItemPriceComponent } from '../item-price/item-price.component';
import { FormStore } from '../../data-access/form.store';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'form-plans',
  standalone: true,
  imports: [ReactiveFormsModule, ItemPriceComponent, CardDirective, DurationPipe, AsyncPipe],
  templateUrl: './plans.component.html',
  styleUrl: './plans.component.scss',
  viewProviders: [constants.controlParentProvider]
})
export class PlansComponent {

  // Input variables
  @Input({ required: true }) public duration!: PlanDuration;

  // Public fields
  public plans = inject(FormStore).plans$;

}
