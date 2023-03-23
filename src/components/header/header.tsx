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
                <a className="logo">
                    <DAO />
                </a>

                <div className="nav">
                    <a className="nav-item" href="#">Polling</a>
                    <a className="nav-item" href="#">Executive</a>
                    <a className="nav-item" href="#">Delegates</a>
                    <a className="nav-item" href="#">ES Module</a>
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