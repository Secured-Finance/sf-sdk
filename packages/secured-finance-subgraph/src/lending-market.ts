import { LendingMarket, Order, Transaction } from '../generated/schema';
import {
    CancelOrder,
    CleanOrders,
    MakeOrder,
    TakeOrders,
} from '../generated/templates/LendingMarket/LendingMarket';

export function handleMakeOrder(event: MakeOrder): void {
    const orderId = event.params.orderId.toHexString();
    const order = new Order(orderId);

    order.status = 'Open';
    order.orderId = event.params.orderId;
    order.originalOrderId = event.params.originalOrderId;
    order.maker = event.params.maker;
    order.currency = event.params.ccy;
    order.side = event.params.side;
    order.maturity = event.params.maturity;
    order.unitPrice = event.params.unitPrice;
    order.amount = event.params.amount;

    order.createdAt = event.block.timestamp;
    order.blockNumber = event.block.number;
    order.txHash = event.transaction.hash;

    const lendingMarket = LendingMarket.load(event.address.toHexString());
    if (lendingMarket !== null) {
        order.lendingMarket = lendingMarket.id;
    }

    order.save();
}

export function handleTakeOrders(event: TakeOrders): void {
    const transaction = new Transaction(event.transaction.hash.toHexString());
    transaction.amount = event.params.filledAmount;
    transaction.unitPrice = event.params.unitPrice;
    transaction.taker = event.params.taker;
    transaction.currency = event.params.ccy;
    transaction.maturity = event.params.maturity;
    transaction.side = event.params.side;
    transaction.forwardValue = event.params.filledAmount;

    transaction.createdAt = event.block.timestamp;
    transaction.blockNumber = event.block.number;
    transaction.txHash = event.transaction.hash;

    const lendingMarket = LendingMarket.load(event.address.toHexString());
    if (lendingMarket !== null) {
        transaction.lendingMarket = lendingMarket.id;
    }
    transaction.save();
}

export function handleCancelOrder(event: CancelOrder): void {
    const id = event.params.orderId;
    let order = Order.load(id.toHexString());
    if (order === null) {
        order = new Order(id.toHexString());
    }

    order.status = 'Cancelled';
    order.save();
}

export function handleCleanOrders(event: CleanOrders): void {
    for (let i = 0; i < event.params.orderIds.length; i++) {
        const id = event.params.orderIds[i];
        let order = Order.load(id.toHexString());
        if (order === null) {
            order = new Order(id.toHexString());
        }

        order.status = 'Filled';
        order.save();
    }
}
