import React, { useEffect } from "react";
import './style.css';
import { Progress } from 'antd';

interface Props {
    id?: number;
    agree?: number;
    disagree?: number;
    neutral?: number;
    mkr?: number;
    percentage?: number;
    totalStep?: number;
}

export const CustomProgress: React.FC<Props> = ({id, agree, disagree, neutral}) => {
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

export const YesProgress: React.FC<Props> = ({mkr, percentage}) => {
    return (
        <div className="progress">
            <div className="percentage">
                <span className="detail-progess-text">Yes</span>
                <span className="detail-progess-text">{mkr} MKR Voting ({percentage}%)</span>
            </div>
            <Progress percent={percentage} showInfo={false} strokeColor={"#1aab9b"} />
        </div>
    )
}

export const NoProgress: React.FC<Props> = ({mkr, percentage}) => {
    return (
        <div className="progress">
            <div className="percentage">
                <span className="detail-progess-text">No</span>
                <span className="detail-progess-text">{mkr} MKR Voting ({percentage}%)</span>
            </div>
            <Progress percent={percentage} showInfo={false} strokeColor={"#f75524"} />
        </div>
    )
}

export const AbsProgress: React.FC<Props> = ({mkr, percentage}) => {
    return (
        <div className="progress">
            <div className="percentage">
                <span className="detail-progess-text">Abstain</span>
                <span className="detail-progess-text">{mkr} MKR Voting ({percentage}%)</span>
            </div>
            <Progress percent={percentage} showInfo={false} strokeColor={"#d5a090"} />
        </div>
    )
}

export const StepProgress: React.FC<Props> = ({mkr, percentage}) => {
    return (
        <div className="step-progress">
            <div>
                <span>0 of 5 available polls added to ballot</span>
            </div>
            <div className="step-progress-bar">
                <div className="step-progress-item"></div>
                <div className="step-progress-item"></div>
                <div className="step-progress-item"></div>
                <div className="step-progress-item"></div>
                <div className="step-progress-item"></div>
            </div>
        </div>
    )
}