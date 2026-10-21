// Public donation terms describe the intended model, not an active payment or approval state.
export const donationInformation = {
  purpose: 'Your donation supports the needs described in the selected campaign.',
  review: 'Review the campaign, donation amount and payment terms at secure checkout. No card details are collected here.',
  approval: 'Fundraising approval and payment-provider eligibility are required before donations can be received. Recipient verification is required before funds are released. Neither is confirmed here.',
  allocation: 'For confirmed, approved donations, the Foundation covers processing fees and allocates the full base-USD donation to the creator. Any optional local-currency conversion quote is separate from that allocation.',
  release: 'Funds remain held until manual release or campaign closure. Release requires recipient verification, approval and an eligible payout route; it is not an immediate transfer.',
  availability: 'Secure checkout confirms the selected campaign, donation amount and payment terms before you confirm. Continuing does not make a payment.',
  countries: 'Creators can receive funds only through countries and payout routes permitted by the payment provider and approved for the campaign.',
  receipt: 'An official donation receipt is issued only after payment is confirmed. Selecting an amount or opening checkout is not a receipt or payment confirmation.',
  refunds: 'If the campaign does not reach its goal or is found to be fraudulent, you will receive a full refund. To request one, email support@hopehumanfoundation.org with the campaign link and any confirmed donation reference. Requests outside those two cases are reviewed individually. Do not send full card numbers or security codes.',
  guarantee: 'Your donation is 100% secure. If the campaign does not reach its goal or is found to be fraudulent, you will receive a full refund.',
};
export function donationLabel(amount: number) { return `$${amount} Donation`; }
