import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { Info } from "../../assets/func/svg";
import { InfoModal } from "../../components/modals/infoModal";
import { NoProgress, YesProgress } from "../../components/progress/progress";
import SummaryInfo from "../../components/table/summaryInfo";
import TaskListDetailTable from "../../components/table/taskListDetailTable";
import { getAllTask, voteOnBatchTask, voteOnBatchTaskFilterEventLatestBlock } from "../../services/batchTask";
import { IDelegate, INotification, ISelectedBatch, ITask, IVotingByAddress } from "../../types/types";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { selectRequest } from "../polling/requestSlice";
import { selectAuth } from "../auth/authSlice";
import { selectSelectedBatchList, setSelectedBatchList } from "../polling/voteSlice";

interface Props {
    pollId: number
    pollState: 0 | 1 | 2
    batchId: number
    setIsLoading: (v: boolean) => void
    setNotification: (v: INotification) => void
}

const fakeTaskTableData = [
    {key: 1, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected', 'Clean code', 'Extendable']} as ITask,
    {key: 2, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected 2', 'Clean code 2', 'Extendable 2']} as ITask,
    {key: 3, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected 3', 'Clean code 3', 'Extendable 3']} as ITask,
    {key: 4, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected 4', 'Clean code 4', 'Extendable']} as ITask,
    {key: 5, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected 5', 'Clean code 5', 'Extendable']} as ITask,
    {key: 6, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected 6', 'Clean code 6', 'Extendable']} as ITask,
] as ITask[]

const fakeTaskItem = {key: 1, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected', 'Clean code', 'Extendable']} as ITask

export const TabContent: React.FC<Props> = ({pollId, pollState, batchId, setIsLoading, setNotification}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allTasks, setAllTasks] = useState<ITask[]>()
    const requestState = useAppSelector(selectRequest)
    const dispatch = useAppDispatch()
    const authState = useAppSelector(selectAuth)
    const selectedBatchList = useAppSelector(selectSelectedBatchList)

    const [voteState, setVoteState] = useState({pollState: -1, isVoted: false})

    const submitVote = () => {
        if (!authState.isLoggedIn) {
            if (setNotification) setNotification({ isShow: true, type: 'warn', message: 'Please check your wallet connect' } as INotification)
            return
        }

        if (!requestState.request.selectedBatch) {
            console.log("selected batch undefine")
            return
        }
        setIsLoading(true)
        voteOnBatchTask(batchId, pollId)
            .then((result) => {
                if (result.status === 0) {
                    if (setNotification) setNotification({ isShow: true, type: 'fail', message: `Voted failed with status ${result.status}` } as INotification)
                    return
                }
                console.log("pass status 0")

                if(!pollId || !authState.auth?.account) {
                    console.log("POLL ID >>", pollId)
                    console.log("Account >>", authState.auth?.account)
                    return
                }

                console.log("pass validate")
                
                if (setNotification) setNotification({ isShow: true, type: 'success', message: `Voted with transaction hash: ${result.transactionHash}` } as INotification)

                voteOnBatchTaskFilterEventLatestBlock(pollId, authState.auth.account)
                .then((event) => {
                    if(!event) {
                        if (setNotification) setNotification({ isShow: true, type: 'warn', message: `Voted event undefined` } as INotification)
                        return
                    }

                    console.log("pass event: ", event)
                    
                    let ePollId = Number(event.args?._pollId)
                    let eBatchId = Number(event.args?.batchTaskVoted.batchTaskId)
                    let eBatch = {pollId: ePollId, batchId: eBatchId} as ISelectedBatch
                    let newBatchList = [...selectedBatchList]
                    
                    let ind = selectedBatchList.findIndex((b: ISelectedBatch) => b.pollId === ePollId)
                    if(ind === -1) {
                        newBatchList.push(eBatch)
                        console.log("Add new to batch list: ", newBatchList)
                        dispatch(setSelectedBatchList(newBatchList))
                    } else {
                        newBatchList.splice(ind, 1)
                        newBatchList.push(eBatch)
                        console.log("Edit existed one: ", newBatchList)
                        dispatch(setSelectedBatchList(newBatchList))
                    }

                })
                
                // console.log("voteOnBatchTask result hash: ", result)
            }).finally(() => {
                setIsLoading(false)
            })
        
    }

    useEffect(() => {
        console.log("DEBUG poll state: ", pollState)
        if(pollState !== 1) {
            setVoteState({pollState: pollState, isVoted: false})
            return
        }
        let ind = selectedBatchList.findIndex((b: ISelectedBatch) => b.batchId === batchId)
        console.log("DEBUG index: ", ind)
        setVoteState({pollState: pollState, isVoted: ind !== -1})
    }, [pollState, selectedBatchList])

    useEffect(() => {
        setIsLoading(true)
        getAllTask(batchId).then((taskList: any) => {
            let tempAllTasks = [] as ITask[]
            if(!Array.isArray(taskList)) return 
            taskList.forEach((t: any) => {
                let tempTask = {} as ITask
                tempTask = {...fakeTaskItem}
                tempTask.key = Number(t.taskId)
                tempTask.taskId = Number(t.taskId)
                tempTask.point = Number(t.point)
                tempTask.reward = Number(t.reward)
                tempTask.reporter = t.reporter
                tempTask.reviewer = t.reviewer
                tempTask.doer = t.doer

                tempAllTasks.push(tempTask)
            })

            console.log("Check tempAllTasks: ", tempAllTasks)

            setAllTasks(tempAllTasks)
        }).catch((error) => {
            console.log(error)
            setNotification({isShow: true, type: 'fail', message: 'Error occured, please check console'})
        }).finally(() => {
            setIsLoading(false)
        })
    }, [batchId])

    return (
        <div className="vote-breakdown-tab">
            <p className="vbt-head">LEADING OPTION: <span className="lightgreen">YES</span> WITH 27,079 MKR SUPPORTING.</p>
            <hr className="poll-hr" />

            <div className="batch-summary">
                <div className="summary-left">
                    <div className='hsr-head'>
                        <h2 className="weight-500">Summary</h2>
                    </div>
                    <SummaryInfo />
                </div>
                <div className="summary-right">
                    {voteState.pollState === 0 && <p className="poll-posted">Poll not Opened</p>} 
                    {voteState.pollState === 2 && <p className="poll-posted">Poll Ended</p>} 
                    {voteState.pollState === 1 && !voteState.isVoted && 
                    <div className="submit-vote-row">
                        <button className="lightgreen-btn" onClick={submitVote}>
                            Submit Vote
                        </button>
                    </div>}
                    {voteState.pollState === 1 && voteState.isVoted && 
                    <p className="poll-posted">You have voted this Batch</p>}


                </div>
            </div>
            <hr className="poll-hr" />

            <div className="vote-breakdown">
                <div className='hsr-head mb-1rem'>
                    <h2 className="weight-500">Vote Breakdown</h2>
                    <div className="plurality-info gray-bold">
                        <span>
                            plurality poll
                        </span>
                        <span className="plurality-info-icon lightgreen" onClick={() => console.log("")}><Info /></span>
                    </div>
                </div>
                <YesProgress mkr={27079} percentage={70} />
                <NoProgress mkr={1000} percentage={30} />
            </div>
            <hr className="poll-hr" />

            <div className="task-detail">
                <div className='hsr-head'>
                    <h2 className="weight-500">Task Detail</h2>
                </div>
                <TaskListDetailTable data={allTasks ? allTasks : [] as ITask[]} />
            </div>
            <hr className="poll-hr" />
        </div>
    )
}