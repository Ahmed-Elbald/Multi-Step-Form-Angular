import { inject } from "@angular/core";
import { ControlContainer } from "@angular/forms";

export const constants = {
    phoneNumberRegExp: /^[+]*\({0,1}[0-9]{1,4}\){0,1}[-\s\./0-9]*$/,

    controlParentProvider: {
        provide: ControlContainer,
        useFactory: () => inject(ControlContainer, { skipSelf: true })
    },

    planDurationMap: {
        "monthly": {
            "short": "/mo",
            "full": " per month",
            "access": "pricePerMonth"
        },
        "yearly": {
            "short": "/yr",
            "full": " per year",
            "access": "pricePerYear"
        },
    }
} as const;