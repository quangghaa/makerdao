import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { HeadUpArrow, Info } from "../../assets/func/svg";
import { BidItem } from "../../components/bid/bid";
import { ViewMoreButton } from "../../components/button/buttons";
import { Filter } from "../../components/filter/filter";
import { InfoModal } from "../../components/modals/infoModal";
import { PollItem } from "../../components/poll/poll";
import { useAppSelector } from "../../redux/store";
import { IBatchVote, IBid, ICharacteristic, IFilter, IPoll, ISort } from "../../types/types";
import { selectBatchList } from "./bidSlice";
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

  const bidItems = [
    {
        id: 1,
        poll: pollItem,
        currentBid: 9999,
        timeLeft: '4 days left'
    },
    {
        id: 2,
        poll: pollItem,
        currentBid: 8888,
        timeLeft: '3 days left'
    },
    {
        id: 3,
        poll: pollItem,
        currentBid: 7777,
        timeLeft: '3 days left'
    },
    {
        id: 4,
        poll: pollItem,
        currentBid: 6666,
        timeLeft: '2 days left'
    },
  ] as IBid[]

export const BiddingPage: React.FC<Props> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const batchList = useAppSelector(selectBatchList)

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

    useEffect(() => {
      if(!batchList) {
        console.log("no batch list found")
        return
      }
      console.log("check batch list: ", batchList)
    }, [batchList])

    return (
        <main className="polling-main">
            <Filter sortOptions={sortOptions} statusOptions={statusOptions} tagOptions={tagOptions} typeOptions={typeOptions} />
            
            <h4 className="polling-title">Batch List</h4>
            <p>{batchList?.length} batch</p>
            <div className="bidding-body">
                {batchList?.map((b: IBatchVote) => {
                    return (
                        <BidItem batch={b} />
                    )
                })}
            </div>

            <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} align={'center'} />
        </main>
    )
} 