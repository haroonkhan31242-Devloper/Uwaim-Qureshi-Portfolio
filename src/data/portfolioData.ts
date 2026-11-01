export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  tags: string[];
  deliverables: string[];
  architecture: string;
}

export interface SkillItem {
  name: string;
  category: 'languages' | 'mobile' | 'frontend' | 'backend' | 'databases' | 'tools';
  level: string; // e.g. 'Core', 'Specialization', 'Proficient'
  description: string;
  highlight?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'mobile' | 'web' | 'desktop' | 'backend';
  shortDesc: string;
  fullDesc: string;
  stack: string[];
  features: string[];
  architectureHighlight: string;
  previewUrl?: string;
  githubUrl?: string;
  badge: string;
  accentColor: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  summary: string;
  details: string;
  deliverables: string[];
  toolsUsed: string[];
}

export const DEVELOPER_INFO = {
  fullName: "Eng.Muhammad Uwaim Qureshi",
  shortName: "Uwaim Qureshi",
  title: "Software Engineer | Full-Stack Developer",
  positioning: "I build modern digital products, scalable applications, and powerful software solutions.",
  headline: "Turning Ideas Into Powerful Digital Experiences.",
  supportingText: "I develop modern websites, cross-platform applications, desktop software, and scalable backend solutions that transform ideas into practical digital products.",
  portraitUrl: "/assets/aistudio/IMG-20261027-WA0277_1_.jpg_2101f575.jpeg",
  email: "uwaim2561@gmail.com",
  location: "Available Globally (Remote / Contract / Full-Time)",
  socials: {
    github: "https://github.com/uwaim45264",
    linkedin: "https://www.linkedin.com/in/muhammad-uwaim-qureshi-55039b267/",
    whatsapp: "https://wa.me",
  },
  stats: [
    { label: "Core Domains", value: "Mobile, Web, Desktop, API" },
    { label: "Primary Frameworks", value: "Flutter & React Ecosystem" },
    { label: "Architecture", value: "Clean, Scalable & Modular" },
    { label: "Commitment", value: "Quality & Performance First" },
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: "flutter-mobile",
    title: "Flutter & Cross-Platform Mobile App Development",
    shortDesc: "High-performance iOS and Android applications crafted with a single pristine codebase, native animations, and seamless offline persistence.",
    fullDesc: "Specializing in robust cross-platform mobile engineering with Flutter & Dart. We build apps that look and feel completely native across iOS and Android while cutting time-to-market in half. Includes reactive state management (Bloc, Riverpod), complex animations, hardware sensor integration, and push notifications.",
    iconName: "Smartphone",
    tags: ["Flutter", "Dart", "iOS", "Android", "Bloc / Riverpod", "REST APIs", "Offline SQLite"],
    deliverables: ["Cross-platform iOS & Android app", "State architecture & clean separation", "App store / Play Store release builds", "Automated unit and widget test suite"],
    architecture: "Clean Architecture with decoupled Domain, Data, and Presentation layers."
  },
  {
    id: "website-development",
    title: "Website Development",
    shortDesc: "Modern, responsive, and blazingly fast web applications engineered with modern TypeScript frameworks and optimized UI systems.",
    fullDesc: "Creating responsive, accessible, and SEO-optimized web applications with modern frontend stacks (React, Next.js, TypeScript, Tailwind CSS). Every interface is tuned for 60fps interaction, sub-second load times, and dynamic device responsiveness.",
    iconName: "Globe",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Next.js", "Web Performance", "Responsive UI"],
    deliverables: ["Fully responsive modern web application", "Design system with modular components", "SEO-optimized structure & meta tags", "Fast loading & Lighthouse audit 95+"],
    architecture: "Component-driven atomic hierarchy with server/client state caching."
  },
  {
    id: "desktop-apps",
    title: "Desktop Application Development",
    shortDesc: "Native and cross-platform desktop applications for Windows, macOS, and Linux with local hardware efficiency and smooth multitasking.",
    fullDesc: "Building native desktop solutions utilizing Flutter Desktop and modern desktop runtime architectures. Designed for heavy local workloads, file system I/O, offline-first data synchronization, and custom system tray/shortcut integrations.",
    iconName: "Monitor",
    tags: ["Flutter Desktop", "Windows", "macOS", "Linux", "File I/O", "Native System APIs"],
    deliverables: ["Cross-platform desktop installers (.exe, .dmg, .deb)", "Local hardware & peripheral integration", "Offline database caching & file export", "Custom keyboard shortcuts & multi-window support"],
    architecture: "Native OS bridge channels with multi-threaded background workers."
  },
  {
    id: "backend-api",
    title: "Backend Development & REST API Integration",
    shortDesc: "Scalable server architectures, high-throughput RESTful APIs, secure authentication, and robust database models.",
    fullDesc: "Engineering rock-solid backends with Node.js, Express, and modern API standards. From structured RESTful endpoints and microservices to relational schema design, JWT authentication, rate limiting, and third-party webhook integrations.",
    iconName: "Server",
    tags: ["Node.js", "Express", "REST APIs", "PostgreSQL", "Authentication / JWT", "API Security"],
    deliverables: ["Scalable RESTful API service", "Comprehensive Swagger/OpenAPI documentation", "Relational database schema & migrations", "JWT & Role-based access control (RBAC)"],
    architecture: "Layered MVC/Domain architecture with transactional database repositories."
  },
  {
    id: "custom-software",
    title: "Custom Software Development",
    shortDesc: "Tailored enterprise solutions and specialized software systems crafted to solve specific business and workflow challenges.",
    fullDesc: "Developing bespoke software tools tailored exactly to unique operational workflows. Whether automated data processing pipelines, custom inventory management, or proprietary algorithmic tools, every system is engineered for longevity and maintainability.",
    iconName: "Cpu",
    tags: ["Custom Solutions", "Automation", "Workflow Optimization", "Data Pipelines", "System Architecture"],
    deliverables: ["Custom business software solution", "Technical architecture specification", "Comprehensive source code repository", "Deployment and maintenance runbook"],
    architecture: "Modular extensible plugin architecture with strict contract interfaces."
  },
  {
    id: "ui-ux-implementation",
    title: "UI/UX Implementation",
    shortDesc: "Pixel-perfect translation of design concepts into interactive, high-fidelity interfaces with fluid micro-interactions.",
    fullDesc: "Bridging the gap between creative visual designs and rock-solid code. Transforming Figma blueprints into accessible, responsive, pixel-accurate web and mobile UIs with micro-interactions, smooth gestures, and Dark/Light visual themes.",
    iconName: "Palette",
    tags: ["Figma to Code", "Micro-Interactions", "Motion Design", "Design Systems", "Accessibility (a11y)"],
    deliverables: ["Pixel-perfect responsive implementation", "Component library with reusable tokens", "Fluid gesture and state animations", "WCAG accessibility adherence"],
    architecture: "Design Token system coupled with zero-runtime utility styling."
  },
  {
    id: "software-integration",
    title: "Software Integration & Digital Solutions",
    shortDesc: "Harmonizing disparate software ecosystems, payment gateways, cloud services, and legacy platforms into unified digital pipelines.",
    fullDesc: "Connecting multi-vendor tools, cloud platforms, payment processors (Stripe, PayPal), CRM systems, and third-party APIs. Eliminating data silos through reliable webhook handlers, ETL data synchronization, and automated error recovery.",
    iconName: "Layers",
    tags: ["Payment Gateways", "Cloud Integration", "Webhooks", "Third-Party APIs", "Data Sync"],
    deliverables: ["Secure third-party API pipelines", "Automated webhook ingestion & retries", "Payment & billing workflow integration", "Integration monitoring & logging"],
    architecture: "Event-driven asynchronous messaging with idempotent request processing."
  }
];

export const SKILLS: SkillItem[] = [
  // Programming Languages
  { name: "Dart", category: "languages", level: "Specialization", description: "Primary language for Flutter cross-platform mobile, desktop, and asynchronous concurrency." },
  { name: "JavaScript / TypeScript", category: "languages", level: "Specialization", description: "Strictly typed modern frontend and backend development with strong ESNext features." },
  { name: "Python", category: "languages", level: "Proficient", description: "Scripting, automation, data manipulation, and backend microservice integration." },
  { name: "C++ / Native Bridges", category: "languages", level: "Proficient", description: "Performance-critical desktop plugins and platform channel bindings." },
  { name: "SQL", category: "languages", level: "Specialization", description: "Relational database schema modeling, indexing, joins, and transaction management." },
  { name: "HTML5 & CSS3 / Modern", category: "languages", level: "Specialization", description: "Semantic markup, modern layout algorithms (Grid/Flexbox), and GPU-accelerated styling." },

  // Flutter & Mobile
  { name: "Flutter Framework", category: "mobile", level: "Core", description: "Declarative widget trees, custom painters, render objects, and multi-platform compilation.", highlight: true },
  { name: "Bloc / Cubit Architecture", category: "mobile", level: "Core", description: "Predictable, testable event-driven state management for enterprise applications.", highlight: true },
  { name: "Riverpod & Provider", category: "mobile", level: "Core", description: "Reactive dependency injection, safe scope management, and asynchronous data providers." },
  { name: "Platform Channels & FFI", category: "mobile", level: "Proficient", description: "Direct low-level communication with native Android (Java/Kotlin) and iOS (Swift/Obj-C)." },
  { name: "Local Caching (Hive/Isar/SQLite)", category: "mobile", level: "Specialization", description: "Offline-first architectures, encrypted local storage, and reactive data streams." },
  { name: "Mobile UI & Motion", category: "mobile", level: "Specialization", description: "Custom route transitions, hero animations, and 60fps gesture physics." },

  // Frontend
  { name: "React.js & Hooks", category: "frontend", level: "Core", description: "Functional components, custom hooks, synthetic event architecture, and concurrent rendering.", highlight: true },
  { name: "Next.js", category: "frontend", level: "Proficient", description: "Hybrid static generation, server components, and performant web portals." },
  { name: "Tailwind CSS", category: "frontend", level: "Core", description: "Design-token utility styling, responsive viewport scaling, and dark-mode systems.", highlight: true },
  { name: "Three.js & 3D WebGL", category: "frontend", level: "Specialization", description: "Interactive 3D scenes, PBR materials, custom shaders, and procedural kinetic geometry.", highlight: true },
  { name: "State Management (Redux/Zustand)", category: "frontend", level: "Specialization", description: "Centralized state stores, immutable state transitions, and persistent stores." },

  // Backend
  { name: "Node.js & Runtime", category: "backend", level: "Core", description: "Event loop architecture, non-blocking I/O, cluster processing, and buffer management.", highlight: true },
  { name: "Express.js", category: "backend", level: "Core", description: "Modular routing, middleware pipelines, rate-limiting, and error interception.", highlight: true },
  { name: "RESTful API Design", category: "backend", level: "Core", description: "Semantic status codes, resource nesting, pagination, filtering, and OpenAPI specs.", highlight: true },
  { name: "Authentication (JWT & OAuth2)", category: "backend", level: "Specialization", description: "Stateless tokens, refresh token rotation, bcrypt hashing, and role permissions." },
  { name: "WebSockets & Real-Time", category: "backend", level: "Proficient", description: "Bidirectional persistent connections for live notifications and collaborative feeds." },

  // Databases
  { name: "PostgreSQL", category: "databases", level: "Core", description: "ACID compliance, complex queries, foreign keys, JSONB columns, and query optimization.", highlight: true },
  { name: "MongoDB", category: "databases", level: "Proficient", description: "Document schemas, aggregation pipelines, dynamic indexing, and flexible persistence." },
  { name: "SQLite & Embedded DBs", category: "databases", level: "Specialization", description: "Ultra-fast, zero-configuration local embedded databases for mobile & desktop software." },
  { name: "Redis", category: "databases", level: "Proficient", description: "In-memory caching, pub/sub messaging channels, and rate-limiting store." },

  // Tools & DevOps
  { name: "Git & GitHub Workflow", category: "tools", level: "Core", description: "Feature branching, pull requests, semantic commit conventions, and code review.", highlight: true },
  { name: "Docker & Containerization", category: "tools", level: "Proficient", description: "Multi-stage builds, environment isolation, and reproducible container images." },
  { name: "Postman & API Testing", category: "tools", level: "Core", description: "Automated test collections, environment variables, and contract verification." },
  { name: "CI / CD Pipelines", category: "tools", level: "Proficient", description: "Automated linting, building, and deployment triggers across staging and production." },
  { name: "Linux & Bash Environment", category: "tools", level: "Specialization", description: "Server deployment, system daemon management, shell scripting, and monitoring." }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: "aeropulse-logistics",
    title: "AeroPulse — Cross-Platform Fleet & Logistics Platform",
    category: "mobile",
    shortDesc: "Unified mobile and web operations platform for real-time fleet telematics, delivery dispatching, and offline telemetry tracking.",
    fullDesc: "A complete logistics tracking system designed to operate in low-bandwidth and offline environments. Built with Flutter for mobile drivers with offline SQLite queueing, paired with an event-driven Node.js backend streaming updates via WebSockets.",
    stack: ["Flutter", "Dart", "Node.js", "PostgreSQL", "WebSockets", "Map Integration"],
    features: [
      "Offline-first route telemetry with automatic background sync",
      "Interactive route path rendering with milestone checklists",
      "Driver manifest scanning and instant proof-of-delivery capture",
      "Real-time dispatch dashboard with sub-second driver location updates"
    ],
    architectureHighlight: "Clean Bloc architecture on mobile; asynchronous message queue processing on the backend.",
    badge: "Featured Mobile Solution",
    accentColor: "from-blue-500 to-cyan-500",
    previewUrl: "#demo-aeropulse",
    githubUrl: "https://github.com"
  },
  {
    id: "nexuscore-cloud",
    title: "NexusCore — Enterprise Cloud Infrastructure Hub",
    category: "web",
    shortDesc: "Modern cloud resource management dashboard with interactive infrastructure topology, metric visualizations, and RBAC control.",
    fullDesc: "Designed for DevOps engineers and tech leads to monitor cluster health, deploy container workloads, and inspect system audit logs in real time. Features responsive dark-mode layouts, custom SVG metrics, and modular widget customizers.",
    stack: ["React.js", "TypeScript", "Tailwind CSS", "Express.js", "Redis", "REST APIs"],
    features: [
      "Dynamic node cluster topology visualizer with latency indicators",
      "Fine-grained role-based permission control (Admin, Lead, Viewer)",
      "Instant telemetry filters with zero-latency client caching",
      "Automated alerting webhooks and audit log export (CSV/JSON)"
    ],
    architectureHighlight: "Optimized React Virtualization for thousands of real-time server log entries without frame drops.",
    badge: "Web Application",
    accentColor: "from-indigo-500 to-blue-500",
    previewUrl: "#demo-nexuscore",
    githubUrl: "https://github.com"
  },
  {
    id: "omnidesk-workflow",
    title: "OmniDesk — Native Multi-Platform Productivity Suite",
    category: "desktop",
    shortDesc: "High-throughput desktop workstation tool for engineering teams featuring offline markdown documentation, task boards, and file vaults.",
    fullDesc: "Engineered specifically for desktop hardware across Windows, macOS, and Linux. Takes advantage of native file system I/O, SQLite database engines, hotkeys, and window docking management for uninterrupted engineering workflows.",
    stack: ["Flutter Desktop", "Dart", "C++ Native FFI", "SQLite", "Local Encryption"],
    features: [
      "Sub-millisecond local search indexing across thousands of technical documents",
      "Hardware-accelerated window split views and custom workspace tabs",
      "AES-256 encrypted local database vault for sensitive engineering credentials",
      "Global system tray daemon with background task synchronization"
    ],
    architectureHighlight: "Native C++ file-watching bridge for instant bidirectional file system synchronization.",
    badge: "Desktop Application",
    accentColor: "from-violet-500 to-purple-500",
    previewUrl: "#demo-omnidesk",
    githubUrl: "https://github.com"
  },
  {
    id: "finedge-microservice",
    title: "FinEdge — High-Throughput RESTful Payment Gateway API",
    category: "backend",
    shortDesc: "Resilient transactional backend engine built to process multi-currency payments, ledger reconciliation, and webhook notifications.",
    fullDesc: "A modular Node.js REST API service built with strict transactional semantics, PostgreSQL row-level locks, and Redis token bucket rate limiting. Implements idempotent requests, signature validation, and OpenAPI 3.0 documentation.",
    stack: ["Node.js", "Express", "PostgreSQL", "Redis", "Docker", "Jest"],
    features: [
      "Idempotent payment transactions preventing double billing under high concurrency",
      "HMAC-SHA256 signature verification on inbound and outbound webhooks",
      "Comprehensive Swagger / OpenAPI specification for frictionless integration",
      "Automated integration test suite verifying edge case failure states"
    ],
    architectureHighlight: "Distributed lock pattern using Redis and serializable database transaction isolation.",
    badge: "Backend & REST API",
    accentColor: "from-emerald-500 to-teal-500",
    previewUrl: "#demo-finedge",
    githubUrl: "https://github.com"
  },
  {
    id: "kryptex-vault",
    title: "Kryptex — Secure Encrypted Document & Asset Vault",
    category: "mobile",
    shortDesc: "End-to-end encrypted mobile client for secure credential storage, biometric access, and tamper-evident audit trails.",
    fullDesc: "Built for privacy-conscious organizations requiring secure on-device document verification. Integrates native biometric authentication (FaceID / Fingerprint), encrypted local storage, and secure QR code cryptographic key exchange.",
    stack: ["Flutter", "Dart", "Biometrics API", "Hive DB", "Cryptographic Ciphers"],
    features: [
      "Zero-knowledge client-side encryption before any data touches persistence",
      "Hardware-backed secure enclave key storage via native platform channels",
      "Biometric unlock with automated session expiration and memory wiping",
      "Tamper-evident verification hash chain for all stored assets"
    ],
    architectureHighlight: "Decoupled crypto service layer adhering to OWASP Mobile Security standards.",
    badge: "Mobile Security",
    accentColor: "from-amber-500 to-orange-500",
    previewUrl: "#demo-kryptex",
    githubUrl: "https://github.com"
  },
  {
    id: "veloce-commerce",
    title: "Veloce — High-Performance E-Commerce & Inventory Portal",
    category: "web",
    shortDesc: "Modular headless digital storefront and merchant dashboard with instant catalogue filtering, cart persistence, and order workflows.",
    fullDesc: "A clean digital commerce platform engineered for lightning-quick product browsing, stateful cart persistence, and a unified merchant inventory management console. Features optimistic UI updates and responsive mobile navigation.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    features: [
      "Sub-50ms instant faceted filtering across thousands of product SKUs",
      "Persistent stateful cart synced seamlessly across browser tabs",
      "Merchant stock management dashboard with low-inventory warnings",
      "Accessible checkout workflow with inline field validation"
    ],
    architectureHighlight: "Server-side rendering paired with optimistic client mutations for zero-latency interactions.",
    badge: "Full-Stack Web",
    accentColor: "from-sky-500 to-indigo-500",
    previewUrl: "#demo-veloce",
    githubUrl: "https://github.com"
  }
];

export const PROCESS_STEPS: ProcessStep[] = [
  {
    stepNumber: 1,
    title: "Requirement Analysis",
    summary: "Deep discovery into project objectives, user personas, technical constraints, and measurable success criteria.",
    details: "Every successful software project starts with clarity. I examine business workflows, edge cases, scalability targets, and third-party dependencies to ensure we engineer the exact solution required.",
    deliverables: ["Product Requirements Specification", "Technical Feasibility Assessment", "Scope & Milestone Roadmap"],
    toolsUsed: ["Architecture Diagrams", "Workflow Mapping", "Specification Docs"]
  },
  {
    stepNumber: 2,
    title: "Planning & Architecture",
    summary: "Designing the system blueprint, database models, API contracts, and technology stack selection.",
    details: "Architecting a modular, clean structure prior to coding. Choosing the right state management approach (Bloc, Riverpod, React Context), designing relational schemas, and defining REST API contracts.",
    deliverables: ["System Architecture Diagram", "Database Entity Relationship Diagram (ERD)", "API Contract Specifications"],
    toolsUsed: ["DB Schema Tools", "Swagger/OpenAPI", "Modular Design Patterns"]
  },
  {
    stepNumber: 3,
    title: "UI/UX Implementation",
    summary: "Transforming design prototypes into interactive, accessible, and responsive visual component systems.",
    details: "Translating wireframes and visual tokens into living components. Implementing responsive layouts, gesture animations, touch targets, keyboard navigation, and dark/light color systems.",
    deliverables: ["Reusable Design System Components", "Interactive Prototype Walkthrough", "Responsive Multi-Screen Layouts"],
    toolsUsed: ["Figma Specs", "Tailwind CSS", "Flutter Widget System", "Motion Design"]
  },
  {
    stepNumber: 4,
    title: "Development",
    summary: "Writing clean, modular, and maintainable code adhering to industry standards and strict typing.",
    details: "Executing the core application logic. Decoupling business logic from UI representation, writing type-safe models, implementing offline storage, integrating REST APIs, and structuring clean repositories.",
    deliverables: ["Clean, Well-Commented Codebase", "Decoupled Service Repositories", "Integration of APIs and Data Layers"],
    toolsUsed: ["VS Code / Android Studio", "Git Version Control", "Dart / TypeScript / Node.js"]
  },
  {
    stepNumber: 5,
    title: "Testing & Optimization",
    summary: "Rigorous unit testing, responsive verification, latency profiling, and security auditing.",
    details: "Ensuring stability, zero regressions, and optimal runtime efficiency. Profiling memory usage, checking network retries, verifying input validation, and verifying 60fps rendering across multiple devices.",
    deliverables: ["Automated Unit & Integration Tests", "Performance Benchmark Audit", "Security & Validation Verification"],
    toolsUsed: ["Jest", "Flutter Test Driver", "Postman Test Runner", "Browser DevTools"]
  },
  {
    stepNumber: 6,
    title: "Deployment & Delivery",
    summary: "Packaging production release builds, configuring environments, and delivering comprehensive documentation.",
    details: "Preparing production-ready binaries (.apk/.aab, .ipa, desktop bundles, or web builds). Setting up environment configurations, release tagging, and providing clear handover documentation.",
    deliverables: ["Production-Ready Release Builds", "Deployment Runbook & Documentation", "Post-Deployment Verification"],
    toolsUsed: ["Docker", "App Store Connect / Play Console", "Git Release Tags", "Cloud Platforms"]
  }
];

export const ENGINEERING_PHILOSOPHY = [
  {
    title: "Clean, Maintainable Architecture",
    description: "Code should be written for humans first and machines second. I adhere to clean architecture patterns, separation of concerns, and rigorous typing so projects remain easy to maintain and scale over years."
  },
  {
    title: "Performance & User Experience",
    description: "A digital product is only as good as the experience it delivers to the user. I obsess over sub-second response times, 60fps smooth animations, zero layout shifts, and predictable offline behavior."
  },
  {
    title: "Cross-Platform Efficiency Without Compromise",
    description: "Whether building in Flutter for mobile and desktop or React for the web, I ensure the software feels authentic to each target platform while maximizing codebase reuse and velocity."
  },
  {
    title: "Pragmatic Problem Solving",
    description: "I don't choose technologies based on hype; I select the right tool for the specific problem at hand, balancing technical elegance with business impact, security, and delivery speed."
  }
];
