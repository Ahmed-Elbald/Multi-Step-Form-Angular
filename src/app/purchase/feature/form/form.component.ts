import { Component, OnInit, inject } from '@angular/core';
import { LetDirective } from '@ngrx/component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { combineLatest, map } from 'rxjs';

import { StepsListComponent } from '../../ui/steps-list/steps-list.component';
import { LowerControlsComponent } from '../../ui/lower-controls/lower-controls.component';
import { FormStore } from '../../data-access/form.store';
import { Form } from '../../utils/models/form.model';
import { StepComponent } from '../../ui/step/step.component';
import { LinkPipe } from '../../utils/pipes/link.pipe';
import { TextboxComponent } from '../../ui/textbox/textbox.component';
import { DurationSwitchComponent } from '../../ui/duration-switch/duration-switch.component';
import { constants } from '../../../shared/constants';
import { PersonalInfo, PlanDuration } from '../../utils/models/state.model';
import { PlansComponent } from '../../ui/plans/plans.component';
import { AddOnsComponent } from '../../ui/add-ons/add-ons.component';
import { SummaryComponent } from '../../ui/summary/summary.component';
import { changeStep } from '../../utils/animations/form.animations';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    ReactiveFormsModule, StepComponent, StepsListComponent,
    TextboxComponent, PlansComponent, AddOnsComponent, DurationSwitchComponent,
    SummaryComponent, LowerControlsComponent, LetDirective
  ],
  providers: [FormStore, LinkPipe],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
  animations: [changeStep]
})
export class FormComponent implements OnInit {

  // Deps
  private fb = new FormBuilder().nonNullable;
  private store = inject(FormStore);

  // Public fields
  public steps$ = this.store.steps$;
  public selectedPlan$ = this.store.selectedPlan$;
  public planDuration$ = this.store.planDuration$;
  public currentStepIndex$ = this.store.currentStepIndex$;

  public form!: FormGroup<Form>;

  // Public Methods
  ngOnInit(): void {
    // Initialize The Form
    this.createForm();
    // Trigger State Updates
    this.triggerStateUpdates();
    // Load Form Data And Set Default Form Values
    this.store.init(this.form);
  }

  createForm() {
    this.form = this.fb.group({
      personalInfo: this.fb.group({
        name: ["", [Validators.required]],
        email: ["", [Validators.required, Validators.email]],
        phoneNumber: ["", [Validators.required, Validators.pattern(constants.phoneNumberRegExp)]]
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
    this.form.controls.personalInfo.markAllAsTouched();
    setTimeout(
      () => (document.querySelector("[data-autoFocus='true']") as HTMLInputElement | undefined)?.focus(),
      750
    )
  }

}
