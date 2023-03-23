import React from "react";
import { FilledPlay } from "../assets/func/svg";
import { DefaultButton, LightGreenButton } from "../components/button/buttons";
import { PollItem } from "../components/poll/poll";
import { AccountPopover } from "../components/popover/account";
import { Progress } from "../components/progress/progress";
import { Characteristic } from "../components/tags/Characteristic";
import { ICharacteristic, IPoll } from "../types/types";

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
    return (
        <div>
            <h1>DEMO components</h1>
            <div style={{ display: "block", alignItems: "center", justifyContent: "center" }}>
                <DefaultButton text="default" icon={<FilledPlay />} />
                <br />
                <LightGreenButton text="light green" />
                <Characteristic text="High Impact" color={'gray'} background={'gray'} />
                <div style={{ width: '400px' }}>
                    <Progress id={1} agree={60} disagree={15} neutral={5} />
                </div>

                <div style={{ marginLeft: '500px', textAlign: 'right' }}>
                    <AccountPopover />
                </div>

                <div style={{ marginLeft: '100px', width: '500px', textAlign: 'left' }}>
                    <PollItem poll={pollItem} />
                </div>

            </div>
        </div>
    )
}