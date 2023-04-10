import { Button } from "antd";
import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { Contract, ethers, Signer } from "ethers";
import Web3 from "web3";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectAuth } from "./auth/authSlice";
import { EndVoteEventArgs, IBatchVote, ITask, OpenTaskAuctionEventArgs } from "../types/types";
import { selectWinList, setWinList } from "./bidding/batchVoteSlice";
import { getAllPoll, openPollForVoteFilterEvent, openPollForVote_ID1, openPollForVote_ID2 } from "../services/poll";
import { endVote, endVoteFilterEvent, openBatchTaskForAuction, openBatchTaskForAuctionFilterEvent } from "../services/batchTask";

interface Props {

}

export const MetamaskTest: React.FC<Props> = () => {
    const authState = useAppSelector(selectAuth)
    const winList = useAppSelector(selectWinList)
    const dispatch = useAppDispatch()

    const callPoll = async () => {
        getAllPoll().then((value: any) => {
            console.log("check data: ", value)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })
    }

    const callBatchTask = async () => {
    }

    const openVote_ID1 = async () => {
        openPollForVote_ID1().then((value: any) => {
            console.log("check data: ", value)

            openPollForVoteFilterEvent().then((value: any) => {
                console.log("check open poll event: ", value)
            })

        }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })

    }

    const openVote_ID2 = async () => {
        openPollForVote_ID2().then((value: any) => {
            console.log("check data: ", value)

            openPollForVoteFilterEvent().then((value: any) => {
                console.log("check open poll event: ", value)
            })
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })
    }

    const voteBatch = async () => {
        // if(window.ethereum && authState){
        //     let contract = (authState.auth?.batchVotingContract) as Contract
        //     try{
        //         let batch = await contract.voteOnBatchTask(1, 1);
        //         console.log("thanh cong vote: ")

        //         //Filter EndVote event
        //         const filter = contract.filters.VoteOnBatchTask(1, null, null, null);
        //         const results = await contract.queryFilter(filter);
        //         console.log("results: ", results)

        //     } catch(err) {
        //         console.log("error: ", err)
        //     }
        // }
        // else {
        //     console.log("Co gi do sai sai")
        // }
    }

    const endVoteClick = async () => {
        endVote().then((res: any) => {
            console.log("check endvote: ", res)

            endVoteFilterEvent().then((event) => {
                console.log("Check endvote Event: ", event)
                if (!event) {
                    console.log("end vote event undefined")
                    return
                }
                if (event.length === 0) {
                    console.log("end vote event empty")
                    return
                }
                let winList = [] as IBatchVote[]
                event.forEach((e: ethers.Event) => {
                    let batchVote = { key: 1, pollId: 1, batchId: 1, description: "Very long text Very long text Very long text Very long text Very long text Very long text Very long text Very long text", totalReward: 100, totalTasks: 20, totalRemainingTasks: 10, timeLeft: "4 hours" } as IBatchVote
                    if (!e.args) {
                        console.log("end vote event args undefined")
                        return
                    }
                    let ePollId = Number(e.args.pollId)
                    let eBatchId = Number(e.args.batchWinVote.batchTaskId)
                    console.log("Check ePollId and eBatchId: ", ePollId, eBatchId)

                    batchVote.pollId = ePollId
                    batchVote.batchId = eBatchId

                    winList.push(batchVote)
                })

                // dispatch here
                dispatch(setWinList(winList))
            })

        }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })
    }

    const aution = async () => {
        // if(window.ethereum && authState){
        //     let contract = (authState.auth?.batchVotingContract) as Contract
        //     let batch = await contract.();
        //     console.log("thanh cong: ")
        // }
        // else {
        //     console.log("Co gi do sai sai")
        // }
    }

    const openAuction = async () => {
        openBatchTaskForAuction(1, 1, 30000).then((res: any) => {
            console.log("check open auction response: ", res)

            openBatchTaskForAuctionFilterEvent().then((event) => {
                console.log("Check open auction Event: ", event)
                if (!event) {
                    console.log("open auction event undefined")
                    return
                }
                if (event.length === 0) {
                    console.log("open auction event empty")
                    return
                }
                let eventRs = [] as OpenTaskAuctionEventArgs[]

                if (!winList || winList.length === 0) {
                    console.log("batch list empty or undefined")
                    return
                }
                let newBatchList = [] as IBatchVote[]
                winList.forEach((b: IBatchVote) => {
                    let x = {} as IBatchVote
                    x.batchId = b.batchId
                    x.tasks = [] as ITask[]

                    newBatchList.push(x)
                })

                event.forEach((r: ethers.Event) => {
                    let e = {} as OpenTaskAuctionEventArgs
                    let intBatchTaskId = parseInt(r.args?._batchTaskId?.toString())

                    e.batchId = intBatchTaskId
                    e.auctionDuration = r.args?._auctionDuration.toString()
                    e.timeStart = r.args?.timeStart.toString()

                    let task = {} as ITask
                    let fakeTaskItem = {key: 1, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected', 'Clean code', 'Extendable']} as ITask
                    task = {...fakeTaskItem}
                    let intTaskId = parseInt(r.args?.auctionTask.taskId.toString())
                    let intReward = parseInt(r.args?.auctionTask.reward.toString())
                    let intPoint = parseInt(r.args?.auctionTask.point.toString())
                    let intMinReward = parseInt(r.args?.auctionTask.minReward.toString())
                    let intLowestBidAmount = parseInt(r.args?.auctionTask.lowestBidAmount.toString())

                    task.taskId = intTaskId
                    task.reward = intReward
                    task.reviewer = r.args?.auctionTask.reviewer.toString()
                    task.reporter = r.args?.auctionTask.reporter.toString()
                    task.point = intPoint
                    task.minReward = intMinReward
                    task.lowestBidder = r.args?.auctionTask.lowestBidder.toString()
                    task.lowestBidAmount = intLowestBidAmount
                    task.doer = r.args?.auctionTask.doer.toString()
                    task.key = intTaskId

                    e.auctionTask = task

                    let ind = newBatchList.findIndex((b: IBatchVote) => b.batchId === e.batchId)
                    if (ind === -1) {
                        console.log("found index -1")
                        return
                    }
                    newBatchList[ind].tasks.push(task)
                    eventRs.push(e)
                })
                console.log("set task list to batch")
                console.log("before set new batch list: ", newBatchList)
                dispatch(setWinList(newBatchList))
            })

        }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })
    }

    const placeBid = async () => {
        // if(window.ethereum && authState){
        //     let contract = (authState.auth?.autionContract) as Contract
        //     try{
        //         let batch = await contract.placeBid(1, 1, 90);
        //         console.log("thanh cong place bid: ")
        //         //Filter EndVote event
        //         const filter = contract.filters.PlaceBid(null, null, null, null);
        //         const results = await contract.queryFilter(filter);
        //         console.log("results: ", results)
        //     } catch(err) {
        //         console.log("error: ", err)
        //     }
        // }
        // else {
        //     console.log("Co gi do sai sai")
        // }
    }

    return (
        <>
            <h1>
                -------- ADMIN ---------
            </h1>

            {/* <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={callPoll}>All Polls</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={callBatchTask}>Batch task</Button>
        </div> */}

            <div className="mt-1rem">
                <button className="default-btn" onClick={openVote_ID1}>Open vote Poll 1</button>
            </div>

            <div className="mt-1rem">
                <button className="default-btn" onClick={openVote_ID2}>Open vote Poll 2</button>
            </div>

            {/* <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={voteBatch}>Vote batch</Button>
        </div> */}
            <div className="mt-1rem">
                <button className="default-btn" onClick={endVoteClick}>End vote</button>
            </div>
            <div className="mt-1rem">
                <button className="default-btn" onClick={openAuction}>Open for Auction PollId 1 BatchId 1</button>
            </div>

            {/* <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={placeBid}>Place bid</Button>
        </div> */}

        </>
    )
}