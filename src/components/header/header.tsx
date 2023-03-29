import { useMetaMask } from "metamask-react";
import React, { useEffect, useState } from "react";
import { DAO, Eth, WalletAddress, WalletUser } from "../../assets/func/svg";
import { elipsisAddress } from "../../common/helper";
import { selectAuth, signedIn, signedOut } from "../../pages/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IAuth } from "../../types/types";
import { DefaultButton } from "../button/buttons";
import { AccountInfoModal } from "../modals/account-info/account-info";
import { AccountPopover } from "../popover/account";
import './style.css';

interface Props {

}

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

    useEffect(() => {
        console.log("CHeck status: ", status)
        if(status === 'connected') {
            dispatch(signedIn({account: account, chainId: chainId} as IAuth))
        }
        if(status === 'notConnected') {
            dispatch(signedOut())
        }
    }, [status, chainId])

    useEffect(() => {
        console.log("check auth state: ", authState)
    }, [authState])

    return (
        <div className="nav-header">
            <div className="left">
                <a href="/" className="logo">
                    <DAO />
                </a>

                <div className="nav">
                    <a className="nav-item" href="/polling">Polling</a>
                    <a className="nav-item" href="/bidding">Bid</a>
                    <a className="nav-item" href="/executive">Executive</a>
                    <a className="nav-item" href="/delegate">Delegates</a>
                    <a className="nav-item" href="/es-module">ES Module</a>
                </div>
            </div>

            <div className="right">
                <button className="nav-btn">
                    <div className="nav-btn-text">
                        <span>
                            <Eth />
                        </span>
                        Mainnet
                    </div>
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

                <AccountPopover />
            </div>

            <AccountInfoModal isOpen={isAccountInfoModalShow} handleCancel={closeAccountInfoModal} auth={authState.auth} />
        </div>
    )
}