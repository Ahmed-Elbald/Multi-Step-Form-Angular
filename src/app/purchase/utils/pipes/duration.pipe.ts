import { Pipe, PipeTransform } from '@angular/core';
import { PlanDuration } from '../models/state.model';
import { Plan } from '../models/plan.model';
import { AddOn } from '../models/add-on.model';
import { planDurationMap } from '../../data-access/ui/plans';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(item: Plan | AddOn | number, duration: PlanDuration, format: "short" | "full"): string {
    const map = planDurationMap[duration];
    const price = typeof item === "number" ? item : item[map["access"]];
    return `$${price}${map[format]}`;
  }

}
