import React from 'react';
import logo from './logo.svg';
import { ColorButton, DefaultButton, LightGreenButton } from '../../components/button/buttons';
import { Canny, DAO, FilledDiscord, FilledGithub, FilledPlay, FilledReddit, FilledTweeter, FilledYoutube, GreenCheck, HeadRight, HeadUP, HeadUpArrow, Immunefi, MediumDAO, MediumDAOWithFoot, Poll } from '../../assets/func/svg';
import { PollItem } from '../../components/poll/poll';
import { IBrowseForum, ICharacteristic, IDelegate, IPoll, IResources, IStep, IStepDetail } from '../../types/types';
import { mapCharacterristic } from '../../common/common';
import { Delegate, PopoverDelegate } from '../../components/delegate/delegate';
import { ForumImg1, ResourcesIcon1, ResourcesIcon2, ResourcesIcon3, ResourcesIcon4, ResourcesIcon5, ResourcesIcon6, ResourcesIcon7, ResourcesIcon8, ResourcesIcon9, StableLab } from '../../assets/func/img';
import { Popover } from 'antd';
import { ParticipationChart } from '../../components/chart/participationChart';
import './style.css';

interface Props {
    
}

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
  
  const chs = [
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
  ] as ICharacteristic[]
  
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
  
  const participate = [
    {
      id: "01",
      title: "Understandoff-chain governance",
      detail: {
        title: 'Understand',
        titleHighlight: 'off-chain governance',
        description: "Off-chain governance refers to processes for making decisions that don't require on-chain voting and gathering feedback prior to on-chain voting. Off-chain governance happens on the Maker Governance Forum, where the community meets to propose and discuss new proposals. Anyone can participate in off-chain governance.",
        links: ['Learn more about off-chain governance']
      } as IStepDetail
    },
    {
      id: "02",
      title: "Understand on-chain governance",
      detail: {
        title: 'Understand',
        titleHighlight: 'on-chain governance',
        description: "On-chain governance refers to Governance Polls and Executive Votes, which are formalized governance proposals that require on-chain voting. Anyone who owns MKR tokens can participate in these votes using their wallet.",
        links: ['Learn more about on-chain governance']
      } as IStepDetail
    },
    {
      id: "03",
      title: "Set up your voting wallet",
      detail: {
        title: 'Set up your',
        titleHighlight: 'voting wallet',
        description: "Connect a web3 wallet (eg. MetaMask, WalletConnect) that holds your MKR tokens and start participating! Users that hold many MKR tokens or use their wallet for other uses besides Maker governance might want to consider more secure methods of setting up a voting wallet, such as using a hardware wallet or setting up a vote proxy (available soon).",
      } as IStepDetail
    },
    {
      id: "04",
      title: "Delegate your voting power",
      detail: {
        title: 'Option 1:',
        titleHighlight: 'Delegate your voting power',
        description: "Vote delegation is a mechanism through which MKR holders can entrust their voting power to one or more chosen delegates. These delegates can then vote using the MKR delegated to them. Delegating your voting power is a good option if you're not willing to invest much time and gas costs in active participation. Note that delegates can never directly access the MKR tokens delegated to them.",
        links: ['Learn more about delegation', 'Choose a suitable delegate']
      } as IStepDetail
    },
    {
      id: "05",
      title: "Vote manually",
      detail: {
        title: 'Option 2:',
        titleHighlight: 'Vote manually',
        description: "If you prefer to participate in Maker governance manually instead of delegating, then you are able to start participating once your voting wallet is set up. Find the latest Executive Proposal and vote on it by depositing your MKR tokens to the voting contract. By doing so you contribute to protecting the protocol against governance attacks. You are able to withdraw your MKR tokens anytime. Next, start voting on the active governance polls and don't forget to add comments to your votes.",
        links: ['Start voting on active governance polls']
      } as IStepDetail
    },
  ] as IStep[]
  
  const resourcesItem = [
    {
      tipe: 'Governance',
      name: 'Maker Governance Forum',
      iconNumber: 1,
      description: 'Participate in or start new discussions related to the governance of MakerDAO and the Maker protocol.',
      link: "https://forum.makerdao.com/"
    },
    {
      tipe: 'Governance',
      name: 'Maker Operation Manual',
      iconNumber: 2,
      description: 'Documentation on the Maker protocol & MakerDAO processes, written for MKR holders that actively participate in governance.',
      link: 'https://manual.makerdao.com/'
    },
    {
      tipe: 'Governance',
      name: 'Governance Tracking Sheet',
      iconNumber: 3,
      description: 'A daily updated breakdown of the current and future governance actions taking place in MakerDAO.',
      link: 'https://docs.google.com/spreadsheets/d/1LWNlv6hr8oXebk8rvXZBPRVDjN-3OrzI0IgLwBVk0vM/edit#gid=0'
    },
    {
      tipe: 'Products & Tools',
      name: 'Oasis',
      iconNumber: 4,
      description: 'The most popular user interface for interacting with the Maker Protocol, used for creating & managing vaults.',
      link: 'https://oasis.app/'
    },
    {
      tipe: 'Products & Tools',
      name: 'Autions Dashboard',
      iconNumber: 5,
      description: 'A unified dashboard for understanding & interacting with auctions of the Maker Protocol.',
      link: 'http://auctions.makerdao.network/'
    },
    {
      tipe: 'Products & Tools',
      name: 'MakerBurn',
      iconNumber: 6,
      description: 'A data dashboard for the Maker Protocol and MakerDAO, displaying burn rate, revenues, expenses and more.',
      link: 'https://makerburn.com/#/'
    },
    {
      tipe: 'Developers',
      name: 'Technical Docs',
      iconNumber: 7,
      description: 'Technical documentation about the MakerDAO protocol, covering all its mechanisms, smart contracts and more.',
      link: 'https://docs.makerdao.com/'
    },
    {
      tipe: 'Developers',
      name: 'MakerDAO Github',
      iconNumber: 8,
      description: 'GitHub organization with many repositories relevant to MakerDAO and goverance, including the community repo and the codebase for this site.',
      link: 'https://github.com/makerdao/'
    },
    {
      tipe: 'Developers',
      name: 'API Docs',
      iconNumber: 9,
      description: 'Automatically generated API documentation for the Governance Portal API, used to query MakerDAO governance data.',
      link: 'https://vote.makerdao.com/api-docs'
    },
  ] as IResources[]
  
  const browseForum = [
    {
      title: 'Top Governance Discussions',
      description: 'An overview of the most popular and controversial governance discussions on the MakerDAO forum.',
      link: 'https://forum.makerdao.com/top'
    },
    {
      title: 'Governance Forum Explorer',
      description: 'A powerful tool for exploring the governance forum, powered by custom filters.',
      link: 'https://forum.makerdao.com/explorer'
    }
  ] as IBrowseForum[]

export const LandingPage:React.FC<Props> = () => {
    const mouseOver = () => {
    }
  
    const navStep = (index: number) => {
      let value = -430 * index
      let el = (document.getElementById('ls-right-content')) as HTMLElement
      el.style.transform = `translateY(${value}px)`
    }
  
    const mapResourcesIcon: React.FC<number> = (iconNumber: number) => {
      switch (iconNumber) {
        case 1:
          return <ResourcesIcon1 />
        case 2:
          return <ResourcesIcon2 />
        case 3:
          return <ResourcesIcon3 />
        case 4:
          return <ResourcesIcon4 />
        case 5:
          return <ResourcesIcon5 />
        case 6:
          return <ResourcesIcon6 />
        case 7:
          return <ResourcesIcon7 />
        case 8:
          return <ResourcesIcon8 />
        case 9:
          return <ResourcesIcon9 />
        default:
          return <></>
      }
    }
  
    const backToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    return (
        <main className='main'>
          <section id="head" className='head-sec'>
            <div className='hs-left'>
              <h1>Maker Governance</h1>
              <h1>Voting Portal</h1>
              <p>Vote with or delegate your MKR tokens to help protect the integrity of the Maker protocol</p>
              <p style={{ lineHeight: '2rem' }}>
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
              <div className='list-stats-item'>
                <p>MKR on Hat</p>
                <p>97,252 MKR</p>
              </div>
              <div className='list-stats-item'>
                <p>Active Polls</p>
                <p>18</p>
              </div>
              <div className='list-stats-item'>
                <p>Recognized Delegates</p>
                <p>23</p>
              </div>
              <div className='list-stats-item'>
                <p>Shadow Delegates</p>
                <p>168</p>
              </div>
              <div className='list-stats-item'>
                <p>MKR Delegated</p>
                <p>179,324 MKR</p>
              </div>
              <div className='list-stats-item'>
                <p>MKR in Chief</p>
                <p>211,775 MKR</p>
              </div>
            </div>
          </section>

          <section id="vote" className='vote-sec'>
            <ul className='vote-nav'>
              <li>
                <a href="#vote">Vote</a>
              </li>
              <li>
                <a href="#delegate">Delegate</a>
              </li>
              <li>
                <a href="#learn">Learn</a>
              </li>
              <li>
                <a href="#engage">Engage</a>
              </li>
            </ul>
            <div>
              <div className='hsr-head'>
                <h2>Active Polls</h2>
                <a href="#">
                  <span>View more</span>
                  <span className='lightgreen'><HeadRight /></span>
                </a>
              </div>

              <div className='poll-items'>
                <PollItem poll={pollItem} />
                <PollItem poll={pollItem} />
                <PollItem poll={pollItem} />
                <PollItem poll={pollItem} />
              </div>
            </div>

            <h2>Show me more polls related to</h2>
            <div className='showmore-list'>
              {chs.map((c: ICharacteristic, index) => {
                return <div key={index} className='showmore-item'>
                  {mapCharacterristic(c)}
                </div>
              })}
            </div>
          </section>

          <section id="delegate" className='delegate-sec'>
            <div className='fullwidth-container'>
              <div className='hsr-head'>
                <h2>Meet the Delegates</h2>
                <a href="#">
                  <span>View all</span>
                  <span className='lightgreen'><HeadRight /></span>
                </a>
              </div>

              <p>
                Vote delegation allows for MKR holders to delegate their voting power to delegates, which increases the effectiveness and efficiency of the governance process.
              </p>

              <div className='delegate-list'>
                <Delegate delegate={delegateItem} />
                <Delegate delegate={delegateItem} />
                <Delegate delegate={delegateItem} />
                <Delegate delegate={delegateItem} />
              </div>
            </div>
          </section>

          <section id="top-delegate" className='top-delegate-sec'>
            <div className='top-delegate-head'>
              <div className='tdh-content'>
                <h2>
                  Top Recognized Delegates
                </h2>
                <p>
                  Recognized Delegates ranking by their voting power
                </p>
              </div>
            </div>

            <div className='top-delegate-table'>
              <div className='tdt-content'>
                <div className='table-head'>
                  <div className='head-address'>
                    <p>Address</p>
                  </div>
                  <div className='head-delegator'>
                    <p>Delegators</p>
                  </div>
                  <div className='head-voting-power'>
                    <p>Voting power</p>
                  </div>
                  <div className='head-mkr'>
                    <p>mkr</p>
                  </div>
                </div>

                {/* a row here */}
                <div className='table-row'>
                  <div className='col-address'>
                    <span className='col-address-number'>1</span>
                    <a href="#">
                      <Popover placement="bottomLeft" content={() => delegateItem ? PopoverDelegate(delegateItem) : <></>}>
                        <div className="delegate-img" onMouseOver={mouseOver}>
                          <StableLab />
                          <div className="green-check-box">
                            <GreenCheck />
                          </div>
                        </div>
                      </Popover>
                      <span>{delegateItem.name}</span>
                    </a>
                  </div>
                  <div className='col-delegator'>
                    <span>22 addresses</span>
                  </div>
                  <div className='col-voting-power'>
                    <span>8.89%</span>
                    <div style={{ display: 'none' }}>Down icon here</div>
                  </div>
                  <div className='col-mkr'>
                    <p>{delegateItem.totalMkrDelegated} MKR</p>
                    <DefaultButton text='Delegate' />
                  </div>
                </div>

                <div className='table-row'>
                  <div className='col-address'>
                    <span className='col-address-number'>1</span>
                    <a href="#">
                      <Popover placement="bottomLeft" content={() => delegateItem ? PopoverDelegate(delegateItem) : <></>}>
                        <div className="delegate-img" onMouseOver={mouseOver}>
                          <StableLab />
                          <div className="green-check-box">
                            <GreenCheck />
                          </div>
                        </div>
                      </Popover>
                      <span>{delegateItem.name}</span>
                    </a>
                  </div>
                  <div className='col-delegator'>
                    <span>22 addresses</span>
                  </div>
                  <div className='col-voting-power'>
                    <span>8.89%</span>
                    <div style={{ display: 'none' }}>Down icon here</div>
                  </div>
                  <div className='col-mkr'>
                    <p>{delegateItem.totalMkrDelegated} MKR</p>
                    <DefaultButton text='Delegate' />
                  </div>
                </div>

                <div className='table-row'>
                  <div className='col-address'>
                    <span className='col-address-number'>1</span>
                    <a href="#">
                      <Popover placement="bottomLeft" content={() => delegateItem ? PopoverDelegate(delegateItem) : <></>}>
                        <div className="delegate-img" onMouseOver={mouseOver}>
                          <StableLab />
                          <div className="green-check-box">
                            <GreenCheck />
                          </div>
                        </div>
                      </Popover>
                      <span>{delegateItem.name}</span>
                    </a>
                  </div>
                  <div className='col-delegator'>
                    <span>22 addresses</span>
                  </div>
                  <div className='col-voting-power'>
                    <span>8.89%</span>
                    <div style={{ display: 'none' }}>Down icon here</div>
                  </div>
                  <div className='col-mkr'>
                    <p>{delegateItem.totalMkrDelegated} MKR</p>
                    <DefaultButton text='Delegate' />
                  </div>
                </div>

                <hr className='table-hr' />

                <div className='table-btn-row'>
                  <div className='table-btn-wrapper'>
                    <DefaultButton text='Find a delegate' fontWeight={600} />
                  </div>
                  <div className='table-btn-wrapper'>
                    <DefaultButton text='Become a delegate' fontWeight={600} />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="learn" className='learn-sec'>
            <div className='learn-sec-content'>
              <div className='circle-1'></div>
              <div className='circle-2'></div>
              <div className='circle-3'></div>
              <div className='circle-4'></div>
              <div className='ls-content'>
                <div className='hsr-head'>
                  <h2>How to participate in Maker Governance</h2>
                  <a href="#">
                    <span>Learn more</span>
                    <span className='lightgreen'><HeadRight /></span>
                  </a>
                </div>

                <div className='ls-body'>
                  <div className='ls-left'>
                    {participate.map((s: IStep, index: number) => {
                      return (
                        <div key={index} className='ls-left-item' onClick={() => navStep(index)}>
                          <span className={'learn-item-color-' + (index + 1)}>{s.id}</span>
                          <span>{s.title}</span>
                        </div>
                      )
                    })}
                  </div>

                  <div className='ls-right'>
                    <div id='ls-right-content' className='ls-right-content'>
                      {participate.map((s: IStep, index: number) => {
                        return (
                          <div key={index} className='ls-content-info'>
                            <div className='info-number'>
                              <h1 className={'info-number-text learn-item-color-' + (index + 1)}>{s.id}</h1>
                            </div>
                            <div className='lsr-info'>
                              <div className='lsr-info-content'>
                                <h1 className='info-content-head'>
                                  <span>{s.detail.title}</span>
                                  &nbsp;
                                  <span className={'learn-item-color-' + (index + 1)}>{s.detail.titleHighlight}</span>
                                </h1>

                                <div className='info-content-body'>
                                  <p>
                                    {s.detail.description}
                                  </p>
                                </div>

                              </div>
                              {s.detail.links?.map((l: string, index) => {
                                return (
                                  <a key={index} href="#" className='ls-info-link'>
                                    <span>{l}</span>
                                    <span><HeadUpArrow /></span>
                                  </a>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className='resources'>
              <div className='hsr-head'>
                <h2>Resources</h2>
                <div>
                  <ColorButton text='All Resources' background='gray' color='dark-green' />
                  <ColorButton text='Governance' color='green' />
                  <ColorButton text='Products & Tools' color='purple' />
                  <ColorButton text='Developers' color='pink' />
                </div>
              </div>

              <div className='resources-body'>
                {resourcesItem.map((r: IResources, index) => {
                  return (
                    <a key={index} href='#' className='resources-item'>
                      <div className={'ri-img ' + (r.tipe == "Products & Tools" ? 'resources-purple ' : '') + (r.tipe == "Developers" ? 'resources-pink ' : '')}
                      >
                        <div className='ri-img-content'>
                          <div className='ri-left'>
                            <div className='ri-left-btns'>
                              <div className='left-btn'>
                                <span className={'left-btn-text ' + (r.tipe == "Products & Tools" ? 'resources-text-purple ' : '') + (r.tipe == "Developers" ? 'resources-text-pink ' : '')}>{r.tipe}</span>
                              </div>
                            </div>

                            <span className='ri-left-text'>
                              {r.name}
                            </span>
                          </div>
                          <div className='ri-right'>
                            {mapResourcesIcon(r.iconNumber)}
                          </div>
                        </div>
                      </div>
                      <p className='ri-text'>
                        {r.description}
                      </p>
                    </a>
                  )
                })}
              </div>

            </div>
          </section>
          <section id="engage" className='engage-sec'>
            <div className='top-delegate-head'>
              <div className='tdh-content'>
                <h2>
                  Follow the Conversation and Participate
                </h2>
                <p>
                  Engage with the Maker Community and make informed decisions.
                </p>
              </div>
            </div>

            <div className='browse-forum'>
              <div className='hsr-head'>
                <h2>How to participate in Maker Governance</h2>
                <a href="#">
                  <span>Learn more</span>
                  <span className='lightgreen'><HeadRight /></span>
                </a>
              </div>
              <div className='browse-forum-body'>
                {browseForum.map((b: IBrowseForum, index) => {
                  return (

                    <div key={index} className='forum-item'>
                      <ForumImg1 />
                      <div className='forum-item-info'>
                        <div className='fii-content'>
                          <h2>{b.title}</h2>
                          <span>{b.description}</span>
                        </div>

                        <a href={b.link}>
                          <span>Read more</span>
                          <span className='lightgreen'><HeadRight /></span>
                        </a>
                      </div>
                    </div>
                  )
                })}
              </div>

            </div>

            <div className='participation'>
              <div className='chart-area'>
                <h2>Governance Participation</h2>
                <div className='chart-wrapper'>
                  <ParticipationChart />
                </div>
              </div>
              <div className='top-voters-area'>
                <div className='hsr-head'>
                  <h2>Top Voters</h2>
                  <a href="#">
                    <span>View more Metrics</span>
                    <span className='lightgreen'><HeadRight /></span>
                  </a>
                </div>

                <div className='top-voters-wrapper'>
                  <div className='top-voters-content'>
                    <div className='top-voters-head'>
                      <span>Address</span>
                      <span>Participation</span>
                    </div>

                    <div className='top-voters-row'>
                      <div className='col-address'>
                        <span className='col-address-number'>1</span>
                        <a href="#">
                          <Popover placement="bottomRight" content={() => delegateItem ? PopoverDelegate(delegateItem) : <></>}>
                            <div className="delegate-img" onMouseOver={mouseOver}>
                              <StableLab />
                              <div className="green-check-box">
                                <GreenCheck />
                              </div>
                            </div>
                          </Popover>
                          <span>{delegateItem.name}</span>
                        </a>
                      </div>
                      <span>
                        100%
                      </span>
                    </div>

                    <div className='top-voters-row'>
                      <div className='col-address'>
                        <span className='col-address-number'>2</span>
                        <a href="#">
                          <Popover placement="bottomRight" content={() => delegateItem ? PopoverDelegate(delegateItem) : <></>}>
                            <div className="delegate-img" onMouseOver={mouseOver}>
                              <StableLab />
                              <div className="green-check-box">
                                <GreenCheck />
                              </div>
                            </div>
                          </Popover>
                          <span>{delegateItem.name}</span>
                        </a>
                      </div>
                      <span>
                        100%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </section>
          <div className='back-to-top'>
            <div className='back-to-top-btn' onClick={backToTop}>
              <span>Back to top</span>
              <span className='lightgreen'><HeadUP /></span>
            </div>
          </div>
        </main>       
    )
}