import { Modal } from "antd";
import React from "react";
import { ITask } from "../../../types/types";
import "./style.css";

interface Props {
    isModalOpen: boolean
    handleCancel: () => void
    task: ITask
}

export const TaskDescriptionModal: React.FC<Props> = ({isModalOpen, handleCancel, task}) => {
    return (
        <Modal width={888} open={isModalOpen} footer={null} onCancel={handleCancel}>
        <div className='hsr-head'>
            <h2 className="weight-500">Description</h2>
        </div>
        <div className='des-row mt-1rem'>
          <span className='des-label'>Task name:</span>
          <span className='des-content'>{task?.taskName}</span>
        </div>
        <div className='des-row'>
          <span className='des-label'>Description:</span>
          <span className='des-content'>{task?.description}</span>
        </div>
        <div className='des-row'>
          <span className='des-label'>Deadline:</span>
          <span className='des-content'>{task?.deadline}</span>
        </div>
        <div className='des-row'>
          <span className='des-label'>Reporter:</span>
          <span className='des-content'>{task?.reporter}</span>
        </div>
        <div className='des-row'>
          <span className='des-label'>Reviewer:</span>
          <span className='des-content'>{task?.reviewer}</span>
        </div>
        <div className='des-row'>
          <span className='des-label'>PIC:</span>
          <span className='des-content'>{task?.pic}</span>
        </div>
        <div className='des-row mt-1rem'>
          <span className='des-label'>Expected Result:</span>
        </div>
        <ul className="expected-rs-list">
            {task.expectedResult?.map((s: string, index) => {
                return (
                    <li key={index}>{s}</li>
                )
            })}
        </ul>
      </Modal>
    )
}