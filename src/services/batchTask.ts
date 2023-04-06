import { Contract, ethers } from "ethers"
import TaskManagerAddress from "../contractsData/TaskManager-address.json"
import BatchTaskVotingAddress from "../contractsData/BatchTaskVoting-address.json"
import TaskAuctionAddress from "../contractsData/TaskAuction-address.json"

import TaskManagerAbi from "../contractsData/TaskManager.json"
import BatchTaskVotingAbi from "../contractsData/BatchTaskVoting.json"
import TaskAuctionAbi from "../contractsData/TaskAuction.json"
import { getContract } from "./poll"

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

export const voteOnBatchTask = async (batchId: number, pollId: number) => {
    try {
        let contract = getContract('batchVoting')
        const response = await contract.voteOnBatchTask(batchId, pollId)
        return response
      } catch (error) {
        console.log("voteOnBatchTask error: ", error)
        return
      }
}

export const voteOnBatchTaskFilterEvent = async (pollId?: number, address?: string) => {
    try {
        let contract = getContract('batchVoting')
        const filter = contract.filters.VoteOnBatchTask(pollId ? pollId : null, null, null, address ? address : null);
        if(!filter) throw new Error("filter undefined");
        const results = await contract.queryFilter(filter);
        return results
      } catch (error) {
        console.log("PollVote error: ", error)
        return
      }
}