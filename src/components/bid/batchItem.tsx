import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StableLab } from "../../assets/func/img";
import { IBatchVote } from "../../types/types";
import { InfoModal } from "../modals/infoModal";
import './style.css';

interface Props {
    batch?: IBatchVote
}

export const BatchItem: React.FC<Props> = ({ batch }) => {
    const navigate = useNavigate()
    const toBidDetail = (batchId: number) => {
        navigate(`/bidding/${batchId}`)
    }

    return (
        <div className="poll">
            <div className="poll-body">
                <div className="batch-info-sec">
                    <div className="bis-left">
                        <h3>Poll ID: {batch?.pollId}</h3>
                        <h3>Batch ID: {batch?.batchId}</h3>
                        <p className="batch-description">{batch?.description}</p>
                    
                        <div className="group-address">
                            <StableLab />
                            <StableLab />
                            <StableLab />
                            <span className="unit">&nbsp;+8 others</span>
                        </div>
                    </div>

                    <div className="bis-right">
                        <p>{batch?.totalReward} <span className="unit">tokens</span></p>
                        <p>{batch?.totalTasks} <span className="unit">tasks</span></p>
                        <p>{batch?.totalRemainingTasks} <span className="unit">remaining tasks</span></p>
                        <p>{batch?.timeLeft} <span className="unit">remaining</span> </p>
                    </div>
                </div>

                <div className="view-detail">
                    <button className="default-btn" onClick={() => toBidDetail(batch?.batchId ? batch.batchId : -1)}>VIEW DETAIL</button>
                </div>
            </div>

        </div>
    )
}