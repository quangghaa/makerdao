import React, { useState } from 'react';
import { Divider, Popover, Progress, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IBatchVote, IDelegate } from '../../types/types';
import { useAppDispatch } from '../../redux/store';
import { setSelectedBatch } from '../../pages/polling-page/requestSlice';
import { StableLab } from '../../assets/func/img';
import { GreenCheck } from '../../assets/func/svg';
import { PopoverDelegate } from '../delegate/delegate';

const delegate = {
  img: '',
  status: 'green-check',
  name: 'StableLab',
  address: '0.4e324...2754',
  totalMkrDelegated: 330,
  pollParticipation: 100,
  executiveParticipation: 100,
  communication: 98.88
} as IDelegate

const columns: ColumnsType<IBatchVote> = [
  {
    title: 'Batch ID',
    dataIndex: 'key',
    render: (text: string) => <span>{text}</span>,
  },
  {
    title: 'Reporter',
    dataIndex: 'reporter',
    render: (text: string) => {
      if(text && text.length != 0) {
        return <a href="#" className='address-item'>
                <Popover placement="bottomLeft" content={() => delegate ? PopoverDelegate(delegate) : <></>}>
                <div className="delegate-img" onMouseOver={() => console.log("hover me")}>
                    <StableLab />
                    <div className="green-check-box">
                        <GreenCheck />
                    </div>
                </div>
                </Popover>
                <div className="delegate-info">
                    <p></p>
                    <p>{"ABC"}</p>
                </div>
          </a>
      } else {
        return <>---</>
      }
    }
  },
  {
    title: 'Time left',
    dataIndex: 'timeLeft',
    render: (text: string) => {
      if(text && text.length != 0) {
        return <span>{text}</span>
      } else {
        return <>---</>
      }
    }
  },
  {
    title: 'Total reward',
    dataIndex: 'totalReward',
    render: (text: number) => {
      if(text) {
        return <span>{text} tokens</span>
      } else {
        return <>---</>
      }
    }
  },
  {
    title: 'Total participation',
    dataIndex: 'totalParticipation',
    render: (text: number) => {
      if(text) {
        return <span>{text} persons</span>
      } else {
        return <>---</>
      }
    }
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