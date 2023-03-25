import React, { ReactNode } from "react";
import "./style.css";

interface Props {
    icon?: ReactNode;
    text: string;
    background?: 'gray';
    color?: 'green' | 'dark-green' | 'purple' | 'pink'; 
    fontWeight?: number;
}

const mapColor = (color: string) => {
    switch(color) {
        case 'green':
            return '#1acca7'
        case 'dark-green': 
            return '#1aab9b'
        case 'purple':
            return '#9a4bff'
        case 'pink':
            return '#e64bff'
        default:
            return ''
    }
}

const mapBg = (bg: string) => {
    switch(bg) {
        case 'gray':
            return 'rgba(238,238,238,0.4)'
        default:
            return ''
    }
}

export const DefaultButton:React.FC<Props> = ({icon, text, fontWeight}) => {
    return (
        <button className="default-btn">
            {icon && <span>{icon}</span>}
            <span style={{fontWeight: fontWeight}}>{text}</span>
        </button>
    )
}

export const LightGreenButton:React.FC<Props> = ({text}) => {
    return (
        <button className="lightgreen-btn">
            {text}
        </button>
    )
}

export const ColorButton:React.FC<Props> = ({icon, background, color, text}) => {
    return (
        <button style={background ? {background: mapBg(background)} : {background: 'var(--theme-ui-colors-surface)'}} className="color-btn">
            <span style={color ? {color: mapColor(color)} : {color: ''}}>{text}</span>
        </button>
    )
}