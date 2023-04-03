import React, { ReactNode, useEffect, useState } from "react";
import { Clock, Info, Message } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { ICharacteristic, IPoll, IPollOption } from "../../types/types";
import { DefaultButton, LightGreenButton, VoteChoiceButton } from "../button/buttons";
import { InfoModal } from "../modals/infoModal";
import { CustomProgress } from "../progress/progress";
import { Characteristic } from "../tags/Characteristic";
import './style.css';

interface Props {
    poll?: IPoll
    pollOption?: IPollOption
    handleUserChoice?: (pollId: number, optionId: number, vote: string) => void
    submitVote?: (pollId: number, optionId: number) => void
}

export const PollItem: React.FC<Props> = ({ poll, pollOption, handleUserChoice, submitVote }) => {
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

    return (
        <div className="poll">
            <div className="poll-body">
                <div className="vote-choices-wrapper">
                    <div className="vc-left">
                        <div className="poll-posted">
                            POSTED MAR {pollOption?.postedTime} | POLL ID {pollOption?.pollId ? Number(pollOption.pollId) : ''}
                        </div>
                        <a href="#" className="poll-info">
                            <h3>
                                {pollOption?.title}
                            </h3>
                            <p>
                                {pollOption?.description}
                            </p>
                            <p>
                                {pollOption?.pollOwner ? `Owner: ${pollOption.pollOwner}` : ''}
                            </p>
                            <p>
                                {pollOption?.batchTaskId ? `Option ID: ${pollOption.batchTaskId}` : ''}
                            </p>
                        </a>

                        <div className="characteristic-list">
                            {pollOption?.charateristic.map((c: ICharacteristic) => {
                                return <>
                                    {mapCharacterristic(c)}
                                </>
                            })}
                        </div>

                        {pollOption?.status === 'active' &&
                            <div className="time-and-comment">
                                <div>
                                    <span className="lightgreen"><Clock /></span>
                                    <span>{pollOption.timeRemaining} remaining</span>
                                </div>

                                <div>
                                    <span className="lightgreen"><Message /></span>
                                    <span>{pollOption.totalComments} comments</span>
                                </div>
                            </div>}
                    </div>

                    <div className="vc-right">
                        <div className="vc-head-row">
                            <span className="poll-posted">Your vote</span>
                            <span className="poll-posted">You have not voted</span>
                        </div>
                        {pollOption?.pollId && pollOption.batchTaskId && <div id="vote-choice-select-id">
                            <VoteChoiceButton pollId={pollOption.pollId} optionId={Number(pollOption.batchTaskId)} text="" handleUserChoice={handleUserChoice} />
                        </div>}
                        <div className="deposit-to-vote-btn">
                            <LightGreenButton text="Submit vote" fontWeight={600} submitVote={submitVote} pollId={pollOption?.pollId} optionId={Number(pollOption?.batchTaskId)} />
                        </div>
                    </div>
                </div>

                <div className="view-detail">
                    <DefaultButton text="View Details" fontWeight={600} />

                    {pollOption?.status === 'executive' &&
                        <div className="mkr">
                            <p className="mkr-number">{pollOption.mkr}</p>
                            <p className="mkr-label">MKR supporting</p>
                        </div>}

                    {pollOption?.status === 'active' &&
                        <div className="plurality">
                            <div className="plurality-info">
                                <span>
                                    plurality poll
                                </span>
                                <span className="plurality-info-icon lightgreen" onClick={showModal}><Info /></span>
                            </div>
                            <CustomProgress id={888} agree={pollOption.agreePercentage ? pollOption.agreePercentage : 0} disagree={pollOption.disagreePercentage ? pollOption.disagreePercentage : 0} neutral={pollOption.neutralPercentage ? pollOption.neutralPercentage : 0} />
                        </div>}
                </div>
            </div>
            <div className="poll-foot">
                <hr className="poll-hr" />
                <div className="poll-foot-content">
                    <span>
                        LEADING OPTION:&nbsp;
                        <span className="lightgreen">{pollOption?.leadingOption}</span>
                        &nbsp;WITH&nbsp;
                        <span>{pollOption?.supportingMkr}</span>
                        &nbsp;MKR SUPPORTING.
                    </span>
                </div>
            </div>

            <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} />
        </div>
    )
}