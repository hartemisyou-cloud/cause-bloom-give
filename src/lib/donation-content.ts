// Public donation terms describe the intended model, not an active payment or approval state.
export const donationInformation = {
  purpose: 'Your donation supports the needs described in the selected campaign.',
  review: 'Review the campaign, donation amount and payment terms at secure checkout. No card details are collected here.',
  approval: 'Fundraising approval and recipient verification are required before donations can be processed. Approval for this campaign is not confirmed here.',
  allocation: 'For confirmed, approved donations, the Foundation covers processing fees and allocates the full base-USD donation to the creator. Any optional local-currency conversion quote is separate from that allocation.',
  release: 'Funds remain held until manual release or campaign closure. Release requires recipient verification, approval and an eligible payout route; it is not an immediate transfer.',
  availability: 'Secure checkout confirms campaign availability and recipient review, and shows the donation amount and terms before you confirm. Continuing does not make a payment.',
  countries: 'Creators can receive funds only through countries and payout routes permitted by Stripe and approved for the campaign.',
  receipt: 'An official donation receipt is issued only after payment is confirmed. Selecting an amount or opening checkout is not a receipt or payment confirmation.',
  refunds: 'To request a refund or report an incorrect donation, email support@hopehumanfoundation.org with the campaign link and any confirmed donation reference. Refunds are reviewed individually; no automatic refund or guaranteed reimbursement is promised. Do not send full card numbers or security codes.',
};
export function donationLabel(amount: number) { return `$${amount} Donation`; }
