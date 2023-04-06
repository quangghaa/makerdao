import { ethers } from "ethers";
import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { DAO, Eth, WalletAddress, WalletUser } from "../../assets/func/svg";
import { elipsisAddress } from "../../common/helper";
import { selectAuth, signedIn, signedOut } from "../../pages/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IAuth } from "../../types/types";
import { AccountInfoModal } from "../modals/account-info/account-info";
import './style.css';

import taskManagerAbi from '../../contractsData/TaskManager.json';
import batchVotingAbi from '../../contractsData/BatchTaskVoting.json';
import autionAbi from '../../contractsData/TaskAuction.json';
import { useNavigate } from "react-router-dom";

interface Props {

}

const pathMap = new Map<string, string>()
pathMap.set('home', '/')
pathMap.set('poll', '/polling')
pathMap.set('bid', '/bidding')

export const NavHeader: React.FC<Props> = () => {
    const { status, connect, account, chainId, ethereum } = useMetaMask();
    const dispatch = useAppDispatch()
    const authState = useAppSelector(selectAuth)

    const [isAccountInfoModalShow, setIsAccountInfoModalShow] = useState(false)

    const showAccountInfoModal = () => {
        setIsAccountInfoModalShow(true)
    }

    const closeAccountInfoModal = () => {
        setIsAccountInfoModalShow(false)
    }

    const getContract = (deployedAddress: string, abi: any) => {
        if(window.ethereum){
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            // Set signer
            const signer = provider.getSigner();
            return new ethers.Contract(deployedAddress, abi,signer);
        }
    }

    useEffect(() => {
        if(status === 'connected') {
            console.log("Account and chainId: ", account, chainId)

            // init contract
            let c1 = getContract("0x5FbDB2315678afecb367f032d93F642f64180aa3", taskManagerAbi.abi)
            let c2 = getContract("0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512", batchVotingAbi.abi)
            let c3 = getContract("0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0", autionAbi.abi)
            if(!c1 || !c2 || !c3) {
                console.log("contract undefined")
                return
            }

            dispatch(signedIn({account: account, chainId: chainId, taskManagerContract: c1, batchVotingContract: c2, autionContract: c3} as IAuth))
        }
        if(status === 'notConnected') {
            dispatch(signedOut())
        }
    }, [status, account, chainId])

    useEffect(() => {
        // console.log("check auth state: ", authState.auth?.taskManagerContract)
    }, [authState])

    const navigate = useNavigate()

    const goTo = (pageName: 'home' | 'poll' | 'bid') => {
        let path = pathMap.get(pageName)
        if(!path) return
        navigate(path)
    }

    // const toPolling = () => {
    //     navigate("/polling")
    // }
    // const toBidding = () => {
    //     navigate("/bidding")
    // }
    const toAdmin = () => {
        navigate("/metamask-test")
    }

    return (
        <div className="nav-header">
            <div className="left">
                <a className="logo" onClick={() => goTo('home')}>
                    <DAO />
                </a>

                <div className="nav">
                    <a className="nav-item" href="#" onClick={() => goTo('poll')}>Polling</a>
                    <a className="nav-item" href="#" onClick={() => goTo('bid')}>Bid</a>
                    <a className="nav-item" href="#" onClick={toAdmin}>Admin</a>
                    {/* <a className="nav-item" href="/executive">Executive</a>
                    <a className="nav-item" href="/delegate">Delegates</a>
                    <a className="nav-item" href="/es-module">ES Module</a> */}
                </div>
            </div>

            <div className="right">
                <button className="nav-btn">
                    {!authState.isLoggedIn && 
                        <div className="nav-btn-text">
                        {/* <span>
                            <Eth />
                        </span> */}
                        Network
                    </div>}
                    {authState.isLoggedIn && 
                        <div className="nav-btn-text">
                        {/* <span>
                            <Eth />
                        </span> */}
                        Chain ID: {chainId}
                    </div>}
                </button>
                {!authState.isLoggedIn && 
                <button className="nav-btn" onClick={connect}>
                    <div className="nav-btn-text">
                        Connect wallet
                    </div>
                </button>}

                {authState.isLoggedIn && 
                <div className="wallet-btn" onClick={showAccountInfoModal}>
                    <div className="wallet-icon-bg">
                        <WalletAddress />
                    </div>
                    <span className="wallet-address-text">{account ? elipsisAddress(account) : ''}</span>
                </div>}

                {/* <AccountPopover /> */}
            </div>

            <AccountInfoModal isOpen={isAccountInfoModalShow} handleCancel={closeAccountInfoModal} auth={authState.auth} />
        </div>
    )
}