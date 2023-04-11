import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IBatchVote, ITask } from '../../types/types';
import { useAppDispatch } from '../../redux/store';
import { PlaceBidModal } from '../modals/place-bid/PlaceBidModal';
import { TaskDescriptionModal } from '../modals/task-description/taskDesciption';
import Search from 'antd/es/input/Search';
import { Loading } from '../loading/loading';


interface Props {
  data?: ITask[]
  batchId?: number
  currentBatch?: IBatchVote
  setCurrentBatch?: (v: IBatchVote) => void 
}

const TaskListTable: React.FC<Props> = ({data, batchId}) => {
  const columns: ColumnsType<ITask> = [
    {
      title: 'STT',
      dataIndex: '',
      render: (text: string) => <span></span>,
    },
    {
      title: 'Task ID',
      dataIndex: 'taskId',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'Task Name',
      dataIndex: 'taskName',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
    },
    {
      title: 'Reward',
      dataIndex: 'reward',
      render: (text: string) => <span>{text} tokens</span>,
    },
    {
      title: 'PIC',
      dataIndex: 'pic',
    },
    {
      title: 'Type',
      dataIndex: 'type',
    },
    {
      title: 'Point',
      dataIndex: 'point',
    },
    {
      title: 'Commited Amount',
      dataIndex: 'commitedAmount',
      render: (text: string) => <span>{text} tokens</span>,
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewer',
    },
    {
      title: 'Description',
      dataIndex: 'key',
      render: (text: React.Key) => <button className='link-button' onClick={(e) => showDescriptionModal(e, text)}>See detail</button>,
    },
    {
      title: 'Lowest Bid',
      dataIndex: 'lowestBidAmount',
      render: (text: string) => <span>{text} tokens</span>,
    },
    {
      title: 'Time Left',
      dataIndex: 'timeLeft',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: 'State',
      dataIndex: 'state',
    },
  ];
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('radio');
  const dispatch = useAppDispatch()

  const [isLoading, setIsLoading] = useState(false)
  const [taskListSearchRs, setTaskListSearchRs] = useState({
    isSearch: false,
    data: [] as ITask[]
  })

  const [currentSelectedRow, setCurrentSelectedRow] = useState<ITask>()
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false)
  const showDescriptionModal = (e: any, key: React.Key) => {
    e.stopPropagation()
    if (!data) return
    console.log("check data: >> ", data, key)
    let target = data.filter((t: ITask) => t.key === key)

    if (target.length === 0) {
      console.log("empty target")
      return
    }

    setCurrentSelectedRow(target[0])
    setIsDescriptionModalOpen(true);
  };

  const searchByPIC = (value: string) => {
    if(!data || data.length === 0) return
    if(value.trim().length === 0) {
      setTaskListSearchRs({
            isSearch: true,
            data: data
        })
        return
    }
    
    setIsLoading(true)
    setTimeout(() => {
        let target = data.filter((t: ITask) => t.pic === value)
        console.log("Check PIC response ", target)
        setTaskListSearchRs({
            isSearch: true,
            data: target
        })
        setIsLoading(false)
    }, 500)
}

  useEffect(() => {
    if(!data || data.length === 0) {
      console.log("not have data or empty")
      return
    }
    // console.log("Check table data: ", data)
  }, [data])


  const [isPlaceBidModalOpen, setIsPlaceBidModalOpen] = useState(false)
  const [selectedTask, setSelectedTask] = useState<ITask>()
  
  const closePlaceBidModal = () => {
    setIsPlaceBidModalOpen(false)
  }

  const closeDescriptionModal = () => {
    setIsDescriptionModalOpen(false)
  }

  return (
    <div>
      <div id="search-tool" className="search-tool mt-1rem mb-1rem">
        <Search placeholder="Search by PIC" size="large" loading={false} onSearch={searchByPIC} />
      </div>
      {isLoading && <Loading />}
      {!taskListSearchRs.isSearch && <Table
        // rowSelection={pollState === 1 ? {type: selectionType,...rowSelection} : undefined}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              console.log("Check event: ", event)
              console.log("check record and index: ", record, rowIndex)
              setSelectedTask(record)
              setIsPlaceBidModalOpen(true)
            }, // click row
          };
        }}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{x: "150%"}}
      />}
      {taskListSearchRs.isSearch && <Table
        // rowSelection={pollState === 1 ? {type: selectionType,...rowSelection} : undefined}
        onRow={(record, rowIndex) => {
          return {
            onClick: event => {
              console.log("Check event: ", event)
              console.log("check record and index: ", record, rowIndex)
              setSelectedTask(record)
              setIsPlaceBidModalOpen(true)
            }, // click row
          };
        }}
        columns={columns}
        dataSource={taskListSearchRs.data}
        pagination={false}
        scroll={{x: "150%"}}
      />}

      {selectedTask && batchId && <PlaceBidModal isOpen={isPlaceBidModalOpen} selectedTask={selectedTask} batchId={batchId} handleCancel={closePlaceBidModal} />}
      <TaskDescriptionModal isModalOpen={isDescriptionModalOpen} handleCancel={closeDescriptionModal} task={currentSelectedRow ? currentSelectedRow : {} as ITask} />
    </div>
  );
};

export default TaskListTable;