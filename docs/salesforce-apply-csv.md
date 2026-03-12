# Salesforce Apply CSV

## Current status

The website already supports the core flow described in the Salesforce email:

- the `apply` wizard collects user data
- the frontend builds a submission bundle
- the backend generates a CSV file
- the backend sends an email with that CSV attached to the Salesforce email service address

The current implementation lives in:

- `src/components/sections/request-appointment/wizard/salesforce-bundle.ts`
- `src/app/api/apply/submit/route.ts`
- `src/components/sections/request-appointment/wizard/steps/shared/ReviewSubmitStep.tsx`

## Transport details

- One email is sent per completed form submission.
- One CSV attachment is included per email.
- Attachment filename format:
  - `salesforce-lead-{flow}-{timestamp}.csv`
- Current email subject format:
  - `New Patient Lead - {flow} - {fullName}`
- Current provider:
  - `Resend`

## Environment variables

- `RESEND_API_KEY`
- `SALESFORCE_EMAIL`
- `EMAIL_FROM` (optional, defaults to `noreply@gmed-health.com`)

## CSV conventions

- Header order is fixed and must stay stable.
- Empty values are sent as empty strings.
- Boolean-like consent values are sent as string values: `true` / `false`.
- Choice fields are sent as raw internal values from the wizard, for example:
  - `eu_not_germany`
  - `not_sure`
  - `next_few_months`
- `DateOfBirth` is currently sent in `DD.MM.YYYY` format.
- `Services__c` is a semicolon-separated list.

## Sample file

See:

- `docs/salesforce-apply-sample.csv`

## Column mapping

| CSV column | Wizard source | Example | Notes |
| --- | --- | --- | --- |
| `FirstName` | `payload.firstName` | `Anna` | Required in normal flow |
| `MiddleName` | `payload.middleName` | `Maria` | Optional |
| `LastName` | `payload.lastName` | `Ivanova` | Required in normal flow |
| `Suffix` | `payload.suffix` | `` | Optional |
| `Email` | `payload.email` | `anna.ivanova@example.com` | Contact field |
| `Phone` | `payload.phones[0].number` | `+4917612345678` | Primary phone only |
| `PhoneType` | `payload.phones[0].type` | `mobile` | `mobile`, `home`, or `work` |
| `DateOfBirth` | `payload.dateOfBirth` | `14.09.1987` | Current format is `DD.MM.YYYY` |
| `LegalSex` | `payload.legalSex` | `female` | `female`, `male`, `diverse`, `no_entry` |
| `Street` | `payload.streetAddress` | `Hauptstrasse 12` | Address field |
| `City` | `payload.city` | `Munich` | Address field |
| `State` | `payload.state` | `BY` | Address field |
| `PostalCode` | `payload.zipCode` | `80331` | Address field |
| `Country` | `payload.country` | `DE` | Address field |
| `LeadSource` | constant | `Website Apply Form` | Hardcoded source label |
| `Description` | `payload.message` | `Need a second opinion on oncology treatment plan` | Final notes/message field |
| `LocationDetailed__c` | `payload.locationDetailed` | `eu_not_germany` | `germany`, `eu_not_germany`, `outside_eu` |
| `WantsMembership__c` | `payload.wantsMembership` | `yes` | `yes`, `no`, empty |
| `CanTravel__c` | `payload.canTravel` | `yes` | `yes`, `no`, empty |
| `HasMedicalRecords__c` | `payload.hasMedicalRecords` | `yes` | `yes`, `no`, `none`, empty |
| `RecordsInAcceptedLanguage__c` | `payload.recordsInAcceptedLanguage` | `yes` | `yes`, `no`, empty |
| `HasTravelDocuments__c` | `payload.hasTravelDocuments` | `yes` | `yes`, `no`, empty |
| `NeedsInterpreter__c` | `payload.needsInterpreter` | `no` | `yes`, `no`, empty |
| `PrimaryLanguage__c` | `payload.primaryLanguage` | `Russian` | Free text / selected language |
| `EmailConsent__c` | `payload.emailConsent` | `true` | Stringified boolean |
| `WhatsAppConsent__c` | `payload.whatsappConsent` | `true` | Stringified boolean |
| `WhatsAppNumber__c` | `payload.whatsappNumber` | `+4917612345678` | Empty if consent is false |
| `CurrentlyInTreatment__c` | `payload.currentlyInTreatment` | `no` | `yes`, `no`, empty |
| `HasHealthRiskForTravel__c` | `payload.hasHealthRiskForTravel` | `no` | `yes`, `no`, empty |
| `PrimaryConcernText__c` | `payload.primaryConcernText` | `Second opinion for oncology treatment` | Main medical concern |
| `AdditionalConcerns__c` | `payload.additionalConcerns` | `Need help arranging follow-up diagnostics` | Optional |
| `Services__c` | `payload.services.join(";")` | `concierge;medical-transport` | Semicolon-separated |
| `HasInsurance__c` | `payload.hasInsurance` | `yes` | `yes`, `no`, empty |
| `InsuranceCoversGermany__c` | `payload.insuranceCoversGermany` | `not_sure` | `yes`, `no`, `not_sure`, empty |
| `PreferredLocation__c` | `payload.preferredLocation` | `munich` | `no_preference`, `munich`, `berlin`, `hamburg`, `cologne`, empty |
| `VisitTiming__c` | `payload.visitTiming` | `next_few_months` | `asap`, `next_few_months`, `not_sure`, empty |
| `ConsentAutomatedContact__c` | `payload.consentAutomatedContact` | `true` | Stringified boolean |
| `ConsentHealthcare__c` | `payload.consentHealthcare` | `true` | Stringified boolean |
| `ConsentOptOut__c` | `payload.consentOptOut` | `true` | Stringified boolean |
| `ConsentPrivacyPractices__c` | `payload.consentPrivacyPractices` | `true` | Stringified boolean |
| `Flow` | `bundle.flow` | `eu` | `eu` or `outside-eu` |
| `SubmittedAt` | `bundle.submittedAt` | `2026-03-12T12:00:00.000Z` | ISO timestamp |
| `Locale` | `bundle.locale` | `ru` | Locale active during submission |

## Open points to align with Salesforce

- Confirm whether these column names match their exact Salesforce field API names.
- Confirm whether `DateOfBirth` must stay `DD.MM.YYYY` or should be changed to ISO `YYYY-MM-DD`.
- Confirm whether values like `yes` / `no` / `not_sure` should stay as-is or be normalized to Salesforce-specific picklist values.
- Confirm whether they want one CSV row per email, or if batching is expected in the future.
- Confirm whether they need extra metadata such as UTM tags, referral source, or submission ID.
