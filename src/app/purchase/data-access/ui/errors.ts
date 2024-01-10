import { getControlName } from "../../utils/helpers/get-control-name-by-pattern";

export const formErrorMsgs: { [key: string]: (args: any) => string } = {
    "other": () => "Invalid input",
    "required": () => "This field is required",
    "email": () => "Invalid email",
    "pattern": (patternError: { requiredPattern: string | RegExp, actualValue: string }) =>
        `Invalid ${getControlName(patternError.requiredPattern)}`,

}