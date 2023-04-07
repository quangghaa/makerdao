import React from "react";
import { HeadDown, Search } from "../../assets/func/svg";
import './style.css';
import { DateButton, DefaultButton, LightGreenButton, LinkButton, SearchButton, SelectButton, SortButton, ViewMoreButton } from "../../components/button/buttons";
import { IFilter, ISort } from "../../types/types";


interface Props {
    sortOptions?: ISort[]
    tagOptions?: IFilter[]
    statusOptions?: IFilter[]
    typeOptions?: IFilter[]
}

export const Filter: React.FC<Props> = ({sortOptions, tagOptions, statusOptions, typeOptions}) => {
    return (
        <div className="filter">
            <div className="filter-option">
                <div className="option-wrapper">
                    <SearchButton text="" placeholder="Search poll titles" icon={<Search />} />
                </div>
                {/* <div className="">
                    <SortButton text={sortOptions ? sortOptions[0].name : 'Default value'} icon={<HeadDown />} fontWeight={600} sortOptions={sortOptions} />
                </div>
                <div className="option-wrapper">
                    <SelectButton text="Tag" icon={<HeadDown />} fontWeight={600} options={tagOptions} />
                </div>

                <div className="option-wrapper">
                    <SelectButton text="Status" icon={<HeadDown />} fontWeight={600} options={statusOptions} />
                </div>

                <div className="option-wrapper">
                    <SelectButton text="Type" icon={<HeadDown />} fontWeight={600} options={typeOptions} />
                </div>

                <div className="option-wrapper">
                    <DateButton text="Date" icon={<HeadDown />}/>
                </div> */}
            </div>

            {/* <div className="filter-reset">
                <LinkButton text="Reset filters" fontWeight={600} />
            </div> */}
        </div>
    )
}