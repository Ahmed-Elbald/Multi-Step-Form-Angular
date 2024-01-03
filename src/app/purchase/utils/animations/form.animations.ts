import { animate, group, query, state, style, transition, trigger } from "@angular/animations";

export const changeStep = trigger(
    "change",
    [
        transition(
            ':increment, :decrement',
            [
                style({ position: 'relative' }),
                query('*', [
                    style({ position: 'relative' })
                ]),
                group([
                    query(':leave', [
                        animate(125, style({
                            opacity: 0,
                        }))
                    ]),
                    query(':enter', [
                        style({ top: '2.25rem', left: '0', position: 'absolute', opacity: 0, zIndex: -1 }),
                        animate(250, style({
                            opacity: 1
                        }))
                    ]),
                ])
            ]
        )
    ]
)

export const fadeInOut = trigger(
    "fadeInOut",
    [
        state("void", style({ opacity: 0 })),
        state("in", style({ opacity: 1 })),
        transition(":enter", animate(250)),
        transition(":leave", animate(250)),
    ]
)