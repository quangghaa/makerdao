import React, { useState } from 'react';
import { Divider, Progress, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IBatchVote } from '../../types/types';
import { useAppDispatch } from '../../redux/store';
import { setSelectedBatch } from '../../pages/polling-page/requestSlice';

const columns: ColumnsType<IBatchVote> = [
  {
    title: 'Batch ID',
    dataIndex: 'key',
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: 'Batch title',
    dataIndex: 'batchTitle',
    render: (text: string) => <a>{text}</a>,
  },
  {
    title: 'Reporter',
    dataIndex: 'reporter',
    render: (text: string) => <a>{text}</a>
  },
  {
    title: 'Time left',
    dataIndex: 'timeLeft',
  },
  {
    title: 'Total reward',
    dataIndex: 'totalReward',
    render: (text: number) => <span>{text} tokens</span>
  },
  {
    title: 'Total participation',
    dataIndex: 'totalParticipation',
    render: (text: number) => <span>{text} persons</span>
  },
  {
    title: 'Approval',
    dataIndex: 'approval',
    render: (text: number) => <Progress type="circle" percent={text} size={'small'} />
  },
];



interface Props {
  data?: IBatchVote[]
  pollId?: number
  pollState?: 0 | 1 | 2
}

const BatchVoteTable: React.FC<Props> = ({data, pollId, pollState}) => {
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
        rowSelection={pollState === 1 ? {type: selectionType,...rowSelection} : undefined}
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{x: "150%"}}
      />
    </div>
  );
};

export default BatchVoteTable;