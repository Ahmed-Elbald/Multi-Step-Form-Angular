import { AddOn } from "./add-on.model";
import { Plan } from "./plan.model";
import { Step } from "./step.model";

export interface PersonalInfo {
    name: string,
    email: string,
    phoneNumber: string,
}

export type PlanDuration = "monthly" | "yearly";

export interface FormState {
    currentStepIndex: number,
    steps: Step[],
    plans: Plan[],
    addOns: AddOn[]
    userInput: {
        personalInfo: PersonalInfo,
        planDuration: PlanDuration
    }
}