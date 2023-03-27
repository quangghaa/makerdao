import { Button } from "antd";
import React, { useState } from "react";
import { FilledPlay, HeadDown, HeadLeft, HeadRight, Search } from "../assets/func/svg";
import { DateButton, DefaultButton, LightGreenButton, LinkButton, SearchButton, SelectButton, SortButton, ViewMoreButton } from "../components/button/buttons";
import { InfoModal } from "../components/modals/infoModal";
import { PollItem } from "../components/poll/poll";
import { AccountPopover } from "../components/popover/account";
import { Progress } from "../components/progress/progress";
import { Characteristic } from "../components/tags/Characteristic";
import { ICharacteristic, IFilter, IPoll, ISort } from "../types/types";

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
    status: 'executive',
    passedTime: 'mar 15 2023 18:18 UTC',
    executedTime: 'mar 16 2023 10:20 UTC',
    mkr: 99245,
    supportingMkr: 115663
  } as IPoll

export const TestPage = () => {
    const tagFilter = [
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

    const sortOptions = [
      {id: 1, name: 'Nearest end date'},
      {id: 2, name: 'Furthest end date'},
      {id: 3, name: 'Nearest start date'},
      {id: 4, name: 'Furthest start date'},
    ] as ISort[]

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

    const modalTitle = "Poll types"

    const modalContent = [
      "- Ranked-choice polls: require multiple-choice ballots in ranked order, and determine the winning vote option by finding the one with an absolute majority in MKR voting weight (as in >50% of the total participating MKR, excluding abstains). In the first round of IRV, only first-choice votes are counted. In case no vote option meets the victory requirements, the least popular vote option (except abstain) is eliminated and the votes applied to that option are instead applied to the voters’ next ranked option. This repeats until the victory conditions have been met by one vote option. If no winning option can be found, tally results are shown as if no IRV rounds were run.",
      "- Plurality polls: require single-choice ballots and determines the winning vote option by finding the one with the highest MKR voting weight in relative terms.",
      "- Approval polls: require multiple-choice ballots in unranked order, and determines the winning vote option by finding the one with a relative majority in MKR voting weight. When used in situations where no winner is required, an absolute majority (ie. >50% of the total participating MKR excluding abstains) victory condition may also be applied as opposed to a relative majority.",
    ] as string[]

    return (
        <div>
            <h1>DEMO components</h1>
            <div style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
                something
                <SelectButton text="Tag" icon={<HeadDown />} fontWeight={600} options={tagFilter} />
                <SortButton text="Sort by nearest end date" icon={<HeadDown />} fontWeight={600} sortOptions={sortOptions} />
                <SearchButton text="" placeholder="Search poll titles" icon={<Search />} />
                <Button onClick={showModal}>modal</Button>
            </div>

            <InfoModal title={modalTitle} isOpen={isModalOpen} handleCancel={handleCancel} content={modalContent} />

            <div style={{width: '500px'}}>
            <ViewMoreButton text="View ended polls" count={934} fontWeight={500} />
            </div>

            <div>
              <DateButton text="Date" icon={<HeadDown />}/>
            </div>

            <div>
              <LinkButton text="Reset filters" fontWeight={600} />
            </div>

            <div>
              <DefaultButton text="Back to" icon={<HeadLeft />} fontWeight={600} />
            </div>

            <div>
              <DefaultButton text="NExt to" icon={<HeadRight />} fontWeight={600} iconPosition={'right'} />
            </div>
        </div>
    )
}