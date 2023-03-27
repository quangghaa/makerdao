import React, { ReactNode, useState } from "react";
import { Clock, Info, Message } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { ICharacteristic, IPoll } from "../../types/types";
import { DefaultButton } from "../button/buttons";
import { InfoModal } from "../modals/infoModal";
import { Progress } from "../progress/progress";
import { Characteristic } from "../tags/Characteristic";
import './style.css';

interface Props {
    poll?: IPoll
}

export const PollItem: React.FC<Props> = ({ poll }) => {
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
                                <span className="plurality-info-icon lightgreen" onClick={showModal}><Info /></span>
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

            <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} />
        </div>
    )
}