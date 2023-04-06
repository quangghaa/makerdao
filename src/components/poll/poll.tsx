import { BigNumber } from "ethers";
import React, { ReactNode, useEffect, useState } from "react";
import { Clock, Info, Message } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { selectAuth } from "../../pages/auth/authSlice";
import { pollVote } from "../../pages/polling-page/pollSlice";
import { selectRequest } from "../../pages/polling-page/requestSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IBatchVote, ICharacteristic, IContractRequest, IPoll, IPollOption, ISelectedBatch } from "../../types/types";
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

export const PollItem: React.FC<Props> = ({ poll, handleUserChoice }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const requestState = useAppSelector(selectRequest)
    const dispatch = useAppDispatch()
    const authState = useAppSelector(selectAuth)

    const submitVote = () => {
        console.log("Check request: ", requestState.request)
        // if(!requestState.request.selectedBatch) {
        //     console.log("selected batch undefine")
        //     return 
        // }
        // if(authState.auth?.batchVotingContract) {
        //     console.log("Calling vote...")

        //     if(Object.keys(requestState.request.selectedBatch).length === 0) {
        //         console.log("Please select batch first")
        //         return
        //     }

        //     let request = {
        //         contract: authState.auth.batchVotingContract,
        //         param: {
        //             pollId: requestState.request.selectedBatch.pollId, 
        //             batchId: requestState.request.selectedBatch.batchId,
        //             account: authState.auth?.account
        //         }
        //     } as IContractRequest

        //     console.log("Check request: ", request)
        //     dispatch(pollVote(request))
            
        //     console.log("update poll state ...")
        // }
    }

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
                            <p className="batch-description">
                                {poll?.description}
                            </p>
                            <p>
                                {poll?.pollOwner ? `Owner: ${poll.pollOwner}` : ''}
                            </p>
                        </a>

                        <div className="characteristic-list">
                            {poll?.charateristic && poll?.charateristic.map((c: ICharacteristic, index: number) => {
                                return <div key={index}>
                                    {mapCharacterristic(c)}
                                </div>
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
                            {poll?.pollState === 2 && <span className="poll-posted">Poll ended</span>}
                        </div>
                        <div className="view-detail-btn">
                            {/* <LightGreenButton text="Submit vote" fontWeight={600} submitVote={submitVote} pollId={poll?.pollId} optionId={Number(poll?.batchTaskId)} /> */}
                            {/* <DefaultButton text="View Details" fontWeight={600} /> */}
                            <button className="default-btn" disabled>
                                View Detail
                            </button>
                        </div>
                    </div>
                </div>

                <BatchVoteTable data={poll?.batchVotes} pollState={poll?.pollState} />

                <div className="view-detail">
                    {/* <DefaultButton text="View Details" fontWeight={600} /> */}
                    <button className="lightgreen-btn" onClick={submitVote}>
                        Submit Vote
                    </button>
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