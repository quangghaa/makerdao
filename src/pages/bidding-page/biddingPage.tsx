import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyLoad from "react-lazy-load";
import { HeadUpArrow, Info, Search } from "../../assets/func/svg";
import { BatchItem } from "../../components/bid/batchItem";
import { useAppSelector } from "../../redux/store";
import { IBatchVote } from "../../types/types";
import { selectBatchList } from "./bidSlice";
import './style.css';

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
    const batchList = useAppSelector(selectBatchList)

    const [batchListFake, setBatchListFake] = useState(fakeData)
    const [hasMore, setHasMore] = useState(true)

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

    // for(let i = 1; i < 100; i++) {
    //   batchListFake.push({key: i, pollId: i, batchId: i, description: "Very long text Very long text Very long text Very long text Very long text Very long text Very long text Very long text", totalReward: 100, totalTasks: 20, totalRemainingTasks: 10, timeLeft: "4 hours"} as IBatchVote)
    // }

    useEffect(() => {
      if(!batchList) {
        console.log("no batch list found")
        return
      }
      console.log("check batch list: ", batchList)
    }, [batchList])

    return (
        <main className="polling-main">
            <div className="search-button">
                <input type="text" placeholder="Search by batch ID" />
                <div className="search-icon-box">
                    <Search />
                </div>
            </div>
            <h4 className="polling-title">Batch Task List</h4>
            {(!batchList || batchList.length === 0) && 
            <>
              <p>No batch task list found =&gt; FAKE IT</p>
              <p>{batchListFake.length} batch</p>
                    {/* {batchListFake.map((b: IBatchVote) => {
                        return (
                          <LazyLoad height={"auto"} width={"auto"} onContentVisible={() => {console.log('loaded!')}}>
                            <BatchItem batch={b} />
                          </LazyLoad>
                        )
                    })} */}
                    <InfiniteScroll
                      dataLength={batchListFake.length}
                      next={fetchMoreData}
                      hasMore={hasMore}
                      loader={<h4>Loading...</h4>}
                      endMessage={
                        <p style={{ textAlign: "center" }}>
                          <b>Yay! You have seen it all</b>
                        </p>
                      }
                    >
                      <div className="bidding-body">
                      
                        {batchListFake.map((i, index) => (
                          <BatchItem key={index} batch={i} />
                        ))}
                      </div>

                    </InfiniteScroll>
            </>}

            {batchList && 
              <>
                <p>{batchList.length} batch</p>
                <div className="bidding-body">
                    {batchList.map((b: IBatchVote, index) => {
                        return (
                            <BatchItem key={index} batch={b} />
                        )
                    })}
                </div>
              </>
            }

            <div className="view-more">
              <button className="default-btn">VIEW MORE</button>
            </div>
        </main>
    )
} 