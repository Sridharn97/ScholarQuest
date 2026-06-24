# ScholarQuest 🎓✨

[![Next.js Version](https://img.shields.io/badge/next.js-v16.2.7-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React Version](https://img.shields.io/badge/react-v19.0-blue?logo=react&logoColor=white)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/tailwind-v4.0-38bdf8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**ScholarQuest** is a comprehensive, client-reactive scholarship discovery, matching, and application management portal. It connects **Students** looking for funding opportunities with **Sponsors & Institutional Providers** posting and screening applicants. 

---

## 🛠️ Tech Stack

ScholarQuest is built using a modern, lightweight, and high-performance client-side technology stack:

* **Framework**: [Next.js v16.2.7](https://nextjs.org/) (using App Router for layouts and page rendering).
* **Core View Engine**: [React v19.2.7](https://react.dev/) (dynamic client-side components and custom lifecycle hooks).
* **Styling**: [Tailwind CSS v4.0](https://tailwindcss.com/) & PostCSS (fully responsive design system with a premium, custom-colored palette).
* **Input Validation**: [React Phone Number Input v3.4.17](https://github.com/catamphetamine/react-phone-number-input) (formatted and validated phone fields).
* **State & Persistence**: Centralized reactive Store ([`lib/store.js`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/lib/store.js)) using **HTML5 LocalStorage** and a custom Event Bus dispatch system.

---

## 🏗️ System Architecture

ScholarQuest uses a decoupled, frontend-centric architecture utilizing Next.js App Router. State is maintained inside a centralized localStorage database with an reactive event bus system. This enables multi-tab synchronization and reactivity without a server-side DB.

```mermaid
graph TD
    %% Define Styles
    classDef client fill:#f9f9fb,stroke:#4f46e5,stroke-width:2px;
    classDef store fill:#ecfdf5,stroke:#059669,stroke-width:2px;
    classDef storage fill:#fffbeb,stroke:#d97706,stroke-width:2px;

    subgraph ClientBrowser [Client Browser Window]
        subgraph NextJSPages [Next.js Views & Layouts]
            direction TB
            StudentDashboard["Student Dashboard<br/>(app/(student)/dashboard)"]:::client
            AIMatcher["AI Matcher<br/>(app/(student)/ai-matcher)"]:::client
            Tracker["Kanban Tracker & board<br/>(app/(student)/tracker)"]:::client
            ProviderPortal["Provider Admin Area<br/>(app/(admin)/provider)"]:::client
        end

        subgraph CentralStore [Central Store: lib/store.js]
            direction TB
            StoreAPI["Mutation & Query APIs<br/>(saveUser, saveTracker, addApplication, sendMessage)"]:::store
            EventBus["Custom Event Bus<br/>('sq_update' Event Dispatcher)"]:::store
        end

        subgraph LocalStorage [Browser LocalStorage]
            direction LR
            sq_user[("sq_user<br/>(Student Profile)")]:::storage
            sq_tracker[("sq_tracker<br/>(Kanban Columns)")]:::storage
            sq_messages[("sq_messages<br/>(Chat Messages)")]:::storage
            sq_admin_apps[("sq_admin_applications<br/>(Application Log)")]:::storage
            sq_admin_scholars[("sq_admin_scholarships<br/>(Scholarship Directory)")]:::storage
        end
    end

    %% Flow links
    NextJSPages -->|Invokes API| StoreAPI
    StoreAPI -->|Reads / Writes| LocalStorage
    StoreAPI -->|Dispatches Events| EventBus
    EventBus -.->|Listens & Re-renders| NextJSPages
```

---

## 🔄 User & Data Workflows

### 1. Student Onboarding & Discovery Flow
```mermaid
flowchart TD
    Start([Student registers/logs in]) --> CheckOnboard{Onboarded?}
    CheckOnboard -->|No| ProfileOnboard[Complete Academic Profile, Study Field & Needs]
    ProfileOnboard --> SaveProfile[Profile stored in localStorage 'sq_user']
    CheckOnboard -->|Yes| GoDashboard[Student Dashboard]
    SaveProfile --> GoDashboard
    
    GoDashboard --> Matcher[AI Matcher]
    GoDashboard --> Discovery[Browse Scholarships]
    
    Matcher -->|Computes match score based on Profile| ShowMatches[Show Scored Matches]
    Discovery -->|Search & filter| ShowMatches
    
    ShowMatches -->|Add to Tracker| Track[Kanban Board - Interested Column]
```

### 2. Application & Provider Review Lifecycle
```mermaid
flowchart TD
    Track[Kanban Board - Interested Column] -->|Start Application| Apply[Fill Application Form]
    Apply -->|Submit Application| Submit[Write Application & Update Card Status]
    
    Submit -->|System Action 1| AddApp["Create App Entry in 'sq_admin_applications'"]
    Submit -->|System Action 2| MoveCard["Move Card to 'Applied' in 'sq_tracker'"]
    
    AddApp --> ProviderNotify[Provider Dashboard Updates]
    ProviderNotify --> Review["Provider Reviews Application"]
    
    Review --> Decisions{Provider Decision}
    Decisions -->|Accept| AcceptState[Update App to Accepted]
    Decisions -->|Reject| RejectState[Update App to Rejected]
    
    AcceptState & RejectState --> Synced[Synchronize Status & send CustomEvent]
    Synced -->|Updates Student Card Status| Reflect[Student Tracker updates to Accepted/Rejected]
    
    %% Communication Loop
    Review -.->|Clarify details| Chat[In-App Messenger]
    Apply -.->|Ask questions| Chat
```

---

## 📂 Codebase & Directories Tour

Click on any of the core components and files below to view their contents:

- **Central State Engine**: 
  - [`lib/store.js`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/lib/store.js) — Houses all core data access operations, auth mechanisms, Kanban card shifts, messaging APIs, and reactive triggers.
  
- **Student Layout & Views (`app/(student)`)**:
  - [`layout.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(student)/layout.jsx) — Layout configuration for students. Includes responsive sidebar navigation.
  - [`dashboard/page.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(student)/dashboard/page.jsx) — Displays student stats, recent match activity, profile status, and quick links.
  - [`ai-matcher/page.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(student)/ai-matcher/page.jsx) — Evaluates student profiles against active scholarship terms to offer ranked percent matches.
  - [`tracker/page.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(student)/tracker/page.jsx) — Kanban Board implementing drag-and-drop workflow tracking for scholarship application cards.
  - [`apply/[id]/page.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(student)/apply/[id]/page.jsx) — Form-based portal for student application submissions.
  - [`messages/page.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(student)/messages/page.jsx) — Direct messaging interface with program managers.

- **Provider Admin Views (`app/(admin)`)**:
  - [`layout.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(admin)/layout.jsx) — Sidebar and shell styling for the admin panel.
  - [`provider/page.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(admin)/provider/page.jsx) — Provider landing page with key statistics (total funding disbursed, average GPA of applicants).
  - [`provider/applications/page.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(admin)/provider/applications/page.jsx) — Applicant management log allowing status changes and messaging triggers.
  - [`provider/scholarships/page.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(admin)/provider/scholarships/page.jsx) — Section to add, review, and modify scholarships.
  - [`provider/settings/page.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/app/(admin)/provider/settings/page.jsx) — Organization detail configuration.

- **Global Navigation & Common Utilities**:
  - [`components/layout/Navbar.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/components/layout/Navbar.jsx) — Main landing page navigation.
  - [`components/layout/Footer.jsx`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/components/layout/Footer.jsx) — Application footer.

---

## ⚡ Technical Highlights

1. **Event-Driven Reactivity**: Instead of relying on full-page refreshes or polling, mutations inside [`store.js`](file:///c:/Users/Sridhar/Desktop/ScholarQuest/ScholarQuest/lib/store.js) dispatch a `sq_update` Event. Views subscribe to this event inside `useEffect` to capture data changes in real-time.
2. **AI Matching Core**: The system weights student criteria (GPA, field of study, financial requirement) against scholarship qualifications dynamically, computing an alignment percentage.
3. **Responsive Sidebars & Navs**: Built-in support for desktop sidebars and mobile bottom navigation toggles, rendering correctly on multiple screen sizes.

---

## 🚀 Getting Started

### Prerequisites

You need [Node.js](https://nodejs.org/) (v18+) installed.

### Setup and Start

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Build the production application**:
   ```bash
   npm run build
   npm run start
   ```

Open [http://localhost:3000](http://localhost:3000) inside your web browser to explore.

---

## 🔑 Access Credentials

To test the application locally without creating new accounts, you can use these mock logins:

| User Type | Email | Password | Role |
|---|---|---|---|
| **Student** (Pre-populated) | Use registration or any mock details | `any` | Applicant |
| **Provider / Sponsor** | `provider@scholarquest.io` | `provider123` | Sponsor Coordinator (Global Tech Foundation) |
| **Provider (Program Manager)** | `admin@admin.com` | `admin123` | Program Manager (ScholarQuest Institute) |

---
*ScholarQuest — Empowering academic journeys through smart search and automation.*
