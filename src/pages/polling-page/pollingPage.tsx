import { Input } from "antd";
import Search from "antd/es/input/Search";
import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { HeadUpArrow, Info } from "../../assets/func/svg";
import { LightGreenButton, ViewMoreButton } from "../../components/button/buttons";
import { Filter } from "../../components/filter/filter";
import { Loading } from "../../components/loading/loading";
import { InfoModal } from "../../components/modals/infoModal";
import { Notification } from "../../components/notification/Notification";
import { PollItem } from "../../components/poll/poll";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { voteOnBatchTask, voteOnBatchTaskFilterEvent } from "../../services/batchTask";
import { getAllPoll } from "../../services/poll";
import { IBatchVote, ICharacteristic, IContractRequest, IFilter, INotification, IPoll, IPollOption, ISelectedBatch, ISort, IUserVote } from "../../types/types";
import { selectAuth } from "../auth/authSlice";
import {selectPolls, selectPollState } from "./pollSlice";
import { selectedBatch, setSelectedBatch } from "./voteSlice";
import './style.css';

interface Props {
}

  const pollItem = {
    postedTime: 'mar 13 2023 16:00 UTC',
    title: 'Task Auction',
    description: 'Vote task list, task commitment, task auction, tokens reward',
    batchVotes: [] as IBatchVote[],
    charateristic: [
      {
        tipe: 'yellow-pink',
        text: 'High Impact'
      },
    //   {
    //     tipe: 'pink',
    //     text: 'Real World Asset'
    //   },
    //   {
    //     tipe: 'gray',
    //     text: 'Misc Governance'
    //   },
    //   {
    //     tipe: 'orange',
    //     text: 'Collateral Offboarding'
    //   },
    //   {
    //     tipe: 'yellow',
    //     text: 'Misc Funding'
    //   },
    //   {
    //     tipe: 'green',
    //     text: 'Ratification Poll',
    //   },
    //   {
    //     tipe: 'blue-green',
    //     text: 'MIP'
    //   },
    //   {
    //     tipe: 'blue',
    //     text: 'Budget'
    //   }
    ] as ICharacteristic[],
    timeRemaining: '4d 7h',
    totalComments: 2,
    agreePercentage: 70,
    disagreePercentage: 20,
    neutralPercentage: 10,
    leadingOption: 'YES',
    status: 'active',
    passedTime: 'mar 15 2023 18:18 UTC',
    executedTime: 'mar 16 2023 10:20 UTC',
    mkr: 99245,
    supportingMkr: 115663
  } as IPoll

export const PollingPage: React.FC<Props> = () => {
    const { Search } = Input;

    const dispatch = useAppDispatch()
    const pollState = useAppSelector(selectPollState)
    const polls = useAppSelector(selectPolls)
    const authState = useAppSelector(selectAuth)

    const [userVoteList, setUserVoteList] = useState([] as IUserVote[])

    const [allPolls, setAllPolls] = useState([] as IPoll[])
    const [pollsSearchRs, setPollsSearchRs] = useState({
        isSearch: false,
        data: [] as IPoll[]
    })

    const [hasMore, setHasMore] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [notification, setNotification] = useState({
        isShow: false,
        type: 'warn',
        message: '',
    } as INotification)

    const fetchMoreData = () => {
      console.log("fetch more data")
    }  

    const searchByPollId = (value: string) => {
        let intId = parseInt(value)
        if(Number.isNaN(intId)) {
            console.log("Please input number only")
            setNotification({isShow: true, type: 'warn', message: 'Please input number only'})
            return
        }
        if(allPolls.length === 0) return
        
        setIsLoading(true)
        setTimeout(() => {
            let target = allPolls.filter((p: IPoll) => Number(p.pollId) === intId)
            setPollsSearchRs({
                isSearch: true,
                data: target
            })
            setIsLoading(false)
        }, 1000)
    }

    const handleUserChoice = (pollId: number, optionId: number, value: string) => {
        let isExist = false
        userVoteList.forEach((u: IUserVote) => {
            if (u.optionId === optionId) {
                console.log("contain optionId: ", optionId)
                isExist = true
                u.vote = (value === 'yes') ? true : false
            }
        })
        if (!isExist) {
            console.log("Add new user vote")
            console.log("vote list before add: ", userVoteList)
            userVoteList.push({ pollId: pollId, optionId: optionId, vote: (value === 'yes') ? true : false })
            console.log("new vote list: ", userVoteList)
            setUserVoteList(Object.assign([], userVoteList))
        } else {
            setUserVoteList(Object.assign([], userVoteList))
        }
    }

    const submitVote = (selectedBatch: ISelectedBatch) => {
        console.log("Sumit vote >>> ")
        
        setIsLoading(true)
        voteOnBatchTask(selectedBatch.batchId, selectedBatch.pollId).then((value: any) => {
            console.log("check data: ", value)
        }).catch((error) => {
            console.log(error)
            setNotification({isShow: true, type: 'fail', message: 'Error occured, please check console'})
        }).finally(() => {
            setIsLoading(false)
        })

    }

    useEffect(() => {
        if(!notification.isShow) return  
        // close notification after 3 seconds
        setTimeout(() => {
            setNotification({...notification, isShow: false})
        }, 3000)
    }, [notification])

    useEffect(() => {
        if(!authState.isLoggedIn) {
            setNotification({isShow: true, type: 'warn', message: 'Please check your wallet connect'})
            return 
        }

        voteOnBatchTaskFilterEvent(undefined, authState.auth?.account)
            .then((result) => {
                console.log("voteOnBatchTask event: ", result)
                if(!result) return 
                if(result.length === 0) return
                let event = result[result.length - 1].args
                if(!event) return
                console.log("FIND IT: ", Number(event._pollId), Number(event.batchTaskVoted.batchTaskId))
                
                let ePollId = Number(event._pollId)
                let eBatchId = Number(event.batchTaskVoted.batchTaskId)

                dispatch(setSelectedBatch({pollId: ePollId, batchId: eBatchId} as ISelectedBatch))

            }).finally(() => {
            })
        
        setIsLoading(true)
        getAllPoll().then((pollList: any) => {
            let tempAllPolls = [] as IPoll[]
            if(!Array.isArray(pollList)) return 
            pollList.forEach((p: any) => {
                let tempPoll = {} as IPoll
                tempPoll = {...pollItem}
                tempPoll.pollId = Number(p.pollId)
                tempPoll.pollOwner = p.pollOwner
                tempPoll.pollState = p.pollState

                if(!Array.isArray(p.batchTaskIds)) return 
                let tempBatchList = [] as IBatchVote[]
                p.batchTaskIds.forEach((id: any) => {
                    let t = {} as IBatchVote
                    t.key = Number(id)
                    t.batchId = Number(id)
                    tempBatchList.push(t)
                })
                tempPoll.batchVotes = tempBatchList
                tempAllPolls.push(tempPoll)
            })
            setAllPolls(tempAllPolls)
        }).catch((error) => {
            console.log(error)
            setNotification({isShow: true, type: 'fail', message: 'Error occured, please check console'})
        }).finally(() => {
            setIsLoading(false)
        })
    }, [authState])


    useEffect(() => {
        console.log("raw polls >>>: ", allPolls)
    }, [allPolls])

    // useEffect(() => {
    //     if(!polls) return 
    //     // Get all batch here (dispatch ...)
        
    //     let rs = [] as IPoll[]
    //     polls.forEach((p: IPoll) => {
    //         let pollObj = {} as IPoll
    //         pollObj = {...pollItem}
    //         pollObj = {...p}
    //         let batchList = [] as IBatchVote[]

    //         p.batchTaskIds?.forEach((b: BigNumber) => {
    //             let batchObj = {} as IBatchVote
    //             if(!pollObj.pollId) {
    //                 console.log("undefined poll id")
    //                 return
    //             }
    //             batchObj.pollId = Number(pollObj.pollId)
    //             batchObj.key = Number(b)
    //             batchList.push(batchObj)
    //         })
    //         pollObj.batchVotes = batchList

    //         // delete me later
    //         // pollObj.pollState = 1

    //         rs.push(pollObj)
    //     })
        
    //     setPollsToShow(rs)

    // }, [polls])

    return (
        <main className="polling-main">
            {notification.isShow && <Notification type={notification.type} message={notification.message} />}
            
            {isLoading && <Loading />}

            <div id="search-tool" className="search-tool">
                <Search placeholder="Search by Poll ID" size="large" loading={false} onSearch={searchByPollId} />
            </div>

            <div className="polling-body">
                <div className="polling-list">
                    <h4 className="polling-title">All Polls</h4>
                    <p className="polling-sub-title">{allPolls.length} polls</p>
                    
                    {!allPolls || allPolls.length === 0 && 
                    <div className="empty-result">
                        NO DATA FOUND
                    </div>}

                    {allPolls && !pollsSearchRs.isSearch && 
                        <InfiniteScroll
                        dataLength={allPolls.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                      >
                          <div className="polling-items">
                              {allPolls.map((p: IPoll) => {
                                  return <PollItem key={p.pollId} poll={p} handleUserChoice={handleUserChoice} setNotification={setNotification}/>
                              })}
                          </div>
                      </InfiniteScroll>}

                      {allPolls && pollsSearchRs.isSearch && pollsSearchRs.data.length > 0 &&
                        <InfiniteScroll
                        dataLength={allPolls.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                      >
                          <div className="polling-items">
                              {allPolls.map((p: IPoll) => {
                                  return <PollItem key={p.pollId} poll={p} handleUserChoice={handleUserChoice} setNotification={setNotification}/>
                              })}
                          </div>
                      </InfiniteScroll>}

                      {allPolls && pollsSearchRs.isSearch && pollsSearchRs.data.length === 0 &&
                        <div className="empty-result">
                            NO DATA FOUND
                        </div>}

                </div>

            </div>

            {/* <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} align={'center'} /> */}
        </main>
    )
} 