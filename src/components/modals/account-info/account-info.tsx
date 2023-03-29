import { Modal } from "antd";
import React from "react";
import { Copy, HeadUpArrow, Metamask, Question, WalletAddress } from "../../../assets/func/svg";
import { elipsisAddress } from "../../../common/helper";
import { IAuth } from "../../../types/types";
import { DefaultButton, GreenTextButton, LightGreenButton } from "../../button/buttons";
import './style.css';

interface Props {
    isOpen: boolean;
    handleCancel: () => void;
    auth?: IAuth;
}

export const AccountInfoModal: React.FC<Props> = ({ isOpen, handleCancel, auth }) => {
    return (
        <Modal title={"Account"} open={isOpen} onCancel={handleCancel} footer={null} width={400}>
            <div className="modal-content">
                <div className="wallet-sec">
                    <div className="space-between">
                        <div className="flex">
                            <Metamask />
                            <span className="light-gray">Connected with MetaMask</span>
                        </div>
                        <div>
                            <DefaultButton text={"Change"} fontWeight={600} />
                        </div>
                    </div>

                    <div className="space-between mt-1rem">
                        <div className="flex">
                            <div className="wallet-icon-bg">
                                <WalletAddress />
                            </div>
                            <span className="wallet-address-text">{auth ? elipsisAddress(auth.account) : ''}</span>
                        </div>
                        <div className="copy-text">
                            <span>Copy Address</span>
                            <span>
                                <Copy />
                            </span>
                        </div>
                    </div>

                    <div className="space-between mt-1rem">
                        <a href="#" className="extra-link">
                            <span>View on Etherscan</span>
                            <span><HeadUpArrow /></span>
                        </a>
                        <div>
                            <DefaultButton text={"Disconnect"} fontWeight={600} />
                        </div>
                    </div>

                    <div className="view-account-btn">
                        <GreenTextButton text="View account page" fontWeight={600} />
                    </div>

                </div>

                <div className="mkr-sec">
                    <div className="mkr-label">
                        <h4>Polling voting weight</h4>
                        <span><Question /></span>
                    </div>

                    <div className="mkr-value">
                        <span>0 MKR</span>
                    </div>

                    <p className="mkr-des">
                    Your polling voting weight is made up of the MKR in your wallet, vote proxy, and voting contract. This amount is applied to all polls you vote on.
                    </p>

                    <div className="mkr-label">
                        <h4>EXECUTIVE VOTING WEIGHT</h4>
                        {/* <span><Question /></span> */}
                    </div>

                    <div className="mkr-value">
                        <span>0 MKR</span>
                    </div>

                    <p className="mkr-des">
                    Your executive voting weight is made up of the MKR in your vote proxy and voting contract. This amount is applied to any executives you support.
                    </p>
                </div>
            </div>
        </Modal>
    )
}