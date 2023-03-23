import React, { ReactNode } from "react";
import "./style.css";

interface Props {
    icon?: ReactNode;
    text: string;
    background?: 'white' | 'light-green';
    color?: 'black' | 'white'; 
    fontWeight?: number;
}

export const DefaultButton:React.FC<Props> = ({icon, text, fontWeight}) => {
    return (
        <button className="default-btn">
            {icon && <span>{icon}</span>}
            <span style={{fontWeight: fontWeight}}>{text}</span>
        </button>
    )
}

export const LightGreenButton:React.FC<Props> = ({icon, background, color, text}) => {
    return (
        <button className="lightgreen-btn">
            {text}
        </button>
    )
}