export type ApiKeyProps = {
    id: number;
    keyHash: string;
    keyPreview: string;
    name: string;
    userId: number;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
};

export class ApiKey {
    readonly id!: number;
    readonly keyHash!: string;
    readonly keyPreview!: string;
    readonly name!: string;
    readonly userId!: number;
    readonly enabled!: boolean;
    readonly createdAt!: Date;
    readonly updatedAt!: Date;

    constructor(params: ApiKeyProps) {
        Object.assign(this, params);
    }
}