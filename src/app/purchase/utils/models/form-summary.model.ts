import { PlanDuration } from "./state.model";

export interface FormSummary {

    duration: PlanDuration,
    plan: {
        name: string,
        price: number
    },
    addOns: {
        name: string,
        price: number
    }[],
    totalPrice: number

}