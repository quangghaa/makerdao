import React, { useState } from 'react';
import { Divider, Progress, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IBatchVote, ITask } from '../../types/types';
import { useAppDispatch } from '../../redux/store';
import { setSelectedBatch } from '../../pages/polling-page/requestSlice';

const columns: ColumnsType<ITask> = [
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
    dataIndex: 'description',
  },
  {
    title: 'Current Bid',
    dataIndex: 'currentBid',
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



interface Props {
  data?: ITask[]
  batchId?: number
}

const TaskListTable: React.FC<Props> = ({data, batchId}) => {
  const [selectionType, setSelectionType] = useState<'checkbox' | 'radio'>('radio');
  const dispatch = useAppDispatch()

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: IBatchVote[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      
      let intKey = parseInt(selectedRowKeys[0].toString())
      dispatch(setSelectedBatch({pollId: selectedRows[0].pollId, batchId: intKey}))
    },
    getCheckboxProps: (record: IBatchVote) => ({
      disabled: false, // Column configuration not to be checked
      // name: record.name,
    }),
  };

  return (
    <div>
      <Table
        // rowSelection={pollState === 1 ? {type: selectionType,...rowSelection} : undefined}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{x: "150%"}}
      />
    </div>
  );
};

export default TaskListTable;