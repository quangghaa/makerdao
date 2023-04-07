import { Checkbox, DatePicker, DatePickerProps, Popover, Select } from "antd";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "../../pages/auth/authSlice";
import { selectRequest } from "../../pages/polling-page/requestSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { IContractRequest, IFilter, IPoll, ISelectedBatch, ISort } from "../../types/types";
import "./style.css";

interface Props {
    icon?: ReactNode;
    iconPosition?: 'right';
    text: string;
    disable?: boolean;
    background?: 'gray';
    color?: 'green' | 'dark-green' | 'purple' | 'pink' | 'gray'; 
    fontWeight?: number;
    options?: IFilter[];
    sortOptions?: ISort[];
    placeholder?: string;
    count?: number;

    handleUserChoice?: (pollId: number, optionId: number, vote: string) => void
    pollId?: number;
    optionId?: number;

    submitVote?: (selectedBatch: ISelectedBatch) => void
}

const mapColor = (color: string) => {
    switch(color) {
        case 'green':
            return '#1acca7'
        case 'dark-green': 
            return '#1aab9b'
        case 'purple':
            return '#9a4bff'
        case 'pink':
            return '#e64bff'
        case 'gray':
            return '#666666'
        default:
            return ''
    }
}

const mapBg = (bg: string) => {
    switch(bg) {
        case 'gray':
            return 'rgba(238,238,238,0.4)'
        default:
            return ''
    }
}

export const DefaultButton:React.FC<Props> = ({icon, text, fontWeight, iconPosition}) => {
    return (
        <>
        {iconPosition && iconPosition === 'right' ? 
        <button className="default-btn">
            <span style={{fontWeight: fontWeight}}>{text}</span>
            {icon && <span>{icon}</span>}
        </button> :
        <button className="default-btn">
            {icon && <span>{icon}</span>}
            <span style={{fontWeight: fontWeight}}>{text}</span>
        </button>}
        </>
    )
}

export const GreenTextButton:React.FC<Props> = ({text, fontWeight}) => {
    return (
        <button className="green-text-btn">
            <span style={{fontWeight: fontWeight}}>{text}</span>
        </button> 
    )
}

export const LightGreenButton:React.FC<Props> = ({text, disable, submitVote, pollId, optionId}) => {
    const requestState = useSelector(selectRequest)
    const dispatch = useAppDispatch()
    const authState = useAppSelector(selectAuth)

    const demo = () => {
        // console.log("Check request: ", requestState.request)
        // if(!requestState.request.selectedBatch) {
        //     console.log("selected batch undefine")
        //     return 
        // }
        // if(authState.auth?.batchVotingContract) {
        //     console.log("Calling vote...")

        //     if(Object.keys(requestState.request.selectedBatch).length === 0) {
        //         console.log("Please select batch first")
        //         return
        //     }

        //     let request = {
        //         contract: authState.auth.batchVotingContract,
        //         param: {pollId: requestState.request.selectedBatch.pollId, batchId: requestState.request.selectedBatch.batchId}
        //     } as IContractRequest

        //     console.log("Check request: ", request)
        //     dispatch(pollVote(request))
            
        //     console.log("update poll state ...")
        //     dispatch(setPollState({pollId: requestState.request.selectedBatch.pollId} as IPoll))
        // }
    }

    return (
        <>
            <button disabled={disable} className="lightgreen-btn" onClick={() => demo()}>
                {text}
            </button>
        </>
    )
}

export const ColorButton:React.FC<Props> = ({icon, background, color, text}) => {
    return (
        <button style={background ? {background: mapBg(background)} : {background: 'var(--theme-ui-colors-surface)'}} className="color-btn">
            <span style={color ? {color: mapColor(color)} : {color: ''}}>{text}</span>
        </button>
    )
}



export const SelectButton:React.FC<Props> = ({icon, text, fontWeight, options}) => {
    const onChange = (e: CheckboxChangeEvent) => {
        console.log(`checked = ${e.target.checked}`);
      };
    
    const content = (
        <div className="filter-content">
          {options?.map((o:IFilter) => {
            return (
                <div className="filter-item">
                    <div className="checkbox-wrapper">
                    <Checkbox onChange={onChange}></Checkbox>
                    </div>
                    <div className="item-info">
                        <span>{o.name}</span>
                        <span>{o.totalValue}</span>
                    </div>
                </div>
            )
          })}
        </div>
    );

    return (
        <Popover placement="bottomLeft" content={content} trigger="click">
        <button className="default-btn">
            <span style={{fontWeight: fontWeight}}>{text}</span>
            {icon && <span>{icon}</span>}
        </button>
        </Popover>
    )
}

export const SortButton:React.FC<Props> = ({icon, text, fontWeight, sortOptions}) => {
    
    const content = (
        <ul className="sort-content">
          {sortOptions?.map((o:ISort) => {
            return (
                <li className="sort-item">
                    <span>{o.name}</span>
                </li>
            )
          })}
        </ul>
    );

    return (
        <Popover placement="bottomLeft" content={content} trigger="click">
        <button className="default-btn">
            <span style={{fontWeight: fontWeight}}>{text}</span>
            {icon && <span>{icon}</span>}
        </button>
        </Popover>
    )
}

export const SearchButton: React.FC<Props> = ({icon, placeholder}) => {
    return (
        <div className="search-button">
            <input type="text" placeholder={placeholder} />
            <div className="search-icon-box">
                {icon && <span>{icon}</span>}
            </div>
        </div>
    )
}

export const DateButton: React.FC<Props> = ({icon, text, fontWeight}) => {
    const onChangeEndedAfter: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };

    const onChangeEndedBefore: DatePickerProps['onChange'] = (date, dateString) => {
        console.log(date, dateString);
    };
    
    const dateContent = (
        <div className="date-content-btn">
            <span>Ended after:</span>
            <DatePicker onChange={onChangeEndedAfter} placeholder="mm/dd/yyyy" format={'mm/dd/YYYY'} />

            <span>Ended before:</span>
            <DatePicker onChange={onChangeEndedBefore} placeholder="mm/dd/yyyy" format={'mm/dd/YYYY'} />

            <span></span>
            <button className="date-reset-btn">Reset</button>
        </div>
    );
    
    return (
        <Popover placement="bottomLeft" content={dateContent} trigger="click">
        <button className="default-btn">
            <span style={{fontWeight: fontWeight}}>{text}</span>
            {icon && <span>{icon}</span>}
        </button>
        </Popover>
    )
}

export const LinkButton: React.FC<Props> = ({text, fontWeight, color}) => {
    return (
        <button className="link-btn">
            <span style={{fontWeight: fontWeight, color: color}}>{text}</span>
        </button>
    )
}

export const ViewMoreButton: React.FC<Props> = ({text, count, fontWeight}) => {
    return (
        <button className="view-more-btn" style={fontWeight ? {fontWeight: fontWeight} : {fontWeight: 500}}>
            {text}
            <span>({count})</span>
        </button>
    )
}

export const VoteChoiceButton: React.FC<Props> = ({text, pollId, optionId,handleUserChoice}) => {
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
        if(!pollId || !optionId || !handleUserChoice) return
        handleUserChoice(pollId, optionId, value)
    };

    return (
        <Select
        id="choice-select-id"
            defaultValue="Your choice"
            onChange={handleChange}
            options={[
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
            ]}
        />
    )
}