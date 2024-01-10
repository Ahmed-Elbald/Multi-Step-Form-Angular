import { Injectable } from "@angular/core"
import { ComponentStore } from "@ngrx/component-store"
import { FormControlStatus } from "@angular/forms"
import { tap } from "rxjs"

import { FormState, PersonalInfo, PlanDuration } from "../utils/models/state.model"

import { formSteps } from "./ui/steps";
import { formPlans } from "./ui/plans";
import { formAddOns } from "./ui/add-ons";
import { planDurationMap } from "./ui/plans";

const formInitialState: FormState = {
    steps: formSteps,
    plans: formPlans.map((plan, i) => ({ ...plan, selected: i === 0 })),
    addOns: formAddOns.map(addOn => ({ ...addOn, included: false })),

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

    // Initialization
    constructor() { super(formInitialState) }

    // Selectors
    private readonly steps$ = this.select(state => state.steps);
    private readonly plans$ = this.select(state => state.plans);
    private readonly addOns$ = this.select(state => state.addOns);

    private readonly currentStepIndex$ = this.select(state => state.currentStepIndex);
    private readonly selectedPlan$ = this.select(state => state.plans.find(plan => plan.selected));
    private readonly planDuration$ = this.select(state => state.userInput.planDuration);
    private readonly includedAddOns$ = this.select(state => state.addOns.filter(addOn => addOn.included));

    private readonly formSummary$ = this.select(
        this.selectedPlan$,
        this.includedAddOns$,
        this.planDuration$,
        (selectedPlan, includedAddOns, planDuration) => {

            if (selectedPlan) {
                const map = planDurationMap[planDuration];
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

    public readonly vm$ = this.select(
        this.steps$,
        this.plans$,
        this.addOns$,
        this.currentStepIndex$,
        this.planDuration$,
        this.selectedPlan$,
        this.includedAddOns$,
        this.formSummary$,
        (steps, plans, addOns, currentStepIndex, planDuration, selectedPlan, includedAddOns, formSummary) => ({
            steps,
            plans,
            addOns,
            currentStepIndex,
            planDuration,
            selectedPlan,
            includedAddOns,
            formSummary,
        })
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