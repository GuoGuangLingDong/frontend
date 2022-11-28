import { useState } from "react";

export const Search = ()=>{
    const [donateAmount, setAmount] = useState("");
    
    return <input type="number" value={donateAmount} onChange={(e) => {
      const str = e?.target?.value;
      setAmount(str)
    }} className="border-none h-10 rounded-md mr-1 w-80 outline-none px-3 text-md" placeholder="Search for review" />
}