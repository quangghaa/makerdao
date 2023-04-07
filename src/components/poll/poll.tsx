import React from "react";
import { Clock } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { selectAuth } from "../../pages/auth/authSlice";
import { selectRequest } from "../../pages/polling/requestSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { voteOnBatchTask } from "../../services/batchTask";
import { ICharacteristic, INotification, IPoll } from "../../types/types";
import BatchVoteTable from "../table/batchVoteTable";
import { useNavigate } from "react-router-dom";
import './style.css';

interface Props {
    poll?: IPoll
    setNotification?: (noti: INotification) => void
    setIsloading?: (v: boolean) => void
}

export const PollItem: React.FC<Props> = ({ poll, setNotification, setIsloading }) => {
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
                if (!result.hash) {
                    if (setNotification) setNotification({ isShow: true, type: 'fail', message: 'Something went wrong, please submit again' } as INotification)
                    return
                }
                if (setNotification) setNotification({ isShow: true, type: 'success', message: `Voted with transaction hash: ${result.hash}` } as INotification)
                // console.log("voteOnBatchTask result hash: ", result)
            }).finally(() => {
                if (setIsloading) setIsloading(false)
            })
    }

    const navigate = useNavigate();
    const gotoDetail = (poll: IPoll) => {
        navigate('/polling/1', { state: poll })
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