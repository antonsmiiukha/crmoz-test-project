export interface IItem<T> {
    label: string;
    value: T;
    available: boolean;
    loading: boolean;
    default?: boolean;
    key: number;
}

export type IItems<T> = IItem<T>[];

export type ISwitchComponentCallback<T> = (item: IItem<T> | undefined) => void;
