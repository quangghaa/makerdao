import { Tabs, TabsProps } from "antd";
import React, { useState } from "react";
import { Clock, HeadLeft, HeadRight, HeadUpArrow, Info } from "../../assets/func/svg";
import { mapCharacterristic } from "../../common/common";
import { DefaultButton } from "../../components/button/buttons";
import { InfoModal } from "../../components/modals/infoModal";
import { AbsProgress, NoProgress, YesProgress } from "../../components/progress/progress";
import { VotingAddressTable } from "../../components/table/votingAddressTable";
import { ICharacteristic, IDelegate, IPoll, IVotingByAddress } from "../../types/types";
import './style.css';

interface Props {

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

export const PollingDetailPage: React.FC<Props> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const pollItem = {
        postedTime: 'mar 13 2023 16:00 UTC',
        title: 'Ratification Poll for the Constitution MIP Set - March 13, 2023',
        description: 'The Constitution MIP Set (MIP101 through MIP114) introduces the Maker Constitution and the Scope Framework as well as containing MIP102c2-SP1 which amends multiple MIPs.',
        charateristic: [
            {
                tipe: 'yellow-pink',
                text: 'High Impact'
            },
            {
                tipe: 'pink',
                text: 'Real World Asset'
            },
            {
                tipe: 'gray',
                text: 'Misc Governance'
            },
            {
                tipe: 'orange',
                text: 'Collateral Offboarding'
            },
            {
                tipe: 'yellow',
                text: 'Misc Funding'
            },
            {
                tipe: 'green',
                text: 'Ratification Poll',
            },
            {
                tipe: 'blue-green',
                text: 'MIP'
            },
            {
                tipe: 'blue',
                text: 'Budget'
            }
        ] as ICharacteristic[],
        timeRemaining: '4d 7h',
        totalComments: 2,
        agreePercentage: 70,
        disagreePercentage: 20,
        neutralPercentage: 10,
        leadingOption: 'YES',
        status: 'active',
        passedTime: 'mar 15 2023 18:18 UTC',
        executedTime: 'mar 16 2023 10:20 UTC',
        mkr: 99245,
        supportingMkr: 115663
    } as IPoll

    const onChangeTab = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: `Vote Breakdown`,
            children: (
                <div className="vote-breakdown-tab">
                    <p className="vbt-head">LEADING OPTION: <span className="lightgreen">YES</span> WITH 27,079 MKR SUPPORTING.</p>
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
                        <NoProgress mkr={1000} percentage={20} />
                        <AbsProgress mkr={100} percentage={10} />
                    </div>
                    <hr className="poll-hr"/>

                    <div className="vote-stats">
                        <div className='hsr-head'>
                            <h2 className="weight-500">Vote Breakdown</h2>
                        </div>
                        <div className="space-between-row">
                            <span className="gray-text">
                                Total Voting Power
                            </span>
                            <span>
                                27,078.786 MKR
                            </span>
                        </div>
                        <div className="space-between-row">
                            <span className="gray-text">
                                Total Votes
                            </span>
                            <span>
                                4
                            </span>
                        </div>
                    </div>
                    <hr className="poll-hr"/>

                    <VotingAddressTable tableData={votingByAddress} />
                </div>
            ),
        },
        {
            key: '2',
            label: `Poll Detail`,
            children: `Not implement`,
        },
        {
            key: '3',
            label: `Comments (0)`,
            children: `Not implement`,
        },
    ];

    return (
        <div>
            <div className="polling-body">
                <div className="polling-list">
                    <div className="nav-btn-row">
                        <a href="/polling">
                            <DefaultButton text="Back to All Polls" fontWeight={600} icon={<HeadLeft />} />
                        </a>
                        <div className="prev-and-next">
                            <a href="#">
                                <DefaultButton text="Previous Poll" fontWeight={600} icon={<HeadLeft />} />
                            </a>
                            <a href="#">
                                <DefaultButton text="Next Poll" fontWeight={600} icon={<HeadRight />} iconPosition={'right'} />
                            </a>
                        </div>
                    </div>

                    <div className="detail-main-body">
                        <div className="dmb-head">
                            <div className="poll-posted poll-posted-detail">
                                <div>
                                    POSTED MAR {pollItem?.postedTime} | POLL ID {pollItem?.id}
                                </div>
                                <div className="ppd-right">
                                    <div>
                                        <span className="lightgreen"><Clock /></span>
                                        <span>2D 11H REMAINING</span>
                                    </div>
                                    <div className="plurality-info">
                                        <span>
                                            plurality poll
                                        </span>
                                        <span className="plurality-info-icon lightgreen" onClick={showModal}><Info /></span>
                                    </div>
                                </div>
                            </div>
                            <a href="#" className="poll-info">
                                <h3>
                                    {pollItem?.title}
                                </h3>
                            </a>

                            <div className="characteristic-list mt-1rem">
                                {pollItem?.charateristic.map((c: ICharacteristic) => {
                                    return <>
                                        {mapCharacterristic(c)}
                                    </>
                                })}
                            </div>

                            <div className="mt-1rem">
                                <a href="#" className="extra-link">
                                    <span>Discussion</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>
                        </div>

                        <div style={{ padding: '0rem 2rem' }}>
                            <Tabs defaultActiveKey="1" items={items} onChange={onChangeTab} />
                        </div>
                    </div>
                </div>

                <div className="polling-extra-info">
                    <div className="system-info">
                        <div className="extra-head">
                            <h3 className="eh-title">System Info</h3>
                            <a href="#" className="extra-link">
                                <span>See more</span>
                                <span><HeadUpArrow /></span>
                            </a>
                        </div>

                        <div className="extra-body">
                            <div className="extra-body-item mt-0">
                                <div className="ebi-left">
                                    <span>Polling Contract v2</span>
                                    <span className="ebi-left-info-icon" onClick={showModal}><Info /></span>
                                </div>

                                <a href="#" className="extra-link">
                                    <span>0xD3A9F...b133</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <div className="ebi-left">
                                    <span>Polling Contract v1</span>
                                    <span className="ebi-left-info-icon" onClick={showModal}><Info /></span>
                                </div>

                                <a href="#" className="extra-link">
                                    <span>0xD3A9F...b133</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <div className="ebi-left">
                                    <span>Arbitrum Polling Contract</span>
                                    <span></span>
                                </div>

                                <a href="#" className="extra-link">
                                    <span>0xD3A9F...b133</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <div className="ebi-left">
                                    <span>Dai Savings Rate</span>
                                    <span></span>
                                </div>

                                <div>
                                    <span>1.00%</span>
                                </div>
                            </div>

                            <div className="extra-body-item">
                                <div className="ebi-left">
                                    <span>Total Dai</span>
                                    <span></span>
                                </div>

                                <div>
                                    <span>5,417,424,976 DAI</span>
                                </div>
                            </div>

                            <div className="extra-body-item">
                                <div className="ebi-left">
                                    <span>Dai Debt Ceiling</span>
                                    <span></span>
                                </div>

                                <div>
                                    <span>7,244,751,817 DAI</span>
                                </div>
                            </div>

                            <div className="extra-body-item">
                                <div className="ebi-left">
                                    <span>System Surplus</span>
                                    <span></span>
                                </div>

                                <div>
                                    <span>72,252,120 DAI</span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="polling-faq">
                        <div className="extra-head">
                            <h3 className="eh-title">Polling FAQs</h3>
                        </div>

                        <div className="extra-body">
                            <div className="extra-body-item mt-0">
                                <a href="#" className="extra-link">
                                    <span>How to participate in MakerDAO governance?</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <a href="#" className="extra-link">
                                    <span>What are Governance Polls?</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <a href="#" className="extra-link">
                                    <span>How is voting weight calculated?</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <a href="#" className="extra-link">
                                    <span>How to manually vote in a poll with Etherscan?</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <a href="#" className="extra-link">
                                    <span>How to set up your wallet for voting?</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <a href="#" className="extra-link">
                                    <span>How does gasless poll voting work?</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="general-resources">
                        <div className="extra-head">
                            <h3 className="eh-title">General Governance Resources</h3>
                        </div>

                        <div className="extra-body">
                            <div className="extra-body-item mt-0">
                                <a href="#" className="extra-link">
                                    <span>Maker Forum</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <a href="#" className="extra-link">
                                    <span>Governance FAQs</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <a href="#" className="extra-link">
                                    <span>Governance Risk Framework</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <a href="#" className="extra-link">
                                    <span>Awesome MakerDAO</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                            <div className="extra-body-item">
                                <a href="#" className="extra-link">
                                    <span>Governance Call Schedule</span>
                                    <span><HeadUpArrow /></span>
                                </a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} align={'center'} />
        </div>
    )
}