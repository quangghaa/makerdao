import React from 'react';
import logo from './logo.svg';
import { DefaultButton, LightGreenButton } from './components/button/buttons';
import { FilledPlay, HeadRight, Poll } from './assets/func/svg';
import { Characteristic } from './components/tags/Characteristic';
import { Progress } from './components/progress/progress';
import { AccountPopover } from './components/popover/account';
import { NavHeader } from './components/header/header';
import { PollItem } from './components/poll/poll';
import { ICharacteristic, IPoll } from './types/types';

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

const pollItemExec = {
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

function App() {
  return (
    <div className="App">
      <NavHeader />

      <div className='app-container'>
          <div className='head-bg'></div>
          <main className='main'>
            <section id="head" className='head-sec'>
              <div className='hs-left'>
                <h1>Maker Governance</h1>
                <h1>Voting Portal</h1>
                <p>Vote with or delegate your MKR tokens to help protect the integrity of the Maker protocol</p>
                <p style={{lineHeight: '2rem'}}>
                  <DefaultButton icon={<FilledPlay />} text={"How to vote"} fontWeight={600} />
                </p>
              </div>
              <div className='hs-right'>
                <div className='hsr-head'>
                  <h2>Latest Executive</h2>
                  <a href="#">
                    <span>View more</span>
                    <span className='lightgreen'><HeadRight /></span>
                  </a>
                </div>
                <PollItem poll={pollItemExec} />
              </div>
            </section>

            <section id="governance" className='governance-sec'>
              <div className='hsr-head'>
                  <h2>Governance Stats</h2>
                  <a href="#">
                    <span>View more</span>
                    <span className='lightgreen'><HeadRight /></span>
                  </a>
                </div>
              <div className='list-stats'>
                <div>
                  XXX
                </div>
              </div>
            </section>

            <section id="vote" className='vote-sec'>
              <h1>vote section</h1>
            </section>
            <section id="delegate" className='delegate-sec'>
              <h1>delegate section</h1>
            </section>
            <section id="top-delegate" className='top-delegate-sec'>
              <h1>top-delegate section</h1>
            </section>
            <section id="learn" className='learn-sec'>
              <h1>learn section</h1>
            </section>
            <section id="engage" className='engage-sec'>
              <h1>engage section</h1>
            </section>
            <div className='back-to-top'>
              <p>Back to top</p>
            </div>
          </main>

          <div id='foot-sec'>
            <div className='foot-bg'>
            </div>
            <footer className='foot'>
              <h1>Foot</h1>
            </footer>
          </div>
      </div>

    </div>
  );
}

export default App;
