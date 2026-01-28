import { useContext } from "react";
import { ViewContext } from "../context/ViewContext";

export const useViewContext = () => {
    const context = useContext(ViewContext);
    if (!context) {
        throw new Error("useViewContext must be used within a ViewContextProvider");
    }
    return context;
}
