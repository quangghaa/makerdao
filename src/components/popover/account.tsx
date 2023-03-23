import { Popover } from "antd";
import React from "react";
import { Account, Discord, DotDotDot, FAQ, Mode, Stats } from "../../assets/func/svg";
import './style.css';

interface Props {

}

export const AccountPopover: React.FC<Props> = () => {
    const text = <span>Title</span>;

    const content = (
    <ul className="account-popover-content">
        <li>
            <a href="#">
                <span><Account /></span>
                <span>Account</span>
            </a>
        </li>
        <li>
            <a href="#">
                <span><Discord /></span>
                <span>Support</span>
            </a>
        </li>
        <li>
            <a href="#">
                <span><Stats /></span>
                <span>Stats</span>
            </a>
        </li>
        <li>
            <a href="#">
                <span><FAQ /></span>
                <span>FAQs</span>
            </a>
        </li>
        <li>
            <a href="#">
                <span><Mode /></span>
                <span>Dark mode</span>
            </a>
        </li>
    </ul>
    );
    
    return (
        <Popover placement="bottomRight" content={content} trigger="click">
        <button className="account-btn">
            <DotDotDot />
        </button>
      </Popover>
    )
}