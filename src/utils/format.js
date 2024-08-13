export function formatAmount(amount) {
    return new Intl.NumberFormat('en-US').format(amount)
}
