import { Step } from "../../utils/models/step.model";

export const formSteps: Step[] = [
    { name: "your info", validity: "INVALID" },
    { name: "select plan", validity: "VALID" },
    { name: "add-ons", validity: "VALID" },
    { name: "summary", validity: "VALID" },
]