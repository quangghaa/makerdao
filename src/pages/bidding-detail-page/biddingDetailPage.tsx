import { Radio, RadioChangeEvent, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeadLeft, HeadRight, HeadUpArrow, Info } from "../../assets/func/svg";
import { DefaultButton, ViewMoreButton } from "../../components/button/buttons";
import { Filter } from "../../components/filter/filter";
import { InfoModal } from "../../components/modals/infoModal";
import { PollItem } from "../../components/poll/poll";
import TaskListTable from "../../components/table/taskListTable";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IBatchVote, IBid, ICharacteristic, IFilter, IPoll, ISort } from "../../types/types";
import { selectBatchList } from "../bidding-page/bidSlice";
import './style.css';

interface Props {
  batchId?: number
}

export const BiddingDetailPage: React.FC<Props> = ({batchId}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useAppDispatch()
  const batchList = useAppSelector(selectBatchList)
  const [currentBatch, setCurrentBatch] = useState<IBatchVote>() 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const modalTitle = "Polling contract versions"

  const modalContent = [
    "v2 - The latest version of the polling contract was deployed to enable batch voting, so users can vote on multiple polls in one transaction.",
    "v1 - The first version of the polling contract is still used for creating polls on-chain, but it only allows for voting on a single poll per transaction, so an upgrade was deployed.",
  ] as string[]
  
  console.log("Check params: ", param)
  const toBidding = () => {
    navigate("/bidding")
  }

  useEffect(() => {
    if(!batchList) {
      return
    }
    
    if(!param.id) return 
    let intCurrentBatchId = parseInt(param.id)

    let target = batchList.find((b: IBatchVote) => b.batchId === intCurrentBatchId )
    if(!target) {
      console.log("target batch not found")
      return 
    }
    
    setCurrentBatch(target)

  }, [batchList])

  return (
    <main className="polling-main">
      <h4 className="polling-title">Place a Bid</h4>
      <div className="nav-btn-row">
        <a href="#" onClick={toBidding}>
          <DefaultButton text="Back to Batch List" fontWeight={600} icon={<HeadLeft />} />
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
      <div className="bidding-detail-body">
        <div className="bidding-detail-main">
          
          <div className="current-bid-box">
            <p className="price-title">Total Bid:</p>
            <p className="big-number">0 $</p>
            <p className="price-title">Total Tasks:</p>
            <p className="big-number">0</p>
          </div>

          <TaskListTable data={currentBatch?.tasks} batchId={currentBatch?.batchId} />
        </div>

        {/* <div className="bidding-detail-info">
          

          <div className="user-bid">
            <p className="no-reverse">Status: No Reverse</p>
            <Radio.Group onChange={onChangeRadio} value={value}>
              <Space direction="vertical">
                <Radio value={1}>
                  <div className="bid-option">
                    <p className="font-medium">Bid Next Minimum:</p>
                    <p>
                      <span className="font-medium">$37,000</span>
                      &nbsp;
                      <span className="black-text">($44,400.00 w/ BP)</span>
                    </p>
                  </div>
                </Radio>
                <Radio value={2}>
                  <div className="bid-option">
                    <p className="font-medium">Your Secret Maximum Bid:</p>
                    <div className="your-bid-input-box">
                      <input className="your-bid-input" type="text" placeholder="your bid" />
                    </div>

                  </div>
                </Radio>
              </Space>
            </Radio.Group>

            <div className="bid-protection">
              <span>
                Add Bid Protection
              </span>
              <Select
                defaultValue="Select (0 increments)"
                style={{ width: 200 }}
                onChange={handleChangeProtection}
                options={[
                  { value: '0', label: 'Select (0 increments)' },
                  { value: '1', label: '+1 increment' },
                  { value: '2', label: '+2 increment' },
                  { value: '3', label: '+3 increment' },
                ]}
              />

            </div>

            <div className="place-bid-btn">
              <DefaultButton text="Place Bid" fontWeight={600} />
            </div>
          </div>

          <div className="others-info">
            <p>Time left: <span className="urgent">2 days</span></p>
          </div>
        </div> */}
      </div>

      <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} align={'center'} />
    </main>
  )
} 