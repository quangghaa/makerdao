import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Canny, DAO, FilledDiscord, FilledGithub, FilledPlay, FilledReddit, FilledTweeter, FilledYoutube, GreenCheck, HeadRight, HeadUP, HeadUpArrow, Immunefi, MediumDAO, MediumDAOWithFoot, Poll } from './assets/func/svg';
import { NavHeader } from './components/header/header';
import { BiddingDetailPage } from './pages/bidding-detail-page/biddingDetailPage';
import { BiddingPage } from './pages/bidding-page/biddingPage';
import { DelegatePage } from './pages/delegate-page/delegatePage';
import { ESModulePage } from './pages/es-module-page/eSModulePage';
import { ExecutivePage } from './pages/executive-page/executivePage';
import { LandingPage } from './pages/landing-page/landingPage';
import { MetamaskTest } from './pages/metamask-test';
import { PollingDetailPage } from './pages/polling-detail-page/pollingDetailPage';
import { PollingPage } from './pages/polling-page/pollingPage';
import { TestPage } from './pages/text';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <NavHeader />

      <div className='app-container'>
        <div className='head-bg'></div>
        
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/polling' element={<PollingPage />} />
            <Route path='/bidding' element={<BiddingPage />} />
            <Route path='/delegate' element={<DelegatePage />} />
            <Route path='/executive' element={<ExecutivePage />} />
            <Route path='/es-module' element={<ESModulePage />} />

            <Route path='/polling/:id' element={<PollingDetailPage />} />
            <Route path='/bidding/:id' element={<BiddingDetailPage />} />
            <Route path='/test' element={<TestPage />} />
            <Route path='/metamask-test' element={<MetamaskTest />} />
          </Routes>
        

        <div id='foot-sec' className='foot-sec'>
          <div className='foot-bg'>
          </div>
          <footer className='foot'>
            <div className='foot-left'>
              <h4>Official Community Channels</h4>
              <div className='foot-icon-row'>
                <a href="https://discord.com/invite/RBRumCpEDH">
                  <FilledDiscord />
                </a>
                <a href="https://twitter.com/MakerDAO">
                  <FilledTweeter />
                </a>
                <a href="https://www.reddit.com/r/MakerDAO/">
                  <FilledReddit />
                </a>
                <a href="https://www.youtube.com/MakerDAO">
                  <FilledYoutube />
                </a>
                <a href="https://github.com/makerdao">
                  <FilledGithub />
                </a>
              </div>
              <div className='foot-logo'>
                <MediumDAO />
              </div>
            </div>

            <div className='foot-center'>
              <div className='center-col'>
                <h4>Governance</h4>
                <a href="#">
                  <span>Forum</span>
                </a>
                <a href="#">
                  <span>Operational Manual</span>
                </a>
                <a href="#">
                  <span>Governance FAQs</span>
                </a>
                <a href="#">
                  <span>Gov Tracking Sheet</span>
                </a>
                <a href="#">
                  <span>Monthly Gov Cycle</span>
                </a>
                <a href="#">
                  <span>Weekly Gov Cycle</span>
                </a>
              </div>

              <div className='center-col'>
                <h4>Products & Tools</h4>
                <a href="#">
                  <span>Service Status</span>
                </a>
                <a href="#">
                  <span>Auctions Dashboard</span>
                </a>
                <a href="#">
                  <span>Migrate Dashboard</span>
                </a>
                <a href="#">
                  <span>MakerBurn</span>
                </a>
                <a href="#">
                  <span>DAI Stats</span>
                </a>
                <a href="#">
                  <span>Terms</span>
                </a>
              </div>

              <div className='center-col'>
                <h4>Developer</h4>
                <a href="#">
                  <span>Whitepaper</span>
                </a>
                <a href="#">
                  <span>Technical Docs</span>
                </a>
                <a href="#">
                  <span>API Docs</span>
                </a>
                <a href="#">
                  <span>Gov Tracking Sheet</span>
                </a>
                <a href="#">
                  <span>Monthly Gov Cycle</span>
                </a>
                <a href="#">
                  <span>Weekly Gov Cycle</span>
                </a>
              </div>
            </div>

            <div className='foot-left'>
              <h4>Development & UX Channels</h4>
              <div className='foot-icon-row'>
                <a href="https://discord.com/invite/GHcFMdKden">
                  <FilledDiscord />
                </a>
                <a href="https://twitter.com/MakerDUX">
                  <FilledTweeter />
                </a>
                <a href="https://github.com/makerdao/governance-portal-v2">
                  <FilledGithub />
                </a>
                <a href="https://makergovernance.canny.io/">
                  <Canny />
                </a>
                <a href="https://immunefi.com/bounty/makerdao/">
                  <Immunefi />
                </a>
              </div>
              <div className='foot-logo'>
                <MediumDAOWithFoot />
              </div>
            </div>
          </footer>
        </div>
      </div>

    </div>
    </BrowserRouter>
  );
}

export default App;
