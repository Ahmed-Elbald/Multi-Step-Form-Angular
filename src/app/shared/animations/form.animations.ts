import { animate, query, state, style, transition, trigger } from "@angular/animations";

type AnimationConfig = { duration?: number, delay?: number, timingFunction?: string }

function enterLeaveAnimationFactory
    ({ duration, delay = 0, timingFunction = 'linear' }: AnimationConfig = { duration: 250, delay: 0, timingFunction: 'linear' },
        triggerName: string,
        voidStyles: { [key: string]: any },
        inStyles: { [key: string]: any }) {
    return trigger(
        triggerName,
        [
            state("void", style(voidStyles)),
            state("in", style(inStyles)),
            transition(":enter", animate(`${duration}ms ${delay}ms ${timingFunction}`)),
            transition(":leave", animate(`${duration}ms ${delay}ms ${timingFunction}`)),
        ]
    );
}

export function fadeInOutAnimation(animationConfig?: AnimationConfig) {
    return enterLeaveAnimationFactory(animationConfig, "fadeInOut", { opacity: 0 }, { opacity: 1 })
}

export const childFadeInOutAnimatoin = trigger(
    "childFadeInOutMerge",
    [
        transition(":increment, :decrement", [
            style({ position: "relative" }),
            query(":enter", [
                style({ position: "absolute", opacity: 0, top: 0 })
            ], { optional: true }),
            query(":leave", [
                animate(250, style({ opacity: 0 })),
                style({ display: "none" })
            ], { optional: true }),
            query(":enter", [
                style({ position: "relative" }),
                animate(250, style({ opacity: 1, height: "*" }))
            ], { optional: true }),
        ])
    ]
);