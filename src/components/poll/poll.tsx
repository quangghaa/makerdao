import React from "react";
import { Clock } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { selectAuth } from "../../pages/auth/authSlice";
import { selectRequest } from "../../pages/polling/requestSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { voteOnBatchTask, voteOnBatchTaskFilterEventLatestBlock } from "../../services/batchTask";
import { ICharacteristic, INotification, IPoll, ISelectedBatch } from "../../types/types";
import BatchVoteTable from "../table/batchVoteTable";
import { useNavigate } from "react-router-dom";
import './style.css';
import { getContract } from "../../services/poll";
import { selectSelectedBatchList, setSelectedBatchList } from "../../pages/polling/voteSlice";

interface Props {
    poll?: IPoll
    setNotification?: (noti: INotification) => void
    setIsloading?: (v: boolean) => void
}

export const PollItem: React.FC<Props> = ({ poll, setNotification, setIsloading }) => {
    const requestState = useAppSelector(selectRequest)
    const dispatch = useAppDispatch()
    const authState = useAppSelector(selectAuth)
    const selectedBatchList = useAppSelector(selectSelectedBatchList)

    const submitVote = () => {
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
                if (result.status === 0) {
                    if (setNotification) setNotification({ isShow: true, type: 'fail', message: `Voted failed with status ${result.status}` } as INotification)
                    return
                }

                if(!poll || !authState.auth?.account) {
                    return
                }
                
                if (setNotification) setNotification({ isShow: true, type: 'success', message: `Voted with transaction hash: ${result.transactionHash}` } as INotification)

                voteOnBatchTaskFilterEventLatestBlock(poll.pollId, authState.auth.account)
                .then((event) => {
                    if(!event) {
                        if (setNotification) setNotification({ isShow: true, type: 'warn', message: `Voted event undefined` } as INotification)
                        return
                    }
                    
                    let ePollId = Number(event.args?._pollId)
                    let eBatchId = Number(event.args?.batchTaskVoted.batchTaskId)
                    let eBatch = {pollId: ePollId, batchId: eBatchId} as ISelectedBatch
                    let newBatchList = [...selectedBatchList]
                    
                    let ind = selectedBatchList.findIndex((b: ISelectedBatch) => b.pollId === ePollId)
                    if(ind === -1) {
                        newBatchList.push(eBatch)
                        // console.log("Add new to batch list: ", newBatchList)
                        dispatch(setSelectedBatchList(newBatchList))
                    } else {
                        newBatchList.splice(ind, 1)
                        newBatchList.push(eBatch)
                        // console.log("Edit existed one: ", newBatchList)
                        dispatch(setSelectedBatchList(newBatchList))
                    }

                })
                
                // console.log("voteOnBatchTask result hash: ", result)
            }).finally(() => {
                if (setIsloading) setIsloading(false)
            })
        if (!authState.auth?.account || !poll) {
            console.log("Not have account or poll ID")
            return
        }
        
    }

    const navigate = useNavigate();
    const gotoDetail = (poll: IPoll) => {
        navigate(`/polling/${poll.pollId}`, { state: poll })
    }

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


                        <div className="time-and-comment">
                            <div>
                                <span className="lightgreen"><Clock /></span>
                                <span>{poll?.timeRemaining} remaining</span>
                            </div>

                            {/* <div>
                                    <span className="lightgreen"><Message /></span>
                                    <span>{poll.totalComments} comments</span>
                                </div> */}
                        </div>
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

        </div>
    )
}