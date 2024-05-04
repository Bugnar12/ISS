export class Antivirus{
    private _id: number;
    private _name: string;
    private _producer: string;
    private _description: string;
    private _supportMultiPlatform: boolean;
    private _releaseDate: Date;

    public constructor(id: number, name: string, producer: string, description: string, supportMultiPlatform: boolean, releaseDate: Date) {
        this._id = id;
        this._name = name;
        this._producer = producer;
        this._description = description;
        this._supportMultiPlatform = supportMultiPlatform;
        this._releaseDate = releaseDate;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get producer(): string {
        return this._producer;
    }

    set producer(value: string) {
        this._producer = value;
    }

    get description(): string {
        return this._description;
    }

    set description(value: string) {
        this._description = value;
    }

    get supportMultiPlatform(): boolean {
        return this._supportMultiPlatform;
    }

    set supportMultiPlatform(value: boolean) {
        this._supportMultiPlatform = value;
    }

    get releaseDate(): Date {
        return this._releaseDate;
    }

    set releaseDate(value: Date) {
        this._releaseDate = value;
    }
}