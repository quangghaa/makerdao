import React from "react";
import './style.css';

interface Props {
    type: 'warn' | 'success' | 'fail'
    message: string
}

export const Notification: React.FC<Props> = ({type, message}) => {
    const mapBg = (type: 'warn' | 'success' | 'fail') => {
        switch(type) {
            case 'warn':
                return '#b3990f36'
            case 'success':
                return '#02cb4052'
            case 'fail':
                return '#f1145c40'
            default: 
                return 'white'
        }
    }

    return <div className="notification-wrapper">
        <p className="notification" style={{background: mapBg(type)}}>
            {message}
        </p>
    </div>
}