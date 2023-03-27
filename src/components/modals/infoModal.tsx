import { Modal } from "antd";
import React from "react";
import './style.css';

interface Props {
    isOpen: boolean;
    handleCancel: () => void;
    title: string;
    content: string[];
    align?: 'center';
}

export const InfoModal: React.FC<Props> = ({isOpen, handleCancel, title, content, align}) => {
    return (
        <Modal open={isOpen} onCancel={handleCancel} footer={null} width={400}>
            <div className="modal-content">
                <h2>{title}</h2>
                {content.map((c: string) => {
                    return (
                        <p style={align ? {textAlign: align} : {textAlign:'left'}}>{c}</p>
                    )
                })}
            </div>
        </Modal>
    )
}