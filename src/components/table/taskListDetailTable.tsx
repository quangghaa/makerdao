import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ITask } from '../../types/types';
import { TaskDescriptionModal } from '../modals/task-description/taskDesciption';



interface Props {
  data?: ITask[]
  batchId?: number
}

const TaskListDetailTable: React.FC<Props> = ({data}) => {

  const columns: ColumnsType<ITask> = [
    {
      title: '',
      dataIndex: 'key',
      render: (text: string) => <span></span>,
    },
    {
      title: 'Task ID',
      dataIndex: 'taskId',
      render: (text: string) => {
        if(!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      render: (text: string) => {
        if(!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      render: (text: string) => {
        if(!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Reward',
      dataIndex: 'reward',
      render: (text: number) => {
        if(!text) return <>---</>
        return <span>{text} Tokens</span>
      },
    },
    {
      title: 'PIC',
      dataIndex: 'pic',
      render: (text: string) => {
        if(!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text: string) => {
        if(!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Point',
      dataIndex: 'point',
      render: (text: number) => {
        if(!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Commited Amount',
      dataIndex: 'commitedAmount',
      render: (text: number) => {
        if(!text) return <>---</>
        return <span>{text} Tokens</span>
      },
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewer',
      render: (text: string) => {
        if(!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Description',
      dataIndex: 'key',
      render: (text: React.Key) => <Button type="link" onClick={() => showModal(text)}>See detail</Button>,
    },
  ];

  const [currentSelectedRow, setCurrentSelectedRow] = useState<ITask>()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (key: React.Key) => {
    if(!data) return
    let target = data.filter((t: ITask) => t.key === key)

    if(target.length === 0) {
      console.log("empty target")
      return
    }

    setCurrentSelectedRow(target[0])
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if(!data || data.length === 0) {
      console.log("not have data or empty")
      return
    }
    // console.log("Check table data: ", data)
  }, [data])

  return (
    <div>
      <Table
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{x: "150%"}}
      />
      
      <TaskDescriptionModal isModalOpen={isModalOpen} handleCancel={handleCancel} task={currentSelectedRow ? currentSelectedRow : {} as ITask} />
      
    </div>
  );
};

export default TaskListDetailTable;