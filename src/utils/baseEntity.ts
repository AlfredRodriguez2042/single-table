export abstract class Item {
    abstract get pk(): string
    abstract get sk(): string
    abstract get gsi1pk(): string
    abstract get gsi1sk(): string
    public keys() {
        return { pk: this.pk, sk: this.sk }
    }
    public gsi1() {
        return { gsi1pk: this.gsi1pk, gsi1sk: this.gsi1sk }
    }
}