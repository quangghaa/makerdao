import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeadLeft, HeadRight} from "../../assets/func/svg";
import { DefaultButton } from "../../components/button/buttons";
import TaskListTable from "../../components/table/taskListTable";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IBatchVote } from "../../types/types";
import { selectBatchList } from "../bidding/bidSlice";
import './style.css';

interface Props {
  batchId?: number
}

export const BiddingDetailPage: React.FC<Props> = ({batchId}) => {
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useAppDispatch()
  const batchList = useAppSelector(selectBatchList)
  const [currentBatch, setCurrentBatch] = useState<IBatchVote>() 

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
      </div>

    </main>
  )
} 