export class Customer {
    private id: number;
    private fullName: string;
    private email: string;
    private age: number;
    private antivirusId: number;

    public constructor(id: number, fullName: string, email: string, age: number, antivirusId: number) {
        this.id = id;
        this.fullName = fullName;
        this.email = email;
        this.age = age;
        this.antivirusId = antivirusId;
    }

    public getId(): number {
        return this.id;
    }
    public getFullName(): string {
        return this.fullName;
    }
    public getEmail(): string {
        return this.email;
    }
    public getAge(): number {
        return this.age;
    }
    public getAntivirusId(): number {
        return this.antivirusId;
    }
    public setFullName(fullName: string) {
        this.fullName = fullName;
    }
    public setEmail(email: string) {
        this.email = email;
    }
    public setAge(age: number) {
        this.age = age;
    }
    public setAntivirusId(antivirusId: number) {
        this.antivirusId = antivirusId;
    }


}
