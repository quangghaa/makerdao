import React, { useEffect } from "react";
import './style.css';

interface Props {
    text: string;
    background?: 'yellow' | 'yellow-pink' | 'pink' | 'gray' | 'lightgreen' | 'lightblue';
    color?: 'yellow-pink' | 'pink' | 'gray' | 'orange' | 'yellow' | 'green' | 'blue' | 'green-blue';
}

export const Characteristic:React.FC<Props> = ({text, background, color}) => {
    const mapBg = (bg: 'yellow' | 'yellow-pink' | 'pink' | 'gray' | 'lightgreen' | 'lightblue') => {
        switch(bg) {
            case "yellow-pink":
                return "#fff9f4"
            case 'yellow':
                return '#fffbef'
            case 'pink':
                return '#fff0f4'
            case 'gray':
                return '#f2f5fa'
            case 'lightgreen':
                return '#ebfffa'
            case 'lightblue':
                return '#eefafc'
            default:
                return ''
        }
    }

    const mapColor = (color: 'yellow-pink' | 'pink' | 'gray' | 'orange' | 'yellow' | 'green' | 'blue' | 'green-blue') => {
        switch(color) {
            case 'yellow':
                return "#e7c200"
            case 'yellow-pink':
                return '#ad927d'
            case 'pink': 
                return "#ff4085"
            case 'gray':
                return '#7d8faa'
            case 'orange':
                return '#ff8237'
            case 'green':
                return '#02cb9b'
            case 'blue':
                return '#34aaff'
            case 'green-blue':
                return '#00b5d3'
            default:
                return ''
        }
    }
    
    return (
        <div id='characteristic' className="characteristic" style={{background: background ? mapBg(background): ''}}>
            <span style={{color: color ? mapColor(color) : ''}}>{text}</span>
        </div>
    )
}