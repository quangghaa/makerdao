import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { BatchItem } from "../../components/bid/batchItem";
import { useAppSelector } from "../../redux/store";
import { IBatchVote, INotification } from "../../types/types";
import { selectWinList } from "./batchVoteSlice";
import './style.css';
import { Loading } from "../../components/loading/loading";
import { Notification } from "../../components/notification/Notification";
import Search from "antd/es/input/Search";

interface Props {
}

const fakeData = [
  {key: 1, pollId: 1, batchId: 1, description: "Very long text Very long text Very long text Very long text Very long text Very long text Very long text Very long text", totalReward: 100, totalTasks: 20, totalRemainingTasks: 10, timeLeft: "4 hours"},
  {key: 1, pollId: 1, batchId: 1, description: "Very long text Very long text Very long text Very long text Very long text Very long text Very long text Very long text", totalReward: 100, totalTasks: 20, totalRemainingTasks: 10, timeLeft: "4 hours"},
  {key: 1, pollId: 1, batchId: 1, description: "Very long text Very long text Very long text Very long text Very long text Very long text Very long text Very long text", totalReward: 100, totalTasks: 20, totalRemainingTasks: 10, timeLeft: "4 hours"},
  {key: 1, pollId: 1, batchId: 1, description: "Very long text Very long text Very long text Very long text Very long text Very long text Very long text Very long text", totalReward: 100, totalTasks: 20, totalRemainingTasks: 10, timeLeft: "4 hours"},
  // {key: 1, pollId: 1, batchId: 1, description: "Very long text Very long text Very long text Very long text Very long text Very long text Very long text Very long text", totalReward: 100, totalTasks: 20, totalRemainingTasks: 10, timeLeft: "4 hours"},
] as IBatchVote[]

export const BiddingPage: React.FC<Props> = () => {
    const winList = useAppSelector(selectWinList)

    const [batchListFake, setBatchListFake] = useState(fakeData)
    const [hasMore, setHasMore] = useState(false)

    const [isLoading, setIsLoading] = useState(false)
    const [notification, setNotification] = useState({
        isShow: false,
        type: 'warn',
        message: '',
    } as INotification)
    const [batchSearchRs, setBatchSearchRs] = useState({
      isSearch: false,
      data: [] as IBatchVote[]
    })

    const searchByBatchId = (value: string) => {
      if(!winList || winList.length === 0) return

      if(value.trim().length === 0) {
          setBatchSearchRs({
              isSearch: true,
              data: winList
          })
          return
      }

      let intId = parseInt(value)
      if(Number.isNaN(intId)) {
          console.log("Please input number only")
          setNotification({isShow: true, type: 'warn', message: 'Please input number only'})
          return
      }
      
      setIsLoading(true)
      setTimeout(() => {
          let target = winList.filter((p: IBatchVote) => Number(p.batchId) === intId)
          console.log("ra day? ", target)
          setBatchSearchRs({
              isSearch: true,
              data: target
          })
          setIsLoading(false)
      }, 500)
  }

    const fetchMoreData = () => {
      if (batchListFake.length >= 200) {
        setHasMore(false);
        return;
      }
      // a fake async api call like which sends
      // 20 more records in .5 secs
      setTimeout(() => {
        for(let i = 1; i <= 4; i++) {
          batchListFake.push({key: 1, pollId: 1, batchId: 1, description: "Very long text Very long text Very long text Very long text Very long text Very long text Very long text Very long text", totalReward: 100, totalTasks: 20, totalRemainingTasks: 10, timeLeft: "4 hours"} as IBatchVote)
        }
        setBatchListFake(Object.assign([], batchListFake))
      }, 1500);
    }

    useEffect(() => {
      if(!winList) {
        console.log("no batch list found")
        return
      }
      console.log("check batch list: ", winList)
    }, [winList])

    return (
        <main className="polling-main">
            {notification.isShow && <Notification type={notification.type} message={notification.message} />}
            
            {isLoading && <Loading />}

            <div id="search-tool" className="search-tool">
                <Search placeholder="Search by batch ID" size="large" loading={false} onSearch={searchByBatchId} />
            </div>
            <h4 className="polling-title">Batch Task List</h4>
            {(!winList || winList.length === 0) && 
            <>
            <p>{winList?.length} batch</p>
              <div className="empty-result">
                        NO DATA FOUND
                  </div>
            </>}

            {winList && !batchSearchRs.isSearch &&
              <>
                <p>{winList.length} batch</p>
                <InfiniteScroll
                      dataLength={batchListFake.length}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      loader={<h4>Loading...</h4>}
                      
                    >
                      <div className="bidding-body">
                      
                        {winList.map((i, index) => (
                          <BatchItem key={index} batch={i} />
                        ))}
                      </div>

                  </InfiniteScroll>
              </>
            }

            {winList && batchSearchRs.isSearch && batchSearchRs.data.length !== 0 &&
              <>
                <p>{winList.length} batch</p>
                <InfiniteScroll
                      dataLength={batchListFake.length}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      loader={<h4>Loading...</h4>}
                      
                    >
                      <div className="bidding-body">
                      
                        {batchSearchRs.data.map((i, index) => (
                          <BatchItem key={index} batch={i} />
                        ))}
                      </div>

                  </InfiniteScroll>
              </>
            }
            {winList && batchSearchRs.isSearch && batchSearchRs.data.length === 0 &&
              <>
                <p>{batchSearchRs.data.length} batch</p>
                <div className="empty-result">
                        NO DATA FOUND
                  </div>
              </>
            }

            {/* <div className="view-more">
              <button className="default-btn">VIEW MORE</button>
            </div> */}
        </main>
    )
} 