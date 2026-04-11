export type UserProps = {
    id: number;
    email: string;
    password: string;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class User {
    readonly id: number;
    readonly email: string;
    readonly password: string;
    readonly enabled: boolean;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(params: UserProps) {
        Object.assign(this, params);
    }
}
