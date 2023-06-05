export const modeConstant = {
    FOCUS_MODE: 1,
    SHORTBREAK_MODE: 2,
    LONGBREAK_MODE: 3,

    getString(id: number) {
        return {
            1: 'focus',
            2: 'shortBreak',
            3: 'longBreak',
        }[id]
    }
}


