// Passbook model for credit/debit transactions
class Passbook {
  constructor({
    id,
    user_id,
    type,
    amount,
    balance,
    description,
    transaction_id,
    status,
    category,
    created_at
  }) {
    this.id = id;
    this.user_id = user_id;
    this.type = type;
    this.amount = amount;
    this.balance = balance;
    this.description = description;
    this.transaction_id = transaction_id;
    this.status = status;
    this.category = category;
    this.created_at = created_at;
  }
}

module.exports = Passbook;
