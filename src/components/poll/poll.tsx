import { BigNumber } from "ethers";
import React, { ReactNode, useEffect, useState } from "react";
import { Clock, Info, Message } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { selectAuth } from "../../pages/auth/authSlice";
import { pollVote } from "../../pages/polling-page/pollSlice";
import { selectRequest } from "../../pages/polling-page/requestSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { voteOnBatchTask, voteOnBatchTaskFilterEvent } from "../../services/batchTask";
import { IBatchVote, ICharacteristic, IContractRequest, INotification, IPoll, IPollOption, ISelectedBatch } from "../../types/types";
import { DefaultButton, LightGreenButton, VoteChoiceButton } from "../button/buttons";
import { InfoModal } from "../modals/infoModal";
import { CustomProgress } from "../progress/progress";
import BatchVoteTable from "../table/batchVoteTable";
import { Characteristic } from "../tags/Characteristic";
import { useNavigate } from "react-router-dom";
import './style.css';

interface Props {
    poll?: IPoll
    handleUserChoice?: (pollId: number, optionId: number, vote: string) => void
    setNotification?: (noti: INotification) => void
    setIsloading?: (v: boolean) => void
}

export const PollItem: React.FC<Props> = ({ poll, handleUserChoice, setNotification, setIsloading }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const requestState = useAppSelector(selectRequest)
    const dispatch = useAppDispatch()
    const authState = useAppSelector(selectAuth)

    const submitVote = () => {
        console.log("Check request: ", requestState.request)

        if (!authState.isLoggedIn) {
            if (setNotification) setNotification({ isShow: true, type: 'warn', message: 'Please check your wallet connect' } as INotification)
            return
        }

        if (!requestState.request.selectedBatch) {
            console.log("selected batch undefine")
            return
        }
        if (setIsloading) setIsloading(true)
        voteOnBatchTask(requestState.request.selectedBatch.batchId, requestState.request.selectedBatch.pollId)
            .then((result) => {
                if(!result.hash) {
                    if(setNotification) setNotification({isShow: true, type:'fail', message:'Something went wrong, please submit again'} as INotification)
                    return
                }
                if(setNotification) setNotification({isShow: true, type:'success', message:`Voted with transaction hash: ${result.hash}`} as INotification)
                // console.log("voteOnBatchTask result hash: ", result)
            }).finally(() => {
                if (setIsloading) setIsloading(false)
            })

        // if (setIsloading) setIsloading(true)
        // voteOnBatchTaskFilterEvent(requestState.request.selectedBatch?.pollId, authState.auth?.account)
        //     .then((result) => {
        //         console.log("voteOnBatchTask event: ", result)
        //     }).finally(() => {
        //         if (setIsloading) setIsloading(false)
        //     })

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

    const navigate = useNavigate();
    const gotoDetail = (poll: IPoll) => {
        navigate('/polling/1', {state: poll})
    }

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

                                {/* <div>
                                    <span className="lightgreen"><Message /></span>
                                    <span>{poll.totalComments} comments</span>
                                </div> */}
                            </div>}
                    </div>

                    <div className="vc-right">
                        <div>
                            {poll?.pollState === 0 && <span className="poll-posted">Poll not open</span>}
                            {poll?.pollState === 1 && <span className="poll-posted">You have not voted</span>}
                            {poll?.pollState === 2 && <span className="poll-posted">Poll ended</span>}
                        </div>
                        <div className="view-detail-btn">
                            <button className="default-btn" onClick={() => gotoDetail(poll ? poll : {} as IPoll)}>
                                View Detail
                            </button>
                        </div>
                    </div>
                </div>

                <BatchVoteTable data={poll?.batchVotes} pollId={poll?.pollId} pollState={poll?.pollState} />

                <div className="view-detail">
                    {/* <DefaultButton text="View Details" fontWeight={600} /> */}
                    <button className="lightgreen-btn" onClick={submitVote}>
                        Submit Vote
                    </button>
                </div>
            </div>

            <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} />
        </div>
    )
}