import { BigNumber, Contract } from "ethers";
import React from "react";

export interface IBatchVote {
    key: React.Key;
    pollId: number;
    batchId: number;
    tasks: ITask[];
    batchTitle: string;
    description: string;
    reporter: string;
    timeLeft: string;
    totalReward: number;
    totalTasks: number;
    totalRemainingTasks: number; 
    totalParticipation: number;
    approval: number;
  }

export interface IParticipation {
    address: string
    totalRewards: number
    totalTasks: number
}

export interface IPoll {
    id?: number;
    pollId?: number;
    batchTaskIds?: BigNumber[];
    batchVotes?: IBatchVote[];
    pollOwner?: string;
    pollState?: 0 | 1 | 2; // created - open - end poll

    postedTime?: string;
    title?: string;
    description?: string;
    mkr?: number;
    charateristic?: ICharacteristic[];
    timeRemaining?: string;
    totalComments?: number;
    agreePercentage?: number;
    disagreePercentage?: number;
    neutralPercentage?: number;
    leadingOption?: 'YES' | 'NO';
    supportingMkr?: number;
    status?: 'active' | 'executive';
    passedTime?: string;
    executedTime?: string;
}

export interface IPollOption {
    id: number;
    pollId?: number;
    batchTaskId?: BigNumber;
    pollOwner?: string;
    postedTime: string;
    title: string;
    description: string;
    mkr?: number;
    charateristic: ICharacteristic[];
    timeRemaining?: string;
    totalComments?: number;
    agreePercentage?: number;
    disagreePercentage?: number;
    neutralPercentage?: number;
    leadingOption: 'YES' | 'NO';
    supportingMkr: number;
    status: 'active' | 'executive';
    passedTime?: string;
    executedTime?: string;
}

export interface IBid {
    id: number;
    poll: IPoll;
    timeLeft: string;
    currentBid: number;
}

export interface ICharacteristic {
    tipe: 'yellow' | 'orange' | 'yellow-pink' | 'pink' | 'green' | 'blue-green' | 'blue' | 'gray';
    text: string;
}

export interface IDelegate {
    img?: string;
    status: 'green-check' | 'unknown';
    name: string;
    address: string;
    charateristic?: ICharacteristic[];
    totalMkrDelegated: number;
    pollParticipation: number;
    executiveParticipation: number;
    communication: number;
}

export interface IStepDetail {
    title: string;
    titleHighlight: string;
    description: string;
    links?: string[]
}

export interface IStep {
    id: string;
    title: string;
    detail: IStepDetail;
}

export interface IResources {
    tipe: 'Governance' | 'Products & Tools' | "Developers",
    name: string;
    iconNumber: number;
    description: string;
    link: string;
}

export interface IBrowseForum {
    img?: string;
    title: string;
    description: string;
    link: string;
}

export interface IParticipationChart {
    month: string;
    totalMkr: number;
    color?: string;
}

export interface IFilter {
    id: number;
    state: 'checked' | 'unchecked';
    name: string;
    totalValue: number;
}

export interface ISort {
    id: number;
    name: string;
}

export interface IVotingByAddress {
    address?: IDelegate
    option: 'Yes' | 'No'
    votePercentage: number
    mkr: number
    verify: string
    verifyUrl?: string 
}

export interface IAuth {
    account: string
    chainId: string
}

export interface IContract {
    
}

export interface IUserVote {
    pollId?: number
    optionId?: number
    vote?: boolean  // not vote / no / yes
    isSubmit?: boolean
}

export interface ISelectedBatch {
    pollId: number
    batchId: number
}

export interface IRequest {
    selectedBatch?: ISelectedBatch
}

export interface IContractRequest {
    contract?: Contract
    param?: any
}

export interface EndVoteEventArgs {
    pollId?: number
    time?: string
    batchTaskId?: number
    result?: number
}

export interface ITask {
    key: React.Key
    taskId: number
    taskName: string
    deadline: string
    reward: number
    minReward: number
    lowestBidder: string
    lowestBidAmount: number
    doer: string
    pic: string
    type: number
    point: number
    commitedAmount: number
    reviewer: string
    description: string
    currentBid: number
    timeLeft: string
    state: number
    reporter: string
    expectedResult: string[]
}

export interface OpenTaskAuctionEventArgs {
    batchId: number
    auctionDuration: string
    timeStart: string
    auctionTask: ITask
}

export interface INotification {
    isShow: boolean
    type: 'warn' | 'success' | 'fail'
    message: string
}
