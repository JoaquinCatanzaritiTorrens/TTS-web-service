export type ApiKeyRequestProps = {
    id: number;
    apiKeyId: number | null;
    userId: number | null;
    createdAt: Date;
};

export class ApiKeyRequest {
    readonly id!: number;
    readonly apiKeyId!: number | null;
    readonly userId!: number | null;
    readonly createdAt!: Date;

    constructor(params: ApiKeyRequestProps) {
        Object.assign(this, params);
    }
}