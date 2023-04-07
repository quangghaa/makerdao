import { Form, FormInstance, Modal, Radio, RadioChangeEvent, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { selectAuth } from "../../../pages/auth/authSlice";
import { placeBid } from "../../../pages/bidding-detail-page/taskSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/store";
import { IContractRequest, ITask } from "../../../types/types";

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

    const onChangeRadio = (e: RadioChangeEvent) => {
        console.log('radio checked', e.target.value);
        setValue(e.target.value);
    };

    const onFinish = (values: any) => {
        console.log("values: ", values);

        // if (authState.auth?.autionContract) {
        //     console.log("Calling vote...")

        //     if (Object.keys(values).length === 0) {
        //         console.log("Please enter fields first")
        //         return
        //     }

        //     let request = {
        //         contract: authState.auth.autionContract,
        //         param: { taskId: values.taskId, batchId: values.batchId, value: values.yourBid }
        //     } as IContractRequest
        //     console.log("check request send: ", request)

        //     dispatch(placeBid(request))
        // }

    };

    useEffect(() => {
        console.log("check selected task: ", selectedTask)
    }, [selectedTask])

    return (
        <Modal title={"Place Bid"} open={isOpen} onCancel={handleCancel} footer={null} width={400}>
            <div className="bidding-detail-info">
                <div className="user-bid">
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
                                        <Form.Item style={{ display: 'none' }} name="batchId" initialValue={batchId} rules={[{ required: true }]}>
                                        </Form.Item>
                                        <Form.Item style={{ display: 'none' }} name="taskId" initialValue={selectedTask.taskId} rules={[{ required: true }]}>
                                        </Form.Item>
                                        <p className="lowest-bid">Lowest Bid: {selectedTask.lowestBidAmount + 'Tokens'}</p>
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