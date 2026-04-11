export type ContactProps = {
    id: number;
    name: string;
    email: string;
    message: string;
    createdAt: Date;
    updatedAt: Date;
};

export class Contact {
    readonly id: number;
    readonly name: string;
    readonly email: string;
    readonly message: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(params: ContactProps) {
        Object.assign(this, params);
    }
}
