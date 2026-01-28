import { createContext, useState } from "react";
import type { ViewMode } from "../types";

export const ViewContext = createContext<{ view: ViewMode; setView: (view: ViewMode) => void } | null>(null);

export const ViewContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [view, setView] = useState<ViewMode>('builder');
    return (
        <ViewContext.Provider value={{ view, setView }}>
            {children}
        </ViewContext.Provider>
    )
}
    
