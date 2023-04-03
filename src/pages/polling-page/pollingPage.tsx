import { BigNumber } from "ethers";
import React, { useEffect, useState } from "react";
import { HeadUpArrow, Info } from "../../assets/func/svg";
import { LightGreenButton, ViewMoreButton } from "../../components/button/buttons";
import { Filter } from "../../components/filter/filter";
import { InfoModal } from "../../components/modals/infoModal";
import { PollItem } from "../../components/poll/poll";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ICharacteristic, IContractRequest, IFilter, IPoll, IPollOption, ISort, IUserVote } from "../../types/types";
import { selectAuth } from "../auth/authSlice";
import { getAllPoll, pollVote, selectPolls } from "./pollSlice";
import './style.css';

interface Props {
}

const tagOptions = [
    {id: 1, state: 'unchecked', name: 'Aution', totalValue: 27},
    {id: 2, state: 'unchecked', name: 'Black Thursday', totalValue: 27},
    {id: 3, state: 'unchecked', name: 'Budget', totalValue: 27},
    {id: 4, state: 'unchecked', name: 'Collateral Offboarding', totalValue: 27},
    {id: 5, state: 'unchecked', name: 'Collateral Onboarding', totalValue: 27},
    {id: 6, state: 'unchecked', name: 'Core Unit Offboarding', totalValue: 27},
    {id: 7, state: 'unchecked', name: 'Core Unit Onboarding', totalValue: 27},
    {id: 8, state: 'unchecked', name: 'DAI Direct Deposit Module', totalValue: 27},
    {id: 9, state: 'unchecked', name: 'Dai Saving Rate', totalValue: 27},
    {id: 10, state: 'unchecked', name: 'Delegates', totalValue: 27},
    {id: 11, state: 'unchecked', name: 'Endgame', totalValue: 27},
    {id: 12, state: 'unchecked', name: 'Greenlight', totalValue: 27},
    {id: 13, state: 'unchecked', name: 'High Impact', totalValue: 27},
    {id: 14, state: 'unchecked', name: 'Inclusion Poll', totalValue: 27},
    {id: 15, state: 'unchecked', name: 'Low Impact', totalValue: 27},
    {id: 16, state: 'unchecked', name: 'MIP', totalValue: 27},
  ] as IFilter[]

  const statusOptions = [
    {id: 1, state: 'unchecked', name: 'Active Polls', totalValue: 18},
    {id: 2, state: 'unchecked', name: 'Ended Polls', totalValue: 933},
  ] as IFilter[]

  const typeOptions = [
    {id: 1, state: 'unchecked', name: 'Plurality', totalValue: 881},
    {id: 2, state: 'unchecked', name: 'Ranked Choice', totalValue: 70},
    {id: 3, state: 'unchecked', name: 'Majority', totalValue: 0},
    {id: 4, state: 'unchecked', name: 'Approval', totalValue: 1},
  ] as IFilter[]

  const sortOptions = [
    {id: 1, name: 'Nearest end date'},
    {id: 2, name: 'Furthest end date'},
    {id: 3, name: 'Nearest start date'},
    {id: 4, name: 'Furthest start date'},
  ] as ISort[]

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

  const fakePollOption = {
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
  } as IPollOption

export const PollingPage: React.FC<Props> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch()
    const polls = useAppSelector(selectPolls)
    const authState = useAppSelector(selectAuth)

    const [userVoteList, setUserVoteList] = useState([] as IUserVote[])

    // prettier data showing
    const [pollsToShow, setPollsToShow] = useState([] as IPoll[])
    const [optionsToShow, setOptionsToShow] = useState([] as IPollOption[])

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

    const handleUserChoice = (pollId: number, optionId: number, value: string) => {
        let isExist = false
        userVoteList.forEach((u: IUserVote) => {
            if (u.optionId === optionId) {
                console.log("contain optionId: ", optionId)
                isExist = true
                u.vote = (value === 'yes') ? true : false
            }
        })
        if (!isExist) {
            console.log("Add new user vote")
            console.log("vote list before add: ", userVoteList)
            userVoteList.push({ pollId: pollId, optionId: optionId, vote: (value === 'yes') ? true : false })
            console.log("new vote list: ", userVoteList)
            setUserVoteList(Object.assign([], userVoteList))
        } else {
            setUserVoteList(Object.assign([], userVoteList))
        }
    }

    const submitVote = (pollId: number, optionId: number) => {
        console.log("Call mee??? ")
        let targetIndex = -1
        let target = userVoteList.filter((u: IUserVote, index: number) => {
            targetIndex = index
            return u.pollId === pollId && u.optionId === optionId
        })

        console.log("debug target: ", target, target.length)
        if(target.length === 0) {
            console.log("Need to select vote first")
            return
        }
        // disable submit button
        // userVoteList[targetIndex].isSubmit = true
        if(authState.auth?.batchVotingContract) {
            console.log("Calling vote...")
            let request = {
                contract: authState.auth.batchVotingContract,
                param: {optionId: userVoteList[targetIndex].optionId, vote: userVoteList[targetIndex].vote}
            } as IContractRequest

            dispatch(pollVote(request))
        }
    }

    useEffect(() => {
        if(!authState.isLoggedIn) {
            console.log("not have auth ", authState)
            return 
        }
        dispatch(getAllPoll(authState.auth?.taskManagerContract))
    }, [authState])

    useEffect(() => {
        if(polls) {
            console.log(" Check polls: ", polls, typeof(polls))
            let options = [] as IPollOption[]
            let showData = polls.map((p: IPoll) => {
                p.batchTaskIds?.map((b: BigNumber) => {
                    options.push({...fakePollOption, pollId: p.pollId, pollOwner: p.pollOwner, batchTaskId: b})
                })
                // return {...pollItem, pollId: p.pollId, pollOwner: p.pollOwner, batchTaskIds: p.batchTaskIds}
            })
            
            setOptionsToShow(options)
        } 
    }, [polls])

    useEffect(() => {
        console.log("Check user vote list: ", userVoteList)
    }, [userVoteList])

    return (
        <main className="polling-main">
            <Filter sortOptions={sortOptions} statusOptions={statusOptions} tagOptions={tagOptions} typeOptions={typeOptions} />
            <div className="polling-body">
                <div className="polling-list">
                    <h4 className="polling-title">Active Polls</h4>
                    <p className="polling-sub-title">18 polls - Ending mar 27 2023 16:00 UTC</p>
                    <div className="polling-items">
                    {optionsToShow.length > 0 && 
                    optionsToShow.map((o: IPollOption) => {
                        return <PollItem pollOption={o} handleUserChoice={handleUserChoice} submitVote={submitVote} />
                    })}
                    </div>
                    <div className="view-more-btn-wrapper">
                        <ViewMoreButton text="View ended polls" count={934} fontWeight={500} />
                    </div>
                </div>

                <div className="polling-extra-info">
                    <div className="system-info">
                        <div className="extra-head">
                            <h3 className="eh-title">Your Ballot</h3>
                        </div>

                        <div className="extra-body">
                            <hr className="poll-hr"/>
                            <div className="voting-weight-row">
                                <span className="poll-posted">Voting weight</span>
                                <span>0 MKR</span>
                            </div>
                            <hr className="poll-hr"/>
                            <div className="deposit-to-vote-btn">
                                <LightGreenButton text="Review & Submit your Ballot" fontWeight={600} />
                            </div>
                        </div>

                    </div>

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
        </main>
    )
} 