import { Pipe, PipeTransform } from '@angular/core';
import { PlanDuration } from '../models/state.model';
import { Plan } from '../models/plan.model';
import { constants } from '../../../shared/constants';
import { AddOn } from '../models/add-on.model';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {

  transform(item: Plan | AddOn | number, duration: PlanDuration, format: "short" | "full"): string {
    const durationMap = constants.planDurationMap[duration];
    const price = typeof item === "number" ? item : item[durationMap["access"]];
    return `$${price}${durationMap[format]}`;
  }

}
