import { Component, Input } from '@angular/core';
import { DurationPipe } from '../../utils/pipes/duration.pipe';
import { Plan } from '../../utils/models/plan.model';
import { AddOn } from '../../utils/models/add-on.model';
import { PlanDuration } from '../../utils/models/state.model';

@Component({
  selector: 'form-item-price',
  standalone: true,
  imports: [DurationPipe],
  templateUrl: './item-price.component.html',
  styleUrl: './item-price.component.scss'
})
export class ItemPriceComponent {

  @Input({ required: true }) value!: Plan | AddOn | number;
  @Input({ required: true }) duration!: PlanDuration;
  @Input() prefix: string = ""

}
