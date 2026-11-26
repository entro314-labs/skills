# Lab and Check-up Report Review

Role: organize, explain and track a user's own results for a clinician conversation. Interpretation for treatment belongs to the clinician. The lab's own reference range printed on the report always overrides the typical values below (assay, sex, age and method change cutoffs).

## Workflow

1. **Extract** each analyte: name, value, unit, the report's reference range, the lab's flag, collection date, fasting state. Keep the unit exactly as printed; convert only on request and show both (mg/dL and mmol/L differ by analyte-specific factors).
2. **Group** by system (lipids, liver, glucose/metabolic, kidney, blood count, thyroid, vitamins/minerals, other).
3. **Flag** values outside the report's range and assign a severity step (ladder below). Confirm preconditions first: fasting, recent illness, hard exercise within 48 h, alcohol, new medicines or supplements, pregnancy.
4. **Compare** with earlier results of the same analyte, same lab and unit if available (trend section).
5. **Respond** with: what the marker measures, the user's value against the range, common non-disease reasons, and a next step with a time frame. Do not name a disease from one marker.
6. **Store** only what the task needs, locally, as one record per report; offer export and deletion.

## Record schema (one row per analyte)

`date, source/lab, analyte, value, unit, ref_low, ref_high, flag (low|normal|high), fasting (y/n), note`. Keep the original document or its identifier next to the record so a value can be re-checked.

## Typical adult reference values (orientation only)

| Group | Marker | Typical reference | Notes |
|---|---|---|---|
| Lipids | Total cholesterol | < 200 mg/dL (5.2 mmol/L) | Targets depend on overall cardiovascular risk |
| | LDL-C | < 100 optimal, 100-129 near optimal, 130-159 borderline, 160-189 high, >= 190 very high mg/dL (< 2.6, < 3.4, < 4.1, < 4.9 mmol/L) | Individual goals set by clinician; lower for diabetes or prior events |
| | HDL-C | low if < 40 (men) or < 50 (women) mg/dL (1.0 / 1.3 mmol/L) | Higher is not proven protective beyond normal |
| | Triglycerides | < 150 normal, 150-199 borderline, 200-499 high mg/dL (< 1.7 mmol/L) | Fasting preferred; very high values raise pancreatitis risk |
| Liver | ALT, AST | roughly up to 40-55 U/L (lab and sex dependent) | Mild rises are common after alcohol, hard exercise, fatty liver, some drugs and supplements |
| | GGT | roughly up to 60 U/L (sex dependent) | Sensitive to alcohol and bile-duct problems |
| | Total bilirubin | about 0.1-1.2 mg/dL (2-21 umol/L) | Mild isolated rise with otherwise normal liver tests is often benign (for example Gilbert syndrome); clinician to confirm |
| Glucose | Fasting glucose, HbA1c | see `vitals-and-reference-ranges.md` | |
| | Uric acid | about 3.5-7.2 mg/dL men, 2.6-6.0 women (210-430 / 150-350 umol/L) | High values: gout risk, discuss with clinician |
| Kidney | eGFR | >= 90 normal; < 60 for 3+ months suggests chronic kidney disease | Creatinine is affected by muscle mass and creatine supplements |
| Blood count | Hemoglobin | women about 12.0-15.5 g/dL, men 13.5-17.5 (120-155 / 135-175 g/L) | Low: anemia work-up (iron, B12, folate) by clinician |
| | WBC | 4-11 x10^9/L | Raised with infection, steroids, smoking |
| | Platelets | 150-400 x10^9/L | |
| | MCV | 80-100 fL | Low suggests iron deficiency or thalassemia trait, high suggests B12/folate or alcohol |
| Thyroid | TSH | about 0.4-4.0 mIU/L | Interpret with free T4 and symptoms; assays differ |
| Vitamins, minerals | 25-OH vitamin D | < 20 ng/mL (50 nmol/L) deficient; 20-29 insufficient by some bodies; >= 30 sufficient (bodies differ) | Do not chase high levels |
| | Vitamin B12 | about 200-900 pg/mL; 200-300 borderline | Borderline: ask clinician about methylmalonic acid |
| | Ferritin | < 30 ng/mL suggests iron deficiency; high values may reflect inflammation | Interpret with CRP and transferrin saturation |
| | Homocysteine | about 5-15 umol/L | Lowering it by supplement has not shown cardiovascular benefit |

## Severity ladder (user-facing)

| Step | Meaning | Action |
|---|---|---|
| Normal | Inside range | None; keep for trend |
| Watch | Slightly outside, plausible transient cause | Recheck under standard conditions in weeks to months |
| Mild | Clearly outside, no symptoms | Discuss at next routine visit; retest as advised |
| Moderate | Well outside or persistent across tests | Book a clinician appointment soon |
| Severe | Far outside, or any abnormal value with symptoms | Contact a clinician the same day; emergency care if red flags in SKILL.md section 3 |

Escalate one step when several related markers move together (for example raised ALT, AST and bilirubin) or the user is pregnant or has a relevant condition.

## Trend analysis (2+ reports)

- Compare like with like: same analyte, unit and, if possible, same lab and fasting state.
- Report absolute change, percent change and direction (up, down, flat) next to the earlier and latest value and the range.
- A small change inside the assay and day-to-day biological variation (often 5-15%, more for some enzymes and triglycerides) is not a trend; say "no meaningful change".
- Name a trend only with 3+ points or a large single move; state the period.
- Put the abnormal and the clearly changed markers first; do not bury them in a full table. End with what to bring to the clinician and which tests to repeat and when.

## Medicines and supplements that distort labs

- Biotin (high-dose) interferes with several immunoassays (thyroid hormones, troponin, some hormone tests): stop only as the clinician advises and tell the lab.
- Creatine raises serum creatinine without kidney damage.
- Liver enzymes can rise with some herbal and high-dose products (green tea extract, kava, high-dose niacin, concentrated turmeric extracts), alcohol, acetaminophen overuse, and many drugs: always ask for the full list before interpreting.
- Statins, metformin, proton-pump inhibitors and some diuretics change B12, magnesium, sodium or potassium: mention the medicine when a value is off.

Do not map a lab abnormality to a supplement and dose. A low value (vitamin D, B12, iron) is a reason to see a clinician for cause and dose; the supplement rules are in `medications-and-reminders.md`.
