import { FormControl, FormGroup } from "@angular/forms";

export interface Form {
    personalInfo: FormGroup<{
        name: FormControl<string>,
        email: FormControl<string>,
        phoneNumber: FormControl<string>
    }>,
    selectedPlan: FormGroup<{
        name: FormControl<string>,
        duration: FormControl<string>
    }>,
    includedAddOns: FormControl
}