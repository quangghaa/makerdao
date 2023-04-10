import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeadLeft, HeadRight } from "../../assets/func/svg";
import { DefaultButton } from "../../components/button/buttons";
import TaskListTable from "../../components/table/taskListTable";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IBatchVote } from "../../types/types";
import { selectWinList } from "../bidding/batchVoteSlice";
import './style.css';

interface Props {
  batchId?: number
}

const pathMap = new Map<string, string>()
pathMap.set('home', '/')
pathMap.set('poll', '/polling')
pathMap.set('bid', '/bidding')

export const BiddingDetailPage: React.FC<Props> = ({ batchId }) => {
  const navigate = useNavigate()
  const param = useParams()
  const dispatch = useAppDispatch()
  const winList = useAppSelector(selectWinList)
  const [currentBatch, setCurrentBatch] = useState<IBatchVote>()

  const goTo = (pageName: 'home' | 'poll' | 'bid') => {
    let path = pathMap.get(pageName)
    if(!path) return
    navigate(path)
}   

  useEffect(() => {
    if (!winList) {
      return
    }

    if (!param.id) return
    let intCurrentBatchId = parseInt(param.id)

    let target = winList.find((b: IBatchVote) => b.batchId === intCurrentBatchId)
    if (!target) {
      console.log("target batch not found")
      return
    }

    setCurrentBatch(target)

  }, [winList])

  return (
    <main className="polling-main">
      <h4 className="polling-title">Place Bid</h4>
      <div className="nav-btn-row">
        <a>
          <button className="default-btn" onClick={() => goTo('bid')}>
            <span><HeadLeft /></span>
            <span>Back to All Bid</span>
          </button>
        </a>
        <div className="prev-and-next">
          <a>
            <button className="default-btn">
              <span><HeadLeft /></span>
              <span>Previous Bid</span>
            </button>
          </a>
          <a>
            <button className="default-btn">
              <span>Next Bid</span>
              <span><HeadRight /></span>
            </button>
          </a>
        </div>
      </div>
      <div className="bidding-detail-body">
        <div className="bidding-detail-main">
          <div className="align-right-wrapper">
            <div className="current-bid-box">
              <h3>YOUR BID:</h3>
              <p className="price-title">Total Bid:</p>
              <p className="big-number">0 $</p>
              <p className="price-title">Total Tasks:</p>
              <p className="big-number">0</p>
            </div>
          </div>


          <TaskListTable data={currentBatch?.tasks} batchId={currentBatch?.batchId} />
        </div>
      </div>

    </main>
  )
} 