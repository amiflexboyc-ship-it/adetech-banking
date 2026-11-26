const formatNaira = (amount) =>
  `NGN ${Number(amount || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}`;

export const partyName = (txn) => {
  if (!txn) return 'AdeTech Customer';
  if (txn.type === 'credit') return txn.senderName || 'Inward Wire Transfer';
  return txn.recipientName || 'Outward Settlement';
};

export const buildReceiptText = (receipt, user) => {
  const isCredit = receipt.type === 'credit';
  return `
============================================================
              ADETECH DIGITAL BANKING PLC
           OFFICIAL TRANSACTION SETTLEMENT RECEIPT
============================================================

TRANSACTION STATUS     : ${String(receipt.status || 'completed').toUpperCase()}
TRANSACTION REFERENCE  : ${receipt.reference}
PAYMENT CHANNEL        : ${receipt.channel || (isCredit ? 'AdeTech Core Ledger' : 'Paystack Transfer API')}
DATE & TIME            : ${new Date(receipt.date).toUTCString()}
CATEGORY               : ${receipt.category || 'Electronic Funds Transfer'}

${isCredit ? 'SENDER' : 'BENEFICIARY'} DETAILS:
Account Name           : ${partyName(receipt)}
${isCredit ? 'Originating' : 'Destination'} Bank       : ${receipt.recipientBank || receipt.senderBank || 'AdeTech Banking'}
NUBAN Account Number   : ${receipt.recipientAccountNumber || receipt.senderAccountNumber || 'N/A'}

TRANSACTION SUMMARY:
Principal Amount       : ${formatNaira(receipt.amount)}
Transaction Fee        : ${formatNaira(receipt.fee || 0)}
Total ${isCredit ? 'Credited' : 'Debited'}          : ${formatNaira(isCredit ? receipt.amount : receipt.totalDebited || receipt.amount)}

NARRATION / PURPOSE    : ${receipt.description || 'Electronic Funds Transfer'}

ACCOUNT HOLDER:
Name                   : ${user?.name || 'AdeTech Customer'}
Debit / Credit Account : ${user?.accountNumber || 'N/A'}
${user?.balance !== undefined ? `Remaining Balance      : ${formatNaira(user.balance)}` : ''}

============================================================
All electronic transfers are cleared in compliance with
Central Bank of Nigeria (CBN) electronic payment mandates.
Support Desk: amiflexboyc@gmail.com | 09077108987
============================================================
  `.trim();
};

export const downloadReceiptFile = (receipt, user) => {
  const blob = new Blob([buildReceiptText(receipt, user)], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `AdeTech-Receipt-${receipt.reference || receipt.id}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const printReceipt = (receipt, user) => {
  const isCredit = receipt.type === 'credit';
  const html = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>AdeTech Receipt ${receipt.reference}</title>
  <style>
    body { font-family: Georgia, serif; color: #0a1d36; padding: 32px; max-width: 640px; margin: 0 auto; }
    h1 { font-size: 20px; letter-spacing: 0.08em; text-transform: uppercase; margin: 0; }
    .muted { color: #475569; font-size: 12px; }
    table { width: 100%; border-collapse: collapse; margin-top: 24px; font-size: 13px; }
    td { padding: 8px 0; border-bottom: 1px solid #e2e8f0; }
    td:last-child { text-align: right; font-weight: 600; }
    .amount { font-size: 28px; font-weight: 800; margin: 16px 0; }
    .stamp { margin-top: 28px; font-size: 11px; color: #64748b; }
  </style>
</head>
<body>
  <h1>AdeTech Digital Banking PLC</h1>
  <p class="muted">Official transaction settlement receipt</p>
  <div class="amount">${isCredit ? '+' : '-'}${formatNaira(receipt.amount)}</div>
  <table>
    <tr><td>Status</td><td>${String(receipt.status || 'completed').toUpperCase()}</td></tr>
    <tr><td>Reference</td><td>${receipt.reference}</td></tr>
    <tr><td>Date</td><td>${new Date(receipt.date).toLocaleString()}</td></tr>
    <tr><td>${isCredit ? 'Sender' : 'Beneficiary'}</td><td>${partyName(receipt)}</td></tr>
    <tr><td>Bank</td><td>${receipt.recipientBank || 'AdeTech Banking'}</td></tr>
    <tr><td>Account</td><td>${receipt.recipientAccountNumber || receipt.senderAccountNumber || 'N/A'}</td></tr>
    <tr><td>Channel</td><td>${receipt.channel || 'AdeTech Core Ledger'}</td></tr>
    <tr><td>Fee</td><td>${formatNaira(receipt.fee || 0)}</td></tr>
    <tr><td>Narration</td><td>${receipt.description || 'Electronic Funds Transfer'}</td></tr>
    <tr><td>Account holder</td><td>${user?.name || 'AdeTech Customer'} (${user?.accountNumber || ''})</td></tr>
  </table>
  <p class="stamp">Cleared in line with CBN electronic payment mandates. Support: amiflexboyc@gmail.com | 09077108987</p>
  <script>window.onload = () => window.print();</script>
</body>
</html>`;

  const printer = window.open('', '_blank', 'noopener,noreferrer,width=720,height=900');
  if (!printer) return false;
  printer.document.write(html);
  printer.document.close();
  return true;
};

export const downloadStatementCsv = (transactions) => {
  const header = 'Date,Reference,Type,Party,Channel,Amount,Fee,Status,Narration';
  const rows = transactions.map((txn) => {
    const cols = [
      new Date(txn.date).toISOString(),
      txn.reference,
      txn.type,
      partyName(txn),
      txn.channel || '',
      Number(txn.amount || 0).toFixed(2),
      Number(txn.fee || 0).toFixed(2),
      txn.status || 'completed',
      (txn.description || '').replace(/"/g, '""')
    ];
    return cols.map((c) => `"${c}"`).join(',');
  });
  const blob = new Blob([[header, ...rows].join('\n')], { type: 'text/csv;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `AdeTech-Statement-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export default {
  buildReceiptText,
  downloadReceiptFile,
  printReceipt,
  downloadStatementCsv,
  partyName
};
