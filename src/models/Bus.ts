export interface Bus {
    busId: number;
    name: string;
    plate: string;
    dateTime: string;
    brand: string;
    available: boolean;
}

export type BusesList = Bus[];