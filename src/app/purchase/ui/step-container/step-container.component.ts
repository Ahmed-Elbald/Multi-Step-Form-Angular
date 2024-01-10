import { Component, Input } from '@angular/core';
import { LinkPipe } from '../../utils/pipes/link.pipe';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'form-step-container',
  standalone: true,
  imports: [CommonModule, LinkPipe, CapitalizePipe],
  templateUrl: './step-container.component.html',
  styleUrl: './step-container.component.scss',
})
export class StepContainerComponent {

  // Input variables
  @Input({ required: true }) public stepName: string = "";
  @Input({ required: true }) public heading: string = "";
  @Input() public group: boolean = true;

}
