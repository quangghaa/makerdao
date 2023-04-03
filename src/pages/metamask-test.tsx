import { Button } from "antd";
import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { AccountInfoModal } from "../components/modals/account-info/account-info";
import { Contract, ethers, Signer } from "ethers";
import taskManagerAbi from '../abi/TaskManager.sol/TaskManager.json';
import Web3 from "web3";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { selectAuth } from "./auth/authSlice";
import { EndVoteEventArgs, IBatchVote } from "../types/types";
import { setBid } from "./bidding-page/bidSlice";

interface Props {
    
}

export const MetamaskTest: React.FC<Props> = () => {
    const authState = useAppSelector(selectAuth)
    const dispatch = useAppDispatch()

    const callPoll = async () => {
        if(window.ethereum && authState){
            let contract = (authState.auth?.taskManagerContract) as Contract
            let allPoll = await contract.getAllPoll();
            console.log("all poll: ", allPoll[0])
        }
        else {
            console.log("Co gi do sai sai")
        }
    }

    const callBatchTask = async () => {
        if(window.ethereum && authState){
            let contract = (authState.auth?.taskManagerContract) as Contract
            let batch = await contract.getAllBatchTaskByPollID(1);
            console.log("batch: ", batch)
        }
        else {
            console.log("Co gi do sai sai")
        }
    }

    const openVote = async () => {
        if(window.ethereum && authState){
            let contract = (authState.auth?.taskManagerContract) as Contract

            console.log("check contract: ", contract)

            try{
                let batch = await contract.openPollForVote(1, 30);
                console.log("open for vote: ", batch)

                //Filter EndVote event
                const filter = contract.filters.OpenPollForVote(1, null, null, null, null);
                const results = await contract.queryFilter(filter);
                console.log("results: ", results)

            } catch(err) {
                console.log("error: ", err)
            }

            // results.map((event) => {
            //     if(!event || !event.args) {
            //         console.log("undefined event")
            //         return
            //     }
                
            //     event = event.args;
            //     let batchTaskVoted = {
            //     pollId: event.pollId.toString(),
            //     pollState: event.pollState,
            //     batchTaskCanEnd: event.batchTaskCanEnd,
            //     endTime: event.endTime,
            //     };
            //     console.log("batchTaskVoted", batchTaskVoted);
            // });
        }
        else {
            console.log("Co gi do sai sai")
        }
    }

    const voteBatch = async () => {
        if(window.ethereum && authState){
            let contract = (authState.auth?.batchVotingContract) as Contract
            try{
                let batch = await contract.voteOnBatchTask(1, 1);
                console.log("thanh cong vote: ")

                //Filter EndVote event
                const filter = contract.filters.VoteOnBatchTask(1, null, null, null);
                const results = await contract.queryFilter(filter);
                console.log("results: ", results)

            } catch(err) {
                console.log("error: ", err)
            }
        }
        else {
            console.log("Co gi do sai sai")
        }
    }

    const endVote = async () => {
        if(window.ethereum && authState){
            let contract = (authState.auth?.batchVotingContract) as Contract

            let taskManagerContract = (authState.auth?.taskManagerContract) as Contract
            
            try{
                let batch = await contract.endVote();
                console.log("thanh cong end vote: ")
                //Filter EndVote event
                const filter = contract.filters.InitBatchTaskAuction(null, null, null, null);
                const results = await contract.queryFilter(filter);
                console.log("results: ", results)
                let eventRs = [] as EndVoteEventArgs[]
                results.forEach((r: ethers.Event) => {
                    let e = {} as EndVoteEventArgs
                    let intPollId = parseInt(r.args?.pollId.toString())
                    let intBatchTaskId = parseInt(r.args?.batchTaskAuction?.batchTaskId.toString())
                    let intRs = parseInt(r.args?.batchTaskAuction?.result.toString())

                    e.pollId = intPollId
                    e.time = r.args?.time.toString()
                    e.batchTaskId = intBatchTaskId
                    e.result = intRs

                    eventRs.push(e)
                })

                console.log("check eventRs: ", eventRs)
                console.log("set bid list")
                let batchList = [] as IBatchVote[]
                
                eventRs.forEach((e: EndVoteEventArgs) => {
                    let t = {} as IBatchVote
                    t.batchId = e.batchTaskId ? e.batchTaskId : -1

                    batchList.push(t)
                })
                console.log("before set batch list: ", batchList)

                dispatch(setBid(batchList))
                
            } catch(err) {
                console.log("error: ", err)
            }
        }
        else {
            console.log("Co gi do sai sai")
        }
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
        if(window.ethereum && authState){
            let contract = (authState.auth?.taskManagerContract) as Contract
            try{
                let batch = await contract.openBatchTaskForAuction(1, 300);
                console.log("thanh cong batch task for auction: ")
                //Filter EndVote event
                const filter = contract.filters.OpenBatchTaskForAuction(null, null, null, null);
                const results = await contract.queryFilter(filter);
                console.log("results: ", results)
            } catch(err) {
                console.log("error: ", err)
            }
        }
        else {
            console.log("Co gi do sai sai")
        }
    }

    const placeBid = async () => {
        if(window.ethereum && authState){
            let contract = (authState.auth?.autionContract) as Contract
            try{
                let batch = await contract.placeBid(1, 1, 90);
                console.log("thanh cong place bid: ")
                //Filter EndVote event
                const filter = contract.filters.PlaceBid(null, null, null, null);
                const results = await contract.queryFilter(filter);
                console.log("results: ", results)
            } catch(err) {
                console.log("error: ", err)
            }
        }
        else {
            console.log("Co gi do sai sai")
        }
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