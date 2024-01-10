import { Component, Input } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AsyncPipe } from '@angular/common';

import { CardDirective } from '../../utils/directives/card.directive';
import { LinkPipe } from '../../utils/pipes/link.pipe';
import { DurationPipe } from '../../utils/pipes/duration.pipe';
import { PlanDuration } from '../../utils/models/state.model';
import { Plan } from '../../utils/models/plan.model';
import { ItemPriceComponent } from '../item-price/item-price.component';
import { AddOn } from '../../utils/models/add-on.model';

@Component({
  selector: 'form-add-ons',
  standalone: true,
  imports: [ItemPriceComponent, CardDirective, LinkPipe, DurationPipe, AsyncPipe, LetDirective],
  templateUrl: './add-ons.component.html',
  styleUrl: './add-ons.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AddOnsComponent,
      multi: true,
    }
  ]
})
export class AddOnsComponent implements ControlValueAccessor {

  // Control Value Accessor Implementaion
  writeValue(value: string[]): void {
    this.includedAddOns = value;
  }
  registerOnChange(fn: (includedAddOns: string[]) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Input variables
  @Input({ required: true }) public selectedPlan!: Plan | undefined;
  @Input({ required: true }) public duration!: PlanDuration;
  @Input({ required: true }) addOns!: AddOn[];

  // Public fields
  public includedAddOns: string[] = []

  public onChange(_includedAddOns: string[]) { }
  public onTouched() { }

  // Public methods
  handleChange(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.checked) {
      this.includedAddOns.push(target.defaultValue);
    } else {
      this.includedAddOns.splice(this.includedAddOns.indexOf(target.defaultValue), 1)
    }

    this.onTouched();
    this.onChange([...this.includedAddOns]);
  }

}
