import { Component, Input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { LetDirective } from '@ngrx/component';

import { DurationPipe } from '../../utils/pipes/duration.pipe';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';
import { ItemPriceComponent } from '../item-price/item-price.component';
import { FormSummary } from '../../utils/models/form-summary.model';

@Component({
  selector: 'form-summary',
  standalone: true,
  imports: [LetDirective, AsyncPipe, DurationPipe, CapitalizePipe, ItemPriceComponent],
  templateUrl: './summary.component.html',
  styleUrl: './summary.component.scss'
})
export class SummaryComponent {

  // Input variables
  @Input({ required: true }) summary!: FormSummary;

}
