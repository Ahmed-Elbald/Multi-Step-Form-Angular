import { Component, inject } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LetDirective } from '@ngrx/component';

import { DurationPipe } from '../../utils/pipes/duration.pipe';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { ItemPriceComponent } from '../item-price/item-price.component';
import { FormStore } from '../../data-access/form.store';

@Component({
  selector: 'form-summary',
  standalone: true,
  imports: [LetDirective, AsyncPipe, DurationPipe, CapitalizePipe, ItemPriceComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  // Public fields
  public summary$ = inject(FormStore).formSummary$;

}
