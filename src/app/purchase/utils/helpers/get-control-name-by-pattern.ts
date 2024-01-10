import { regularExpressions } from "../../data-access/ui/regular-expressions";

export function getControlName(pattern: RegExp | string) {
    let controlName = "input";
    for (const key in regularExpressions) {
        const regExp = regularExpressions[key as keyof typeof regularExpressions];
        if (regExp.pattern.toString() === pattern.toString())
            controlName = regExp.uiName;
    }
    return controlName;

}