import { BigNumber } from "ethers";
import React, { ReactNode, useEffect, useState } from "react";
import { Clock, Info, Message } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { IBatchVote, ICharacteristic, IPoll, IPollOption, ISelectedBatch } from "../../types/types";
import { DefaultButton, LightGreenButton, VoteChoiceButton } from "../button/buttons";
import { InfoModal } from "../modals/infoModal";
import { CustomProgress } from "../progress/progress";
import BatchVoteTable from "../table/batchVoteTable";
import { Characteristic } from "../tags/Characteristic";
import './style.css';

interface Props {
    poll?: IPoll
    handleUserChoice?: (pollId: number, optionId: number, vote: string) => void
    submitVote?: (selectedBatch: ISelectedBatch) => void
}

export const PollItem: React.FC<Props> = ({ poll, handleUserChoice, submitVote }) => {
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

    const [tableData, setTableData] = useState([] as IBatchVote[])
    
    useEffect(() => {
        if(!poll) return
        console.log("Debug poll: ", poll)
    }, [poll])

    return (
        <div className="poll">
            <div className="poll-body">
                <div className="vote-choices-wrapper">
                    <div className="vc-left">
                        <div className="poll-posted">
                            POSTED {poll?.postedTime} | POLL ID {poll?.pollId ? Number(poll.pollId) : ''}
                        </div>
                        <a href="#" className="poll-info">
                            <h3>
                                {poll?.title}
                            </h3>
                            <p>
                                {poll?.description}
                            </p>
                            <p>
                                {poll?.pollOwner ? `Owner: ${poll.pollOwner}` : ''}
                            </p>
                        </a>

                        <div className="characteristic-list">
                            {poll?.charateristic && poll?.charateristic.map((c: ICharacteristic) => {
                                return <>
                                    {mapCharacterristic(c)}
                                </>
                            })}
                        </div>

                        {poll?.status === 'active' &&
                            <div className="time-and-comment">
                                <div>
                                    <span className="lightgreen"><Clock /></span>
                                    <span>{poll.timeRemaining} remaining</span>
                                </div>

                                <div>
                                    <span className="lightgreen"><Message /></span>
                                    <span>{poll.totalComments} comments</span>
                                </div>
                            </div>}
                    </div>

                    <div className="vc-right">
                        <div>
                            {poll?.pollState === 0 && <span className="poll-posted">Poll not open</span>}
                            {poll?.pollState === 1 && <span className="poll-posted">You have not voted</span>}
                            {poll?.pollState === 2 && <span className="poll-posted">Poll voted</span>}
                        </div>
                        <div className="deposit-to-vote-btn">
                            {/* <LightGreenButton text="Submit vote" fontWeight={600} submitVote={submitVote} pollId={poll?.pollId} optionId={Number(poll?.batchTaskId)} /> */}
                            <DefaultButton text="View Details" fontWeight={600} />
                        </div>
                    </div>
                </div>

                <BatchVoteTable data={poll?.batchVotes} pollState={poll?.pollState} />

                <div className="view-detail">
                    {/* <DefaultButton text="View Details" fontWeight={600} /> */}
                    <LightGreenButton text="Submit Vote" fontWeight={600} disable={poll?.pollState === 1 ? false : true} submitVote={submitVote} pollId={poll?.pollId} />
                    {/* {poll?.status === 'executive' &&
                        <div className="mkr">
                            <p className="mkr-number">{poll.mkr}</p>
                            <p className="mkr-label">MKR supporting</p>
                        </div>}
                    
                    {poll?.status === 'active' &&
                        <div className="plurality">
                            <div className="plurality-info">
                                <span>
                                    plurality poll
                                </span>
                                <span className="plurality-info-icon lightgreen" onClick={showModal}><Info /></span>
                            </div>
                            <CustomProgress id={888} agree={poll.agreePercentage ? poll.agreePercentage : 0} disagree={poll.disagreePercentage ? poll.disagreePercentage : 0} neutral={poll.neutralPercentage ? poll.neutralPercentage : 0} />
                        </div>} */}
                </div>
            </div>
            {/* <div className="poll-foot">
                <hr className="poll-hr" />
                <div className="poll-foot-content">
                    <span>
                        LEADING OPTION:&nbsp;
                        <span className="lightgreen">{poll?.leadingOption}</span>
                        &nbsp;WITH&nbsp;
                        <span>{poll?.supportingMkr}</span>
                        &nbsp;MKR SUPPORTING.
                    </span>
                </div>
            </div> */}

            <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} />
        </div>
    )
}