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

export const voteOnBatchTaskOrigin = async (batchId: number, pollId: number) => {
  try {
    let contract = getContract('batchVoting')
    const response = await contract.voteOnBatchTask(batchId, pollId)
    return response
  } catch (error) {
    console.log("voteOnBatchTask error: ", error)
    return
  }
}

export const voteOnBatchTask = async (batchId: number, pollId: number) => {
  try {
    let contract = getContract('batchVoting')
    const p = await contract.voteOnBatchTask(batchId, pollId)
    const response = await p.wait()
    return response
  } catch (error) {
    console.log("voteOnBatchTask error: ", error)
    return
  }
}

export const voteOnBatchTaskFilterEvent = async (pollId?: number, address?: string) => {
  try {
    console.log("param filter event: ", pollId, address)

    let contract = getContract('batchVoting')
    const filter = contract.filters.VoteOnBatchTask(pollId ? pollId : null, null, null, address ? address : null);
    if (!filter) throw new Error("filter undefined");
    const results = await contract.queryFilter(filter);
    return results
  } catch (error) {
    console.log("PollVote error: ", error)
    return
  }
}

export const voteOnBatchTaskFilterEventLatestBlock = async (pollId: number, address: string) => {
  try {
    let contract = getContract('batchVoting')
    const filter = contract.filters.VoteOnBatchTask(pollId, null, null, address);
    if (!filter) throw new Error("filter undefined");
    let rs = {} as ethers.Event
    await contract.queryFilter(filter).then((events) => {
      let lastestEvent = events.pop()
      if (lastestEvent) rs = lastestEvent
    })
    return rs
  } catch (error) {
    console.log("PollVote error: ", error)
    return
  }
}

export const getAllTask = async (batchId: number) => {
  try {
    let contract = getContract('taskManger')
    const response = await contract.getAllTask(batchId)
    console.log("have respone: ", response)
    return response
  } catch (error) {
    console.log("getAllTask error: ", error)
    return
  }
}

export const endVote = async () => {
  try {
    let contract = getContract('batchVoting')
    const p = await contract.endVote()
    const response = await p.wait()
    return response
  } catch (error) {
    console.log("endVote error: ", error)
    return
  }
}

export const endVoteFilterEvent = async () => {
  try {
    let contract = getContract('batchVoting')
    const filter = contract.filters.EndVote(null, null, null, null)
    let results = await contract.queryFilter(filter);
    return results
  } catch (error) {
    console.log("endVoteFilterEvent error: ", error)
    return
  }
}

export const openBatchTaskForAuction = async (pollId: number, batchTaskId: number, time: number) => {
  try {
    let contract = getContract('taskManger')
    const p = await contract.openBatchTaskForAuction(1, 1, 30000)
    const response = await p.wait()
    return response
  } catch (error) {
    console.log("openBatchTaskForAuction error: ", error)
    return
  }
}

export const openBatchTaskForAuctionFilterEvent = async () => {
  try {
    let contract = getContract('auction')
    const filter = contract.filters.OpenTaskForAuction(1, null, null, null);
    const results = await contract.queryFilter(filter);
    return results
  } catch (error) {
    console.log("openBatchTaskForAuctionFilterEvent error: ", error)
    return
  }
}