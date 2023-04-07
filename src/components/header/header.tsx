
import React, { useEffect, useState } from "react";
import { DAO, WalletAddress } from "../../assets/func/svg";
import { elipsisAddress } from "../../common/helper";
import { selectAuth, signedIn, signedOut } from "../../pages/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IAuth } from "../../types/types";
import { AccountInfoModal } from "../modals/account-info/account-info";
import './style.css';
import { useNavigate } from "react-router-dom";
import { useAccount, useConnect, useDisconnect, useNetwork } from "wagmi";
import { InjectedConnector } from "@wagmi/core";

interface Props {

}

const pathMap = new Map<string, string>()
pathMap.set('home', '/')
pathMap.set('poll', '/polling')
pathMap.set('bid', '/bidding')

export const NavHeader: React.FC<Props> = () => {
    const dispatch = useAppDispatch()
    const authState = useAppSelector(selectAuth)

    const [isAccountInfoModalShow, setIsAccountInfoModalShow] = useState(false)

    const showAccountInfoModal = () => {
        setIsAccountInfoModalShow(true)
    }

    const closeAccountInfoModal = () => {
        setIsAccountInfoModalShow(false)
    }

    // DEMO
    const { address, isConnected, status } = useAccount()
    const { chain } = useNetwork()
    const { connect } = useConnect({
        connector: new InjectedConnector(),
    })
    const { disconnect } = useDisconnect()

    useEffect(() => {
        if(status === 'connected') {
            dispatch(signedIn({account: address, chainId: chain ? '' + chain.id : ''} as IAuth))
        }
        if(status === 'disconnected') {
            dispatch(signedOut())
        }
    }, [status, address, chain])

    useEffect(() => {
        // console.log("check auth state: ", authState.auth?.taskManagerContract)
    }, [authState])

    const navigate = useNavigate()

    const goTo = (pageName: 'home' | 'poll' | 'bid') => {
        let path = pathMap.get(pageName)
        if(!path) return
        navigate(path)
    }

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
                        Chain ID: {authState.auth?.chainId}
                    </div>}
                </button>
                {!authState.isLoggedIn && 
                <button className="nav-btn" onClick={() => connect()}>
                    <div className="nav-btn-text">
                        Connect wallet
                    </div>
                </button>}

                {authState.isLoggedIn && 
                <div className="wallet-btn" onClick={showAccountInfoModal}>
                    <div className="wallet-icon-bg">
                        <WalletAddress />
                    </div>
                    <span className="wallet-address-text">{address ? elipsisAddress(address) : ''}</span>
                </div>}

                {/* <AccountPopover /> */}
            </div>

            <AccountInfoModal isOpen={isAccountInfoModalShow} disConnect={disconnect} handleCancel={closeAccountInfoModal} auth={authState.auth} />
        </div>
    )
}