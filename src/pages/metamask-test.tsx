import { Button } from "antd";
import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { AccountInfoModal } from "../components/modals/account-info/account-info";
import { Contract, ethers, Signer } from "ethers";
import taskManagerAbi from '../abi/TaskManager.sol/TaskManager.json';
import Web3 from "web3";
import { useAppSelector } from "../redux/store";
import { selectAuth } from "./auth/authSlice";

interface Props {
    
}

export const MetamaskTest: React.FC<Props> = () => {
    const authState = useAppSelector(selectAuth)

    const callPoll = async () => {
        if(window.ethereum && authState){
            let contract = (authState.auth?.taskManagerContract) as Contract
            let allPoll = await contract.getAllPoll();
            console.log("all poll: ", allPoll[0].pollId)
            console.log("all poll: ", allPoll[0].pollOwner)
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

    const voteBatch = async () => {
        if(window.ethereum && authState){
            let contract = (authState.auth?.batchVotingContract) as Contract
            let batch = await contract.voteOnBatchTask(1, true);
            // let batch2 = await contract.voteOnBatchTask(2, false);
            console.log("thanh cong vote ca 2: ")
        }
        else {
            console.log("Co gi do sai sai")
        }
    }

    const endVote = async () => {
        if(window.ethereum && authState){
            let contract = (authState.auth?.batchVotingContract) as Contract
            let batch = await contract.endVote();
            console.log("thanh cong: ")
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
            let batch = await contract.openBatchTaskForAuction(1, 100);
            console.log("thanh cong batch aution: ")
        }
        else {
            console.log("Co gi do sai sai")
        }
    }

    const placeBid = async () => {
        if(window.ethereum && authState){
            let contract = (authState.auth?.autionContract) as Contract
            let batch = await contract.placeBid(1, {value: 90});
            console.log("thanh cong place bid: ")
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
            <Button onClick={voteBatch}>Vote batch</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={endVote}>End vote</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={aution} disabled>Aution</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={openBatchTaskForAuction}>Open batch for aution</Button>
        </div>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={placeBid}>Place bid</Button>
        </div>

        </>
    )
}