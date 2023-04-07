import React from "react";
import "./style.css";

interface Props {

}

export const Loading: React.FC<Props> = () => {
    return (
        <>
           <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div> 
        </>
    )
}