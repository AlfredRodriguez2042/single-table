export abstract class Item {
    abstract get pk(): string
    abstract get sk(): string
    public keys() {
        return { pk: this.pk, sk: this.sk }
    }
}