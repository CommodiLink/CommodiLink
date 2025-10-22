// pages/register.js
import { useState, useMemo } from "react";

const BRAND_BLUE = "#0A2A8F";

const initial = {
  // Step 1 — Account
  firstName: "",
  lastName: "",
  workEmail: "",
  password: "",
  confirmPassword: "",
  // Step 2 — Company
  companyName: "",
  legalName: "",
  country: "",
  address1: "",
  address2: "",
  city: "",
  state: "",
  postalCode: "",
  sector: "",
  website: "",
  // Step 3 — Compliance (KYB/KYC)
  registrationNumber: "",
  incorporationDate: "",
  uboName: "",
  uboOwnership: "",
  sanctionsCheckConsent: false,
  pepCheckConsent: false,
  // Step 4 — Contacts
  phone: "",
  jobTitle: "",
  complianceEmail: "",
  // Step 5 — Documents (file inputs)
  file_idPassport: null,
  file_proofOfAddress: null,
  file_companyReg: null,
  file_uboStructure: null,
  file_bankLetter: null,
  // Step 6 — Policies
  acceptTerms: false,
  acceptPrivacy: false,
  marketingOptIn: false,
};

const steps = [
  "Account",
  "Company",
  "Compliance",
  "Contacts",
  "Documents",
  "Review & Submit",
];

export default function Register() {
  const [data, setData] = useState(initial);
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState("");

  const update = (patch) => setData((d) => ({ ...d, ...patch }));
  const onChange = (e) => update({ [e.target.name]: e.target.value });
  const onCheck = (e) => update({ [e.target.name]: e.target.checked });
  const onFile = (e) => update({ [e.target.name]: e.target.files?.[0] ?? null });

  const validators = useMemo(
    () => ({
      0: () => {
        const errs = {};
        if (!/^[A-Za-z ,.'-]{2,}$/.test(data.firstName)) errs.firstName = "Enter a valid first name";
        if (!/^[A-Za-z ,.'-]{2,}$/.test(data.lastName)) errs.lastName = "Enter a valid last name";
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.workEmail)) errs.workEmail = "Enter a valid work email";
        if (!/^.{8,}$/.test(data.password)) errs.password = "Minimum 8 characters";
        if (!/[A-Z]/.test(data.password)) errs.password = "Add at least one uppercase letter";
        if (!/[0-9]/.test(data.password)) errs.password = "Add at least one number";
        if (data.password !== data.confirmPassword) errs.confirmPassword = "Passwords don’t match";
        return errs;
      },
      1: () => {
        const errs = {};
        if (!data.companyName) errs.companyName = "Required";
        if (!data.country) errs.country = "Select a country";
        if (!data.address1) errs.address1 = "Required";
        if (!data.city) errs.city = "Required";
        if (!data.postalCode) errs.postalCode = "Required";
        if (!data.sector) errs.sector = "Select a sector";
        return errs;
      },
      2: () => {
        const errs = {};
        if (!data.registrationNumber) errs.registrationNumber = "Required";
        if (!data.incorporationDate) errs.incorporationDate = "Required";
        if (!data.uboName) errs.uboName = "Required";
        if (!data.uboOwnership) errs.uboOwnership = "Required";
        if (!data.sanctionsCheckConsent) errs.sanctionsCheckConsent = "Required";
        if (!data.pepCheckConsent) errs.pepCheckConsent = "Required";
        return errs;
      },
      3: () => {
        const errs = {};
        if (!data.phone) errs.phone = "Required";
        if (!data.jobTitle) errs.jobTitle = "Required";
        if (data.complianceEmail && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(data.complianceEmail))
          errs.complianceEmail = "Enter a valid email";
        return errs;
      },
      4: () => {
        const errs = {};
        if (!data.file_idPassport) errs.file_idPassport = "Upload ID / Passport";
        if (!data.file_proofOfAddress) errs.file_proofOfAddress = "Upload Proof of Address";
        if (!data.file_companyReg) errs.file_companyReg = "Upload Company Registration";
        if (!data.file_uboStructure) errs.file_uboStructure = "Upload UBO Structure/Declaration";
        // bank letter optional for some, keep as optional
        return errs;
      },
      5: () => {
        const errs = {};
        if (!data.acceptTerms) errs.acceptTerms = "Accept Terms to continue";
        if (!data.acceptPrivacy) errs.acceptPrivacy = "Accept Privacy Policy";
        return errs;
      },
    }),
    [data]
  );

  const validateStep = (i = step) => validators[i]();
  const next = () => {
    const errs = validateStep(step);
    if (Object.keys(errs).length) {
      setServerError("Please fix the highlighted fields.");
      setTimeout(() => setServerError(""), 3000);
      setTouched((t) => ({ ...t, ...Object.fromEntries(Object.keys(errs).map((k) => [k, true])) }));
      return;
    }
    setStep((s) => Math.min(s + 1, steps.length - 1));
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  // per-field touch to show errors after interaction
  const [touched, setTouched] = useState({});
  const touch = (e) => setTouched((t) => ({ ...t, [e.target.name]: true }));

  const submit = async () => {
    const errs = validateStep(5);
    if (Object.keys(errs).length) {
      setServerError("Please accept terms and privacy.");
      setTouched((t) => ({ ...t, acceptTerms: true, acceptPrivacy: true }));
      return;
    }
    try {
      setSubmitting(true);
      setServerError("");

      const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(/\/$/, "");
      const url = `${base}/api/register`;

      const fd = new FormData();
      Object.entries(data).forEach(([k, v]) => {
        if (v instanceof File || v === null) return; // append files separately below
        fd.append(k, typeof v === "boolean" ? String(v) : v);
      });
      // append files (if provided)
      [
        "file_idPassport",
        "file_proofOfAddress",
        "file_companyReg",
        "file_uboStructure",
        "file_bankLetter",
      ].forEach((key) => {
        if (data[key]) fd.append(key, data[key]);
      });

      const res = await fetch(url, { method: "POST", body: fd });
      if (!res.ok) throw new Error(`Server responded ${res.status}`);
      // success – go to dashboard or thank-you
      window.location.href = "/dashboard";
    } catch (e) {
      console.error(e);
      setServerError("There was a problem creating your account. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <header className="mb-8">
          <p className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0A2A8F]">
            Join CommodiLink
          </p>
          <h1 className="mt-3 text-3xl font-bold text-slate-900">Create your account</h1>
          <p className="text-slate-600">Free to start. Verification takes 24–48 hours after documents are submitted.</p>
        </header>

        {/* Stepper */}
        <ol className="mb-6 grid grid-cols-6 gap-2 text-xs font-semibold text-slate-600">
          {steps.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border text-[11px] ${
                  i < step
                    ? "bg-[#0A2A8F] text-white border-[#0A2A8F]"
                    : i === step
                    ? "border-[#0A2A8F] text-[#0A2A8F]"
                    : "border-slate-300 text-slate-500"
                }`}
              >
                {i + 1}
              </span>
              <span className={`${i === step ? "text-[#0A2A8F]" : ""}`}>{label}</span>
            </li>
          ))}
        </ol>

        {serverError && (
          <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm text-amber-800">
            {serverError}
          </div>
        )}

        <div className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
          {/* STEP CONTENT */}
          {step === 0 && <StepAccount data={data} onChange={onChange} onBlur={touch} touched={touched} />}
          {step === 1 && <StepCompany data={data} onChange={onChange} onBlur={touch} touched={touched} />}
          {step === 2 && <StepCompliance data={data} onChange={onChange} onBlur={touch} onCheck={onCheck} touched={touched} />}
          {step === 3 && <StepContacts data={data} onChange={onChange} onBlur={touch} touched={touched} />}
          {step === 4 && <StepDocuments data={data} onFile={onFile} />}
          {step === 5 && <StepReview data={data} />}

          {/* NAV */}
          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={back}
              disabled={step === 0 || submitting}
              className="rounded-lg border border-blue-200 bg-white px-4 py-2 text-sm font-medium text-slate-800 disabled:opacity-40 hover:bg-blue-50"
            >
              Back
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={next}
                disabled={submitting}
                className="rounded-lg px-5 py-2 text-sm font-semibold text-white"
                style={{ background: `linear-gradient(180deg, ${BRAND_BLUE}, #061A69)` }}
              >
                Continue
              </button>
            ) : (
              <button
                onClick={submit}
                disabled={submitting}
                className="rounded-lg px-5 py-2 text-sm font-semibold text-white"
                style={{ background: `linear-gradient(180deg, ${BRAND_BLUE}, #061A69)` }}
              >
                {submitting ? "Submitting…" : "Create account"}
              </button>
            )}
          </div>
        </div>

        {/* small reassurance */}
        <p className="mt-4 text-xs text-slate-500">
          By creating an account, you agree to our{" "}
          <a className="text-[#0A2A8F] underline" href="/terms">Terms</a> and{" "}
          <a className="text-[#0A2A8F] underline" href="/privacy">Privacy Policy</a>.
        </p>
      </div>
    </main>
  );
}

/* ----------------- steps ----------------- */

function Field({ label, error, children }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold text-slate-600">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  );
}

function Input({ name, value, onChange, onBlur, placeholder, type = "text" }) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      type={type}
      className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400"
    />
  );
}

function StepAccount({ data, onChange, onBlur, touched }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="First name" error={touched.firstName && !data.firstName ? "Required" : ""}>
        <Input name="firstName" value={data.firstName} onChange={onChange} onBlur={onBlur} placeholder="Jane" />
      </Field>
      <Field label="Last name" error={touched.lastName && !data.lastName ? "Required" : ""}>
        <Input name="lastName" value={data.lastName} onChange={onChange} onBlur={onBlur} placeholder="Doe" />
      </Field>
      <Field label="Work email" error={touched.workEmail && !data.workEmail ? "Required" : ""}>
        <Input name="workEmail" type="email" value={data.workEmail} onChange={onChange} onBlur={onBlur} placeholder="name@company.com" />
      </Field>
      <div className="grid gap-4 md:grid-cols-2 md:col-span-2">
        <Field label="Password">
          <Input name="password" type="password" value={data.password} onChange={onChange} onBlur={onBlur} placeholder="••••••••" />
        </Field>
        <Field label="Confirm password">
          <Input name="confirmPassword" type="password" value={data.confirmPassword} onChange={onChange} onBlur={onBlur} placeholder="••••••••" />
        </Field>
      </div>
      <p className="text-xs text-slate-500 md:col-span-2">
        Password must be at least 8 characters, include one uppercase letter and one number.
      </p>
    </div>
  );
}

function StepCompany({ data, onChange, onBlur, touched }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Company trading name" error={touched.companyName && !data.companyName ? "Required" : ""}>
        <Input name="companyName" value={data.companyName} onChange={onChange} onBlur={onBlur} placeholder="CommodiLink Ltd" />
      </Field>
      <Field label="Legal name">
        <Input name="legalName" value={data.legalName} onChange={onChange} onBlur={onBlur} placeholder="(optional)" />
      </Field>
      <Field label="Country" error={touched.country && !data.country ? "Required" : ""}>
        <select name="country" value={data.country} onChange={onChange} onBlur={onBlur}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400">
          <option value="">Select country…</option>
          {countries.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </Field>
      <Field label="Sector" error={touched.sector && !data.sector ? "Required" : ""}>
        <select name="sector" value={data.sector} onChange={onChange} onBlur={onBlur}
          className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-blue-400">
          <option value="">Select sector…</option>
          {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
      </Field>
      <Field label="Address line 1" error={touched.address1 && !data.address1 ? "Required" : ""}>
        <Input name="address1" value={data.address1} onChange={onChange} onBlur={onBlur} placeholder="Street, building" />
      </Field>
      <Field label="Address line 2">
        <Input name="address2" value={data.address2} onChange={onChange} onBlur={onBlur} placeholder="Suite, unit (optional)" />
      </Field>
      <Field label="City" error={touched.city && !data.city ? "Required" : ""}>
        <Input name="city" value={data.city} onChange={onChange} onBlur={onBlur} placeholder="City" />
      </Field>
      <Field label="State/Province">
        <Input name="state" value={data.state} onChange={onChange} onBlur={onBlur} placeholder="(optional)" />
      </Field>
      <Field label="Postal code" error={touched.postalCode && !data.postalCode ? "Required" : ""}>
        <Input name="postalCode" value={data.postalCode} onChange={onChange} onBlur={onBlur} placeholder="ZIP / Postcode" />
      </Field>
      <Field label="Company website">
        <Input name="website" value={data.website} onChange={onChange} onBlur={onBlur} placeholder="https://…" />
      </Field>
    </div>
  );
}

function StepCompliance({ data, onChange, onBlur, onCheck, touched }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Company registration number" error={touched.registrationNumber && !data.registrationNumber ? "Required" : ""}>
        <Input name="registrationNumber" value={data.registrationNumber} onChange={onChange} onBlur={onBlur} placeholder="Trade registry number" />
      </Field>
      <Field label="Incorporation date" error={touched.incorporationDate && !data.incorporationDate ? "Required" : ""}>
        <Input name="incorporationDate" type="date" value={data.incorporationDate} onChange={onChange} onBlur={onBlur} />
      </Field>
      <Field label="Ultimate Beneficial Owner (UBO) name" error={touched.uboName && !data.uboName ? "Required" : ""}>
        <Input name="uboName" value={data.uboName} onChange={onChange} onBlur={onBlur} placeholder="Full legal name" />
      </Field>
      <Field label="UBO ownership % (largest owner)" error={touched.uboOwnership && !data.uboOwnership ? "Required" : ""}>
        <Input name="uboOwnership" value={data.uboOwnership} onChange={onChange} onBlur={onBlur} placeholder="e.g., 51%" />
      </Field>

      <div className="md:col-span-2 grid gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="sanctionsCheckConsent" checked={data.sanctionsCheckConsent} onChange={onCheck} />
          I consent to sanctions & watchlist screening (OFAC/UN/PEP/adverse media).
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="pepCheckConsent" checked={data.pepCheckConsent} onChange={onCheck} />
          I confirm none of the UBOs/directors are sanctioned or PEPs to the best of my knowledge.
        </label>
      </div>
    </div>
  );
}

function StepContacts({ data, onChange, onBlur, touched }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Field label="Job title" error={touched.jobTitle && !data.jobTitle ? "Required" : ""}>
        <Input name="jobTitle" value={data.jobTitle} onChange={onChange} onBlur={onBlur} placeholder="Head of Trading" />
      </Field>
      <Field label="Work phone (with country code)" error={touched.phone && !data.phone ? "Required" : ""}>
        <Input name="phone" value={data.phone} onChange={onChange} onBlur={onBlur} placeholder="+971 5X XXX XXXX" />
      </Field>
      <Field label="Compliance contact email">
        <Input name="complianceEmail" value={data.complianceEmail} onChange={onChange} onBlur={onBlur} placeholder="compliance@company.com" />
      </Field>
    </div>
  );
}

function StepDocuments({ data, onFile }) {
  return (
    <div className="grid gap-4">
      <p className="text-sm text-slate-600">
        Upload clear scans (PDF, JPG, PNG). Max 10MB each.
      </p>
      <Uploader label="ID / Passport (authorised signatory)" name="file_idPassport" file={data.file_idPassport} onFile={onFile} required />
      <Uploader label="Proof of Address (utility bill or bank statement)" name="file_proofOfAddress" file={data.file_proofOfAddress} onFile={onFile} required />
      <Uploader label="Company Registration Certificate" name="file_companyReg" file={data.file_companyReg} onFile={onFile} required />
      <Uploader label="UBO Structure / Declaration" name="file_uboStructure" file={data.file_uboStructure} onFile={onFile} required />
      <Uploader label="Bank Letter / Proof of Funds (optional)" name="file_bankLetter" file={data.file_bankLetter} onFile={onFile} />
      {/* CAPTCHA placeholder (swap with your provider e.g., hCaptcha, reCAPTCHA) */}
      <div className="mt-2 rounded-lg border border-slate-200 p-3 text-xs text-slate-500">
        CAPTCHA placeholder
      </div>
    </div>
  );
}

function Uploader({ label, name, file, onFile, required = false }) {
  return (
    <div>
      <span className="text-xs font-semibold text-slate-600">
        {label} {required && <span className="text-red-600">*</span>}
      </span>
      <div className="mt-1 flex items-center gap-3">
        <input
          type="file"
          name={name}
          onChange={onFile}
          accept=".pdf,.jpg,.jpeg,.png"
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm file:mr-3 file:rounded file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-sm hover:file:bg-slate-200"
        />
        {file && <span className="text-xs text-slate-600 truncate max-w-[220px]">{file.name}</span>}
      </div>
    </div>
  );
}

function StepReview({ data }) {
  return (
    <div className="space-y-6">
      <Section title="Account">
        <Row k="Name" v={`${data.firstName} ${data.lastName}`} />
        <Row k="Email" v={data.workEmail} />
      </Section>

      <Section title="Company">
        <Row k="Trading name" v={data.companyName} />
        <Row k="Legal name" v={data.legalName || "—"} />
        <Row k="Country" v={data.country} />
        <Row k="Sector" v={data.sector} />
        <Row k="Address" v={[data.address1, data.address2, data.city, data.state, data.postalCode].filter(Boolean).join(", ")} />
        <Row k="Website" v={data.website || "—"} />
      </Section>

      <Section title="Compliance">
        <Row k="Registration #" v={data.registrationNumber} />
        <Row k="Incorporation date" v={data.incorporationDate} />
        <Row k="UBO name" v={data.uboName} />
        <Row k="UBO ownership" v={data.uboOwnership} />
      </Section>

      <Section title="Contacts">
        <Row k="Job title" v={data.jobTitle} />
        <Row k="Phone" v={data.phone} />
        <Row k="Compliance email" v={data.complianceEmail || "—"} />
      </Section>

      <Section title="Policies">
        <Row k="Terms" v={data.acceptTerms ? "Accepted" : "—"} />
        <Row k="Privacy" v={data.acceptPrivacy ? "Accepted" : "—"} />
        <Row k="Marketing" v={data.marketingOptIn ? "Opted in" : "—"} />
      </Section>

      <div className="mt-4 grid gap-3">
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="acceptTerms" checked={data.acceptTerms} readOnly />
          I agree to the Terms of Service.
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="acceptPrivacy" checked={data.acceptPrivacy} readOnly />
          I’ve read and accept the Privacy Policy.
        </label>
        <label className="flex items-center gap-2 text-sm text-slate-700">
          <input type="checkbox" name="marketingOptIn" checked={data.marketingOptIn} readOnly />
          I’d like to receive product updates (optional).
        </label>
      </div>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      <div className="mt-2 divide-y divide-slate-200 rounded-lg border border-slate-200">
        {children}
      </div>
    </div>
  );
}
function Row({ k, v }) {
  return (
    <div className="grid grid-cols-3 gap-4 px-3 py-2 text-sm">
      <div className="col-span-1 text-slate-500">{k}</div>
      <div className="col-span-2 text-slate-900">{v || "—"}</div>
    </div>
  );
}

/* --------- lists --------- */
const sectors = [
  "Refinery",
  "Producer",
  "Trader",
  "Broker",
  "Shipping",
  "Logistics",
  "Bunkering",
  "Storage/Terminal",
  "Inspection",
  "Financial/Banking",
  "Other",
];

const countries = [
  "United Arab Emirates",
  "United Kingdom",
  "United States",
  "Greece",
  "Turkey",
  "Nigeria",
  "Denmark",
  "Netherlands",
  "Germany",
  "Azerbaijan",
  "Singapore",
  "Saudi Arabia",
  "Canada",
  "India",
  "China",
  "France",
  "Italy",
  "Spain",
  "Qatar",
  "Kuwait",
  "Bahrain",
  "Oman",
  "South Africa",
  "Brazil",
  "Mexico",
  "Australia",
  "New Zealand",
  "Other",
];

