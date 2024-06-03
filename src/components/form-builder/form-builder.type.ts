export enum ANSWER_TYPE {
    Textarea,
    CheckList
}

export type Question = {
    answerType: ANSWER_TYPE;
    label: string;
    options?: {
        option: string;
        selected: boolean;
    }[];
    allowOtherAnswer?: boolean;
    answer: string;
    other?: string;
    otherText?: string;
    required?: boolean;
}