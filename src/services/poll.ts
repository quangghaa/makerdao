import { Contract, ethers } from "ethers"
import TaskManagerAddress from "../contractsData/TaskManager-address.json"
import BatchTaskVotingAddress from "../contractsData/BatchTaskVoting-address.json"
import TaskAuctionAddress from "../contractsData/TaskAuction-address.json"

import TaskManagerAbi from "../contractsData/TaskManager.json"
import BatchTaskVotingAbi from "../contractsData/BatchTaskVoting.json"
import TaskAuctionAbi from "../contractsData/TaskAuction.json"

export const getContract = (name: 'taskManger' | 'batchVoting' | 'auction') => {
    // if(!window.ethereum) return 
    const provider = new ethers.providers.Web3Provider((window as any).ethereum);
    const signer = provider.getSigner();
    switch (name) {
        case "taskManger":
            return new ethers.Contract(TaskManagerAddress.address, TaskManagerAbi.abi, signer);
        case "batchVoting":
            return new ethers.Contract(BatchTaskVotingAddress.address, BatchTaskVotingAbi.abi, signer);
        case "auction":
            return new ethers.Contract(TaskAuctionAddress.address, TaskAuctionAbi.abi, signer);
    }
}

export const getAllPoll = async () => {
    try {
        let contract = getContract('taskManger')
        const response = await contract.getAllPoll()
        return response
    } catch (error) {
        console.log("GetAllPoll error: ", error)
        return
    }
}

export const getAllVotingPoll = async () => {
    try {
        let contract = getContract('taskManger')
        const response = await contract.getAllVotingPoll()
        return response
    } catch (error) {
        console.log("GetAllPoll error: ", error)
        return
    }
}

export const openPollForVote_ID1 = async () => {
    try {
        let contract = getContract('taskManger')
        const response = await contract.openPollForVote(1, 80)
        return response 
    } catch (error) {
        console.log("openPollForVote error: ", error)
        return
    }
}

export const openPollForVote_ID2 = async () => {
    try {
        let contract = getContract('taskManger')
        const response = await contract.openPollForVote(2, 80)
        return response 
    } catch (error) {
        console.log("openPollForVote error: ", error)
        return
    }
}

export const openPollForVoteFilterEvent = async () => {
    try {
        let contract = getContract('taskManger')
        //Filter EndVote event
        const filter = contract.filters.OpenPollForVote(1, null, null, null, null);
        const results = await contract.queryFilter(filter);
        console.log("results: ", results)
        return results
    } catch (error) {
        console.log("openPollForVoteFilterEvent error: ", error)
        return
    }
}