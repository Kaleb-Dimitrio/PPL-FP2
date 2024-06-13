export function calculateBill(billItems) {
    let subtotal = 0;
    billItems.forEach(item => {
        subtotal += item.qty * item.price;
    });
    const ppn = subtotal * 0.1;
    const total = subtotal + ppn;
    return { subtotal, ppn, total };
}

