import Search from "antd/es/input/Search";
import React, { useEffect, useState } from "react";
import { Info } from "../../assets/func/svg";
import { InfoModal } from "../../components/modals/infoModal";
import { AbsProgress, NoProgress, YesProgress } from "../../components/progress/progress";
import SummaryInfo from "../../components/table/summaryInfo";
import TaskListDetailTable from "../../components/table/taskListDetailTable";
import { useAppSelector } from "../../redux/store";
import { getAllTask } from "../../services/batchTask";
import { IDelegate, ITask, IVotingByAddress } from "../../types/types";

interface Props {
    batchId: number
}

const votingByAddress = [
    {
      address: {img: '', status: 'green-check', name: 'StableLab', address:'0x4e324...2754', totalMkrDelegated: 300, pollParticipation: 100, executiveParticipation: 100, communication: 98.98} as IDelegate,
      option: 'Yes',
      votePercentage: 27.04,
      mkr: 48612,
      verify: 'Arbiscan',
    },
    {
      address: {img: '', status: 'green-check', name: 'StableLab', address:'0x4e324...2754', totalMkrDelegated: 300, pollParticipation: 100, executiveParticipation: 100, communication: 98.98} as IDelegate,
      option: 'Yes',
      votePercentage: 27.04,
      mkr: 48612,
      verify: 'Arbiscan',
    },
    {
      address: {img: '', status: 'unknown', name: 'StableLab', address:'0x4e324...2754', totalMkrDelegated: 300, pollParticipation: 100, executiveParticipation: 100, communication: 98.98} as IDelegate,
      option: 'Yes',
      votePercentage: 27.04,
      mkr: 48612,
      verify: 'Etherscan',
    },
    {
      address: {img: '', status: 'green-check', name: 'StableLab', address:'0x4e324...2754', totalMkrDelegated: 300, pollParticipation: 100, executiveParticipation: 100, communication: 98.98} as IDelegate,
      option: 'Yes',
      votePercentage: 27.04,
      mkr: 48612,
      verify: 'Arbiscan',
    },

  ] as IVotingByAddress[]

const fakeTaskTableData = [
    {key: 1, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected', 'Clean code', 'Extendable']} as ITask,
    {key: 2, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected 2', 'Clean code 2', 'Extendable 2']} as ITask,
    {key: 3, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected 3', 'Clean code 3', 'Extendable 3']} as ITask,
    {key: 4, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected 4', 'Clean code 4', 'Extendable']} as ITask,
    {key: 5, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected 5', 'Clean code 5', 'Extendable']} as ITask,
    {key: 6, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected 6', 'Clean code 6', 'Extendable']} as ITask,
] as ITask[]

const fakeTaskItem = {key: 1, taskId: 1, taskName: 'Implement contract', deadline: '04/04/2023', reward: 100, pic: 'vietlq', type: 0, reporter: 'nampkh', reviewer: 'nampkh', expectedResult: ['Run as expected', 'Clean code', 'Extendable']} as ITask

export const TabContent: React.FC<Props> = ({batchId}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [allTasks, setAllTasks] = useState<ITask[]>()
    // const selectedBatch = useAppSelector(selec)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const modalTitle = "Polling contract versions"

    const modalContent = [
        "v2 - The latest version of the polling contract was deployed to enable batch voting, so users can vote on multiple polls in one transaction.",
        "v1 - The first version of the polling contract is still used for creating polls on-chain, but it only allows for voting on a single poll per transaction, so an upgrade was deployed.",
    ] as string[]

    useEffect(() => {
        // setIsLoading(true)
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

            setAllTasks(tempAllTasks)
        }).catch((error) => {
            console.log(error)
            // setNotification({isShow: true, type: 'fail', message: 'Error occured, please check console'})
        }).finally(() => {
            // setIsLoading(false)
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
                    <p className="poll-posted">State go here</p>
                    <div className="submit-vote-row">
                        <button className="lightgreen-btn" onClick={() => console.log("")}>
                            Submit Vote
                        </button>
                    </div>
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
                        <span className="plurality-info-icon lightgreen" onClick={showModal}><Info /></span>
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
                <div id="search-tool" className="search-tool">
                    <Search placeholder="Search by PIC" size="large" loading={false} onSearch={() => console.log("")} />
                </div>
                <TaskListDetailTable data={allTasks ? allTasks : [] as ITask[]} />
            </div>
            <hr className="poll-hr" />

            <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} align={'center'} />

        </div>
    )
}