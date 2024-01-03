import { Component, Input } from '@angular/core';
import { LinkPipe } from '../../utils/pipes/link.pipe';
import { CommonModule } from '@angular/common';
import { CapitalizePipe } from '../../../shared/pipes/capitalize.pipe';

@Component({
  selector: 'form-step',
  standalone: true,
  imports: [CommonModule, LinkPipe, CapitalizePipe],
  templateUrl: './step.component.html',
  styleUrl: './step.component.scss'
})
export class StepComponent {

  // Input variables
  @Input({ required: true }) public stepName: string = "";
  @Input({ required: true }) public heading: string = "";
  @Input() public group: boolean = true;

}
