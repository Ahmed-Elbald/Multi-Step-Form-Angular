import { AddOn } from "../../utils/models/add-on.model";

export const formAddOns: Omit<AddOn, "included">[] = [
    {
        name: "online service",
        description: "Access to multiplayer games",
        pricePerMonth: 1,
        pricePerYear: 10
    },
    {
        name: "larger storage",
        description: "Extra 1TB of cloud save",
        pricePerMonth: 2,
        pricePerYear: 20
    },
    {
        name: "customizable profile",
        description: "Custom theme on your profile",
        pricePerMonth: 2,
        pricePerYear: 20
    }
]