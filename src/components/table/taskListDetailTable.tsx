import React, { useEffect, useState } from 'react';
import { Button, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { ITask } from '../../types/types';
import { TaskDescriptionModal } from '../modals/task-description/taskDesciption';
import Search from 'antd/es/input/Search';
import { Loading } from '../loading/loading';



interface Props {
  data?: ITask[]
  batchId?: number
}

const TaskListDetailTable: React.FC<Props> = ({ data }) => {

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
        if (!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Task Name',
      dataIndex: 'taskName',
      render: (text: string) => {
        if (!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      render: (text: string) => {
        if (!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Reward',
      dataIndex: 'reward',
      render: (text: number) => {
        if (!text) return <>---</>
        return <span>{text} Tokens</span>
      },
    },
    {
      title: 'PIC',
      dataIndex: 'pic',
      render: (text: string) => {
        if (!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      render: (text: string) => {
        if (!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Point',
      dataIndex: 'point',
      render: (text: number) => {
        if (!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Commited Amount',
      dataIndex: 'commitedAmount',
      render: (text: number) => {
        if (!text) return <>---</>
        return <span>{text} Tokens</span>
      },
    },
    {
      title: 'Reviewer',
      dataIndex: 'reviewer',
      render: (text: string) => {
        if (!text) return <>---</>
        return <span>{text}</span>
      },
    },
    {
      title: 'Description',
      dataIndex: 'key',
      render: (text: React.Key) => <button className="link-button" onClick={() => showModal(text)}>See detail</button>,
    },
  ];

  const [currentSelectedRow, setCurrentSelectedRow] = useState<ITask>()
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false)
  const [taskListSearchRs, setTaskListSearchRs] = useState({
    isSearch: false,
    data: [] as ITask[]
  })

  const searchByPIC = (value: string) => {
    if (!data || data.length === 0) return
    if (value.trim().length === 0) {
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

  const showModal = (key: React.Key) => {
    if (!data) return
    let target = data.filter((t: ITask) => t.key === key)

    if (target.length === 0) {
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
    if (!data || data.length === 0) {
      console.log("not have data or empty")
      return
    }
    // console.log("Check table data: ", data)
  }, [data])

  return (
    <div>
      <div id="search-tool" className="search-tool mt-1rem mb-1rem">
        <Search placeholder="Search by PIC" size="large" loading={false} onSearch={searchByPIC} />
      </div>
      {isLoading && <Loading />}
      {!taskListSearchRs.isSearch &&
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          scroll={{ x: "150%" }}
        />}
      {taskListSearchRs.isSearch &&
        <Table
          columns={columns}
          dataSource={taskListSearchRs.data}
          pagination={false}
          scroll={{ x: "150%" }}
        />}

      <TaskDescriptionModal isModalOpen={isModalOpen} handleCancel={handleCancel} task={currentSelectedRow ? currentSelectedRow : {} as ITask} />

    </div>
  );
};

export default TaskListDetailTable;