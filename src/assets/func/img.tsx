import React from "react";
import acr from "../images/acr.jpeg";
import stableLab from "../images/stableLab.jpeg";
// import hkust from "../images/hkust.jpeg";
import rs1 from "../images/resource_icon_1.svg";
import rs2 from "../images/resource_icon_2.svg";
import rs3 from "../images/resource_icon_3.svg";
import rs4 from "../images/resource_icon_4.svg";
import rs5 from "../images/resource_icon_5.svg";
import rs6 from "../images/resource_icon_6.svg";
import rs7 from "../images/resource_icon_7.svg";
import rs8 from "../images/resource_icon_8.svg";
import rs9 from "../images/resource_icon_9.svg";
import forumImg1 from "../images/clean-money.png";
import forumImg2 from "../images/improve-participation.png";
import './svg.css';

export const  AcrInvest = () => {
    return (
        <img src={acr} alt="acr-invest" />
    )
}

export const  StableLab = () => {
    return (
        <img className="size-40 round" src={stableLab} alt="acr-invest" />
    )
}

export const  HKUST = () => {
    return (
        <img className="size-40" src={stableLab} alt="acr-invest" />
    )
}

export const ResourcesIcon1 = () => {
    return (
        <img className="size-64" src={rs1} alt="resources-icon-1" />
    )
}

export const ResourcesIcon2 = () => {
    return (
        <img className="size-64" src={rs2} alt="resources-icon-2" />
    )
}

export const ResourcesIcon3 = () => {
    return (
        <img className="size-64" src={rs3} alt="resources-icon-3" />
    )
}

export const ResourcesIcon4 = () => {
    return (
        <img className="size-64" src={rs4} alt="resources-icon-4" />
    )
}

export const ResourcesIcon5 = () => {
    return (
        <img className="size-64" src={rs5} alt="resources-icon-5" />
    )
}

export const ResourcesIcon6 = () => {
    return (
        <img className="size-64" src={rs6} alt="resources-icon-6" />
    )
}

export const ResourcesIcon7 = () => {
    return (
        <img className="size-64" src={rs7} alt="resources-icon-7" />
    )
}

export const ResourcesIcon8 = () => {
    return (
        <img className="size-64" src={rs8} alt="resources-icon-8" />
    )
}

export const ResourcesIcon9 = () => {
    return (
        <img className="size-64" src={rs9} alt="resources-icon-9" />
    )
}

export const ForumImg1 = () => {
    return (
        <img className="forum-img" src={forumImg1} alt="forum-item-1" />
    )
}

export const ForumImg2 = () => {
    return (
        <img className="forum-img" src={forumImg2} alt="forum-item-2" />
    )
}