import { Button } from "antd";
import { useMetaMask } from "metamask-react";
import React, { useEffect } from "react";
import { AccountInfoModal } from "../components/modals/account-info/account-info";
import { ethers } from "ethers";

interface Props {
    
}

export const MetamaskTest: React.FC<Props> = () => {
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    useEffect(() => {
        console.log("CHECK status: ", status)
        console.log("check account: ", account)
        console.log("check chainId: ", chainId)
        console.log("check etherum: ", ethereum)
    }, [status, chainId])

    const closeModal = () => {
        
    }

    return (
        <>
        <h1>
            METAMASK Test
        </h1>

        <div style={{width: "800px", margin: '0 auto'}}>
            <Button onClick={connect}>Connect to metamask</Button>
        </div>

        </>
    )
}