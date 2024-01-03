import { Injectable, inject } from "@angular/core"
import { ComponentStore, tapResponse } from "@ngrx/component-store"
import { combineLatest, tap } from "rxjs"
import { HttpErrorResponse } from "@angular/common/http"

import { FormState, PersonalInfo, PlanDuration } from "../utils/models/state.model"
import { FormDataService } from "./form-data.service"
import { FormControlStatus, FormGroup } from "@angular/forms"
import { constants } from "../../shared/constants"
import { Form } from "../utils/models/form.model"

const formInitialState: FormState = {
    steps: [
        { name: "your info", validity: "INVALID" },
        { name: "select plan", validity: "VALID" },
        { name: "add-ons", validity: "VALID" },
        { name: "summary", validity: "VALID" },
    ],
    plans: [],
    addOns: [],
    currentStepIndex: 0,
    userInput: {
        personalInfo: {
            name: "",
            email: "",
            phoneNumber: ""
        },
        planDuration: "monthly"
    }
}

// Store
@Injectable()
export class FormStore extends ComponentStore<FormState> {

    // Deps
    private formDataService = inject(FormDataService);

    // Initialization
    constructor() { super(formInitialState) }

    // Selectors
    public readonly steps$ = this.select(state => state.steps);
    public readonly plans$ = this.select(state => state.plans);
    public readonly addOns$ = this.select(state => state.addOns);

    public readonly currentStepIndex$ = this.select(state => state.currentStepIndex);
    public readonly selectedPlan$ = this.select(state => state.plans.find(plan => plan.selected));
    public readonly planDuration$ = this.select(state => state.userInput.planDuration);
    public readonly includedAddOns$ = this.select(state => state.addOns.filter(addOn => addOn.included));

    public readonly formSummary$ = this.select(
        this.selectedPlan$,
        this.includedAddOns$,
        this.planDuration$,
        (selectedPlan, includedAddOns, planDuration) => {

            if (selectedPlan) {
                const map = constants.planDurationMap[planDuration];
                return {
                    duration: planDuration,
                    plan: {
                        name: selectedPlan.name,
                        price: selectedPlan[map["access"]]
                    },
                    addOns: includedAddOns.map((addOn) =>
                        ({ name: addOn.name, price: addOn[map["access"]] })
                    ),
                    totalPrice: [...includedAddOns, selectedPlan]
                        .map(item => item[map["access"]]).reduce((prev, curr) => prev + curr)
                }
            }

            return null;
        }
    )

    // Updaters
    public setCurrentStepIndex = this.updater(
        (state, index: number) => ({ ...state, currentStepIndex: index })
    );
    public setPersonalInfo = this.updater(
        (state, personalInfo: PersonalInfo) => ({ ...state, userInput: { ...state.userInput, personalInfo } })
    );
    public setSelectedPlan = this.updater(
        (state, planName: string) => ({ ...state, plans: state.plans.map(plan => ({ ...plan, selected: plan.name === planName })) })
    );
    public setIncludedAddOns = this.updater(
        (state, includedAddOns: string[]) => ({ ...state, addOns: state.addOns.map(addOn => ({ ...addOn, included: includedAddOns.includes(addOn.name) })) })
    )
    public setPlanDuration = this.updater(
        (state, duration: PlanDuration) => ({ ...state, userInput: { ...state.userInput, planDuration: duration } })
    );
    public setStepsValidity = this.updater(
        (state, stepsValididty: { [key: string]: FormControlStatus }) => ({
            ...state,
            steps: state.steps.map(step => ({ ...step, validity: stepsValididty[step.name] || "VALID" }))
        })
    )

    // Effects
    public readonly init = this.effect<FormGroup>(
        fg$ => combineLatest([this.formDataService.getPlans(), this.formDataService.getAddOns()])
            .pipe(tapResponse({
                next: ([plans, addOns]) => {

                    // Populate State
                    this.patchState((state) => ({
                        ...state,
                        plans: plans.map((plan, index) => ({ ...plan, selected: index === 0 })),
                        addOns: addOns.map(addOn => ({ ...addOn, included: false }))
                    }));

                    // Set Form Defaults
                    this.setFormDefaults(fg$)
                },
                error: (error: HttpErrorResponse) => console.log(error)
            }))
    );

    public readonly setFormDefaults = this.effect<FormGroup<Form>>(
        (fg$) => fg$.pipe(tap(fg => {
            fg.controls.selectedPlan.controls.name.setValue(this.get(state => state.plans[0].name))
        }))
    );

    public readonly navigateToStep = this.effect<{ event: MouseEvent, index: number }>(
        (navigationData$) => navigationData$.pipe(tap(({ event, index }) => {

            const currentStepIndex = this.get((state) => state.currentStepIndex);
            const steps = this.get((state) => state.steps);

            if (currentStepIndex === -1 || steps[currentStepIndex]["validity"] !== "VALID")
                event.preventDefault();
            else
                this.setCurrentStepIndex(index)
        }))
    )

}