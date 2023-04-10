import { Tabs, TabsProps } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StableLab } from "../../assets/func/img";
import { Clock, GreenCheck, HeadLeft, HeadRight, HeadUpArrow, Info } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { elipsisAddress } from "../../common/helper";
import { DefaultButton } from "../../components/button/buttons";
import { IBatchVote, ICharacteristic, INotification, IPoll, ISelectedBatch } from "../../types/types";
import './style.css';
import { TabContent } from "./tabContent";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectSelectedBatchList, setSelectedBatchList } from "../polling/voteSlice";
import { selectRequest } from "../polling/requestSlice";
import { selectAuth } from "../auth/authSlice";
import { voteOnBatchTask, voteOnBatchTaskFilterEventLatestBlock } from "../../services/batchTask";
import { Notification } from "../../components/notification/Notification";
import { Loading } from "../../components/loading/loading";

interface Props {

}

const pathMap = new Map<string, string>()
pathMap.set('home', '/')
pathMap.set('poll', '/polling')
pathMap.set('bid', '/bidding')

export const PollingDetailPage: React.FC<Props> = () => {
    const location = useLocation();
    const poll = location.state as IPoll
    const [isLoading, setIsLoading] = useState(false)
    const [notification, setNotification] = useState({
        isShow: false,
        type: 'warn',
        message: '',
    } as INotification)

    const onChangeTab = (key: string) => {
        console.log(key);
    };

    const navigate = useNavigate()

    const goTo = (pageName: 'home' | 'poll' | 'bid') => {
        let path = pathMap.get(pageName)
        if(!path) return
        navigate(path)
    }   

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
                children: <TabContent pollId={poll.pollId} pollState={poll.pollState} batchId={b.batchId} setIsLoading={setIsLoading} setNotification={setNotification}/>
            }
            
            if(!target) {
                console.log("un expected error")
                return
            }
            target.push(t)
        })

        setTabObj(target)
    }, [])

    useEffect(() => {
        if(!notification.isShow) return  
        // close notification after 3 seconds
        setTimeout(() => {
            setNotification({...notification, isShow: false})
        }, 3000)
    }, [notification])

    const items: TabsProps['items'] = tabObj;

    return (
        <div>
            <div className="polling-body">
                <div className="polling-list">
                    {notification.isShow && <Notification type={notification.type} message={notification.message} />}
                    {isLoading && <Loading />}
                    <div className="nav-btn-row">
                        <a>
                            <button className="default-btn" onClick={() => goTo('poll')}>
                                <span><HeadLeft /></span>
                                <span>Back to All Polls</span>
                            </button>
                        </a>
                        <div className="prev-and-next">
                            <a>
                                <button className="default-btn">
                                    <span><HeadLeft /></span>
                                    <span>Previous Poll</span>
                                </button>
                            </a>
                            <a>
                                <button className="default-btn">
                                    <span>Next Poll</span>
                                    <span><HeadRight /></span>
                                </button>
                            </a>
                        </div>
                    </div>

                    <div className="detail-main-body">
                        <div className="dmb-head">
                            <div className="poll-posted poll-posted-detail">
                                <div>
                                    POSTED {poll.postedTime ? poll.postedTime : ''} | POLL ID {poll.id}
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
                            <a className="poll-info">
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

                            {/* <div className="mt-1rem">
                                <a href="#" className="extra-link">
                                    <span>Discussion</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div> */}
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