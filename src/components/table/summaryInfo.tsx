import React, { useState } from 'react';
import { Button, Divider, Popover, Progress, Radio, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { IBatchVote, IDelegate, IParticipation } from '../../types/types';
import { useAppDispatch } from '../../redux/store';
import { setSelectedBatch } from '../../pages/polling-page/requestSlice';
import { StableLab } from '../../assets/func/img';
import { GreenCheck } from '../../assets/func/svg';
import { PopoverDelegate } from '../delegate/delegate';
import { elipsisAddress } from '../../common/helper';

const delegate = {
  img: '',
  status: 'green-check',
  name: 'StableLab',
  address: '0x4e324...2754',
  totalMkrDelegated: 330,
  pollParticipation: 100,
  executiveParticipation: 100,
  communication: 98.88
} as IDelegate

const tableData = [
    {
        address: '0x8X88888888888888888888888',
        totalRewards: 88,
        totalTasks: 8
    },
    {
        address: '0x8X88888888888888888888888',
        totalRewards: 88,
        totalTasks: 8
    },
    {
        address: '0x8X88888888888888888888888',
        totalRewards: 88,
        totalTasks: 8
    },
    {
        address: '0x8X88888888888888888888888',
        totalRewards: 88,
        totalTasks: 8
    },
    {
        address: '0x8X88888888888888888888888',
        totalRewards: 88,
        totalTasks: 8
    },

] as IParticipation[]

const columns: ColumnsType<IParticipation> = [
  {
    title: 'Address',
    dataIndex: 'address',
    render: (text: string) => {
      if(text && text.length != 0) {
        return <a href="#" className='address-item'>
                <div className="delegate-img">
                    <StableLab />
                    <div className="green-check-box">
                        <GreenCheck />
                    </div>
                </div>
                <div className="delegate-info">
                    <p></p>
                    <p>{elipsisAddress(text)}</p>
                </div>
          </a>
      } else {
        return <>---</>
      }
    }
  },
  {
    title: 'Total Rewards',
    dataIndex: 'totalRewards',
    render: (text: number) => {
      if(text) {
        return <span>{text} Tokens</span>
      } else {
        return <>---</>
      }
    }
  },
  {
    title: 'Total Tasks',
    dataIndex: 'totalTasks',
    render: (text: number) => {
      if(text) {
        return <span>{text} Tasks</span>
      } else {
        return <>---</>
      }
    }
  },
];


interface Props {
  data?: IParticipation[]
}

const SummaryInfo: React.FC<Props> = ({data}) => {

  return (
    <div style={{maxWidth: "500px"}}>
      <Table
        columns={columns}
        dataSource={tableData}
        pagination={false}
        scroll={{y: 200}}
      />
    </div>
  );
};

export default SummaryInfo;