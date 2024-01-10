import { Plan } from "../../utils/models/plan.model";

export const formPlans: Omit<Plan, "selected">[] = [
    {
        name: "arcade",
        pricePerMonth: 9,
        pricePerYear: 90,
        gift: "2 months free",
        icon: "assets/images/icon-arcade.svg"
    },
    {
        name: "advanced",
        pricePerMonth: 12,
        pricePerYear: 120,
        gift: "2 months free",
        icon: "assets/images/icon-advanced.svg"
    },
    {
        name: "pro",
        pricePerMonth: 15,
        pricePerYear: 150,
        gift: "2 months free",
        icon: "assets/images/icon-pro.svg"
    }
]

export const planDurationMap = {
    monthly: {
        short: "/mo",
        full: " per month",
        access: "pricePerMonth"
    },
    yearly: {
        short: "/yr",
        full: " per year",
        access: "pricePerYear"
    },
} as const;