import { balanceAtom } from "../atoms/balance.js";
import { useAtomValue } from "jotai";

export const useBalance = ()=>{
    const value = useAtomValue(balanceAtom);
    return value;
    
}
