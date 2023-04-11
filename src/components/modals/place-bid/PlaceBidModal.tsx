import { Form, FormInstance, Modal, Radio, RadioChangeEvent, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { selectAuth } from "../../../pages/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { IContractRequest, ITask, IYourBid } from "../../../types/types";
import { Notification } from "../../notification/Notification";
import './style.css';
import { Loading } from "../../loading/loading";
import { placeBid, placeBidFilterEventLatestBlock } from "../../../services/batchTask";
import { selectYourBidList, setYourBidList } from "../../../pages/bidding-detail/yourBidSlice";

interface Props {
    isOpen: boolean;
    handleCancel: () => void;
    selectedTask: ITask
    batchId: number
}

export const PlaceBidModal: React.FC<Props> = ({ isOpen, selectedTask, batchId, handleCancel }) => {
    const [value, setValue] = useState(2);
    const formRef = React.useRef<FormInstance>(null);
    const authState = useAppSelector(selectAuth)
    const dispatch = useAppDispatch()
    const [errorMessage, setErrorMessage] = useState({isError: false, message: ''})
    const [isLoading, setIsLoading] = useState(false)
    const yourBidList = useAppSelector(selectYourBidList)

    const onChangeRadio = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onFinish = (values: any) => {
        if(!authState.isLoggedIn) {
            setErrorMessage({isError: true, message: "Please check your wallet connect"})
            return
        }

        if(!selectedTask.taskId || !batchId || !values.yourBid) {
            setErrorMessage({isError: true, message: "Invalid form values"})
            return
        }

        let intYourBid = parseInt(values.yourBid)

        // validate lowestBidAmount
        if(intYourBid < 0) {
            setErrorMessage({isError: true, message: "Value can not be negative"})
            return
        }

        if(intYourBid >= selectedTask.lowestBidAmount) {
            setErrorMessage({isError: true, message: "Value must smaller than lowest bid amount"})
            return
        }

        setIsLoading(true)
        console.log("Check input values: ", selectedTask.taskId, batchId, intYourBid)
        placeBid(selectedTask.taskId, batchId, intYourBid)
            .then((result) => {
                if (result.status === 0) {
                    setErrorMessage({ isError: true, message: `Place bid failed` })
                    return
                }
                // setNotification({ isShow: true, type: 'success', message: `Voted with transaction hash: ${result.transactionHash}` } as INotification)

                placeBidFilterEventLatestBlock(values.taskId, values.batchId)
                .then((event) => {
                    if(!event) {
                        setErrorMessage({ isError: true, message: `Place bid event undefined` })
                        return
                    }

                    console.log("Place bid event: ", event)
                    if(!event.args) {
                        setErrorMessage({ isError: true, message: `Place bid event args undefined` })
                        return
                    }
                    let yourBid = {} as IYourBid
                    yourBid.taskId = Number(event.args._taskID)
                    yourBid.batchId = Number(event.args._batchTaskID)
                    yourBid.address = event.args.auctionTask.lowestBidder
                    yourBid.value = Number(event.args.auctionTask.lowestBidAmount)
                    console.log("Check your bid: ", yourBid)

                    let newYourBidList = [] as IYourBid[]
                    newYourBidList = [...yourBidList]

                    // remove old bid
                    let ind = newYourBidList.findIndex((b: IYourBid) => b.taskId === yourBid.taskId)
                    if(ind !== -1) {
                        newYourBidList.splice(ind, 1)
                    }

                    newYourBidList.push(yourBid)
                    dispatch(setYourBidList(newYourBidList))
                    
                    // let ePollId = Number(event.args?._pollId)
                    // let eBatchId = Number(event.args?.batchTaskVoted.batchTaskId)
                    // let eBatch = {pollId: ePollId, batchId: eBatchId} as ISelectedBatch
                    // let newBatchList = [...selectedBatchList]
                    
                    // let ind = selectedBatchList.findIndex((b: ISelectedBatch) => b.pollId === ePollId)
                    // if(ind === -1) {
                    //     newBatchList.push(eBatch)
                    //     // console.log("Add new to batch list: ", newBatchList)
                    //     dispatch(setSelectedBatchList(newBatchList))
                    // } else {
                    //     newBatchList.splice(ind, 1)
                    //     newBatchList.push(eBatch)
                    //     // console.log("Edit existed one: ", newBatchList)
                    //     dispatch(setSelectedBatchList(newBatchList))
                    // }

                })
                
                // console.log("voteOnBatchTask result hash: ", result)
            }).finally(() => {
                setIsLoading(false)
            })
    };

    useEffect(() => {
        console.log("check selected task: ", selectedTask)
    }, [selectedTask])

    return (
        <Modal title={"Place Bid"} open={isOpen} onCancel={handleCancel} footer={null} width={400}>
            <div className="bidding-detail-info">
                <div className="user-bid">
                    {errorMessage.isError && <div className="placebid-noti">{errorMessage.message}</div>}
                    {isLoading && <Loading />}
                    <Form
                        ref={formRef}
                        name="control-ref"
                        onFinish={onFinish}
                        style={{ maxWidth: 600 }}
                    >
                        <Radio.Group onChange={onChangeRadio} value={value} disabled>
                            <Space direction="vertical">
                                <Radio value={1}>
                                    <div className="bid-option">
                                        <p className="font-medium">Bid Next Minimum:</p>
                                        <p>
                                            <span className="font-medium">$0,000</span>
                                            &nbsp;
                                            <span className="black-text">($0,000.00 w/ BP)</span>
                                        </p>
                                    </div>
                                </Radio>
                                <Radio value={2}>
                                    <div className="bid-option">
                                        <p className="lowest-bid">Lowest Bid:&nbsp;{selectedTask.lowestBidAmount + ' Tokens'}</p>
                                        <p className="font-medium">Your Minimum Bid:</p>
                                        <div className="your-bid-input-box">
                                            <Form.Item name="yourBid" rules={[{ required: true }]}>
                                                <input className="your-bid-input" type="number" placeholder="your bid" />
                                            </Form.Item>
                                        </div>

                                    </div>
                                </Radio>
                            </Space>
                        </Radio.Group>

                        <div className="place-bid-btn">
                            <button className="default-btn">
                                Place Bid
                            </button>
                        </div>
                    </Form>
                </div>

                <div className="others-info">
                    <p>Time left: <span className="urgent">2 days</span></p>
                </div>
            </div>
        </Modal>
    )
}