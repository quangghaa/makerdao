export interface IPoll {
    postedTime: string;
    title: string;
    description: string;
    mkr?: number;
    id: number;
    charateristic: ICharacteristic[];
    timeRemaining?: string;
    totalComments?: number;
    agreePercentage?: number;
    disagreePercentage?: number;
    neutralPercentage?: number;
    leadingOption: 'YES' | 'NO';
    supportingMkr: number;
    status: 'active' | 'executive';
    passedTime?: string;
    executedTime?: string;
}

export interface ICharacteristic {
    tipe: 'yellow' | 'orange' | 'yellow-pink' | 'pink' | 'green' | 'blue-green' | 'blue' | 'gray';
    text: string;
}

export interface IDelegate {
    img?: string;
    status: 'green-check' | 'unknown';
    name: string;
    address: string;
    charateristic?: ICharacteristic[];
    totalMkrDelegated: number;
    pollParticipation: number;
    executiveParticipation: number;
    communication: number;
}

export interface IStepDetail {
    title: string;
    titleHighlight: string;
    description: string;
    links?: string[]
}

export interface IStep {
    id: string;
    title: string;
    detail: IStepDetail;
}

export interface IResources {
    tipe: 'Governance' | 'Products & Tools' | "Developers",
    name: string;
    iconNumber: number;
    description: string;
    link: string;
}

export interface IBrowseForum {
    img?: string;
    title: string;
    description: string;
    link: string;
}

export interface IParticipationChart {
    month: string;
    totalMkr: number;
    color?: string;
}

export interface IFilter {
    id: number;
    state: 'checked' | 'unchecked';
    name: string;
    totalValue: number;
}

export interface ISort {
    id: number;
    name: string;
}