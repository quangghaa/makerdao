import React, { ReactNode, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, Info, Message } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { IBatchVote, IBid, ICharacteristic, IPoll } from "../../types/types";
import { DefaultButton } from "../button/buttons";
import { InfoModal } from "../modals/infoModal";
import { CustomProgress } from "../progress/progress";
import { Characteristic } from "../tags/Characteristic";
import './style.css';

interface Props {
    batch?: IBatchVote
}

export const BidItem: React.FC<Props> = ({ batch }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const modalTitle = "Poll types"

    const modalContent = [
      "- Ranked-choice polls: require multiple-choice ballots in ranked order, and determine the winning vote option by finding the one with an absolute majority in MKR voting weight (as in >50% of the total participating MKR, excluding abstains). In the first round of IRV, only first-choice votes are counted. In case no vote option meets the victory requirements, the least popular vote option (except abstain) is eliminated and the votes applied to that option are instead applied to the voters’ next ranked option. This repeats until the victory conditions have been met by one vote option. If no winning option can be found, tally results are shown as if no IRV rounds were run.",
      "- Plurality polls: require single-choice ballots and determines the winning vote option by finding the one with the highest MKR voting weight in relative terms.",
      "- Approval polls: require multiple-choice ballots in unranked order, and determines the winning vote option by finding the one with a relative majority in MKR voting weight. When used in situations where no winner is required, an absolute majority (ie. >50% of the total participating MKR excluding abstains) victory condition may also be applied as opposed to a relative majority.",
    ] as string[]

    const navigate = useNavigate()
    const toBidDetail = (batchId: number) => {
        navigate(`/bidding/${batchId}`)
    }

    return (
        <div className="poll">
            <div className="poll-body">
                <div className="batch-info-sec">
                    <div className="bis-left">
                        <h3>Batch task ID: {batch?.batchId}</h3>
                        <h3>{batch?.batchTitle}</h3>
                        <p></p>
                    </div>

                    <div className="bis-right">
                        <p>Total Tokens: {batch?.totalReward}</p>
                        <p>Total Tasks: </p>
                        <p>Total Tasks Taken: </p>
                        <p>Remaining: </p>
                    </div>
                </div>

                <div className="view-detail">
                    {/* <DefaultButton text="Bid now" fontWeight={600} /> */}
                    <button className="default-btn" onClick={() => toBidDetail(batch?.batchId ? batch.batchId : -1)}>Bid Now</button>
                </div>
            </div>

            <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} />
        </div>
    )
}