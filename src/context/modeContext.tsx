import { createContext, useState } from "react";

interface ModeContext {
    mode: string;
    setMode: React.Dispatch<React.SetStateAction<string>>
    nextMode: () => void
}

export const ModeContext = createContext<ModeContext>({} as ModeContext);

export const ModeProvider = ({children}: any) => {
    const [mode, setMode] = useState<string>('focus');

    function nextMode() {
        if (mode === 'focus') { 
            setMode('shortBreak')
        }
        if (mode === 'shortBreak') { 
            setMode('longBreak')
        }
        if (mode === 'longBreak') { 
            setMode('focus')
        }
    }

    console.log(mode + ' :: Context')

    return  (
        <ModeContext.Provider value={{mode: mode, setMode: setMode, nextMode: nextMode}}>
            {children}
        </ModeContext.Provider>
    )
}