import crypto from 'crypto';

export const generateTransactionId = () => {
  return `TXNID_${crypto.randomBytes(10).toString('hex')}`;
};