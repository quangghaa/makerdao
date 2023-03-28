import React from "react";
import { DAO, Eth } from "../../assets/func/svg";
import { AccountPopover } from "../popover/account";
import './style.css';

interface Props {

}

export const NavHeader: React.FC<Props> = () => {
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
                <button className="nav-btn">
                    <div className="nav-btn-text">
                        Connect wallet
                    </div>
                </button>
                <AccountPopover />
            </div>
        </div>
    )
}