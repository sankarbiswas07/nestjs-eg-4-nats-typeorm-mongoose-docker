export enum stockQtyUnitStatus {
    PIECES = 'pieces',
    PAIR = 'pair',
    KG = 'kg'
}

export enum OrderStatus {
    PENDING = 'pending',
    ACCEPTED = 'accepted',
    READY_FOR_SHIPMENT = 'ready_for_shipment',
    SHIPMENT_CONFIRMED = 'shipment_confirmed',
    IN_TRANSIT = 'in_transit',
    OUT_FOR_DELIVERY = 'out_for_delivery',
    DELIVERED = 'delivered',
    RETURN_REQUESTED = 'return_requested',
    RETURN_APPROVED = 'return_approved',
    RETURNING = 'returning',
    RETURNED = 'returned'
}

export enum OrderPaymentStatus {
    COD = 'cash on delivery',
    NUMBER = 'paid',
    FAILED = 'failed',
    CANCELLED = 'cancelled',
    REFUNDED = 'refunded',
}