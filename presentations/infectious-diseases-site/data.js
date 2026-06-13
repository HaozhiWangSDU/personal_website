// Infectious Diseases Study Dashboard - Database
window.DISEASE_DATA = [
  {
    "disease": "Tuberculosis (TB)",
    "definition": "\"Tuberculosis is caused by mycobacterium tuberculosis\"; \"It is a chronic infectious diseases\"; it primarily affects the lungs but can involve other organs.",
    "pathogen": "bacteria",
    "transmission": [
      "respiratory"
    ],
    "pathogenesis": "Latent infection forms granuloma-contained dormant bacilli; active TB occurs when immunity decreases and bacilli proliferate and disseminate. Pathogenicity is linked to cell wall factors such as phospholipids, sulphatides, wax D, capsules and proteins.",
    "clinical": "Pulmonary warning signs: recurrent or persistent cough with phlegm, blood in sputum or hemoptysis, chronic low fever, wet rales/localized wheezing, inducements such as diabetes or immunocompromise, joint pain and erythema nodosum. Extrapulmonary TB: lymph-node swelling; bone/joint pain and swelling; tuberculous meningitis with headache, fever and stiff neck.",
    "diagnosis": "Diagnosis uses epidemiology/clinical data, radiographic examination, bacteriology, molecular biology, immune diagnosis and pathology. Smear is rapid but limited; culture is the gold standard; IGRA is more specific than TST for latent TB; TST cannot differentiate active and latent infection; NAAT can detect TB and rifampicin resistance.",
    "treatment": "Drug-sensitive/unknown pulmonary TB: `2HRZE/4HR` or `2HPMZ/2HPM`. Extrapulmonary TB: `2HRZE/10HR`; bone TB 18-24 months; AIDS with TB may extend 2-3 months. Treatment principles: early, combined, moderate, regular, full process.",
    "prevention": "Prevention slide lists vaccine, latent infection, new drug, early diagnosis; campus outbreaks require outbreak-handling principles.",
    "remarks": "Sources: pp. 86, 99, 101-103, 116, 135, 137. Exam file specifically mentions PPD interpretation and need for further examination."
  },
  {
    "disease": "Typhoid fever",
    "definition": "\"Typhoid fever is an acute intestinal infection associated with fever caused by Salmonella typhi.\"",
    "pathogen": "bacteria",
    "transmission": [
      "gastrointestinal"
    ],
    "pathogenesis": "Ingestion -> mesenteric lymphatics -> thoracic duct -> bloodstream -> spleen, kidney, intestine and other organs -> terminal ileum -> excretion in stool/urine. Bacterial count, virulence and host resistance matter; typhoid cells and typhoid nodules/granulomas are noted.",
    "clinical": "Typical features: persistent fever, poor expression/apathy, relatively slow pulse, rose rash, hepatosplenomegaly, leukopenia. Initial stage: step-ladder fever, malaise, fatigue, anorexia, headache, sore throat and cough. Climax: 39-40 C fever, anorexia, abdominal distension/pain, right lower quadrant tenderness, constipation or diarrhea; nervous symptoms include apathy, slow reaction, hypoacusis and toxic encephalopathy in severe cases. Rose spots appear days 7-14, pink 2-4 mm maculopapular, blanching, usually <10 lesions.",
    "diagnosis": "Diagnosis: epidemiological characteristics; clinical manifestation with fever >1 week, poor expression, relatively slow pulse, rose rash, hepatosplenomegaly and leukopenia; laboratory tests: blood and marrow. Widal: O antibody >=1:80, H/flagellar antibody >=1:160 or four-fold increase is more meaningful.",
    "treatment": "Antibiotics listed: ampicillin, compound SMZ-TMP, azithromycin, ciprofloxacin, fluoroquinolones, third-generation cephalosporins. Complication treatment: intestinal hemorrhage with bed rest, fasting, sedation, fluids, hemostasis, transfusion, surgery; perforation with decompression, anti-infection, surgery.",
    "prevention": "\"Control the source of infection; block transmission route; protect susceptible population.\"",
    "remarks": "Sources: pp. 153, 165, 168, 174-178, 181, 188, 190, 204, 213, 221-224. Past exams mention typhoid complications and laboratory diagnosis."
  },
  {
    "disease": "Bacillary dysentery (Shigellosis)",
    "definition": "\"Bacillary dysentery (shigellosis) is an intestinal infectious disease caused by Shigella bacteria.\"",
    "pathogen": "bacteria",
    "transmission": [
      "gastrointestinal"
    ],
    "pathogenesis": "Mainly fecal-oral. Endotoxin causes fever, toxic symptoms, vasoactive substances, septic shock, DIC, brain edema and vital-organ failure; exotoxin causes hemolytic uremic syndrome and hemorrhagic enteritis. No cross-immunity between groups/serotypes, so repeated infection may occur.",
    "clinical": "Main symptoms: abdominal pain, diarrhea, mucus and pus bloody stool, tenesmus, fever and systemic toxic symptoms. Common acute type: incubation 1-4 days, acute watery diarrhea then mucus/pus/blood after 1-2 days, >10 stools/day, abdominal pain and tenesmus, fever and malaise. Toxic type: shock form with pallor, increased pulse, decreased BP, cardiac/renal insufficiency, consciousness change, organ failure; encephalopathy form with cerebral edema, severe headache, frequent vomiting, coma, seizures, respiratory failure. Chronic disease lasts >2 months.",
    "diagnosis": "Fresh stool specimen for culture. Stool may show RBC and WBC >15/HPF. Blood routine may show leukocytosis with increased neutrophils; dehydration may raise hematocrit and disturb electrolytes. Physical findings: fever, left lower abdominal tenderness, normal/increased bowel sounds, possible dehydration.",
    "treatment": "Rest, light food, oral rehydration, IV fluids as needed, antipyretics, analgesics, antibiotics for 3-5 days after 48 h evaluation: quinolones (not children) or third-generation cephalosporin such as ceftriaxone. Toxic type: antipyretics/sedatives, fluid replacement, vasoactive drugs, mannitol/dexamethasone for cerebral edema, IV antibiotics.",
    "prevention": "No current vaccine against shigellae; sanitation and clean water; hand washing and personal hygiene. Return to work after symptoms disappear and stool culture is negative twice.",
    "remarks": "Sources: pp. 234-235, 242, 244, 248-251, 256-260. Past exams emphasize distinguishing bacillary dysentery from amoebic dysentery and toxic type rescue."
  },
  {
    "disease": "Cholera",
    "definition": "Acute cholera has sudden onset with severe diarrhea and frequent vomiting; typical diarrhea is painless and may be \"rice-water\" stool in the general diagnosis lecture.",
    "pathogen": "bacteria",
    "transmission": [
      "gastrointestinal"
    ],
    "pathogenesis": "Vibrio cholerae adheres to small-intestinal mucosa, multiplies rapidly and produces enterotoxin. Cholera enterotoxin induces bowel secretion via GM1 binding and adenylate cyclase activation, causing excessive secretion and diarrhea; water/electrolyte loss causes dehydration, acidosis and acid-base imbalance.",
    "clinical": "Typical: sudden severe diarrhea, frequent vomiting, dehydration, muscle cramps; severe cases can develop circulatory failure and acute renal failure. Clinical grading: mild <10 stools/day, moderate 10-20, severe >20; severe disease has irritability, inelastic skin, serious spasm, weak/absent pulse, SBP <70, urine <50 ml/day, adult dehydration >8-9%.",
    "diagnosis": "Confirmed if one of three: diarrhea with stool culture positive for Vibrio cholerae; in epidemic area typical symptoms with negative stool culture but serum antibody titer rises >4-fold; or mild diarrhea within 5 days before positive stool culture. Suspect if typical symptoms before pathogen testing, or exposure during epidemic with unexplained diarrhea.",
    "treatment": "Mainly rehydration plus antibacterial and symptomatic treatment. Rehydration: quick and sufficient; salt first, sugar later; quick first, slow later; correct acidosis; supply calcium/potassium. ORS is based on preserved glucose absorption. Antibiotics shorten duration and volume of diarrhea: doxycycline or fluoroquinolones, 3-5 days; chronic carriers 7-14 days.",
    "prevention": "Prevent through control of fecal-water-food contamination; the general infectious disease slides stress Class A management.",
    "remarks": "Sources: pp. 267, 270-274, 280-281, 286, 288, 290-293, 298-302. Past exams mention most effective way to block cholera spread and IV rehydration."
  },
  {
    "disease": "Plague",
    "definition": "\"Plague is a highly contagious infectious disease mainly transmitted by rat fleas\"; a naturally endemic disease in wild rodents; includes bubonic, pneumonic and septicemic plague. Class A infectious disease and international quarantinable disease.",
    "pathogen": "bacteria",
    "transmission": [
      "zoonotic"
    ],
    "pathogenesis": "Pathogenic substances: F1 antigen, V/W antigen, endotoxin and mouse toxin. Bacteria are engulfed by monocytes in draining lymph nodes but are not killed; they multiply and spread via blood/lymphatics, causing hemorrhagic necrotic inflammation; bacteria/endotoxin entering blood cause pneumonic or septicemic plague.",
    "clinical": "Clinical types: bubonic, pneumonic, bacteremic/septicemic, mild and other types. Bubonic: severe acute lymphadenitis, commonly inguinal/axillary/neck/submandibular, mostly unilateral; nodes rapidly become red, swollen, hot and painful. Pneumonic: acute respiratory infection with high fever, chest pain, hemoptysis, dyspnea/heart failure. Septicemic: most dangerous, high fever, shock, DIC, petechiae/ecchymoses, systemic toxic symptoms, CNS symptoms, death within hours to 2-3 days.",
    "diagnosis": "Slides state Class II highly pathogenic microorganism and \"special laboratory testing\"; F1 capsule antigen antibodies have protective effect and can be used for diagnosis.",
    "treatment": "Strict isolation and local treatment. Pathogen treatment principle: early, combined, adequate and sensitive antibiotics. Streptomycin is first choice; tetracycline and chloramphenicol may be used. Supportive care: fluids, cooling, blood/plasma; corticosteroids in severe poisoning; drain liquefied lymphadenitis if needed.",
    "prevention": "Rat and flea eradication, surveillance/control of rodent plague, epidemic reporting, strict isolation, disinfection/incineration of secretions/excreta, international/traffic quarantine, personal protection, prophylactic sulfadiazine or tetracycline, vaccination for epidemic-area/high-risk persons.",
    "remarks": "Sources: pp. 308, 318, 323, 327, 330, 332-342."
  },
  {
    "disease": "Viral hepatitis (A-E)",
    "definition": "\"Viral hepatitis is caused by many kinds of hepatotropic viruses, and a group of systemic infection characterized by liver damage\"; etiologic types A, B, C, D, E.",
    "pathogen": "virus",
    "transmission": [
      "gastrointestinal",
      "blood-borne"
    ],
    "pathogenesis": "Liver damage and complications include jaundice, bleeding, hepatic encephalopathy and hepatorenal syndrome. HAV pathogenesis is mouth -> intestine -> blood -> liver; hepatocyte injury is immunopathologic. Chronic infection is hepatitis virus infection over 6 months.",
    "clinical": "Similar manifestations: fatigue, poor appetite, aversion to oil, hepatomegaly, abnormal liver function; some jaundice; asymptomatic infection is common. Acute jaundiced hepatitis has pre-jaundice 5-7 days with dark-tea urine, fever, chills, weakness and poor appetite; jaundice period 2-6 weeks with deepening urine and skin/sclera yellowing; recovery 1-2 months. Chronic signs include strong-tea urine, spider nevus, hepatic palm, severe yellow skin/sclera and male breast development.",
    "diagnosis": "Diagnosis: epidemiology and route; clinical/imaging type; pathogenic markers. HAV anti-HAV IgM; HBV HBsAg or HBV DNA; HCV anti-HCV, HCV RNA or HCV Ag; HDV HDAg, HDV RNA, anti-HDV IgM/IgG; HEV anti-HEV IgM/IgG and HEV RNA. Liver biopsy helps diagnosis/differential diagnosis and is gold standard for lesion nature/degree; imaging includes ultrasound, CT, MRI, FibroScan/FibroTouch.",
    "treatment": "Chronic viral hepatitis goals: prevent decompensation, slow/prevent cirrhosis and liver cancer, prolong survival, improve quality of life and clear virus. Antiviral therapy is key for chronic hepatitis B and C. Liver failure requires comprehensive treatment at different times.",
    "prevention": "Isolate/treat acute patients until virus disappears; assess chronic carriers by replication indicators; screen blood donors/high-risk groups; exclude current infected persons from food/catering/childcare; manage HBV/HCV in childbearing/pregnancy. HAV/HEV: environmental and personal hygiene, feces/water management, food hygiene and utensil disinfection. HBV/HCV/HDV: avoid high-risk behavior, disinfection systems, disposable injection devices, blood-product management. Vaccines: HAV, HBV, HEV; HBIG for newborns of HBsAg-positive mothers and HBV exposure.",
    "remarks": "Sources: pp. 443, 445, 447-457, 470-477, 480, 512, 514-516. Past exams repeatedly mention acute jaundiced hepatitis clinical manifestations and diagnosis."
  },
  {
    "disease": "Epidemic cerebrospinal meningitis (Meningococcal meningitis)",
    "definition": "Acute CNS infection caused by meningococcus; ordinary, fulminant, mild and chronic types are taught. Source: patients and carriers; carriers are the main source.",
    "pathogen": "bacteria",
    "transmission": [
      "respiratory"
    ],
    "pathogenesis": "Meningococcus invades the nasopharynx; outcomes include asymptomatic carriage, upper-respiratory/nasopharyngeal infection, bacteremia, septicemia, CNS invasion and meningitis. Endotoxin causes vascular endothelial injury; pia/arachnoid congestion, bleeding, inflammation and edema occur.",
    "clinical": "Common type: prodromal low fever, sore throat, cough, stuffy nose; septicemic stage with sudden high fever, rigors, headache, lethargy and petechiae/purpura/ecchymosis; meningitis stage with severe headache, frequent vomiting, meningeal irritation, delirium, disturbance of consciousness and convulsions. Fulminant shock form: severe toxemia, extensive necrotizing purpura, refractory shock, DIC, often absent meningeal signs and normal CSF. Meningoencephalitis form: coma, intracranial hypertension, projectile vomiting, cerebral hernia, respiratory failure.",
    "diagnosis": "Diagnosis: winter/spring epidemiology; sudden high fever, severe headache, frequent vomiting, petechiae/ecchymosis and meningeal irritation; severe sepsis, brain damage, septic shock, delirium, convulsion, respiratory failure. Lab: high WBC with left shift; CSF purulent with high pressure, protein high, glucose/chloride low; smear or culture positive for meningococcus confirms.",
    "treatment": "Common type: penicillin first choice; third-generation cephalosporins such as cefotaxime/ceftriaxone; chloramphenicol rarely due to resistance/toxicity. Symptomatic: cooling/antipyretics, sedatives, mannitol for intracranial pressure. Fulminant: shock expansion, sodium bicarbonate, vasoactive drugs, heparin/fresh blood/plasma/vitamin K for DIC, effective antibiotics, corticosteroids <=3 days, respiratory support.",
    "prevention": "Isolate/treat patients until 3 days after symptoms disappear and generally >=7 days after onset; close contacts: 7-day medical observation and drug prophylaxis. Environmental sanitation, indoor ventilation, avoid crowded places. Group A polysaccharide vaccine protection rate about 90%.",
    "remarks": "Sources: pp. 529, 535-538, 540, 544, 548, 550-558, 562-566. Past exams ask diagnosis of \"流脑\" and fulminant type."
  },
  {
    "disease": "Japanese encephalitis / Epidemic encephalitis B",
    "definition": "Japanese encephalitis virus is a neurotropic virus infectious to various animals; spherical, single-stranded positive RNA.",
    "pathogen": "virus",
    "transmission": [
      "zoonotic"
    ],
    "pathogenesis": "Virus is neurotropic; clinical disease centers on brain parenchymal injury. Severe disease includes cerebral edema, brain hernia, intracranial hypertension and respiratory-center lesions.",
    "clinical": "Onset is rather sudden with fever; fever reaches 39-40 C within 1-2 days. Days 4-10: brain parenchymal injury; high fever >40 C for 7-10 days or up to 3 weeks; altered consciousness; convulsions/twitching in 40-60%; respiratory failure is the underlying cause of death. \"High fever, convulsion, RF are three serious symptoms.\" Other CNS signs: meningeal irritation, Babinski sign, altered reflexes, spastic paralysis, bulbar palsy, decerebrate rigidity.",
    "diagnosis": "Epidemiology: July-September, epidemic area, mosquito-bite history, children <10 years. Clinical: fever, headache, vomiting, altered consciousness, convulsion, respiratory failure; meningeal irritation/pathologic reflexes positive. Lab: increased WBC/neutrophils; CSF aseptic meningitis; specific IgM Ab positive. Specific IgM in blood or CSF appears 3-4 days after onset and peaks at week 2. Must perform lumbar puncture to exclude bacterial meningitis.",
    "treatment": "General therapy: ward care, diet/nutrition/hydration, nursing. Symptomatic: reduce room temperature, physical/drug cooling, subhibernation/dexamethasone for high fever; sedatives, airway maintenance, cooling and dehydration for convulsions; oxygen, reduce intracranial pressure, respiratory stimulants, intubation/tracheotomy and ventilator when needed. Recovery/sequelae: functional training, physiotherapy, massage, acupuncture, hyperbaric oxygen.",
    "prevention": "Manage infection source: isolate patients; environmental hygiene in pig farms, pigs in captivity, separate human/animal living areas, vaccinate young pigs. Cut transmission: eliminate mosquitoes and breeding sites; mosquito nets/repellents. Protect susceptible groups: vaccination with population protection rate 60-90%.",
    "remarks": "Sources: pp. 575, 581-584, 586-592, 596-609. Past exams ask JE diagnostic criteria and main death cause."
  },
  {
    "disease": "Hemorrhagic fever with renal syndrome (HFRS)",
    "definition": "\"HFRS is a zoonosis caused by Hantavirus\"; main manifestations are fever, shock, hemorrhage and acute renal dysfunction.",
    "pathogen": "virus",
    "transmission": [
      "zoonotic"
    ],
    "pathogenesis": "Hantavirus causes target-cell injury, vascular permeability increase, decreased effective circulating volume, microcirculatory disorder, hemoconcentration, DIC, edema/congestion/hemorrhage and organ injury. Hemorrhage is due to vessel-wall damage, platelet decrease/dysfunction, heparin-like substances and DIC.",
    "clinical": "Three major manifestations: fever/toxic symptoms; hyperemia, bleeding and extravasation; renal impairment. Five stages: febrile, hypotensive-shock, oliguric, polyuric, convalescent. Hypotensive-shock stage: days 3-7, tachycardia, pale face, BP <90 mmHg or shock <70 mmHg, DIC, cerebral edema, ARDS, acute renal failure. Oliguric stage: days 5-8, uremia, acidosis, major electrolyte/fluid/CNS abnormalities and pulmonary edema. Polyuric stage: days 9-14; convalescence lasts 1-3 months.",
    "diagnosis": "Presumptive diagnosis: exposure site/known rodents plus clinical features. Confirmed by virus isolation, specific IgM, RNA by RT-PCR, or four-fold antibody titer increase between acute and convalescent phases. Labs: WBC 15-30 x 10^9/L, platelet decrease, RBC/Hb increase; urine protein/RBC/casts; BUN/creatinine increased; acid-base/electrolyte imbalance.",
    "treatment": "Management: early diagnosis, early rest, early treatment, closest location. Febrile: ribavirin, anti-extravasation, prevent DIC. Hypotensive-shock: fluid resuscitation, correct acidosis, hormones/vasoactive drugs. Oliguric: stabilize water/electrolyte/acid-base, diuretics, catharsis/bloodletting, hemodialysis/peritoneal dialysis when indicated.",
    "prevention": "Avoid rodent exposure and contaminated urine/saliva aerosols; course emphasizes epidemic risk in sylvan/urban locations and agricultural/forestry workers.",
    "remarks": "Sources: pp. 637-638, 641, 643, 645, 647, 649, 654-672, 676, 678. Past exams mention \"three highs and one low\" and five stages."
  },
  {
    "disease": "Severe fever with thrombocytopenia syndrome (SFTS)",
    "definition": "\"SFTS is an emerging haemorrhagic fever\" first described in rural China; causative agent is SFTSV/Dabie bandavirus, a segmented negative-strand RNA virus.",
    "pathogen": "virus",
    "transmission": [
      "zoonotic"
    ],
    "pathogenesis": "Tick-borne infection; SFTSV circulates in an enzootic tick-vertebrate-tick cycle. Incubation 5-15 days. Critical stage involves multiple-organ dysfunction; viral load falls in survivors but remains high in deaths.",
    "clinical": "Fever stage: sudden fever 38-41 C for 5-11 days, headache, fatigue, myalgia, appetite loss, nausea, vomiting, diarrhea; thrombocytopenia, leukocytopenia and lymphadenopathy. Critical/MOD stage: influenza-like and gastrointestinal symptoms, hemorrhagic and neurological symptoms, DIC, multiple-organ failure and sustained thrombocytopenia. Convalescence begins about 11-19 days after onset. Complications include secondary bacterial/fungal infection, encephalitis/infectious toxic encephalopathy, DIC and hemophagocytic syndrome.",
    "diagnosis": "Clinical case: acute fever plus epidemiological exposure in endemic season/region or tick exposure within 2 weeks, plus thrombocytopenia and leukocytopenia. Confirmed by positive SFTSV culture, SFTSV RNA, SFTSV-specific IgM, or four-fold SFTSV-specific IgG increase. RT-PCR is specific, sensitive and rapid.",
    "treatment": "No proven specific antiviral therapy; recovery mainly depends on supportive care. Treatments used include antiviral agents, steroids, IVIG, TPE. Favipiravir benefit was observed only in selected early/low-load groups; supportive care includes transfusion, antipyretics and gastrointestinal drugs.",
    "prevention": "No vaccine. Avoid tick bites; gloves/protective clothing for viraemic blood/tissue; isolate SFTS patients; disinfect contaminated surfaces; oral ribavirin prophylaxis or human monoclonal antibody can be offered after high-risk blood exposure.",
    "remarks": "Sources: pp. 687-688, 692-695, 699-701, 714-718, 720, 723-726."
  },
  {
    "disease": "AIDS / HIV infection",
    "definition": "HIV is the virus that causes AIDS; AIDS limits the body's ability to fight infection due to markedly reduced helper T cells. CD4 <200 cells/mcL or CD4% <14% in HIV-positive persons is AIDS.",
    "pathogen": "virus",
    "transmission": [
      "blood-borne"
    ],
    "pathogenesis": "gp120 binds CD4 on T4 cells with co-receptors CCR5/CXCR4; virus multiplies in T4 cells -> cell-mediated immunodeficiency -> opportunistic infections/tumors -> death. CD4 loss is due to direct/indirect killing, syncytium formation, CTL/NK/ADCC effects, apoptosis, reduced production and dysfunction.",
    "clinical": "Stage 1 primary infection: short flu-like or mononucleosis-like illness 2-4 weeks after infection, fever/sore throat, infectious. Stage 2 asymptomatic latency: average 6-8 years, swollen glands possible, antibodies detectable, CD4 drops. Stage 3 AIDS: CD4 <200, prolonged fever, weight loss >10%, diarrhea, cough, headache, dementia, lymphadenopathy; opportunistic infections and malignancies including PCP, TB/NTM, recurrent bacterial pneumonia, CMV, toxoplasmosis, Kaposi sarcoma/lymphoma.",
    "diagnosis": "Before seroconversion, diagnose primary HIV by HIV RNA or p24 antigen. Adults/adolescents/children >18 months: positive HIV antibody screening plus positive supplementary test (antibody supplement, qualitative NAAT, or nucleic acid quantity >5000 copies/ml), or positive HIV isolation. Children <=18 months have separate virologic criteria.",
    "treatment": "Begin ART as soon as possible after diagnosis. Watch drug resistance, side effects, compliance and IRIS.",
    "prevention": "Prevention: condoms, patient/partner education, safe injection, avoid drugs/alcohol, PrEP, PEP, treatment as prevention, STI detection/treatment, behavior and biomedical interventions. Occupational and non-occupational exposure pathways defined; PEP reduces infection risk in animal-study meta-analysis.",
    "remarks": "Sources: pp. 746, 752, 757-760, 786-787, 793, 797-804, 812-820, 840-842, 850, 857, 860-865. Past exams ask HIV pathogenesis, clinical stages and envelope proteins."
  },
  {
    "disease": "Hand, foot and mouth disease (HFMD)",
    "definition": "\"HFMD is an infectious disease caused by enteroviruses\"; common in infants and young children under 10, especially under 3.",
    "pathogen": "virus",
    "transmission": [
      "gastrointestinal"
    ],
    "pathogenesis": "Enterovirus infection with inflammatory changes in medulla oblongata and spinal cord gray matter in severe cases. EV71 is emphasized in pathogen testing.",
    "clinical": "Typical: fever, rash, blisters and ulcers on hands, feet, mouth and other areas. Incubation 2-10 days, mean 3-5. Common cases: fever around 38 C, hand/foot/mouth/buttock lesions, flat or convex papules/herpes not itchy, blisters/rashes subside within a week and leave no scar. Severe cases: encephalitis, encephalomyelitis, meningitis, pulmonary edema, circulatory failure; neurologic signs include poor mental state, drowsiness, headache, vomiting, tremor, weakness/paralysis, convulsions, coma, brain edema/herniation.",
    "diagnosis": "Pathogen examination: specific EV71 nucleic acid positivity or EV71 isolation; CoxA16 and EV71 antibodies positive; enterovirus type identification mainly relies on serum neutralization. Differential diagnosis: chickenpox, measles, rubella, roseola; severe cases vs JE, purulent meningitis, TB meningitis.",
    "treatment": "Ordinary HFMD/herpetic pharyngitis: isolation, avoid cross infection, rest, light diet, oral/skin care, symptomatic treatment for fever/vomiting/diarrhea, antiviral drugs such as ribavirin can be selected. Neurologic involvement: control intracranial pressure, IVIG, corticosteroids as appropriate, cooling/sedation. Cardiopulmonary failure: airway/oxygen/ventilation, limited fluids, vasoactive drugs, organ support, antibiotics for secondary pulmonary bacterial infection.",
    "prevention": "Wash hands, eat cooked food, drink clean water, exercise, open-window ventilation, avoid crowded places. EV71 vaccine has been used clinically.",
    "remarks": "Sources: pp. 884, 890, 893, 897, 900-905, 910, 918, 920, 922-928."
  },
  {
    "disease": "Measles",
    "definition": "\"Acute respiratory infectious disease caused by measles virus.\"",
    "pathogen": "virus",
    "transmission": [
      "respiratory"
    ],
    "pathogenesis": "Virus enters respiratory epithelium -> regional lymph nodes -> first viremia -> monocytes/macrophages -> second viremia -> respiratory tract, conjunctiva, skin. Warthin-Finkeldey giant cells are pathognomonic.",
    "clinical": "Clinical features: fever, cough, runny nose/coryza, conjunctivitis, exanthem; specific sign: Koplik spots. Prodrome 3-4 days with fever, cough, coryza, conjunctivitis and Koplik spots. Exanthem stage 3-5 days: maculopapular rash 2-3 mm, abrupt fever rise, more severe catarrh, lymph-node enlargement, slight splenomegaly, diarrhea/vomiting. Rash starts upper lateral neck, behind ears, hairline and posterior cheek, spreads rapidly to face/neck/upper arms/chest. Recovery: branny desquamation and brownish hyperpigmentation.",
    "diagnosis": "Diagnosis uses epidemiologic, clinical and laboratory data. Clinical: prodrome, exanthem, convalescence; Koplik spots; typical rash with correlation of rash and fever/catarrh. Lab: low WBC with relative lymphocytosis, serum specific IgM/IgG, virus isolation, viral antigen detection and nucleic acid testing.",
    "treatment": "Antipyretics for fever, bed rest, adequate fluids, good nutrition and vitamin A, warm room, protect from strong light, appropriate antibiotic therapy, traditional Chinese medicine with antiviral effects.",
    "prevention": "Control source, interrupt transmission, protect susceptible people through passive and active immunization.",
    "remarks": "Sources: pp. 932, 938, 941, 943, 947, 950-956, 957, 959, 961-965, 969-971. Past exams ask rash timing/order and isolation time."
  },
  {
    "disease": "Varicella / Herpes zoster (VZV)",
    "definition": "\"Acute infectious disease caused by Varicella-zoster virus, VZV\"; lecture also covers herpes zoster.",
    "pathogen": "virus",
    "transmission": [
      "respiratory"
    ],
    "pathogenesis": "VZV infects respiratory epithelium -> regional lymph nodes -> first viremia -> monocytes/macrophages -> second viremia -> whole-body skin. VZV can enter sensory nerves and dorsal-root ganglia as latent infection; herpes zoster occurs from reactivation.",
    "clinical": "Chickenpox extraction has limited text for typical rash pages; the lecture states clinical manifestations include typical and atypical forms. Herpes zoster: unilateral vesicular eruption within a dermatome; dermatome pain may precede rash by 48-72 h, commonly T3-L3. Atypical varicella: hemorrhagic in immunocompromised patients, neonates/infants, steroid use and pregnancy; gangrenous varicella. Complications: secondary bacterial infection, pneumonia in adults, encephalitis with nuchal rigidity, altered consciousness and seizures, Reye syndrome.",
    "diagnosis": "Diagnosis uses epidemiologic, clinical and laboratory data. Labs: WBC normal/slightly elevated; multinucleated giant cells or nuclear inclusion bodies in vesicle base; serum specific IgM; virus isolation/inoculation; PCR.",
    "treatment": "General/symptomatic: rest and nutrition, intensive care, clean skin and avoid scratching, diphenhydramine for itching. Specific: VZIG; antivirals including acyclovir, vidarabine and interferon.",
    "prevention": "Control source, interrupt transmission, protect susceptible people through passive and active immunization.",
    "remarks": "Sources: pp. 975, 981, 984, 992-993, 995, 997-1002, 1004, 1006-1009. Typical rash pages were partly image-based and not fully extractable; no extra morphology was added beyond extracted text."
  },
  {
    "disease": "Influenza / seasonal influenza A",
    "definition": "Influenza is a contagious respiratory disease caused by influenza virus. Influenza A includes H1N1/H3N2 in seasonal human strains; H5N1/H7N9 are major threats to human health.",
    "pathogen": "virus",
    "transmission": [
      "respiratory"
    ],
    "pathogenesis": "Endothelial cells amplify cytokine signaling during influenza virus infection; frequent mutation permits repeated infection.",
    "clinical": "Clinical types: simple, gastrointestinal, pneumonia and toxic. Common type has flu-like symptoms without lung/extrapulmonary involvement. Severe: continuous high fever >3 days with severe cough, purulent/bloody sputum or chest pain; tachypnea/dyspnea/cyanosis; mental changes; severe vomiting/diarrhea/dehydration; pneumonia; worsening underlying disease. Critical: progressive respiratory failure requiring mechanical ventilation, shock, acute necrotizing encephalopathy, multiple organ dysfunction.",
    "diagnosis": "Diagnostic principle: non-specific presentation requires emergency diagnosis based on epidemiological history and pathogen testing. Pathogen detection: virus isolation is one gold standard but takes 10-14 days; nucleic acid test gives results in 4-6 h and is main clinical/epidemiologic method; antigen test is fast but sensitivity varies; serology is retrospective and not useful for early diagnosis.",
    "treatment": "Antivirals: neuraminidase inhibitors oseltamivir, zanamivir, peramivir; hemagglutinin inhibitor arbidol; RNA polymerase inhibitors baloxavir marboxil and favipiravir. Severe/high-risk patients should receive empirical antiviral treatment ASAP. Treatment within 48 h reduces complications, mortality and hospital stay; severe cases >48 h can still benefit. Course usually 5-7 days, extend to 10-14 days in severe/replicating/immunosuppressed cases.",
    "prevention": "Vaccination is the most effective and cost-effective way to prevent influenza. High-risk groups, healthcare workers and caregivers should receive vaccine once a year in autumn.",
    "remarks": "Sources: pp. 1025, 1030-1031, 1037-1045, 1048, 1050-1054."
  },
  {
    "disease": "Human avian influenza (HPAI, H5N1/H7N9 emphasized)",
    "definition": "Covered in the influenza lecture as influenza A threats to human health, especially H5N1 and H7N9.",
    "pathogen": "virus",
    "transmission": [
      "respiratory"
    ],
    "pathogenesis": "Slides emphasize genetic recombination with human influenza virus and progressive accumulation of mutations for H5N1 adaptation.",
    "clinical": "H5N1 patients have relatively poor prognosis; H9N2/H7N7 mostly better prognosis; H7N9 has few mild cases, while severe cases have poor treatment outcomes and high mortality. H5N1/H7N9 pulmonary imaging: diffuse infiltrating shadows in both lungs; severe cases may show \"white lung\" changes.",
    "diagnosis": "Slides list diagnostic categories: suspected case, clinical diagnosis cases, confirmed cases; pathogen testing principles are shared with influenza virus diagnosis (nucleic acid testing, virus isolation, antigen/serology).",
    "treatment": "Treatment is under the influenza treatment section: early antiviral treatment with NAI/RNA-polymerase inhibitor options and supportive/antimicrobial treatment when needed.",
    "prevention": "Prevention heading is present; influenza vaccination and respiratory infection control are covered generally, but no avian-specific prevention details were extractable in this block.",
    "remarks": "Sources: pp. 1025, 1041, 1050-1054, 1057-1063. Separate row because course schedule lists \"甲流、禽流感、新冠肺炎\"."
  },
  {
    "disease": "Novel coronavirus infection (COVID-19)",
    "definition": "Novel coronavirus infection due to beta-genus coronavirus, enveloped round/oval virus with N, E, M, S and RdRp genes.",
    "pathogen": "virus",
    "transmission": [
      "respiratory"
    ],
    "pathogenesis": "SARS-CoV-2 spike protein binds ACE2; TMPRSS2 promotes uptake by cleaving ACE2 and activating S protein. Early high viral copies in lower respiratory tract; infected cells/alveolar macrophages release inflammatory signals; late pulmonary edema and hyaline membrane formation are compatible with early ARDS.",
    "clinical": "Incubation 2-4 days. Fever, dry throat, sore throat, cough, diminished/lost smell and taste. Severe patients develop dyspnea/hypoxemia 5-7 days after onset and may rapidly progress to ARDS, septic shock, refractory metabolic acidosis, coagulation dysfunction and organ failure. Children may have mild/atypical vomiting, diarrhea, poor response or shortness of breath.",
    "diagnosis": "Diagnosis principle: epidemiological history + clinical manifestations + laboratory examination. Positive nucleic acid test is primary criterion. Diagnostic tests include COVID-19 nucleic acid positive, antigen positive, isolation/culture positive, or convalescent specific IgG >=4-fold higher than acute phase.",
    "treatment": "General treatment: respiratory infectious disease isolation, adequate nutrition, water/electrolyte balance, antipyretics, antitussive/expectorant drugs, monitoring high-risk patients, lab/chest imaging tests, oxygen therapy, avoid blind antimicrobial use, treat underlying disease. Severe/critical: prevent/treat complications, basic diseases and secondary infection, organ support, respiratory/circulatory support, renal replacement, nutrition.",
    "prevention": "Healthcare-facility infection control: pre-examination/triage, hand hygiene, respiratory hygiene and cough etiquette, masks for respiratory symptoms, ventilation, surface cleaning/disinfection, standard precautions/PPE, medical waste disposal and terminal disinfection.",
    "remarks": "Sources: pp. 1066-1071, 1074-1081, 1084-1089, 1093. Past exams mention severe/critical high-risk criteria and drugs."
  },
  {
    "disease": "Rabies",
    "definition": "\"Rabies (hydrophobia) is a zoonotic disease caused by Rabies virus\"; transmitted mainly via saliva through bites/scratches. Case-fatality rate is almost 100%.",
    "pathogen": "virus",
    "transmission": [
      "zoonotic"
    ],
    "pathogenesis": "Virus is inoculated mainly through bite -> multiplies/penetrates local nerve endings -> spreads axonally to CNS -> spreads within brain; later reaches secretory/excretory glands and saliva. Pathology is acute diffuse encephalomyelitis; Negri bodies have diagnostic significance.",
    "clinical": "Clinical manifestations are manic and paralytic. Prodromal 2-4 days: low fever, burnout, headache, nausea, cold-like discomfort, irritability, insomnia, sensitivity to sound/light/wind and throat contraction; meaningful early symptom is itching, pain, numbness or strange sensation in healed wound (50-80%). Excitement 1-3 days: high excitement, hydrophobia, aerophobia, 38-40 C fever. Paralysis: systemic flaccid paralysis, coma, death from respiratory/circulatory failure.",
    "diagnosis": "Diagnosis: epidemiologic data, clinical data, laboratory data; viral antigen, viral nucleic acid, or Negri body in necropsy brain tissue. Etiologic exam: virus isolation, brain tissue Negri body, RT-PCR for rabies virus nucleic acid.",
    "treatment": "Human rabies management: separate quiet breeze-free area, monitoring, symptomatic comprehensive treatment, avoid invasive procedures, emotional/physical support. Animal exposure management: wound management, PEP, rabies immune globulin, tetanus prophylaxis, antibiotics.",
    "prevention": "PEP and biologics: rabies vaccines induce neutralizing antibodies; active antibody response takes about 7-10 days. RIG provides passive immunization; HRIG 20 IU/kg, ERIG 40 IU/kg with test dose.",
    "remarks": "Sources: pp. 1100, 1110, 1113-1117, 1120-1128, 1130, 1132-1140, 1147-1150. Past exams ask dog-bite handling and onset factors."
  },
  {
    "disease": "Brucellosis",
    "definition": "Brucellosis, Malta fever or undulant fever is an acute or chronic zoonotic infectious disease caused by Brucella; Class B infectious disease.",
    "pathogen": "bacteria",
    "transmission": [
      "zoonotic"
    ],
    "pathogenesis": "Main sources are sheep, cattle and pigs. Transmission by skin-mucosal contact, alimentary tract, or respiratory aerosols. Brucella reaches lymph nodes, then lymph/blood bacteremia, then liver/spleen/bone marrow monocyte-phagocyte system, forming multiple lesions.",
    "clinical": "Long-term fever, hyperhidrosis, arthralgia, hepatosplenomegaly and easy relapse/chronicity. Main symptoms: fever is most common; 5-20% typical cases show undulatory fever, fever course 2-3 weeks, intermittent days to 2 weeks, recurrent fever; symptoms worsen after heat retreat, a characteristic feature. Muscle/joint pain, migratory macroarthralgia, spinal/lumbar involvement, pain/deformity/dysfunction; appetite loss, weight loss, headache, rash, testicular pain, depression.",
    "diagnosis": "Diagnostic criteria: suspected case = epidemiological history + clinical presentation; clinically diagnosed = suspected + any positive serologic preliminary test; confirmed = suspected/clinical + any positive etiologic or serologic confirmatory test; inapparent infection = epidemiology + confirmatory criteria without manifestations. Lab techniques include isolation culture, RBT, SAT, ELISA IgG/IgM, Coombs.",
    "treatment": "Principle: early, combined, adequate/full course; extend if needed to prevent relapse/chronicity. Common drugs: doxycycline, rifampicin, quinolones, sulfonamides, aminoglycosides, third-generation cephalosporins. First-line acute regimen includes doxycycline 0.1 bid 6 w + rifampicin 0.6-0.9 qd 6 w; alternatives include doxycycline + streptomycin. Complications require longer/triple therapy.",
    "prevention": "Health education, food safety, occupational protection, monitoring, case management/pathogen treatment, animal epidemic control.",
    "remarks": "Sources: pp. 1157, 1169-1173, 1176, 1178, 1187-1194, 1196, 1198, 1200-1201. Past exams mention brucellosis examination methods."
  },
  {
    "disease": "Sepsis / septic shock (Infectious shock; syndrome, not one pathogen disease)",
    "definition": "Sepsis is a complex syndrome caused by dysregulated host response to infection, often with acute organ dysfunction and high mortality risk. Septic shock = sepsis + shock.",
    "pathogen": "syndrome",
    "transmission": [
      "syndromic"
    ],
    "pathogenesis": "Shock is life-threatening acute circulatory failure due to insufficient oxygen delivery or cellular oxygen-utilization disorder. Risk factors include extremes of age, immunosuppression, epidemics, cancer, diabetes, alcohol use, indwelling catheters and skin barrier injury.",
    "clinical": "Clinical manifestations page lists qSOFA and organ signs: brain altered consciousness, skin mottled/cold/filling disorder, heart tachycardia, kidney oliguria/anuria, respiratory tachypnea/difficulty, metabolic lactate increase.",
    "diagnosis": "Sepsis 3.0: infection + SOFA >=2. qSOFA: two or more of respiratory rate >=22/min, altered mentation, systolic BP <=100 mmHg. Earlier SIRS criteria: temperature >38 or <36 C, HR >90/min, RR >20/min or PaCO2 <32 mmHg, WBC >12000 or <4000 or >10% bands.",
    "treatment": "Antimicrobial therapy is central for bacterial/fungal infections and some parasitic/viral infections; assess MRSA/MDR risk. Fluid resuscitation: crystalloids preferred for initial and subsequent intravascular volume replacement; balanced crystalloids or normal saline may be used; add albumin when large amounts of crystalloids are needed; HES is strongly not recommended.",
    "prevention": "Prevention is not a single vaccine/control measure; focus is early detection, infection-source control, antimicrobial stewardship and prevention of healthcare-associated infection.",
    "remarks": "Sources: pp. 1272, 1279-1280, 1288-1291, 1305-1306, 1313-1322, 1330-1331. Included because the course schedule has a separate infectious-shock lecture."
  }
];
