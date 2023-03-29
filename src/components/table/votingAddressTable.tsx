import { Checkbox, Popover } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React from "react";
import { StableLab } from "../../assets/func/img";
import { GreenCheck, HeadDown, HeadUpArrow, Lightning, YellowQuestion } from "../../assets/func/svg";
import { IDelegate, IVotingByAddress } from "../../types/types";
import { PopoverDelegate } from "../delegate/delegate";
import './style.css';

interface Props {
    tableData?: IVotingByAddress[]
}

const delegateItem = {
    img: '',
    status: 'green-check',
    name: 'StableLab',
    address: '0.4e324...2754',
    totalMkrDelegated: 330,
    pollParticipation: 100,
    executiveParticipation: 100,
    communication: 98.88
} as IDelegate

export const VotingAddressTable: React.FC<Props> = ({ tableData }) => {
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
    };
    const mouseOver = () => {
    }

    return (
        <div className="table-wrapper">
            <div className="table-title-row">
                <span className="table-title">
                    Voting By Address
                </span>

                <div className="table-filter">
                    <Checkbox onChange={onChange}>
                    </Checkbox>
                    <span>Show &lt;0.05 MKR voters</span>
                </div>
            </div>

            <table className="voting-table">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Option</th>
                        <th>
                            Vote % <span><HeadDown /></span>
                        </th>
                        <th>
                            MKR <span><HeadDown /></span>
                        </th>
                        <th>
                            Verify
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {tableData?.map((t: IVotingByAddress) => {
                        return (
                            <tr>
                                <td className="td-address">
                                    <a href="#">
                                        <Popover placement="bottomLeft" content={() => t.address ? PopoverDelegate(t.address) : <></>}>
                                            <div className="delegate-img" onMouseOver={mouseOver}>
                                                <StableLab />
                                                {t.address?.status === 'green-check' &&
                                                <div className="green-check-box">
                                                    <GreenCheck />
                                                </div>}
                                                {t.address?.status === 'unknown' && 
                                                <div className="yellow-question">
                                                    <YellowQuestion />
                                                </div>}
                                            </div>
                                        </Popover>
                                        <span>{t.address?.name}</span>
                                    </a>
                                </td>

                                <td className="td-option">
                                    <span>{t.option}</span>
                                </td>

                                <td className="td-vote">
                                    {t.votePercentage}%
                                </td>

                                <td className="td-mkr">
                                    {t.mkr} MKR
                                </td>

                                <td className="td-verify">
                                    <a href="#">
                                        <span className="lightgreen"><Lightning /></span>
                                        <span className="verify-text">{t.verify}</span>
                                        <span><HeadUpArrow /></span>
                                    </a>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}