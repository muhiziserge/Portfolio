export interface Run {
  text: string;
  bold?: boolean;
  href?: string;
}

export type Paragraph = Run[];

export interface GalleryImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export type Block =
  | { kind: "prose"; heading: string; paragraphs: Paragraph[] }
  | { kind: "list"; heading: string; items: string[] }
  | { kind: "visuals"; heading: string; items: string[] }
  | { kind: "gallery"; heading: string; primary: GalleryImage; carousel?: GalleryImage[] };

export interface MetaField {
  label: string;
  value: string;
}

export interface Project {
  slug: string;
  domain: string;
  cardTitle: string;
  cardDescription: string;
  title: string;
  eyebrow: string;
  heading: string;
  lede: string;
  meta: MetaField[];
  blocks: Block[];
  prevHref: string;
  prevLabel: string;
  nextHref: string;
  nextLabel: string;
}

export const projects: Project[] = [
  {
    slug: "irembo",
    domain: "Government",
    cardTitle: "IremboGov — Self-Service Platform",
    cardDescription:
      "Letting institutions self-manage entire public services, from configuration to citizen-facing publish.",
    title: "IremboGov — Self-Service Platform",
    eyebrow: "Government — Irembo",
    heading: "Letting institutions run their own public services on IremboGov",
    lede: "A platform upgrade that turned Irembo from a portal Irembo alone published to, into infrastructure institutions and third parties could configure and run themselves.",
    meta: [
      { label: "Role", value: "Lead Product Designer" },
      { label: "Company", value: "Irembo" },
      { label: "Timeline", value: "Current" },
      { label: "Platform", value: "IremboGov" },
    ],
    blocks: [
      {
        kind: "prose",
        heading: "Context",
        paragraphs: [
          [
            {
              text: "Irembo is Rwanda's national digital public services company, and IremboGov is the country's e-government portal — where citizens access public services. It's a system with real operational stakes: for citizens who are often coming online for the first time, and for institutions that depend on the platform actually working.",
            },
          ],
        ],
      },
      {
        kind: "prose",
        heading: "What I owned",
        paragraphs: [
          [
            { text: "Self-service platform upgrade.", bold: true },
            {
              text: " Institutions and third-party organizations previously depended on Irembo to publish and manage their services. I owned end-to-end design of an upgrade that lets them self-manage the full lifecycle instead — configuring and designing a service, processing applications, and monitoring performance through their own portal — with the finished service published either to citizens on IremboGov or to the organization's own configurable white-label storefront.",
            },
          ],
          [
            { text: "IremboAI chatbot design system.", bold: true },
            {
              text: " Directed the design system behind Irembo's AI chatbot suite, covering citizen services from driving test results to bill payments — taken from Figma components through to a working Angular demo.",
            },
          ],
        ],
      },
      {
        kind: "list",
        heading: "Process",
        items: [
          "Mapped the existing service-publishing workflow to find where institutions were blocked without Irembo's direct involvement.",
          "Designed the configuration, application-processing, and monitoring surfaces as one coherent lifecycle rather than three separate tools.",
          "Worked cross-functionally with engineering and cross-org stakeholders, including GIZ and KfW, to reconcile government process constraints with a self-service model.",
          "Built and scaled the design practice alongside the product work — absorbing a second design team and introducing a rubric-based hiring process for senior designers.",
        ],
      },
      {
        kind: "prose",
        heading: "Outcome",
        paragraphs: [
          [
            {
              text: "Institutions and third-party organizations can now run their own services on Irembo end-to-end — configuring, processing, and monitoring without depending on Irembo's team for each step — while citizens still reach every service through a single, consistent IremboGov experience.",
            },
          ],
        ],
      },
      {
        kind: "visuals",
        heading: "Visuals",
        items: [
          "Image loading error: service configuration flow (IremboGov institution portal)",
          "Image loading error: white-label storefront configuration",
          "Image loading error: IremboAI chatbot design system / Angular demo",
          "Image loading error: performance monitoring dashboard",
        ],
      },
    ],
    prevHref: "/#work",
    prevLabel: "← All work",
    nextHref: "/work/teleclinic",
    nextLabel: "Next: TeleClinic Nurse & Doctor Platform →",
  },
  {
    slug: "teleclinic",
    domain: "Health · In progress",
    cardTitle: "TeleClinic — Nurse & Doctor Platform",
    cardDescription:
      "Taking clinical consultations off paper — a minimal MVP currently in demo testing.",
    title: "TeleClinic — Nurse & Doctor Platform",
    eyebrow: "Health — Irembo · In progress",
    heading: "Taking nurse and doctor consultations off paper",
    lede: "An end-to-end web platform for TeleClinic's clinical staff — appointments, consultations, patient history, and radiology requests — designed as a deliberately minimal MVP and currently in demo testing with real nurses and doctors.",
    meta: [
      { label: "Role", value: "Lead Product Designer, end-to-end" },
      { label: "Company", value: "Irembo" },
      { label: "Status", value: "Ongoing — demo testing" },
      { label: "Platform", value: "TeleClinic (web)" },
    ],
    blocks: [
      {
        kind: "prose",
        heading: "Context",
        paragraphs: [
          [
            {
              text: "TeleClinic is Irembo's teleconsultation health platform. Before this project, the clinical side of it — the work nurses and doctors actually do during a shift — ran on paper: scheduling, consultation notes, lab and radiology requests, prescriptions, referrals. Paper doesn't search, doesn't hand off cleanly between shifts or specialists, and doesn't scale past a handful of patients a day.",
            },
          ],
          [
            {
              text: 'The brief wasn\'t "digitize everything." It was to find the smallest version of a digital clinical workflow that could actually replace paper for a nurse and a doctor on shift — nothing speculative, nothing waiting on a future roadmap.',
            },
          ],
        ],
      },
      {
        kind: "prose",
        heading: "What I owned",
        paragraphs: [
          [
            {
              text: "End-to-end design of the Nurse and Doctor experience: sign-in, a home dashboard built around the day's shift — today's appointment queue and an inbox of lab results awaiting review — an appointments calendar, the consultation flow itself, and a patient history section covering consultations, calls, lab tests, prescriptions, and referrals in one place. Alongside that, a radiology request flow: a short conditional-logic form for the clinician requesting a scan, and a structured report view — findings, impression, recommendation — for whoever needs to act on the result. I also designed the shift rota that sits behind the appointment scheduling.",
            },
          ],
        ],
      },
      {
        kind: "list",
        heading: "Process",
        items: [
          "Started from the paper forms and shift patterns nurses and doctors already used, instead of inventing a new mental model they'd have to relearn.",
          "Scoped deliberately to an MVP — cut anything speculative and kept only what a shift genuinely needs on day one: appointments, consultation capture, patient history, lab and radiology requests.",
          "Designed the radiology flow as two connected moments rather than one form: a fast request with conditional fields for the clinician ordering the scan, and a separate structured report for the clinician acting on the result — same data, read differently depending on who's looking and why.",
          "Built the patient history around how a clinician actually looks a patient up mid-shift — one record, tabbed by consultations, calls, lab tests, prescriptions, and referrals, instead of five separate places to check.",
        ],
      },
      {
        kind: "prose",
        heading: "Where it stands",
        paragraphs: [
          [
            {
              text: "This hasn't shipped yet. It's currently in demo testing and iteration with real nurses and doctors — the goal at this stage is validating that a genuinely minimal, MVP-only experience is enough to replace their paper workflow, before Irembo commits further down the roadmap. What's designed so far is deliberately narrow by choice, not by constraint.",
            },
          ],
        ],
      },
      {
        kind: "visuals",
        heading: "Visuals",
        items: [
          "Image loading error: sign-in",
          "Image loading error: nurse home — shift appointments & lab result inbox",
          "Image loading error: appointments calendar",
          "Image loading error: patient history — consultations / calls / lab tests / prescriptions / referrals",
          "Image loading error: radiology test request — conditional modality fields",
          "Image loading error: radiology report — findings, impression, recommendation",
        ],
      },
    ],
    prevHref: "/work/irembo",
    prevLabel: "← IremboGov Self-Service Platform",
    nextHref: "/work/naeb",
    nextLabel: "Next: NAEB Export Traceability →",
  },
  {
    slug: "naeb",
    domain: "Agriculture · Supply Chain",
    cardTitle: "NAEB Export Traceability",
    cardDescription:
      "A wholesale export platform that lets buyers trace produce back to the field it grew in.",
    title: "NAEB Export Traceability",
    eyebrow: "Agriculture · Supply Chain — DMM.HeHe × NAEB",
    heading: "Giving export buyers a line back to the field a crop came from",
    lede: "A wholesale e-commerce and export platform, built with Rwanda's National Agricultural Export Development Board, that ties every shipment to the field it was grown in.",
    meta: [
      { label: "Role", value: "Lead UI/UX Designer" },
      { label: "Company", value: "DMM.HeHe" },
      { label: "Timeline", value: "2017 – 2020" },
      { label: "Partner", value: "NAEB" },
    ],
    blocks: [
      {
        kind: "prose",
        heading: "Context",
        paragraphs: [
          [
            {
              text: "This was one product line inside a wider agriculture management platform spanning the full cultivation cycle — field and crop-growth monitoring through to supply handoff with wholesale partners. Partnering with NAEB (National Agricultural Export Development Board), the goal was a wholesale export platform where buyers weren't just purchasing produce, but could see where it came from.",
            },
          ],
        ],
      },
      {
        kind: "prose",
        heading: "What I owned",
        paragraphs: [
          [
            {
              text: "Design of the wholesale e-commerce and export platform itself, plus the traceability layer running through it — connecting field-level crop data to the export transaction, so a buyer could trace a shipment back to its origin. This sat alongside the broader cultivation-cycle platform, which tracked field and crop-growth monitoring through to the point of supply handoff.",
            },
          ],
        ],
      },
      {
        kind: "list",
        heading: "Process",
        items: [
          "Worked with NAEB to understand the export compliance and buyer-trust requirements traceability needed to satisfy.",
          "Designed the field-to-shipment data model as a user-facing trail, not just a backend audit log — something a buyer could actually read.",
          "Built interactive prototypes and ran usability testing across this and the platform's other product lines (multi-tenant e-commerce, fleet management) to validate flows before build.",
        ],
      },
      {
        kind: "prose",
        heading: "Outcome",
        paragraphs: [
          [
            {
              text: "A traceability model built the way the best infrastructure companies approach their own work: sensing conditions in the field, analyzing that data, and surfacing it exactly where a decision — here, a purchase — actually gets made.",
            },
          ],
        ],
      },
      {
        kind: "visuals",
        heading: "Visuals",
        items: [
          "Image loading error: wholesale export marketplace",
          "Image loading error: crop traceability / origin trail view",
          "Image loading error: field & crop-growth monitoring dashboard",
          "Image loading error: buyer order flow",
        ],
      },
    ],
    prevHref: "/work/irembo",
    prevLabel: "← Irembo",
    nextHref: "/work/fixa",
    nextLabel: "Next: Fixa HR Platform →",
  },
  {
    slug: "fixa",
    domain: "Workforce",
    cardTitle: "Fixa — Blue-Collar HR Platform",
    cardDescription:
      "Africa's first HR platform built for blue-collar workforce management, from field app to analytics portal.",
    title: "Fixa — Blue-Collar HR Platform",
    eyebrow: "Workforce — Fixa",
    heading: "Africa's first HR platform built for blue-collar workforce management",
    lede: "An on-site mobile app, an admin portal, a client-facing portal, and automated email reporting — four surfaces built from market research through to a scalable, deployed product.",
    meta: [
      { label: "Role", value: "Product Owner (Contract)" },
      { label: "Company", value: "Fixa" },
      { label: "Timeline", value: "Oct 2022 – Oct 2023" },
      { label: "Surfaces", value: "Mobile app, Admin portal, Client portal, Email reports" },
    ],
    blocks: [
      {
        kind: "prose",
        heading: "Context",
        paragraphs: [
          [
            {
              text: "Blue-collar workforce management is underserved by HR software built around office workers and desk logins. Fixa set out to build for the field instead — workers who need something usable on-site, and organizations that need visibility across all of them at once.",
            },
          ],
        ],
      },
      {
        kind: "prose",
        heading: "What I owned",
        paragraphs: [
          [
            {
              text: "Ideated, designed, and delivered four connected surfaces. An on-site mobile app for field supervisors — switching between active projects, marking attendance by shift and trade, and getting notified as submissions move through approval. An admin portal for Fixa's own operations team — a searchable worker directory, and individual worker profiles carrying certificates, day rates, and a performance scorecard across reliability, KYC, technical skill, and flexibility. A separate client portal for the contracting companies themselves — reviewing and approving submitted shift attendance by trade, and tracking billing, invoices, and tax (EBM) certificates. And automated daily email reports summarizing workforce activity per project, for stakeholders who need the numbers without logging into anything — including usage of the USSD channel workers without smartphones rely on to check their earnings. I owned the roadmap end-to-end, from market research and user interviews through to a scalable, deployed product across all four surfaces.",
            },
          ],
        ],
      },
      {
        kind: "list",
        heading: "Process",
        items: [
          "Ran market research and user interviews with blue-collar workers directly, rather than assuming office-HR patterns would transfer.",
          "Split the problem across distinct interfaces for distinct roles: a fast, low-friction on-site app for field workers, an admin portal for Fixa's own operations team, a client portal for the contracting companies, and email digests for stakeholders who just need the numbers.",
          "Designed the data model connecting field-level activity to portal-level reporting, so performance data captured on-site became legible at the organization and client level without extra manual work.",
        ],
      },
      {
        kind: "prose",
        heading: "Outcome",
        paragraphs: [
          [
            {
              text: "A shipped, four-surface product — the same field-capture-to-oversight shape that shows up across most of this work, extended one step further: something happens on the ground, the people responsible for the system see it in their portal, and the people who just need the numbers get them by email without asking.",
            },
          ],
        ],
      },
      {
        kind: "gallery",
        heading: "On-site mobile app",
        primary: {
          src: "/work/fixa/app-home.png",
          width: 1314,
          height: 4155,
          alt: "Mobile app home for a supervisor managing multiple projects, with attendance-approval notifications and worker search",
        },
        carousel: [
          {
            src: "/work/fixa/app-home-single-project.png",
            width: 1314,
            height: 2802,
            alt: "Mobile app home for a single-project user, showing an attendance-updates feed with approval status",
          },
          {
            src: "/work/fixa/app-attendance.png",
            width: 1290,
            height: 2796,
            alt: "Marking attendance on-site by shift and trade, with a running headcount",
          },
        ],
      },
      {
        kind: "gallery",
        heading: "Admin portal",
        primary: {
          src: "/work/fixa/admin-workforce.png",
          width: 3096,
          height: 2380,
          alt: "Workforce directory listing every worker with status, trade, project, and daily earnings",
        },
        carousel: [
          {
            src: "/work/fixa/admin-worker-profile.png",
            width: 3096,
            height: 2380,
            alt: "Individual worker profile with trades, day rates, ratings, and certificates",
          },
          {
            src: "/work/fixa/admin-worker-scores.png",
            width: 3096,
            height: 2380,
            alt: "Worker scorecard breaking performance into flexibility, reliability, KYC, technical, and multi-skill scores",
          },
        ],
      },
      {
        kind: "gallery",
        heading: "Client portal",
        primary: {
          src: "/work/fixa/client-attendance.png",
          width: 3024,
          height: 2356,
          alt: "Client-facing portal for reviewing and approving submitted shift attendance by trade",
        },
        carousel: [
          {
            src: "/work/fixa/client-billing.png",
            width: 3024,
            height: 2356,
            alt: "Client billing view listing invoices, payment status, and linked tax (EBM) certificates",
          },
        ],
      },
      {
        kind: "gallery",
        heading: "Automated email reporting",
        primary: {
          src: "/work/fixa/email-report.png",
          width: 3092,
          height: 6056,
          alt: "Daily reporting email breaking down active workers, shifts, and USSD usage per project with charts",
        },
        carousel: [
          {
            src: "/work/fixa/email-report-simple.png",
            width: 3092,
            height: 7190,
            alt: "Plain-text variant of the daily reporting email, sent automatically per active project",
          },
        ],
      },
    ],
    prevHref: "/work/naeb",
    prevLabel: "← NAEB Export Traceability",
    nextHref: "/work/innovate-rwanda",
    nextLabel: "Next: Innovate Rwanda →",
  },
  {
    slug: "innovate-rwanda",
    domain: "Government · Ecosystem",
    cardTitle: "Innovate Rwanda",
    cardDescription:
      "The national platform connecting startups, investors, and ecosystem partners.",
    title: "Innovate Rwanda",
    eyebrow: "Government · Ecosystem — Techclick",
    heading: "The national platform connecting Rwanda's startup ecosystem",
    lede: "Innovate Rwanda links startups, investors, and ecosystem partners on one platform — with the admin and analytics dashboards that turn that activity into something the ecosystem's stewards can act on.",
    meta: [
      { label: "Role", value: "Product Lead (Contract)" },
      { label: "Company", value: "Techclick" },
      { label: "Timeline", value: "Jun 2024 – Dec 2024" },
      { label: "Live at", value: "innovaterwanda.rw" },
    ],
    blocks: [
      {
        kind: "prose",
        heading: "Context",
        paragraphs: [
          [
            {
              text: "Innovate Rwanda is a government and development-sector platform meant to connect three groups with different needs — startups looking for capital and visibility, investors looking for credible pipeline, and ecosystem partners coordinating programs across all of it.",
            },
          ],
        ],
      },
      {
        kind: "prose",
        heading: "What I owned",
        paragraphs: [
          [
            {
              text: "Led design across the platform end-to-end, plus the accompanying admin and analytics dashboards — turning ecosystem and operational data into clear, actionable views for the internal stakeholders running the programs. Also created tailor-made web experiences to attract and engage users, aligning the design with stakeholder business goals rather than a generic directory format.",
            },
          ],
        ],
      },
      {
        kind: "list",
        heading: "Process",
        items: [
          "Designed for three distinct user types on one platform without collapsing them into a single generic experience.",
          "Built the ecosystem-facing dashboards around the questions program stewards actually needed answered — who's active, where the gaps are, what's moving.",
          "Worked directly with government and development-sector stakeholders to keep the platform aligned with real program goals, not just feature requests.",
        ],
      },
      {
        kind: "prose",
        heading: "Outcome",
        paragraphs: [
          [
            { text: "A live, public platform at " },
            { text: "innovaterwanda.rw", href: "https://innovaterwanda.rw/en" },
            {
              text: " serving as the connective layer between Rwanda's startups, investors, and the partners supporting them.",
            },
          ],
        ],
      },
      {
        kind: "visuals",
        heading: "Visuals",
        items: [
          "Image loading error: Innovate Rwanda public platform",
          "Image loading error: ecosystem analytics dashboard",
        ],
      },
    ],
    prevHref: "/work/fixa",
    prevLabel: "← Fixa HR Platform",
    nextHref: "/work/rci-experts",
    nextLabel: "Next: RCI Experts Directory →",
  },
  {
    slug: "rci-experts",
    domain: "Government · Development",
    cardTitle: "RCI Experts Directory",
    cardDescription:
      "Connecting government agencies, development partners, and civil-society experts.",
    title: "RCI Experts Directory",
    eyebrow: "Government · Development — Techclick",
    heading: "Connecting government agencies with the experts who advise them",
    lede: "The Rwanda Cooperation Initiative's Experts Directory links government agencies, development partners, and civil-society experts on one platform.",
    meta: [
      { label: "Role", value: "Product Lead (Contract)" },
      { label: "Company", value: "Techclick" },
      { label: "Timeline", value: "Jun 2024 – Dec 2024" },
      { label: "Live at", value: "experts.cooperation.rw" },
    ],
    blocks: [
      {
        kind: "prose",
        heading: "Context",
        paragraphs: [
          [
            {
              text: "Development cooperation runs on knowing who the right expert is for a given agency's problem. The Rwanda Cooperation Initiative needed a directory that made that matching process visible and manageable — for government agencies, development partners, and the civil-society experts themselves.",
            },
          ],
        ],
      },
      {
        kind: "prose",
        heading: "What I owned",
        paragraphs: [
          [
            {
              text: "Design across the platform, alongside the admin and analytics dashboards that turn operational and ecosystem data into clear, actionable views for internal stakeholders — the same dashboard-and-directory pairing as the Innovate Rwanda work, applied to a development-cooperation context instead of a startup ecosystem.",
            },
          ],
        ],
      },
      {
        kind: "list",
        heading: "Process",
        items: [
          "Designed the directory around how agencies actually search for expertise, not just an alphabetical listing.",
          "Built dashboards giving program stakeholders a working view of expert engagement across agencies and partners.",
          "Aligned the experience with stakeholder business goals across a genuinely cross-organizational group — government, development partners, and independent experts.",
        ],
      },
      {
        kind: "prose",
        heading: "Outcome",
        paragraphs: [
          [
            { text: "A live platform at " },
            { text: "experts.cooperation.rw", href: "https://experts.cooperation.rw/" },
            { text: " connecting Rwanda's development-cooperation ecosystem." },
          ],
        ],
      },
      {
        kind: "visuals",
        heading: "Visuals",
        items: [
          "Image loading error: Experts Directory search/listing",
          "Image loading error: engagement analytics dashboard",
        ],
      },
    ],
    prevHref: "/work/innovate-rwanda",
    prevLabel: "← Innovate Rwanda",
    nextHref: "/#work",
    nextLabel: "Back to all work →",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
