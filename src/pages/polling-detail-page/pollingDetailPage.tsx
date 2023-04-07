import { Tabs, TabsProps } from "antd";
import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { StableLab } from "../../assets/func/img";
import { Clock, GreenCheck, HeadLeft, HeadRight, HeadUpArrow, Info } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { elipsisAddress } from "../../common/helper";
import { DefaultButton } from "../../components/button/buttons";
import { InfoModal } from "../../components/modals/infoModal";
import { AbsProgress, NoProgress, YesProgress } from "../../components/progress/progress";
import SummaryInfo from "../../components/table/summaryInfo";
import TaskListDetailTable from "../../components/table/taskListDetailTable";
import { VotingAddressTable } from "../../components/table/votingAddressTable";
import { IBatchVote, ICharacteristic, IDelegate, IPoll, ITask, IVotingByAddress } from "../../types/types";
import './style.css';
import { TabContent } from "./tabContent";

interface Props {

}

export const PollingDetailPage: React.FC<Props> = () => {
    const location = useLocation();
    const poll = location.state as IPoll

    const onChangeTab = (key: string) => {
        console.log(key);
    };

    const [tabObj, setTabObj] = useState<TabsProps['items']>([])
    useEffect(() => {
        if(!poll.batchVotes) {
            console.log("batch votes empty: ", poll.batchVotes)
            return
        }
        let target: TabsProps['items'] = []
        poll.batchVotes.forEach((b: IBatchVote) => {
            let t = {
                key: '' + b.batchId,
                label: 'Batch ID ' + b.batchId,
                children: <TabContent batchId={b.batchId}/>
            }
            
            if(!target) {
                console.log("un expected error")
                return
            }
            target.push(t)
        })

        setTabObj(target)
    }, [])

    const items: TabsProps['items'] = tabObj;

    return (
        <div>
            <div className="polling-body">
                <div className="polling-list">
                    <div className="nav-btn-row">
                        <a href="/polling">
                            <DefaultButton text="Back to All Polls" fontWeight={600} icon={<HeadLeft />} />
                        </a>
                        <div className="prev-and-next">
                            <a href="#">
                                <DefaultButton text="Previous Poll" fontWeight={600} icon={<HeadLeft />} />
                            </a>
                            <a href="#">
                                <DefaultButton text="Next Poll" fontWeight={600} icon={<HeadRight />} iconPosition={'right'} />
                            </a>
                        </div>
                    </div>

                    <div className="detail-main-body">
                        <div className="dmb-head">
                            <div className="poll-posted poll-posted-detail">
                                <div>
                                    POSTED {poll.postedTime} | POLL ID {poll.id}
                                </div>
                                <div className="ppd-right">
                                    <div>
                                        <span className="lightgreen"><Clock /></span>
                                        <span>{poll.timeRemaining} REMAINING</span>
                                    </div>
                                    <div className="plurality-info">
                                        <span>
                                            plurality poll
                                        </span>
                                        <span className="plurality-info-icon lightgreen" onClick={() => console.log("")}><Info /></span>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="poll-info">
                                <h3>
                                    {poll.title}
                                </h3>
                            </a>

                            <div className="characteristic-list mt-1rem">
                                {poll.charateristic && poll.charateristic.map((c: ICharacteristic, index: number) => {
                                    return <div key={index}>
                                        {mapCharacterristic(c)}
                                    </div>
                                })}
                            </div>

                            <div className="mt-1rem">
                                <a href="#" className="extra-link">
                                    <span>Discussion</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>
                        </div>

                        <div style={{ padding: '0rem 2rem' }}>
                            <Tabs defaultActiveKey={'' + poll.batchTaskIds} items={items} onChange={onChangeTab} />
                        </div>

                        <div className="comment-sec">
                            <div className='hsr-head'>
                                <h2 className="weight-500">Comment (2)</h2>
                            </div>
                            <hr className="poll-hr"/>
                            
                            <div className="comment-item">
                                <div className="ci-info">
                                    <div className="cii-left">
                                        <a href="#" className='address-item'>
                                                <div className="delegate-img">
                                                    <StableLab />
                                                    <div className="green-check-box">
                                                        <GreenCheck />
                                                    </div>
                                                </div>
                                                <div className="delegate-info">
                                                    <p></p>
                                                    <p>{elipsisAddress("0x8888888888888888888")}</p>
                                                </div>
                                        </a>
                                    </div>

                                    <div className="cii-right">
                                        <span className="poll-posted">04/04/2023</span>
                                    </div>
                                </div>
                                <p className="comment">Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt </p>
                                <hr className="poll-hr"/>
                            </div>

                            <div className="comment-item">
                                <div className="ci-info">
                                    <div className="cii-left">
                                        <a href="#" className='address-item'>
                                                <div className="delegate-img">
                                                    <StableLab />
                                                    <div className="green-check-box">
                                                        <GreenCheck />
                                                    </div>
                                                </div>
                                                <div className="delegate-info">
                                                    <p></p>
                                                    <p>{elipsisAddress("0x8888888888888888888")}</p>
                                                </div>
                                        </a>
                                    </div>

                                    <div className="cii-right">
                                        <span className="poll-posted">04/04/2023</span>
                                    </div>
                                </div>
                                <p className="comment">Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt Veryy long commentttttt </p>
                                <hr className="poll-hr"/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}