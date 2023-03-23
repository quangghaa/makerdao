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