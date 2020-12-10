export default class Goods {
    constructor(name, price) {
        this.__name = name;
        this.__price = price;
    }
    get Name() {
        return this.__name;
    }
    set Name(value) {
        this.__name = value;
    }
    get Price() {
        return this.__price;
    }
    set Price(value) {
        this.__price = value;
    }
}
