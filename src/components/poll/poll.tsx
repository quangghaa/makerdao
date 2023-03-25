import React, { ReactNode } from "react";
import { Clock, Info, Message } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { ICharacteristic, IPoll } from "../../types/types";
import { DefaultButton } from "../button/buttons";
import { Progress } from "../progress/progress";
import { Characteristic } from "../tags/Characteristic";
import './style.css';

interface Props {
    poll?: IPoll
}

export const PollItem: React.FC<Props> = ({ poll }) => {
    let state = 'active'

    return (
        <div className="poll">
            <div className="poll-body">
                <div className="poll-posted">
                    POSTED MAR {poll?.postedTime} | POLL ID {poll?.id}
                </div>

                <a href="#" className="poll-info">
                    <h3>
                        {poll?.title}
                    </h3>
                    <p>
                        {poll?.description}
                    </p>
                </a>

                <div className="characteristic-list">
                    {poll?.charateristic.map((c: ICharacteristic) => {
                        return <>
                            {mapCharacterristic(c)}
                        </>
                    })}
                    {/* <Characteristic text="High Impact" color={'gray'} background={'gray'} />
                    <Characteristic text="High Impact" color={'gray'} background={'gray'} />
                    <Characteristic text="High Impact" color={'gray'} background={'gray'} />
                    <Characteristic text="High Impact" color={'gray'} background={'gray'} />
                    <Characteristic text="High Impact" color={'gray'} background={'gray'} />
                    <Characteristic text="High Impact" color={'gray'} background={'gray'} />
                    <Characteristic text="High Impact" color={'gray'} background={'gray'} /> */}
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

                <div className="view-detail">
                    <DefaultButton text="View Details" fontWeight={600} />

                    {poll?.status === 'executive' &&
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
                                <span className="lightgreen"><Info /></span>
                            </div>
                            <Progress id={888} agree={poll.agreePercentage ? poll.agreePercentage : 0} disagree={poll.disagreePercentage ? poll.disagreePercentage : 0} neutral={poll.neutralPercentage ? poll.neutralPercentage : 0} />
                        </div>}
                </div>
            </div>
            <div className="poll-foot">
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
            </div>
        </div>
    )
}