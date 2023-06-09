import { Button } from "antd";
import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { Contract, ethers, Signer } from "ethers";
import Web3 from "web3";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectAuth } from "./auth/authSlice";
import { EndVoteEventArgs, IBatchVote, ITask, OpenTaskAuctionEventArgs } from "../types/types";
import { selectBatchList, setBid } from "./bidding/bidSlice";
import { getAllPoll, openPollForVote, openPollForVoteFilterEvent } from "../services/poll";

interface Props {
    
}

export const MetamaskTest: React.FC<Props> = () => {
    const authState = useAppSelector(selectAuth)
    const batchList = useAppSelector(selectBatchList)
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

    const openVote = async () => {
        openPollForVote().then((value: any) => {
            console.log("check data: ", value)
        }).catch((error) => {
            console.log(error)
        }).finally(() => {
        })

        openPollForVoteFilterEvent().then((value: any) => {
            console.log("check open poll event: ", value)
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

    const endVote = async () => {
        // if(window.ethereum && authState){
        //     let contract = (authState.auth?.batchVotingContract) as Contract

        //     let taskManagerContract = (authState.auth?.taskManagerContract) as Contract
            
        //     try{
        //         let batch = await contract.endVote();
        //         console.log("thanh cong end vote: ")
        //         //Filter EndVote event
        //         const filter = contract.filters.InitBatchTaskAuction(null, null, null, null);
        //         const results = await contract.queryFilter(filter);
        //         console.log("results: ", results)
        //         let eventRs = [] as EndVoteEventArgs[]
        //         results.forEach((r: ethers.Event) => {
        //             let e = {} as EndVoteEventArgs
        //             let intPollId = parseInt(r.args?.pollId.toString())
        //             let intBatchTaskId = parseInt(r.args?.batchTaskAuction?.batchTaskId.toString())
        //             let intRs = parseInt(r.args?.batchTaskAuction?.result.toString())

        //             e.pollId = intPollId
        //             e.time = r.args?.time.toString()
        //             e.batchTaskId = intBatchTaskId
        //             e.result = intRs

        //             eventRs.push(e)
        //         })

        //         console.log("check eventRs: ", eventRs)
        //         console.log("set bid list")
        //         let batchList = [] as IBatchVote[]
                
        //         eventRs.forEach((e: EndVoteEventArgs) => {
        //             let t = {} as IBatchVote
        //             t.batchId = e.batchTaskId ? e.batchTaskId : -1

        //             batchList.push(t)
        //         })
        //         console.log("before set batch list: ", batchList)

        //         dispatch(setBid(batchList))
                
        //     } catch(err) {
        //         console.log("error: ", err)
        //     }
        // }
        // else {
        //     console.log("Co gi do sai sai")
        // }
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

    const openBatchTaskForAuction = async () => {
        // if(window.ethereum && authState){
        //     let contract = (authState.auth?.taskManagerContract) as Contract
        //     let autionContract = (authState.auth?.autionContract) as Contract

        //     try{
        //         let batch = await contract.openBatchTaskForAuction(1, 300);
        //         console.log("thanh cong batch task for auction: ")
        //         //Filter EndVote event
        //         const filter = autionContract.filters.OpenTaskForAuction(null, null, null, null);
        //         const results = await autionContract.queryFilter(filter);
        //         console.log("results: ", results)

        //         let eventRs = [] as OpenTaskAuctionEventArgs[]

        //         if(!batchList || batchList.length === 0) {
        //             console.log("batch list empty or undefined")
        //             return
        //         }
        //         let newBatchList = [] as IBatchVote[]
        //         batchList.forEach((b: IBatchVote) => {
        //             let x = {} as IBatchVote
        //             x.batchId = b.batchId
        //             x.tasks = [] as ITask[]

        //             newBatchList.push(x)
        //         })

        //         results.forEach((r: ethers.Event) => {
        //             let e = {} as OpenTaskAuctionEventArgs
        //             let intBatchTaskId = parseInt(r.args?._batchTaskId?.toString())

        //             e.batchId = intBatchTaskId
        //             e.auctionDuration = r.args?._auctionDuration.toString()
        //             e.timeStart = r.args?.timeStart.toString()

        //             let task = {} as ITask
        //             let intTaskId = parseInt(r.args?.auctionTask.taskId.toString())
        //             let intReward = parseInt(r.args?.auctionTask.reward.toString())
        //             let intPoint = parseInt(r.args?.auctionTask.point.toString())
        //             let intMinReward = parseInt(r.args?.auctionTask.minReward.toString())
        //             let intLowestBidAmount = parseInt(r.args?.auctionTask.lowestBidAmount.toString()) 

        //             task.taskId = intTaskId
        //             task.reward = intReward
        //             task.reviewer = r.args?.auctionTask.reviewer.toString()
        //             task.reporter = r.args?.auctionTask.reporter.toString()
        //             task.point = intPoint
        //             task.minReward = intMinReward
        //             task.lowestBidder = r.args?.auctionTask.lowestBidder.toString()
        //             task.lowestBidAmount = intLowestBidAmount
        //             task.doer = r.args?.auctionTask.doer.toString()
                    
        //             e.auctionTask = task

        //             let ind = newBatchList.findIndex((b: IBatchVote) => b.batchId === e.batchId)
        //             if(ind === -1) {
        //                 console.log("found index -1")
        //                 return
        //             }
        //             newBatchList[ind].tasks.push(task)
        //             eventRs.push(e)
        //         })
        //         console.log("set task list to batch")
        //         console.log("before set new batch list: ", newBatchList)
        //         dispatch(setBid(newBatchList))

        //     } catch(err) {
        //         console.log("error: ", err)
        //     }
        // }
        // else {
        //     console.log("Co gi do sai sai")
        // }
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
            METAMASK Test
        </h1>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={callPoll}>All Polls</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={callBatchTask}>Batch task</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={openVote}>Open vote</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={voteBatch}>Vote batch</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={endVote}>End vote</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={openBatchTaskForAuction}>Open for Auction</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={placeBid}>Place bid</Button>
        </div>

        </>
    )
}