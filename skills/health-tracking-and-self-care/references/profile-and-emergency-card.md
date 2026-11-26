# Profile, Emergency Card, Screening, Activity, Nutrition, Mental Health

## Profile intake template
Ask in short groups; each field optional; store only what is needed.
1. Basics: age, sex (and pregnancy status if relevant), height, weight (compute BMI, label as screening only).
2. Safety: allergies and reaction type, chronic conditions, past surgeries, current medications/supplements (see `medications-and-reminders.md`).
3. Contacts: emergency contact (name, relationship, phone), regular doctor, insurer and policy number, blood type if known.
4. Goals and baseline: activity level, sleep, diet pattern, tobacco/alcohol use (ask without judgment).
5. Family history: heart disease, stroke, diabetes, cancers, and age at diagnosis in first-degree relatives (moves screening dates).
6. Devices: pacemaker, insulin pump, implants.
Ask for country or region only when it matters (emergency numbers, screening norms, vaccines). Start giving useful general answers before the profile is complete; any baseline in a red-flag range gets escalation advice before goal setting.
Confirm back a short summary and ask what to correct. Offer export (CSV/JSON) and deletion on request.

## Baseline, goals, and tracking log
- Baseline with context: BP (seated, 2 readings), resting HR, weight, fasting glucose if relevant, waist circumference if relevant.
- Goals as behaviors first (walk 30 min on 5 days, in bed by a set time), outcomes second (BP trend); realistic increments; revisit monthly.
- Log entry: metric, value, unit, date/time, context (fasting, after exercise, morning/evening, arm, device), notes/symptoms.
- Show 7-day and 30-day averages and min/max rather than single values; flag direction and persistence ("above 130/80 on 5 of 7 days"), not diagnoses.
- Separate absolute alerts (crisis-range BP, SpO2 below 90%, which prompt immediate advice) from trend nudges ("discuss at your next visit").
- Let the user export readings and medicines as a summary for their clinician.

## Emergency card (printable or phone lock-screen)
```
Name / DOB:
Blood type:            Allergies (with reaction):
Conditions:
Medications (name, dose, schedule):
Implants/devices:      Organ donor / care directives:
Emergency contact(s) (name, phone, relationship):
Doctor (name, phone):  Insurance (provider, policy no.):
Date last updated:
```
Review every 6 months and after any medication change.

## Screening schedules (summary; varies by country, guideline body, and personal risk)
Tell the user these are common reference points, and that family history, smoking, and existing conditions move the dates. Defer to local guidance.

| Group | Common reference |
|---|---|
| Adults 18+ | Blood pressure checked at least every 1-2 years (yearly if elevated); vaccinations kept current; mental-health and substance-use check at routine visits |
| Cholesterol | Start in adulthood per local guidance (starting ages range from about 20 to 40 by country and risk factors); repeat every few years (often about 5) if normal |
| Diabetes | Fasting glucose or HbA1c from about 35-45, every 3 years if normal; earlier with overweight and risk factors |
| Cervical | Programs usually start between ages 21 and 25 and continue to about 65; test type (cytology, HPV test, or both) and interval (3-5 years) vary by country |
| Breast | Mammography guidance differs: one major US panel advises every 2 years for ages 40-74; another advises annually from 45 (option from 40) and every 2 years from 55. Present both and defer to local program |
| Colorectal | Start at 45 for average risk (earlier with family history); options include stool tests and colonoscopy |
| Prostate | Informed discussion with a clinician from about 50 (earlier with risk factors) |
| Bone density | Women 65+, men 70+ (earlier with risk factors) |
| Abdominal aortic aneurysm | One-time ultrasound for men 65-75 who ever smoked |
| Lung | Annual low-dose CT only for older heavy smokers per local criteria |

## Physical activity (adults, general)
- Adults: 150 min/week moderate or 75 min/week vigorous aerobic activity, plus muscle-strengthening on 2+ days; add balance work for 40+ to reduce fall risk.
- Older adults 60+: same aerobic target spread through the week, strength 2x/week, balance 3x/week; start low and progress gradually.
- Children and teens: 60+ min/day moderate to vigorous; muscle- and bone-strengthening 3 days/week; limit sedentary screen time.
- Beginners: 10-minute walks, chair exercises, water aerobics, dancing; add 5 minutes per week.
- Conditions (clearance from the care team first for any new program with a cardiac, respiratory, or metabolic condition):
  - High BP: walking, swimming, cycling; resistance training is beneficial with moderate loads and steady breathing (avoid breath-holding and maximal lifts); include a cool-down.
  - Diabetes: see `vitals-and-reference-ranges.md` for glucose checks and carbohydrate on hand.
  - Arthritis: swimming, stationary bike, gentle yoga; limit high-impact work.
  - Heart disease: supervised cardiac rehabilitation, gradual progression, heart-rate monitoring.
- Stop and seek care for chest pain, severe breathlessness, dizziness, fainting, or sudden joint pain.

## Nutrition (general)
- High BP: DASH-style pattern (vegetables, fruit, legumes, whole grains, low-fat dairy), limit alcohol, reduce sodium. Targets vary: many guidelines use under 2,300 mg/day for the population and about 1,500 mg/day as an ideal for people with hypertension; present 1,500 as an aim, not a rule.
- Diabetes: consistent carbohydrate across meals, high fiber, limit sugary drinks and refined carbohydrate, regular meals; individualized plan with a dietitian.
- High cholesterol: less saturated and trans fat, more soluble fiber (oats, legumes), fish or omega-3 sources, plant sterols.
- Older adults: protein about 1.0-1.2 g/kg/day unless kidney disease, vitamin D, calcium, B12 attention, small frequent meals, hydration (thirst weakens with age).
- Weight management: protein and fiber for satiety, limit added sugar and liquid calories, steady 0.25-1 kg per week at most; avoid crash diets; refer eating-disorder warning signs (rigid restriction, bingeing/purging, preoccupation) to professional care.

## Mental health basics
- Depression screen (for structured screening scales, session structure and crisis protocol see the `cbt-and-therapeutic-support` skill): low mood or loss of interest on most days for 2+ weeks plus sleep or appetite change, fatigue, poor concentration, worthlessness, or thoughts of death. Any self-harm or suicidal thoughts: respond with care, ask directly, advise immediate contact with local crisis services or the emergency number, and encourage involving a trusted person. Do not leave the person to cope alone in the conversation.
- Anxiety: ordinary anxiety is proportionate and passes; consider an anxiety disorder when worry is excessive or lacks a clear trigger, lasts about 6 months, and impairs work, study, or relationships. Coping: slow diaphragmatic breathing (long exhale), regular exercise, sleep routine, caffeine and alcohol reduction, grounding and mindfulness, cognitive reframing. Specific breathing patterns such as 4-7-8 are optional relaxation aids with limited trial evidence, not treatments.
- By life stage: adolescents (watch for withdrawal, mood change, school refusal, screen overuse); postpartum (baby blues up to about 2 weeks vs postpartum depression, seek help if low mood persists or there are thoughts of harm); older adults (loneliness, cognitive change; depression is not normal aging).
- Who helps: primary-care clinician first; counselor or psychologist for talking therapies (CBT and others); psychiatrist when medication is considered.
