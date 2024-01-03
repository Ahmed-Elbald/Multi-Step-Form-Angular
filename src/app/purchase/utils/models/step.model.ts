import { FormControlStatus } from "@angular/forms";

export interface Step {
    name: string,
    validity: FormControlStatus
}