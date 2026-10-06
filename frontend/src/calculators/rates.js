// Hourly rates shared by the two cost calculators. Each one is a published figure or a stated
// assumption; the basis the page shows for it comes from rateBasis() in each model, and its
// source from content/calculators.js. The rates are those the owner verified on 06 October 2026
// (VeriCase_Verified_Rates_and_Cost_Model.xlsx), the same rates as note 3 on the home page.

// HMCTS solicitors' guideline hourly rates, in effect from 01 January 2026, by band and grade
// (A partner, B senior associate, C associate, D trainee or paralegal).
export const GUIDELINE_BANDS = {
  l1: { A: 579, B: 393, C: 305, D: 210 },
  l2: { A: 422, B: 327, C: 276, D: 157 },
  l3: { A: 319, B: 262, C: 209, D: 146 },
  n1: { A: 295, B: 247, C: 201, D: 142 },
  n2: { A: 288, B: 247, C: 200, D: 142 },
};

// The hourly rates claimed by the claimant's solicitors in Lime Technology Ltd v Liverpool City
// Council [2025] EWHC 2037 (TCC), paragraph 14, "at the upper range of any possible range"; no
// paralegal rate was recorded, so Grade D is the London 1 guideline rate.
export const CLAIMED_TCC = { A: 1345.5, B: 895.5, C: 463.5, D: 210 };

// Bond Solon Expert Witness Survey 2025: the average hourly rate of experts in the civil courts,
// all disciplines.
export const EXPERT_RATE = 253.73;

// The Attorney General's London A Panel rate from 01 April 2025, and the rate for a King's Counsel
// of ten years or more whose current rate is £200 to £269.
export const PANEL_JUNIOR = 150;
export const PANEL_KC = 270;

// Crown Office Chambers' range of minimum hourly rates for public access work in cases valued under
// £100,000, plus VAT, depending on the barrister's seniority (its website, checked 06 October 2026).
export const CHAMBERS_MINIMUM = [175, 350];

// Assumptions: King's Counsel (with an upper sensitivity), and the client's project manager and
// director. The commercial manager's £47.50 is derived from salary (note 3 on the home page).
export const KC_ASSUMED = 600;
export const KC_UPPER = 1000;
export const COMMERCIAL_MANAGER = 47.5;
export const PROJECT_MANAGER = 45;
export const DIRECTOR = 85;

export const near = (a, b) => Math.abs(a - b) < 0.005;
