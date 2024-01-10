import { Component, OnInit, inject } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, map } from 'rxjs';

import { StepsListComponent } from '../../ui/steps-list/steps-list.component';
import { LowerControlsComponent } from '../../ui/lower-controls/lower-controls.component';
import { FormStore } from '../../data-access/form.store';
import { Form } from '../../utils/models/form.model';
import { StepContainerComponent } from '../../ui/step-container/step-container.component';
import { LinkPipe } from '../../utils/pipes/link.pipe';
import { DurationSwitchComponent } from '../../ui/duration-switch/duration-switch.component';
import { PersonalInfo, PlanDuration } from '../../utils/models/state.model';
import { PlansComponent } from '../../ui/plans/plans.component';
import { AddOnsComponent } from '../../ui/add-ons/add-ons.component';
import { SummaryComponent } from '../../ui/summary/summary.component';
import { childFadeInOutAnimatoin } from '../../../shared/animations/form.animations';
import { regularExpressions } from '../../data-access/ui/regular-expressions';
import { PersonalInfoComponent } from '../../ui/personal-info/personal-info.component';
import { ConfirmationMsgComponent } from '../../ui/confirmation-msg/confirmation-msg.component';
import { AnimationEvent } from '@angular/animations';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, StepContainerComponent, StepsListComponent,
    PersonalInfoComponent, PlansComponent, AddOnsComponent, DurationSwitchComponent,
    SummaryComponent, ConfirmationMsgComponent, LowerControlsComponent, LetDirective
  ],
  providers: [FormStore, LinkPipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  animations: [childFadeInOutAnimatoin]
})
export class FormComponent implements OnInit {

  // Deps
  private fb = new FormBuilder().nonNullable;
  private store = inject(FormStore);

  // Public fields
  public form!: FormGroup<Form>;
  public vm$ = this.store.vm$;

  // Public Methods
  ngOnInit(): void {
    // Initialize The Form
    this.createForm();
    // Trigger State Updates
    this.triggerStateUpdates();
  }

  createForm() {
    this.form = this.fb.group({
      personalInfo: this.fb.group({
        name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        phoneNumber: ["", [Validators.required, Validators.pattern(regularExpressions["phoneNumber"].pattern)]]
      }, { updateOn: "blur" }),
      selectedPlan: this.fb.group({
        name: [""],
        duration: ["monthly"]
      }),
      includedAddOns: this.fb.control([])
    })
  }

  triggerStateUpdates() {
    this.store.setPersonalInfo(this.form.controls.personalInfo.valueChanges as unknown as PersonalInfo);
    this.store.setSelectedPlan(this.form.controls.selectedPlan.controls.name.valueChanges);
    this.store.setPlanDuration(this.form.controls.selectedPlan.controls.duration.valueChanges as unknown as PlanDuration)
    this.store.setIncludedAddOns(this.form.controls.includedAddOns.valueChanges);
    this.store.setStepsValidity(
      combineLatest([this.form.controls.personalInfo.statusChanges]).pipe(
        map(([personalInfo]) => ({ 'your info': personalInfo }))
      )
    )
  }

  togglePlanDuration(currentPlanDuration: PlanDuration) {
    this.form.controls.selectedPlan.controls.duration
      .setValue(currentPlanDuration === "monthly" ? "yearly" : "monthly")
  }

  handleStepChange(navigationData: { event: MouseEvent, index: number }) {
    this.store.navigateToStep(navigationData);

    for (const control of Object.values(this.form.controls.personalInfo.controls))
      if (control.invalid) {
        control.markAsTouched();
        break;
      }

  }

  onStepChange(animationEvent: AnimationEvent) {
    setTimeout(() =>
      (animationEvent.element.querySelector("[data-autoFocus='true']") as HTMLInputElement | undefined)?.focus()
      , 0)
  }

}
