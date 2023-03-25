import { Popover } from "antd";
import React from "react";
import { StableLab } from "../../assets/func/img";
import { FilledPlay, GreenCheck } from "../../assets/func/svg";
import { IDelegate } from "../../types/types";
import { DefaultButton } from "../button/buttons";
import './style.css';

interface Props {
    delegate?: IDelegate
}

export const PopoverDelegate: React.FC<IDelegate> = (d: IDelegate) => {
    return (
        <div className="delegate-popover">
            <div className="delegate-popover-title">
                <div className="delegate-img">
                    <StableLab />
                    <div className="green-check-box">
                        <GreenCheck />
                    </div>
                </div>
                <div className="delegate-info">
                    <p>{d?.name}</p>
                    <p>{d?.address}</p>
                </div>
            </div>

            <div className="breakdown">
                <p className="breakdown-label">Participation Breakdown</p>
                <div className="breakdown-list">
                    <div className="breakdown-item">
                        <p>{d?.pollParticipation}%</p>
                        <p>Poll Participation</p>
                    </div>
                    <div className="breakdown-item">
                        <p>{d?.executiveParticipation}%</p>
                        <p>Executive Participation</p>
                    </div>
                    <div className="breakdown-item">
                        <p>{d?.communication}%</p>
                        <p>Communication</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Delegate: React.FC<Props> = ({delegate}) => {
    const mouseOver = () => {
        console.log("show delegate info")
    }
    return (
        <div className="delegate-item">
            <a href="#">
                <Popover placement="bottomLeft" content={() => delegate ? PopoverDelegate(delegate) : <></>}>
                <div className="delegate-img" onMouseOver={mouseOver}>
                    <StableLab />
                    <div className="green-check-box">
                        <GreenCheck />
                    </div>
                </div>
                </Popover>
                <div className="delegate-info">
                    <p>{delegate?.name}</p>
                    <p>{delegate?.address}</p>
                </div>
            </a>

            <div className="breakdown">
                <p className="breakdown-label">Participation Breakdown</p>
                <div className="breakdown-list">
                    <div className="breakdown-item">
                        <p>{delegate?.pollParticipation}%</p>
                        <p>Poll Participation</p>
                    </div>
                    <div className="breakdown-item">
                        <p>{delegate?.executiveParticipation}%</p>
                        <p>Executive Participation</p>
                    </div>
                    <div className="breakdown-item">
                        <p>{delegate?.communication}%</p>
                        <p>Communication</p>
                    </div>
                </div>
            </div>

            <div className="delegate-btn-row">
                <DefaultButton text="View Profile Details" fontWeight={600} />
                <DefaultButton text="Meet the Delegate" icon={<FilledPlay />} fontWeight={600} />
            </div>
        </div>
    )
}