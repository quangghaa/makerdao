import React, { useEffect } from "react";
import './style.css';

interface Props {
    id: number;
    agree: number;
    disagree: number;
    neutral: number;
}

export const Progress: React.FC<Props> = ({id, agree, disagree, neutral}) => {
    return (
        <div className="progress">
            <div className="percentage">
                <span className="agree-per">{agree}%</span>
                <span className="neutral-per">{neutral}%</span>
                <span className="disagree-per">{disagree}%</span>
            </div>
            <div className="pro-bar">
                <div id={'agree-pro-' + id} style={{width: agree+'%'}} className="agree-pro"></div>
                <div id={'neutral-pro-' + id} style={{width: neutral+'%'}} className="neutral-pro"></div>
                <div id={'disagree-pro-' + id} style={{width: disagree+'%'}} className="disagree-pro"></div>
            </div>
        </div>
    )
}