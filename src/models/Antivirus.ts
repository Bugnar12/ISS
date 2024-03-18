//make antivirus model
export interface Antivirus {
    id: number;
    name: string;
    producer: string;
    description: string;
    supportMultiPlatform: boolean;
    releaseDate: Date;
}