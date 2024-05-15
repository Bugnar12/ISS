export class User {
    private username: string;
    private email: string;
    private password: string;

    public constructor(username: string, password: string, email?: string) {
        this.username = username;
        this.password = password;
        this.email = email || '';
    }

    public getUsername(): string {
        return this.username;
    }

    public setUsername(username: string): void {
        this.username = username;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }
}