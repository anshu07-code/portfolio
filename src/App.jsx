import { useState, useEffect, useRef } from "react";

const RESUME_DATA = {
  name: "Utkarsh Bhashkar",
  title: "SAP EWM Expert & Supply Chain Consultant",
  location: "Jharkhand, India – 822102",
  phone: "+91 8340688151",
  email: "utkarshbhashkar@outlook.com",
  linkedin: "https://www.linkedin.com/in/ubhash",
  summary: "SAP EWM (Extended Warehouse Management) Expert with 8+ years of cross-industry experience. Specialized in SAP S/4HANA implementations, warehouse automation, and end-to-end supply chain solutions across Automotive, Retail, and Manufacturing sectors.",
  skills: ["SAP EWM","SAP S/4HANA","SAP Signavio","MFS & Automation","Supply Chain Management","Agile PM","ASRS Integration","3PL Integration","IDoc/Interface","Warehouse Management","ServiceNow","SAP Fiori","ABAP Basics","UAT Testing","Cutover Planning"],
  experience: [
    {
      company: "Westernacher Consulting India Pvt Ltd",
      hq: "HQ Germany",
      role: "SAP EWM Consultant",
      period: "Sept 2022 – Present",
      highlights: [
        "Led full-cycle SAP S/4HANA Embedded EWM 2023 Greenfield implementation covering Inbound, Outbound, Internal Warehouse, and Physical Inventory processes",
        "Managed full project lifecycle — Blueprint, requirement gathering, solution design, configuration, testing, cutover, deployment, and hypercare",
        "Worked on automation projects with 3rd Party ASRS integration (Mirle vendor)",
        "Handled Pre-Sales engagements for Automotive, Kitchen Appliances & Cookware industries including POCs, demos, and solution presentations",
        "Configured EWM Master Data, Warehouse Structure and Process Types aligned with client requirements",
        "Designed Putaway & Picking strategies, HU Management, and Batch/Serial Number management",
        "Partnered with technical teams for custom developments including PPF actions and Smart Forms",
        "Conducted Key User and End-User Training sessions; delivered internal SAP EWM MFS and ABAP enablement sessions",
        "Worked on 3PL system integration and IDoc/interface handling for end-to-end supply chain visibility"
      ]
    },
    {
      company: "Genius Consultants Limited",
      hq: "Site of Reliance Retail",
      role: "Senior Supervisor",
      period: "Jun 2019 – Sept 2022",
      highlights: [
        "Managed staffs, planning, picking, packing & shipping as per customer requirements",
        "Set performance goals and deadlines aligned with company vision",
        "Organized workflow and ensured clear delegation of tasks to employees"
      ]
    },
    {
      company: "DHL Supply Chain India Pvt Ltd",
      hq: "Site of Tata Steel",
      role: "EWM Power User",
      period: "Sept 2017 – Jun 2019",
      highlights: [
        "Worked as EWM Power user in Decentralized SAP EWM 9.5 for a steel manufacturing warehouse",
        "Gained implementation experience under expert supervision and hypercare support",
        "Worked on CIFs (Core Integration models) to EWM systems",
        "Prepared daily, weekly and monthly DM MIS Reports for inbound, outbound, and quality assurance"
      ]
    }
  ],
  education: [
    { degree: "MBA – Operations Management", institution: "IGNOU, New Delhi", period: "Jul 2024 – Present" },
    { degree: "B.Tech – Computer Science & Engineering", institution: "VTU, Belagavi, Karnataka", period: "Aug 2019 – Jul 2022" },
    { degree: "Diploma – Computer Science & Engineering", institution: "Govt. Polytechnic, Bokaro, Jharkhand", period: "Aug 2014 – Jul 2017" }
  ],
  certifications: [
    "SAP Certified Application Associate – Extended Warehouse Management with SAP S/4HANA 2020",
    "Tricentis Tosca Fundamentals – Automatic Web Application Testing (AS1)",
    "Learning the Basics of SAP Fiori – Record of Achievement"
  ],
  awards: ["Smart Performer of the Year 2022-23 – Westernacher Consulting"],
  languages: ["English: Native", "Hindi: Native"]
};

const SKILL_DESCRIPTIONS = {
  "SAP EWM": "Over 6 years of hands-on experience with SAP Extended Warehouse Management across S/4HANA Embedded and Decentralized 9.5 versions. Led full-cycle greenfield implementations covering Inbound, Outbound, Internal Warehouse, Physical Inventory, and Value-Added Services. Configured warehouse structures, process types, and handling unit management for global clients.",
  "SAP S/4HANA": "Expert in SAP S/4HANA 2023 Embedded EWM greenfield implementations. Managed the full project lifecycle from blueprint through hypercare, including system configuration, integration testing, and end-user training. Deep understanding of S/4HANA architecture and its integration with EWM, TM, and other logistics modules.",
  "SAP Signavio": "Utilized SAP Signavio for business process modeling, analysis, and optimization during pre-sales and implementation phases. Mapped as-is and to-be warehouse processes to identify inefficiencies and design streamlined workflows aligned with industry best practices.",
  "MFS & Automation": "Configured and implemented Material Flow Systems (MFS) for automated warehouse environments. Worked on ASRS (Automated Storage and Retrieval System) integration projects, including 3rd party vendor coordination with Mirle. Designed control interfaces between EWM and material handling equipment.",
  "Supply Chain Management": "8+ years of end-to-end supply chain experience spanning warehouse operations, logistics, inventory management, and distribution. Worked across Automotive, Retail, Steel, and Manufacturing sectors, delivering solutions that optimize cost, efficiency, and service levels.",
  "Agile PM": "Applied Agile project management methodologies in SAP implementation projects. Facilitated sprint planning, daily stand-ups, and retrospectives. Experienced in managing cross-functional teams and delivering incremental value through iterative development cycles.",
  "ASRS Integration": "Led automation projects integrating SAP EWM with Automated Storage and Retrieval Systems (ASRS) from Mirle. Designed warehouse control interfaces, coordinated with automation vendors, and configured MFS for seamless material flow between EWM and automated equipment.",
  "3PL Integration": "Worked extensively on third-party logistics (3PL) system integration with SAP EWM. Designed and implemented IDoc interfaces for real-time data exchange between EWM and 3PL systems, ensuring end-to-end supply chain visibility and seamless warehouse operations.",
  "IDoc/Interface": "Partnered with technical teams to design and implement IDoc-based interfaces between SAP EWM and external systems. Configured Intermediate Documents for inbound/outbound data exchange, including integration with 3PL, ASRS, and enterprise systems for streamlined operations.",
  "Warehouse Management": "Deep expertise in warehouse management operations including inbound/outbound processing, putaway and picking strategies, handling unit management, batch and serial number tracking, physical inventory, and cross-docking across multiple industries.",
  "ServiceNow": "Used ServiceNow for IT service management, incident tracking, and change management in SAP support and implementation projects. Managed ticket resolution, service requests, and ensured SLA compliance for production support activities.",
  "SAP Fiori": "Completed SAP Fiori Basics certification. Worked with Fiori launchpad configuration and tile setup for EWM warehouse users. Designed role-based Fiori apps to enhance user experience and mobile accessibility for warehouse supervisors and operators.",
  "ABAP Basics": "Delivered internal SAP EWM MFS and ABAP enablement sessions. Possess foundational ABAP skills including debugging, basic enhancements, and understanding of PPF actions and Smart Forms for custom output configuration in EWM.",
  "UAT Testing": "Conducted and managed User Acceptance Testing (UAT) for SAP EWM implementations. Created test scripts, coordinated with key users, tracked defects, and ensured system readiness before go-live. Experienced in Tricentis Tosca for test automation.",
  "Cutover Planning": "Led cutover activities for SAP S/4HANA EWM go-lives including data migration validation, system readiness checks, user coordination, and hypercare support. Developed detailed cutover plans and managed execution to ensure zero-downtime transitions.",
};

const SYSTEM_PROMPT = `You are Utkarsh's personal portfolio assistant. You know everything about Utkarsh Bhashkar:

PERSONAL: Name: Utkarsh Bhashkar. Location: Jharkhand, India – 822102. Phone: +91 8340688151. Email: utkarshbhashkar@outlook.com. LinkedIn: www.linkedin.com/in/ubhash.

PROFESSIONAL SUMMARY: SAP EWM Expert with 8+ years of cross-industry experience in SAP S/4HANA implementations, warehouse automation, and supply chain solutions. Currently at Westernacher Consulting India (HQ Germany) since Sept 2022.

CURRENT ROLE at Westernacher Consulting: Led full-cycle SAP S/4HANA Embedded EWM 2023 Greenfield implementations. Worked with ASRS automation (Mirle), 3PL integrations, Pre-Sales for Automotive/Kitchen Appliances/Cookware. Expert in Putaway/Picking strategies, HU Management, Batch/Serial Number management.

PREVIOUS ROLES: Senior Supervisor at Genius Consultants (Reliance Retail site) Jun 2019–Sept 2022. EWM Power User at DHL Supply Chain (Tata Steel site) Sept 2017–Jun 2019.

EDUCATION: MBA Operations Management at IGNOU (2024–present), B.Tech CSE from VTU (2019–2022), Diploma CSE from Govt. Polytechnic Bokaro (2014–2017).

CERTIFICATIONS: SAP Certified EWM with S/4HANA 2020, Tricentis Tosca AS1, SAP Fiori Basics.

SKILLS: SAP EWM, SAP S/4HANA, SAP Signavio, MFS & Automation, Supply Chain Management, Agile PM, ASRS Integration, 3PL Integration, IDoc/Interface, Warehouse Management, ServiceNow, SAP Fiori, ABAP Basics.

AWARD: Smart Performer of the Year 2022-23 at Westernacher Consulting.

CONTACT: For professional inquiries email utkarshbhashkar@outlook.com or connect on LinkedIn: www.linkedin.com/in/ubhash.

Be concise, friendly, and professional. Answer questions about Utkarsh's experience, skills, availability, or how to contact him. If asked about topics outside his portfolio/professional life, politely redirect.`;

const SAMPLE_DATA = { foreign: [], local: [] };
const SAMPLE_PLACES = [];

const resumeData = { name: "Utkarsh Bhashkar", title: "SAP EWM Expert & Supply Chain Consultant", location: "Jharkhand, India – 822102", phone: "+91 8340688151", email: "utkarshbhashkar@outlook.com", linkedin: "https://www.linkedin.com/in/ubhash", summary: "SAP EWM Expert with 8+ years of cross-industry experience in SAP S/4HANA implementations, warehouse automation, and end-to-end supply chain solutions across Automotive, Retail, and Manufacturing sectors.", skills: ["SAP EWM","SAP S/4HANA","SAP Signavio","MFS & Automation","Supply Chain Management","Agile PM","ASRS Integration","3PL Integration","IDoc/Interface","Warehouse Management","ServiceNow","SAP Fiori","ABAP Basics","UAT Testing","Cutover Planning"], experience: [{ company: "Westernacher Consulting India Pvt Ltd", role: "SAP EWM Consultant", period: "Sept 2022 – Present", highlights: ["Led full-cycle SAP S/4HANA Embedded EWM 2023 Greenfield implementation covering Inbound, Outbound, Internal Warehouse, and Physical Inventory processes","Managed full project lifecycle — Blueprint, requirement gathering, solution design, configuration, testing, cutover, deployment, and hypercare","Worked on automation projects with 3rd Party ASRS integration (Mirle vendor)","Handled Pre-Sales engagements for Automotive, Kitchen Appliances & Cookware industries","Configured EWM Master Data, Warehouse Structure and Process Types","Designed Putaway & Picking strategies, HU Management, and Batch/Serial Number management","Partnered with technical teams for custom developments including PPF actions and Smart Forms","Conducted Key User and End-User Training sessions"]},{ company: "Genius Consultants Limited", role: "Senior Supervisor", period: "Jun 2019 – Sept 2022", highlights: ["Managed staffs, planning, picking, packing & shipping","Set performance goals and deadlines","Organized workflow and ensured clear delegation of tasks"]},{ company: "DHL Supply Chain", role: "EWM Power User", period: "Sept 2017 – Jun 2019", highlights: ["Managed end-to-end warehouse operations for Tata Steel account","Processed inbound/outbound deliveries using SAP EWM","Conducted physical inventory and cycle counts","Trained new users on EWM processes and transactions"]}], education: [{ degree: "MBA Operations Management", institution: "IGNOU", period: "2024 – Present" },{ degree: "B.Tech Computer Science & Engineering", institution: "VTU", period: "2019 – 2022" },{ degree: "Diploma Computer Science & Engineering", institution: "Govt. Polytechnic Bokaro", period: "2014 – 2017" }], certifications: ["SAP Certified EWM with S/4HANA 2020","Tricentis Tosca AS1","SAP Fiori Basics"], award: "Smart Performer of the Year 2022-23 at Westernacher Consulting" };

function portfolioAnswer(query) {
  const q = query.toLowerCase();
  const answers = [];
  const mentioned = [];

  // Helper: check keyword and push answer
  const match = (keywords, answer, label) => {
    if (keywords.some(k => q.includes(k))) {
      if (!mentioned.includes(label)) { answers.push(answer); mentioned.push(label); }
    }
  };

  // Greetings
  if (/^(hi|hello|hey|yo|sup|good morning|good evening|namaste|hii)\b/.test(q)) {
    answers.push(`👋 Hey there! I'm Utkarsh's AI assistant. Ask me anything about his experience, skills, projects, or how to reach him!`);
    mentioned.push("greeting");
  }

  if (/^(bye|goodbye|see you|later|thanks|thank you|thankyou)\b/.test(q)) {
    answers.push(`You're welcome! Feel free to come back anytime you have more questions about Utkarsh. 😊`);
    mentioned.push("farewell");
  }

  // Who is Utkarsh
  match(["who is", "about", "tell me about utkarsh", "introduce", "background"], `Utkarsh Bhashkar is an SAP EWM Expert & Supply Chain Consultant with 8+ years of experience. He's based in Jharkhand, India and currently works at Westernacher Consulting India (HQ Germany). He specializes in SAP S/4HANA implementations, warehouse automation, and end-to-end supply chain solutions.`, "who");

  // Current role
  match(["current role", "current job", "currently working", "what does he do now", "present role", "westernacher"], `Utkarsh is an SAP EWM Consultant at Westernacher Consulting India Pvt Ltd (HQ Germany), a role he's held since September 2022. He leads full-cycle SAP S/4HANA Embedded EWM greenfield implementations, works on ASRS automation projects with Mirle, handles Pre-Sales, and conducts training sessions.`, "current");

  // Previous roles
  match(["previous role", "previous job", "past experience", "before", "genius consultants", "dhl"], `Before Westernacher, Utkarsh worked as a Senior Supervisor at Genius Consultants Limited (Reliance Retail site) from June 2019 to September 2022, and before that as an EWM Power User at DHL Supply Chain (Tata Steel account) from September 2017 to June 2019.`, "previous");

  // Skills
  match(["skill", "expertise", "proficient", "technologies", "tools", "knows"], `Utkarsh has expertise in: SAP EWM, SAP S/4HANA, SAP Signavio, MFS & Automation, Supply Chain Management, Agile PM, ASRS Integration, 3PL Integration, IDoc/Interface, Warehouse Management, ServiceNow, SAP Fiori, ABAP Basics, UAT Testing, and Cutover Planning. Ask about any specific skill for more details!`, "skills");
  for (const sk of resumeData.skills) {
    if (q.includes(sk.toLowerCase())) {
      const desc = SKILL_DESCRIPTIONS[sk];
      if (desc) { answers.push(`**${sk}**: ${desc}`); mentioned.push(sk); }
    }
  }

  // Contact
  match(["email", "mail", "reach", "contact", "get in touch", "message"], `You can reach Utkarsh at: 📧 ${resumeData.email} or 📞 ${resumeData.phone}. For professional networking, connect on LinkedIn: ${resumeData.linkedin}.`, "contact");

  if (/linkedin|in\/ubhash/.test(q) && !mentioned.includes("contact")) {
    answers.push(`Utkarsh's LinkedIn profile: ${resumeData.linkedin}. Connect with him for professional inquiries!`);
    mentioned.push("linkedin");
  }

  // Phone
  if (/phone|call|whatsapp|mobile|83406/.test(q) && !mentioned.includes("contact")) {
    answers.push(`Utkarsh's phone number is ${resumeData.phone}. Feel free to reach out!`);
    mentioned.push("phone");
  }

  // Education
  match(["education", "study", "degree", "college", "university", "academic", "qualification", "b.tech", "mba", "diploma", "graduate"], `Utkarsh's educational background:\n• 🎓 MBA Operations Management — IGNOU (2024–Present)\n• 🎓 B.Tech Computer Science & Engineering — VTU (2019–2022)\n• 🎓 Diploma Computer Science & Engineering — Govt. Polytechnic Bokaro (2014–2017)`, "edu");

  // Certifications
  if (/certif|certification|credential|trained/.test(q)) {
    answers.push(`Utkarsh holds these certifications:\n• ✅ SAP Certified EWM with S/4HANA 2020\n• ✅ Tricentis Tosca AS1\n• ✅ SAP Fiori Basics`);
    mentioned.push("cert");
  }

  // Award
  if (/award|smart performer|recogni/.test(q)) {
    answers.push(`🏆 Utkarsh received the **Smart Performer of the Year 2022-23** award at Westernacher Consulting for his outstanding contributions.`);
    mentioned.push("award");
  }

  // Location
  match(["location", "based", "live", "reside", "jharkhand", "address", "city", "from"], `Utkarsh is based in Jharkhand, India (PIN: 822102). He's open to remote consulting and on-site opportunities across India and globally.`, "loc");

  // Experience years
  if (/years? of experience|work experience|total experience|how long|career/.test(q)) {
    answers.push(`Utkarsh has 8+ years of professional experience spanning SAP consulting, warehouse management, and supply chain operations.`);
    mentioned.push("exp");
  }

  // Resume download (site doesn't have one yet, but inform)
  if (/resume|CV|curriculum vitae|download|hire/.test(q)) {
    answers.push(`You can contact Utkarsh directly at ${resumeData.email} or connect on LinkedIn (${resumeData.linkedin}) for his detailed resume and consulting opportunities.`, "resume");
    mentioned.push("resume");
  }

  // Travel / samples
  if (/travel|place|photo|image|picture|gallery|dump/.test(q)) {
    answers.push(`🌍 Utkarsh's Travel Dumps section showcases his travel memories from around the world — from the Swiss Alps to the beaches of Iceland, and from Munnar's tea gardens to Ladakh's Pangong Lake. Scroll down to the Travel Dumps section to explore!`);
    mentioned.push("travel");
  }

  // Theme
  if (/theme|dark|light|eye comfort|mode/.test(q)) {
    answers.push(`🎨 This portfolio supports three themes: Dark (default), Light, and Eye Comfort. Click the theme toggle buttons in the top navigation bar to switch between them!`);
    mentioned.push("theme");
  }

  // Chat/about assistant
  if (/who are you|what can you do|help|assistant|chatbot/.test(q) && !mentioned.includes("greeting")) {
    answers.push(`🤖 I'm Utkarsh's AI portfolio assistant! I can answer questions about:\n• Utkarsh's professional experience & skills\n• His education & certifications\n• Contact information\n• Travel memories in the gallery\n• Anything else in this portfolio!\nJust ask away!`);
    mentioned.push("assistant");
  }

  // Fallback
  if (answers.length === 0) {
    answers.push(`I'm not sure I understood that. I can answer questions about Utkarsh's experience, skills, education, certifications, contact info, and travel gallery. Try asking something like "What are his skills?" or "How to contact Utkarsh?"`);
  }

  return answers.join("\n\n");
}

const passHash = (pw) => btoa(pw + ":ub_salt_2024");

const themes = {
  dark: { bg: "#0a0a0f", surface: "#111118", card: "#16161e", border: "#1e1e2a", text: "#e8e8f0", muted: "#6b6b7b", accent: "#7c3aed", gradStart: "#7c3aed", gradEnd: "#06b6d4", accentGlow: "rgba(124,58,237,0.15)", highlight: "#a78bfa" },
  light: { bg: "#f5f5fa", surface: "#ffffff", card: "#ffffff", border: "#e2e2ea", text: "#1a1a2e", muted: "#7a7a8a", accent: "#7c3aed", gradStart: "#7c3aed", gradEnd: "#06b6d4", accentGlow: "rgba(124,58,237,0.1)", highlight: "#7c3aed" },
  eye: { bg: "#1a2a1a", surface: "#1f301f", card: "#243624", border: "#2a442a", text: "#d8e8d8", muted: "#6a8a6a", accent: "#4ade80", gradStart: "#22c55e", gradEnd: "#06b6d4", accentGlow: "rgba(34,197,94,0.15)", highlight: "#6ee7a0" },
};

export default function Portfolio() {
  const [theme, setTheme] = useState("dark");
  const [activeSection, setActiveSection] = useState("hero");
  const [chatOpen, setChatOpen] = useState(false);
  const greeting = (() => {
    const h = new Date().getHours();
    const timeGreet = h < 12 ? "Good morning" : h < 17 ? "Good afternoon" : "Good evening";
    return `${timeGreet}! I'm Utkarsh's AI assistant. You can ask me about his experience, skills, certifications, education, contact details, travel dumps, or the portfolio itself! How can I help?`;
  })();
  const [messages, setMessages] = useState([{ role: "assistant", content: greeting }]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [travelTab, setTravelTab] = useState("foreign");
  const [mediaFiles, setMediaFiles] = useState(() => {
    try {
      const stored = localStorage.getItem("ub_media");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.foreign?.length || parsed.local?.length) return parsed;
      }
    } catch {}
    return JSON.parse(JSON.stringify(SAMPLE_DATA));
  });
  const [activeFilter, setActiveFilter] = useState("none");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [skillNodes, setSkillNodes] = useState([]);
  const [tooltipSkill, setTooltipSkill] = useState(null);
  const [tooltipXY, setTooltipXY] = useState({ x: 0, y: 0 });
  const [skillWebDims, setSkillWebDims] = useState({ cx: 0, cy: 0, r: 0 });
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassInput, setAdminPassInput] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState("");
  const [editFilter, setEditFilter] = useState("none");
  const [editBrightness, setEditBrightness] = useState(100);
  const [editContrast, setEditContrast] = useState(100);
  const [editSaturation, setEditSaturation] = useState(100);
  const [editCaption, setEditCaption] = useState("");
  const [editVisibility, setEditVisibility] = useState("public");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedIds, setLikedIds] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ub_liked")) || []; } catch { return []; }
  });
  const [visibleCount, setVisibleCount] = useState(3);
  const [places, setPlaces] = useState(() => {
    try {
      const stored = localStorage.getItem("ub_places");
      if (stored) return JSON.parse(stored);
    } catch {}
    return JSON.parse(JSON.stringify(SAMPLE_PLACES));
  });
  const [showPlacesEditor, setShowPlacesEditor] = useState(false);
  const [editPlaceName, setEditPlaceName] = useState("");
  const [editPlaceImage, setEditPlaceImage] = useState("");
  const [editingPlaceId, setEditingPlaceId] = useState(null);
  const [page, setPage] = useState(() => window.location.pathname === "/admin" ? "admin" : "portfolio");
  const [showTravel, setShowTravel] = useState(() => {
    try { const v = localStorage.getItem("ub_showTravel"); return v !== null ? JSON.parse(v) : true; } catch { return true; }
  });
  const [pHash, setPHash] = useState(() => {
    try { return localStorage.getItem("ub_pHash") || passHash("utkarsh@2024"); } catch { return passHash("utkarsh@2024"); }
  });
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPagePass, setAdminPagePass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [newPassConfirm, setNewPassConfirm] = useState("");
  const [passMsg, setPassMsg] = useState("");
  const [showForgotPass, setShowForgotPass] = useState(false);
  const [resetOtp, setResetOtp] = useState("");
  const [resetOtpInput, setResetOtpInput] = useState("");
  const [resetStep, setResetStep] = useState("send"); // send | verify | change
  const chatEndRef = useRef(null);
  const fileInputRef = useRef(null);
  const webCanvasRef = useRef(null);
  const networkCanvasRef = useRef(null);
  const placesTrackRef = useRef(null);
  const skillWebRef = useRef(null);
  const skillWebBoxRef = useRef(null);
  const skillParticleRef = useRef(null);
  const skillSvgRef = useRef(null);
  const t = themes[theme];

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  useEffect(() => { localStorage.setItem("ub_media", JSON.stringify(mediaFiles)); }, [mediaFiles]);
  useEffect(() => { localStorage.setItem("ub_liked", JSON.stringify(likedIds)); }, [likedIds]);
  useEffect(() => { localStorage.setItem("ub_places", JSON.stringify(places)); }, [places]);
  useEffect(() => { localStorage.setItem("ub_showTravel", JSON.stringify(showTravel)); }, [showTravel]);
  useEffect(() => { localStorage.setItem("ub_pHash", pHash); }, [pHash]);

  useEffect(() => {
    const handler = () => setPage(window.location.pathname === "/admin" ? "admin" : "portfolio");
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!selectedMedia) return;
    const handler = (e) => {
      if (e.key === "Escape") setSelectedMedia(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedMedia]);

  useEffect(() => {
    setVisibleCount(3);
  }, [searchQuery, travelTab, mediaFiles]);

  useEffect(() => {
    const canvas = webCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let animId;
    let time = 0;

    const COUNT = 64;
    const nodes = Array.from({ length: COUNT }, (_, i) => {
      const theta = Math.acos(2 * (i / COUNT) - 1);
      const phi = Math.PI * (1 + Math.sqrt(5)) * i;
      return {
        x: Math.sin(theta) * Math.cos(phi),
        y: Math.sin(theta) * Math.sin(phi),
        z: Math.cos(theta),
        r: 0.4 + Math.random() * 0.3,
      };
    });

    const cx = t.accent;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const size = Math.min(w, h) * 0.48;
      const ox = w * 0.5;
      const oy = h * 0.5;

      time += 0.004;
      const rotY = time;
      const rotX = Math.sin(time * 0.3) * 0.3;

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      const projected = nodes.map(n => {
        let x = n.x, y = n.y, z = n.z;
        const x1 = x * cosY + z * sinY;
        const z1 = -x * sinY + z * cosY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const scale = 400 / (400 + z2 * size);
        return {
          sx: ox + x1 * size * scale,
          sy: oy + y1 * size * scale,
          r: n.r * scale * 2,
          z: z2,
        };
      });

      ctx.clearRect(0, 0, w, h);

      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const a = projected[i], b = projected[j];
          const dx = a.sx - b.sx, dy = a.sy - b.sy;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 110 && a.z > -0.5 && b.z > -0.5) {
            const alpha = (1 - dist / 110) * 0.5;
            ctx.beginPath();
            ctx.moveTo(a.sx, a.sy);
            ctx.lineTo(b.sx, b.sy);
            ctx.strokeStyle = cx + Math.round(alpha * 255).toString(16).padStart(2, "0");
            ctx.lineWidth = 1.2;
            ctx.stroke();
          }
        }
      }

      projected.forEach(n => {
        if (n.z < -0.5) return;
        const alpha = (n.z + 1) * 0.5;
        const pulse = 0.7 + Math.sin(time * 2 + n.sx + n.sy) * 0.3;
        const rad = n.r * pulse * 2.5;
        const grd = ctx.createRadialGradient(n.sx, n.sy, 0, n.sx, n.sy, rad * 4);
        grd.addColorStop(0, cx + "ff");
        grd.addColorStop(0.3, cx + Math.round(alpha * 200).toString(16).padStart(2, "0"));
        grd.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, rad * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(n.sx, n.sy, rad * 0.6, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff" + Math.round(alpha * 220).toString(16).padStart(2, "0");
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => cancelAnimationFrame(animId);
  }, [theme]);

  useEffect(() => {
    const canvas = networkCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const dpr = window.devicePixelRatio || 1;
    let animId;
    let time = 0;

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      time += 0.008;
      const cx = w * 0.25, cy = h * 0.5;

      const colors = ["#7c3aed", "#06b6d4", "#a78bfa", "#22c55e", "#f59e0b", "#ec4899"];

      for (let ring = 0; ring < 6; ring++) {
        const baseR = 40 + ring * 55 + Math.sin(time * 0.6 + ring * 0.8) * 15;
        const color = colors[ring % colors.length];

        const ringGlow = ctx.createRadialGradient(cx, cy, baseR - 4, cx, cy, baseR + 4);
        ringGlow.addColorStop(0, "transparent");
        ringGlow.addColorStop(0.5, color + "22");
        ringGlow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
        ctx.fillStyle = ringGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(cx, cy, baseR, 0, Math.PI * 2);
        ctx.strokeStyle = color + "44";
        ctx.lineWidth = 1.5;
        ctx.setLineDash([6, 12]);
        ctx.stroke();
        ctx.setLineDash([]);

        for (let a = 0; a < 12; a++) {
          const angle = (a / 12) * Math.PI * 2 + time * (0.3 + ring * 0.05) + ring * 0.4;
          const x = cx + Math.cos(angle) * baseR;
          const y = cy + Math.sin(angle) * baseR;
          const dotPulse = 0.4 + Math.sin(time * 2.5 + a * 0.8 + ring) * 0.4;
          const dotR = 1.5 + dotPulse * 2;
          const dotGlow = ctx.createRadialGradient(x, y, 0, x, y, dotR * 5);
          dotGlow.addColorStop(0, color + Math.round(Math.max(0, dotPulse) * 200).toString(16).padStart(2, "0"));
          dotGlow.addColorStop(1, "transparent");
          ctx.beginPath();
          ctx.arc(x, y, dotR * 5, 0, Math.PI * 2);
          ctx.fillStyle = dotGlow;
          ctx.fill();
          ctx.beginPath();
          ctx.arc(x, y, dotR, 0, Math.PI * 2);
          ctx.fillStyle = "#ffffff" + Math.round(Math.max(0, dotPulse) * 220).toString(16).padStart(2, "0");
          ctx.fill();
        }
      }

      const targets = [
        { x: w * 0.88, y: h * 0.1 },
        { x: w * 0.92, y: h * 0.45 },
        { x: w * 0.88, y: h * 0.8 },
        { x: w * 0.75, y: h * 0.2 },
        { x: w * 0.78, y: h * 0.7 },
        { x: w * 0.55, y: h * 0.08 },
        { x: w * 0.55, y: h * 0.92 },
        { x: w * 0.68, y: h * 0.5 },
      ];

      targets.forEach((tgt, i) => {
        const pulse = Math.sin(time * 1.8 + i * 1.4) * 0.5 + 0.5;
        const color = colors[i % colors.length];

        const grad = ctx.createLinearGradient(cx, cy, tgt.x, tgt.y);
        grad.addColorStop(0, color + "55");
        grad.addColorStop(0.5, color + Math.round(pulse * 80).toString(16).padStart(2, "0"));
        grad.addColorStop(1, color + "33");
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(tgt.x, tgt.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5 + pulse;
        ctx.stroke();

        const dotR = 3 + pulse * 6;
        const dotGlow = ctx.createRadialGradient(tgt.x, tgt.y, 0, tgt.x, tgt.y, dotR * 6);
        dotGlow.addColorStop(0, color + Math.round(pulse * 255).toString(16).padStart(2, "0"));
        dotGlow.addColorStop(0.4, color + Math.round(pulse * 120).toString(16).padStart(2, "0"));
        dotGlow.addColorStop(1, "transparent");
        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, dotR * 6, 0, Math.PI * 2);
        ctx.fillStyle = dotGlow;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(tgt.x, tgt.y, dotR * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      });

      const hubGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 100);
      hubGlow.addColorStop(0, "#7c3aed99");
      hubGlow.addColorStop(0.3, "#7c3aed44");
      hubGlow.addColorStop(0.6, "#06b6d422");
      hubGlow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 100, 0, Math.PI * 2);
      ctx.fillStyle = hubGlow;
      ctx.fill();

      const coreGlow = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
      coreGlow.addColorStop(0, "#ffffffcc");
      coreGlow.addColorStop(0.3, "#7c3aedcc");
      coreGlow.addColorStop(1, "transparent");
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = coreGlow;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [theme]);

  // ─── SKILL WEB DATA ───
  const SKILL_WEB_ACCENT = "#d4a030";
  const SKILL_WEB_DATA = [
    { name: "SAP S/4HANA", cat: "sap", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "Core ERP, migration & implementation", angle: 324 },
    { name: "SAP EWM", cat: "sap", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "Extended Warehouse Management", angle: 348 },
    { name: "SAP Fiori", cat: "sap", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "UX layer & app customisation", angle: 12 },
    { name: "Supply Chain Management", cat: "supply", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "End-to-end supply planning", angle: 276 },
    { name: "Warehouse Management", cat: "supply", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "Stock, putaway & picking", angle: 300 },
    { name: "3PL Integration", cat: "supply", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "Third-party logistics connectors", angle: 252 },
    { name: "MFS & Automation", cat: "auto", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "Material Flow + PLC automation", angle: 84 },
    { name: "ASRS Integration", cat: "auto", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "Automated Storage & Retrieval", angle: 108 },
    { name: "ServiceNow", cat: "auto", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "ITSM & workflow automation", angle: 132 },
    { name: "ABAP Basics", cat: "tech", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "Custom reports, BAdIs & exits", angle: 60 },
    { name: "SAP Signavio", cat: "tech", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "Process modeling & intelligence", angle: 36 },
    { name: "IDoc/Interface", cat: "tech", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "EDI/IDoc mapping & middleware", angle: 156 },
    { name: "Cutover Planning", cat: "proc", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "Go-live coordination & migration", angle: 204 },
    { name: "UAT Testing", cat: "proc", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "User acceptance & test scripts", angle: 180 },
    { name: "Agile PM", cat: "proc", color: "#ecd898", bg: "rgba(10,10,22,0.55)", bc: "rgba(212,160,48,0.25)", desc: "Sprint planning & retrospectives", angle: 228 },
  ];

  // ─── BACKGROUND + WAVE ANIMATION ───
  useEffect(() => {
    const canvas = skillWebRef.current;
    const box = skillWebBoxRef.current;
    if (!canvas || !box) return;

    const dpr = window.devicePixelRatio || 1;
    let animId, time = 0;
    const waves = Array.from({ length: 4 }, (_, i) => ({ r: i * 40, speed: 0.4 + i * 0.08 }));
    const dots = Array.from({ length: 60 }, () => ({
      x: Math.random(), y: Math.random(), r: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.008 + 0.003, phase: Math.random() * Math.PI * 2,
    }));
    const colors = ["rgba(212,160,48,", "rgba(212,160,48,", "rgba(212,160,48,", "rgba(212,160,48,"];

    const draw = () => {
      const rect = box.getBoundingClientRect();
      const w = rect.width, h = rect.height;
      if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
        canvas.width = w * dpr;
        canvas.height = h * dpr;
      }
      const ctx = canvas.getContext("2d");
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      time += 0.016;

      const cx = w / 2, cy = h / 2;
      const maxR = Math.min(w, h) * 0.48;

      // Center glow
      const aura = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      aura.addColorStop(0, "rgba(212,160,48,0.06)");
      aura.addColorStop(0.5, "rgba(212,160,48,0.02)");
      aura.addColorStop(1, "transparent");
      ctx.fillStyle = aura;
      ctx.beginPath();
      ctx.arc(cx, cy, maxR, 0, Math.PI * 2);
      ctx.fill();

      // Wave rings
      waves.forEach(wave => {
        wave.r += wave.speed;
        if (wave.r > maxR) wave.r = 10;
        const alpha = Math.max(0, 0.5 - (wave.r / maxR) * 0.5);
        ctx.beginPath();
        ctx.arc(cx, cy, wave.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(212,160,48,${alpha * 0.6})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      });

      // Particles
      dots.forEach(d => {
        d.phase += d.speed;
        const px = d.x * w, py = d.y * h;
        ctx.beginPath();
        ctx.arc(px, py, d.r, 0, Math.PI * 2);
        ctx.fillStyle = colors[Math.floor((d.x * 4) % 4)] + (0.1 + 0.3 * Math.abs(Math.sin(d.phase))) + ")";
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, [theme]);

  // ─── SKILL LAYOUT + SVG ANIMATIONS ───
  useEffect(() => {
    const box = skillWebBoxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const w = rect.width, h = rect.height;
    const cx = w / 2, cy = h / 2;
    const r = Math.min(w, h) * 0.45;
    const positions = SKILL_WEB_DATA.map((sk) => {
      const rad = ((sk.angle - 90) * Math.PI) / 180;
      const px = cx + r * Math.cos(rad);
      const py = cy + r * Math.sin(rad);
      const mx = (cx + px) / 2 + (py - cy) * 0.3;
      const my = (cy + py) / 2 - (px - cx) * 0.3;
      return { ...sk, px, py, mx, my, w: Math.min(sk.name.length * 8 + 32, 200), h: 28 };
    });
    setSkillNodes(positions);
    setSkillWebDims({ cx, cy, r });

    const style = document.createElement("style");
    style.id = "skill-web-anim";
    style.textContent = `
      @keyframes skillDrawPath { from { stroke-dashoffset: 600; } to { stroke-dashoffset: 0; } }
      @keyframes skillChipIn { from { opacity: 0; transform: translate(-50%,-50%) scale(0.6); } to { opacity: 1; transform: translate(-50%,-50%) scale(1); } }
      @keyframes skillPulse { 0%,100% { opacity: 0.6; transform: scale(1); } 50% { opacity: 1; transform: scale(1.08); } }
      .skill-path { stroke-dasharray: 4, 7; stroke-linecap: round; animation: skillDrawPath 1.2s ease-out forwards; }
      .skill-chip { animation: skillChipIn 0.5s ease-out both; }
      .skill-avatar-pulse { animation: skillPulse 3s ease-in-out infinite; }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById("skill-web-anim")?.remove();
    };
  }, [theme]);

  const visibleMedia = (isAdmin
    ? mediaFiles[travelTab]
    : mediaFiles[travelTab].filter(m => m.visibility === "public")
  ).filter(m => !searchQuery || m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const navLinks = [
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "skills", label: "Skills" },
    { id: "education", label: "Education" },
    { id: "travel", label: "Travel Dumps" },
    { id: "contact", label: "Contact" },
  ];

  const goToAdmin = () => {
    window.history.pushState(null, "", "/admin");
    setPage("admin");
  };
  const goToPortfolio = () => {
    window.history.pushState(null, "", "/");
    setPage("portfolio");
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setMobileMenuOpen(false);
  };

  const sendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: "user", content: chatInput };
    setMessages(prev => [...prev, userMsg]);
    setChatInput("");
    setChatLoading(true);
    setTimeout(() => {
      const reply = portfolioAnswer(userMsg.content);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
      setChatLoading(false);
    }, 400);
  };

  const openEditor = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setEditFile(file);
    setEditPreview(URL.createObjectURL(file));
    setEditFilter("none");
    setEditBrightness(100);
    setEditContrast(100);
    setEditSaturation(100);
    setEditCaption(file.name.replace(/\.[^/.]+$/, ""));
    setEditVisibility("public");
    setShowEditor(true);
    e.target.value = "";
  };

  const handleDump = () => {
    if (!editFile) return;
    const file = editFile;
    const tab = travelTab;
    const caption = editCaption;
    const filt = editFilter;
    const bright = editBrightness;
    const con = editContrast;
    const sat = editSaturation;
    const vis = editVisibility;
    const prevUrl = editPreview;
    const reader = new FileReader();
    reader.onload = (e) => {
      const newItem = {
        id: Date.now() + Math.random(),
        url: e.target.result,
        type: file.type.startsWith("video") ? "video" : "image",
        name: caption || file.name,
        filter: filt,
        brightness: bright,
        contrast: con,
        saturation: sat,
        visibility: vis,
      };
      setMediaFiles(prev => ({ ...prev, [tab]: [...prev[tab], newItem] }));
      URL.revokeObjectURL(prevUrl);
    };
    reader.readAsDataURL(file);
    setShowEditor(false);
    setEditFile(null);
    setEditPreview("");
  };

  const applyFilter = (id, filter) => {
    setMediaFiles(prev => ({
      ...prev,
      [travelTab]: prev[travelTab].map(m => m.id === id ? { ...m, filter } : m)
    }));
  };

  const deleteMedia = (id) => {
    setMediaFiles(prev => ({ ...prev, [travelTab]: prev[travelTab].filter(m => m.id !== id) }));
    if (selectedMedia?.id === id) setSelectedMedia(null);
  };

  const toggleVisibility = (id) => {
    setMediaFiles(prev => ({
      ...prev,
      [travelTab]: prev[travelTab].map(m => m.id === id ? { ...m, visibility: m.visibility === "public" ? "private" : "public" } : m)
    }));
  };

  const openPlaceEditor = (p) => {
    if (p) { setEditPlaceName(p.name); setEditPlaceImage(p.image); setEditingPlaceId(p.id); }
    else { setEditPlaceName(""); setEditPlaceImage(""); setEditingPlaceId(null); }
    setShowPlacesEditor(true);
  };

  const savePlace = () => {
    if (!editPlaceName.trim()) return;
    if (editingPlaceId) {
      setPlaces(prev => prev.map(p => p.id === editingPlaceId ? { ...p, name: editPlaceName.trim(), image: editPlaceImage.trim() || p.image } : p));
    } else {
      const newPlace = { id: "p" + Date.now(), name: editPlaceName.trim(), image: editPlaceImage.trim() || `https://picsum.photos/id/${Math.floor(Math.random() * 200 + 1000)}/400/300` };
      setPlaces(prev => [...prev, newPlace]);
    }
    setShowPlacesEditor(false); setEditPlaceName(""); setEditPlaceImage(""); setEditingPlaceId(null);
  };

  const deletePlace = (id) => setPlaces(prev => prev.filter(p => p.id !== id));

  const handleAdminLogin = () => {
    if (adminPassInput === "utkarsh@2024") {
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassInput("");
    }
  };

  const cssFilter = (f, b = 100, c = 100, s = 100) => {
    const base = {
      none: "",
      vivid: "saturate(1.8) contrast(1.1)",
      warm: "sepia(0.4) saturate(1.3) brightness(1.05)",
      cool: "hue-rotate(30deg) saturate(1.2) brightness(1.05)",
      bw: "grayscale(1) contrast(1.2)",
      dramatic: "contrast(1.4) brightness(0.9) saturate(1.3)",
      vintage: "sepia(0.6) contrast(0.9) brightness(1.1)",
      fade: "opacity(0.85) saturate(0.7) brightness(1.1)"
    }[f] || "";
    const adj = `brightness(${b}%) contrast(${c}%) saturate(${s}%)`;
    return (base ? base + " " + adj : adj).trim();
  };

  const mediaCssFilter = (m) => cssFilter(m.filter, m.brightness ?? 100, m.contrast ?? 100, m.saturation ?? 100);

  const filters = ["none","vivid","warm","cool","bw","dramatic","vintage","fade"];

  const s = {
    app: { fontFamily: "'Inter', 'Segoe UI', sans-serif", background: t.bg, color: t.text, minHeight: "100vh", transition: "background 0.3s, color 0.3s" },
    nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: t.navBg, backdropFilter: "blur(20px)", borderBottom: `1px solid ${t.border}`, padding: "0 5%" },
    navInner: { maxWidth: 1200, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 },
    logo: { fontSize: 20, fontWeight: 700, color: t.highlight },
    navLinks: { display: "flex", gap: 8, alignItems: "center" },
    navLink: { background: "none", border: "none", color: t.muted, cursor: "pointer", padding: "6px 14px", borderRadius: 8, fontSize: 14, transition: "all 0.2s", fontFamily: "inherit" },
    themeToggle: { display: "flex", gap: 4, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 4 },
    themeBtn: (active) => ({ background: active ? t.accent : "none", border: "none", color: active ? "#fff" : t.muted, cursor: "pointer", padding: "4px 10px", borderRadius: 7, fontSize: 12, transition: "all 0.2s", fontFamily: "inherit" }),
    hero: { paddingTop: 120, paddingBottom: 80, paddingLeft: "5%", paddingRight: "5%", background: t.heroGrad, minHeight: "100dvh", display: "flex", alignItems: "center" },
    heroInner: { maxWidth: 1200, margin: "0 auto", width: "100%" },
    badge: { display: "inline-flex", alignItems: "center", gap: 6, background: t.accentGlow, border: `1px solid ${t.accent}44`, borderRadius: 20, padding: "6px 16px", fontSize: 13, color: t.highlight, marginBottom: 24 },
    h1: { fontSize: "clamp(36px,6vw,72px)", fontWeight: 800, lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-0.02em" },
    gradText: { color: t.highlight },
    heroSub: { fontSize: "clamp(16px,2vw,20px)", color: t.muted, maxWidth: 600, lineHeight: 1.7, marginBottom: 40 },
    btnRow: { display: "flex", gap: 16, flexWrap: "wrap" },
    btnPrimary: { background: `linear-gradient(90deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 600, cursor: "pointer", transition: "opacity 0.2s", fontFamily: "inherit" },
    btnOutline: { background: "none", border: `1px solid ${t.border}`, color: t.text, padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" },
    section: { padding: isMobile ? "56px 5%" : "80px 5%", maxWidth: 1200, margin: "0 auto" },
    sectionLabel: { fontSize: 12, fontWeight: 600, letterSpacing: "0.15em", color: t.accent, textTransform: "uppercase", marginBottom: 12 },
    sectionTitle: { fontSize: "clamp(28px,4vw,40px)", fontWeight: 700, marginBottom: 48, letterSpacing: "-0.02em" },
    card: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 28, transition: "border-color 0.2s, transform 0.2s" },
    expCard: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 28, marginBottom: 24, position: "relative", overflow: "hidden" },
    expAccent: { position: "absolute", left: 0, top: 0, bottom: 0, width: 3, background: `linear-gradient(180deg, ${t.gradStart}, ${t.gradEnd})` },
    tag: { display: "inline-block", background: t.accentGlow, border: `1px solid ${t.accent}33`, color: t.highlight, borderRadius: 8, padding: "4px 12px", fontSize: 12, fontWeight: 500, margin: "4px 4px 4px 0" },
    statGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px,1fr))", gap: 16, marginBottom: 48 },
    statCard: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 12, padding: "20px 16px", textAlign: "center" },
    statNum: { fontSize: 32, fontWeight: 800, color: t.accent },
    statLabel: { fontSize: 12, color: t.muted, marginTop: 4 },
    skillsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px,1fr))", gap: 12 },
    skillCard: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 10, padding: "14px 16px", fontSize: 13, fontWeight: 500, color: t.text, textAlign: "center", transition: "border-color 0.2s, background 0.2s", cursor: "default" },
    uploadBtn: { background: `linear-gradient(90deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", padding: "12px 24px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" },
    tabRow: { display: "flex", gap: 0, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: 4, marginBottom: 32, width: "fit-content" },
    tabBtn: (active) => ({ background: active ? t.accent : "none", border: "none", color: active ? "#fff" : t.muted, padding: "8px 24px", borderRadius: 8, cursor: "pointer", fontSize: 14, fontWeight: 500, transition: "all 0.2s", fontFamily: "inherit" }),
    contactGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px,1fr))", gap: 20 },
    contactCard: { background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: 28, display: "flex", flexDirection: "column", gap: 10, position: "relative", overflow: "hidden", transition: "all 0.3s ease", cursor: "default" },
    contactCardAccent: { position: "absolute", left: 0, top: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${t.gradStart}, ${t.gradEnd})`, opacity: 0.8 },
    contactIcon: { width: 48, height: 48, borderRadius: 14, background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 8, boxShadow: `0 4px 12px ${t.accentGlow}` },
    divider: { border: "none", borderTop: `1px solid ${t.border}`, margin: "0" },
    footer: { background: t.surface, borderTop: `1px solid ${t.border}`, padding: "32px 5%", textAlign: "center", color: t.muted, fontSize: 13 },
    // Chat
    chatFab: { position: "fixed", bottom: 32, right: 32, width: 56, height: 56, borderRadius: "50%", background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", fontSize: 24, cursor: "pointer", boxShadow: `0 4px 24px ${t.accentGlow}`, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", transition: "transform 0.2s" },
    chatWindow: { position: "fixed", bottom: 100, right: 32, width: 360, maxHeight: 520, background: t.card, border: `1px solid ${t.border}`, borderRadius: 20, display: "flex", flexDirection: "column", zIndex: 200, overflow: "hidden", boxShadow: `0 8px 40px rgba(0,0,0,0.4)` },
    chatHeader: { padding: "16px 20px", background: `linear-gradient(90deg, ${t.gradStart}, ${t.gradEnd})`, color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" },
    chatBody: { flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12, maxHeight: 340 },
    chatBubble: (isUser) => ({ background: isUser ? `linear-gradient(90deg, ${t.gradStart}, ${t.gradEnd})` : t.surface, color: isUser ? "#fff" : t.text, padding: "10px 14px", borderRadius: isUser ? "16px 16px 4px 16px" : "16px 16px 16px 4px", fontSize: 13, lineHeight: 1.5, maxWidth: "85%", alignSelf: isUser ? "flex-end" : "flex-start", border: isUser ? "none" : `1px solid ${t.border}` }),
    chatInput: { display: "flex", gap: 8, padding: "12px 16px", borderTop: `1px solid ${t.border}` },
    chatInputField: { flex: 1, background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "8px 12px", color: t.text, fontSize: 13, outline: "none", fontFamily: "inherit" },
    chatSend: { background: `linear-gradient(90deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" },
    // Skill modal
    skillOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(16px)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" },
    skillModal: { background: "#0c0c18", border: "1px solid rgba(212,160,48,0.2)", borderRadius: 24, padding: 44, maxWidth: 560, width: "100%", position: "relative", boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 40px rgba(212,160,48,0.05)" },
    skillModalIcon: { width: 60, height: 60, borderRadius: 18, background: "rgba(212,160,48,0.1)", border: "1px solid rgba(212,160,48,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20, boxShadow: "0 0 24px rgba(212,160,48,0.06)" },
  };

  return (
    <div style={s.app}>
      {page === "admin" ? (
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 40, position: "relative" }}>
          {adminAuthed ? (
            <div style={{ maxWidth: 580, width: "100%", background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 48, boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 }}>
                <div>
                  <h2 style={{ fontSize: 26, fontWeight: 700, color: t.text, margin: 0 }}>Admin Panel</h2>
                  <p style={{ fontSize: 13, color: t.muted, margin: "2px 0 0 0" }}>Manage your portfolio settings.</p>
                </div>
                <button onClick={() => { setAdminAuthed(false); goToPortfolio(); }} style={{ background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.2)", color: "#ff4060", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 5 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Logout
                </button>
              </div>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 0", borderTop: `1px solid ${t.border}` }}>
                <div>
                  <div style={{ fontWeight: 600, color: t.text, fontSize: 14 }}>Show Travel Dumps</div>
                  <div style={{ fontSize: 12, color: t.muted }}>Hide or show the travel section on your portfolio</div>
                </div>
                <button onClick={() => setShowTravel(v => !v)} style={{ width: 52, height: 28, borderRadius: 14, border: "none", cursor: "pointer", position: "relative", background: showTravel ? `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})` : t.border, transition: "background 0.3s", padding: 0 }}>
                  <span style={{ position: "absolute", top: 3, left: showTravel ? 27 : 3, width: 22, height: 22, borderRadius: "50%", background: "#fff", transition: "left 0.25s", boxShadow: "0 1px 4px rgba(0,0,0,0.15)" }} />
                </button>
              </div>

              <div style={{ padding: "16px 0", borderTop: `1px solid ${t.border}` }}>
                <div style={{ fontWeight: 600, color: t.text, fontSize: 14, marginBottom: 12 }}>Change Password</div>
                <input value={newPass} onChange={e => setNewPass(e.target.value)} type="password" placeholder="New password"
                  style={{ width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 14px", color: t.text, fontSize: 13, outline: "none", fontFamily: "inherit", marginBottom: 8 }} />
                <input value={newPassConfirm} onChange={e => setNewPassConfirm(e.target.value)} type="password" placeholder="Confirm new password"
                  style={{ width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 14px", color: t.text, fontSize: 13, outline: "none", fontFamily: "inherit", marginBottom: 8 }} />
                <button onClick={() => {
                  if (!newPass) { setPassMsg("Enter a password"); return; }
                  if (newPass !== newPassConfirm) { setPassMsg("Passwords do not match"); return; }
                  setPHash(passHash(newPass)); setPassMsg("Password changed!"); setNewPass(""); setNewPassConfirm("");
                  setTimeout(() => setPassMsg(""), 3000);
                }} style={{ background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", padding: "10px 24px", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "inherit" }}>
                  Change
                </button>
                {passMsg && <div style={{ fontSize: 12, color: passMsg === "Password changed!" ? "#22c55e" : "#ff4060", marginTop: 8 }}>{passMsg}</div>}
              </div>

              <div style={{ paddingTop: 16, borderTop: `1px solid ${t.border}` }}>
                <button onClick={goToPortfolio} style={{ background: "none", border: `1px solid ${t.border}`, color: t.muted, borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontSize: 13, fontFamily: "inherit", width: "100%" }}>
                  ← Back to Portfolio
                </button>
              </div>
            </div>
          ) : showForgotPass ? (
            <div style={{ maxWidth: 420, width: "100%", background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 40, boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: t.text, margin: "0 0 4px 0" }}>Reset Password</h2>
              {resetStep === "send" && (
                <>
                  <p style={{ fontSize: 13, color: t.muted, marginBottom: 20 }}>A reset code will be sent to your registered email and phone.</p>
                  <div style={{ background: t.surface, borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${t.border}` }}>
                    <div style={{ fontSize: 12, color: t.muted, marginBottom: 4 }}>Registered Email</div>
                    <div style={{ fontSize: 14, color: t.text, fontWeight: 600 }}>utkarshbhashkar@outlook.com</div>
                  </div>
                  <div style={{ background: t.surface, borderRadius: 12, padding: 16, marginBottom: 20, border: `1px solid ${t.border}` }}>
                    <div style={{ fontSize: 12, color: t.muted, marginBottom: 4 }}>Registered Phone</div>
                    <div style={{ fontSize: 14, color: t.text, fontWeight: 600 }}>+91 8340688151</div>
                  </div>
                  <button onClick={() => {
                    const otp = Math.floor(100000 + Math.random() * 900000).toString();
                    setResetOtp(otp);
                    setPassMsg("Reset code sent to your registered email & phone: " + otp);
                    setResetStep("verify");
                  }} style={{ width: "100%", background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", padding: "12px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", marginBottom: 12 }}>
                    Send Reset Code
                  </button>
                </>
              )}
              {resetStep === "verify" && (
                <>
                  <p style={{ fontSize: 13, color: t.muted, marginBottom: 20 }}>Enter the 6-digit reset code sent to your registered email & phone.</p>
                  <input value={resetOtpInput} onChange={e => setResetOtpInput(e.target.value)}
                    type="text" placeholder="Enter reset code" maxLength={6}
                    style={{ width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 16px", color: t.text, fontSize: 14, outline: "none", fontFamily: "inherit", marginBottom: 12, textAlign: "center", letterSpacing: "0.3em", fontWeight: 600 }} />
                  <button onClick={() => {
                    if (resetOtpInput === resetOtp) { setResetStep("change"); setPassMsg(""); }
                    else { setPassMsg("Invalid code. Try again."); setTimeout(() => setPassMsg(""), 2000); }
                  }} style={{ width: "100%", background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", padding: "12px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", marginBottom: 12 }}>
                    Verify Code
                  </button>
                </>
              )}
              {resetStep === "change" && (
                <>
                  <p style={{ fontSize: 13, color: t.muted, marginBottom: 20 }}>Enter your new password.</p>
                  <input value={resetOtpInput} onChange={e => setResetOtpInput(e.target.value)}
                    type="password" placeholder="New password"
                    style={{ width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 16px", color: t.text, fontSize: 14, outline: "none", fontFamily: "inherit", marginBottom: 12 }} />
                  <button onClick={() => {
                    if (!resetOtpInput) { setPassMsg("Enter a new password"); return; }
                    setPHash(passHash(resetOtpInput));
                    setPassMsg("Password reset successfully!");
                    setResetOtpInput(""); setResetOtp(""); setShowForgotPass(false); setResetStep("send");
                    setTimeout(() => setPassMsg(""), 3000);
                  }} style={{ width: "100%", background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", padding: "12px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", marginBottom: 12 }}>
                    Reset Password
                  </button>
                </>
              )}
              <button onClick={() => { setShowForgotPass(false); setResetStep("send"); setResetOtp(""); setResetOtpInput(""); setPassMsg(""); }} style={{ background: "none", border: "none", color: t.muted, cursor: "pointer", fontSize: 12, fontFamily: "inherit", textDecoration: "underline", display: "block", textAlign: "center", width: "100%" }}>
                ← Back to Login
              </button>
              {passMsg && <div style={{ fontSize: 12, color: passMsg.startsWith("Password reset") ? "#22c55e" : passMsg.startsWith("Invalid") ? "#ff4060" : t.muted, marginTop: 12, textAlign: "center", wordBreak: "break-word" }}>{passMsg}</div>}
            </div>
          ) : (
            <div style={{ maxWidth: 400, width: "100%", background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 40, textAlign: "center", boxShadow: "0 24px 80px rgba(0,0,0,0.4)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: t.text, margin: "0 0 4px 0" }}>Admin Login</h2>
              <p style={{ fontSize: 13, color: t.muted, marginBottom: 24 }}>Enter your password to access the admin panel.</p>
              <input value={adminPagePass} onChange={e => setAdminPagePass(e.target.value)}
                onKeyDown={e => {
                  if (e.key === "Enter" && adminPagePass) {
                    if (passHash(adminPagePass) === pHash) { setAdminAuthed(true); setAdminPagePass(""); }
                    else { setPassMsg("Wrong password"); setTimeout(() => setPassMsg(""), 2000); }
                  }
                }}
                type="password" placeholder="Password" autoFocus
                style={{ width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 16px", color: t.text, fontSize: 14, outline: "none", fontFamily: "inherit", marginBottom: 12 }} />
              <button onClick={() => {
                if (adminPagePass) {
                  if (passHash(adminPagePass) === pHash) { setAdminAuthed(true); setAdminPagePass(""); }
                  else { setPassMsg("Wrong password"); setTimeout(() => setPassMsg(""), 2000); }
                }
              }} style={{ width: "100%", background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", padding: "12px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit", marginBottom: 8 }}>
                Login
              </button>
              <button onClick={() => { setShowForgotPass(true); setPassMsg(""); }} style={{ background: "none", border: "none", color: t.muted, cursor: "pointer", fontSize: 12, fontFamily: "inherit", textDecoration: "underline", marginBottom: 12 }}>
                Forgot Password?
              </button>
              <button onClick={goToPortfolio} style={{ background: "none", border: "none", color: t.muted, cursor: "pointer", fontSize: 12, fontFamily: "inherit", textDecoration: "underline", display: "block", width: "100%" }}>
                ← Back to Portfolio
              </button>
              {passMsg && <div style={{ fontSize: 12, color: "#ff4060", marginTop: 8 }}>{passMsg}</div>}
            </div>
          )}
        </div>
      ) : (
        <>
      {/* ─── NAV ─── */}
      <nav style={s.nav}>
        <div style={s.navInner}>
          <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
            <button onClick={goToAdmin} style={{ background: "none", border: "none", color: t.muted, cursor: "pointer", padding: 0, display: "flex", alignItems: "center", fontFamily: "inherit", transition: "color 0.2s" }}
              title="Profile"
              onMouseEnter={e => e.target.style.color = t.text}
              onMouseLeave={e => e.target.style.color = t.muted}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
            <span style={s.logo}>UB.</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ ...s.navLinks, display: isMobile ? "none" : "flex" }}>
              {navLinks.map(l => (
                <button key={l.id} style={s.navLink} onClick={() => scrollTo(l.id)}
                  onMouseEnter={e => { e.target.style.color = t.text; e.target.style.background = t.surface; }}
                  onMouseLeave={e => { e.target.style.color = t.muted; e.target.style.background = "none"; }}>
                  {l.label}
                </button>
              ))}
            </div>
            <div style={s.themeToggle}>
              {[["dark","Dark",<svg key="m" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>],["light","Light",<svg key="s" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>],["eye","Eye Comfort",<svg key="e" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>]].map(([id, label, icon]) => (
                <button key={id} style={s.themeBtn(theme === id)} onClick={() => setTheme(id)} title={label}>{icon}</button>
              ))}
            </div>
            {isMobile && (
              <button onClick={() => setMobileMenuOpen(true)}
                style={{ background: "none", border: "none", color: t.muted, cursor: "pointer", padding: "6px", display: "flex", alignItems: "center", fontFamily: "inherit" }}
                aria-label="Menu">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ─── MOBILE SIDE DRAWER ─── */}
      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", zIndex: 200, display: isMobile ? "block" : "none" }}
          onClick={() => setMobileMenuOpen(false)}>
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "75%", maxWidth: 320, background: t.card, borderRight: `1px solid ${t.border}`, padding: "32px 24px", boxShadow: "4px 0 40px rgba(0,0,0,0.3)" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
              <span style={{ ...s.logo, fontSize: 22 }}>UB.</span>
              <button onClick={() => setMobileMenuOpen(false)}
                style={{ background: "none", border: "none", color: t.muted, cursor: "pointer", padding: "4px", display: "flex", fontFamily: "inherit" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {navLinks.map(l => (
                <button key={l.id}
                  onClick={() => scrollTo(l.id)}
                  style={{ background: activeSection === l.id ? t.accentGlow : "none", border: "none", color: activeSection === l.id ? t.highlight : t.muted, cursor: "pointer", padding: "14px 18px", borderRadius: 12, fontSize: 15, fontWeight: 500, textAlign: "left", fontFamily: "inherit", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: activeSection === l.id ? t.accent : t.border, flexShrink: 0 }} />
                  {l.label}
                </button>
              ))}
            </nav>
            <hr style={{ border: "none", borderTop: `1px solid ${t.border}`, margin: "24px 0" }} />
            <div style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
              {[["dark",<svg key="m" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>],["light",<svg key="s" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>],["eye",<svg key="e" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>]].map(([id, icon]) => (
                <button key={id} style={{ flex: 1, background: theme === id ? t.accent : "none", border: `1px solid ${theme === id ? t.accent : t.border}`, color: theme === id ? "#fff" : t.muted, borderRadius: 8, padding: "8px", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                  onClick={() => { setTheme(id); setMobileMenuOpen(false); }} title={id}>{icon}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section id="hero" style={{ ...s.hero, position: "relative", overflow: "hidden" }}>
        <canvas ref={webCanvasRef} style={{ position: "absolute", right: "0", top: "50%", transform: "translateY(-50%)", width: isMobile ? "100%" : "60%", height: "100%", pointerEvents: "none", opacity: isMobile ? 0.4 : 1, zIndex: 0 }} />
        <div style={s.heroInner}>
          <div style={s.badge}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block" }}></span>
            Open to Opportunities
          </div>
          <h1 style={s.h1}>
            Utkarsh<br />
            <span style={s.gradText}>Bhashkar</span>
          </h1>
          <p style={{ fontSize: "clamp(18px,2.5vw,24px)", color: t.muted, marginBottom: 8, fontWeight: 500 }}>
            SAP EWM Expert &amp; Supply Chain Architect
          </p>
          <p style={s.heroSub}>
            8+ years transforming warehouse operations through SAP S/4HANA implementations, automation, and intelligent supply chain design across global enterprises.
          </p>
          <div style={s.btnRow}>
            <button style={s.btnPrimary} onClick={() => scrollTo("contact")}>Get In Touch</button>
            <button style={s.btnOutline} onClick={() => scrollTo("experience")}
              onMouseEnter={e => { e.target.style.borderColor = t.accent; e.target.style.color = t.highlight; }}
              onMouseLeave={e => { e.target.style.borderColor = t.border; e.target.style.color = t.text; }}>
              View Experience
            </button>
          </div>
        </div>
      </section>

      <hr style={s.divider} />

      {/* ─── ABOUT / STATS ─── */}
      <section id="about" style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={s.sectionLabel}>About Me</p>
          <h2 style={s.sectionTitle}>The Story So Far</h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 40, marginBottom: 48, flexWrap: "wrap" }}>
            <div>
              <p style={{ color: t.muted, lineHeight: 1.8, fontSize: 16, marginBottom: 16 }}>
                {RESUME_DATA.summary}
              </p>
              <p style={{ color: t.muted, lineHeight: 1.8, fontSize: 16 }}>
                Currently pursuing an MBA in Operations Management at IGNOU while leading greenfield SAP S/4HANA EWM implementations at Westernacher Consulting. Passionate about warehouse automation, ASRS integration, and bridging the gap between technology and operations.
              </p>
            </div>
            <div>
              <div style={s.statGrid}>
                {[["8+","Years Exp."],["3","Companies"],["10+","Implementations"],["2","Certifications"]].map(([n,l]) => (
                  <div key={l} style={s.statCard}>
                    <div style={s.statNum}>{n}</div>
                    <div style={s.statLabel}>{l}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {["SAP S/4HANA","EWM Expert","Automation","ASRS","3PL"].map(t2 => (
                  <span key={t2} style={s.tag}>{t2}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={s.divider} />

      {/* ─── EXPERIENCE ─── */}
      <section id="experience" style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={s.sectionLabel}>Work History</p>
          <h2 style={s.sectionTitle}>Experience</h2>
          {RESUME_DATA.experience.map((exp, i) => (
            <div key={i} style={s.expCard}>
              <div style={s.expAccent}></div>
              <div style={{ marginLeft: 16 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                  <div>
                    <h3 style={{ fontSize: 20, fontWeight: 700, margin: 0, marginBottom: 4 }}>{exp.company}</h3>
                    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                      <span style={{ color: t.highlight, fontWeight: 600, fontSize: 14 }}>{exp.role}</span>
                      <span style={{ color: t.muted, fontSize: 13 }}>· {exp.hq}</span>
                    </div>
                  </div>
                  <span style={{ ...s.tag, background: t.surface }}>{exp.period}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
                  {exp.highlights.map((h, j) => (
                    <li key={j} style={{ color: t.muted, fontSize: 14, lineHeight: 1.6 }}>{h}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <hr style={s.divider} />

      {/* ─── SKILLS ─── */}
      <section id="skills" style={{ padding: "80px 5%", position: "relative", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={s.sectionLabel}>Capabilities</p>
          <h2 style={{ ...s.sectionTitle, marginBottom: 8 }}>The Skill Web</h2>
          <p style={{ color: t.muted, fontSize: 13, marginBottom: 20, maxWidth: 480, lineHeight: 1.6 }}>
            Each node represents a core capability — hover to explore, click to dive deeper
          </p>

          {/* Category pills (decorative) */}
          <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: 28 }}>
            {["Core SAP","Supply Chain","Automation","Technical","Process"].map(label => (
              <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(212,160,48,0.06)", border: "1px solid rgba(212,160,48,0.15)", borderRadius: 20, padding: "4px 14px", fontSize: 10, color: "rgba(212,160,48,0.6)", fontWeight: 600, letterSpacing: "0.04em" }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#d4a030", opacity: 0.5 }} />
                {label}
              </span>
            ))}
          </div>

          {/* ─── WEB ARENA ─── */}
          {isMobile ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 48 }}>
              {SKILL_WEB_DATA.map(sk => (
                <div key={sk.name} onClick={() => setSelectedSkill(sk.name)}
                  style={{ background: "rgba(10,10,22,0.55)", border: "1px solid rgba(212,160,48,0.2)", borderRadius: 10, padding: "14px 16px", cursor: "pointer", transition: "all 0.2s" }}>
                  <div style={{ fontSize: 11, fontWeight: 500, color: "#ecd898", marginBottom: 4 }}>{sk.name}</div>
                  <div style={{ fontSize: 9, color: "rgba(212,160,48,0.4)", letterSpacing: "0.05em" }}>
                    {{ sap: "Core SAP", supply: "Supply Chain", auto: "Automation", tech: "Technical", proc: "Process" }[sk.cat] || sk.cat}
                  </div>
                </div>
              ))}
            </div>
          ) : (
          <div ref={skillWebBoxRef} style={{ position: "relative", width: "100%", height: "clamp(420px, 52vw, 780px)", marginBottom: 48 }}>
            {/* Background canvas (particles + waves) */}
            <canvas ref={skillWebRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} />

            {/* SVG Connection Web */}
            {skillWebDims.cx > 0 && (
              <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}>
                {/* Curved dotted paths center → skills */}
                {skillNodes.map((sk) => (
                  <path key={sk.name} className="skill-path"
                    d={`M${skillWebDims.cx},${skillWebDims.cy} Q${sk.mx},${sk.my} ${sk.px},${sk.py}`}
                    stroke="rgba(212,160,48,0.25)"
                    strokeWidth="0.8"
                    fill="none"
                    strokeLinecap="round"
                  />
                ))}
                {/* Center avatar — minimal glowing monogram */}
                <g transform={`translate(${skillWebDims.cx}, ${skillWebDims.cy})`}>
                  <circle r="34" fill="rgba(212,160,48,0.06)" stroke="rgba(212,160,48,0.2)" strokeWidth="0.8" opacity="0.9" />
                  <circle r="28" fill="rgba(10,10,22,0.6)" stroke="rgba(212,160,48,0.25)" strokeWidth="0.8" />
                  <circle r="24" fill="none" stroke="rgba(212,160,48,0.15)" strokeWidth="0.4" opacity="0.5" className="skill-avatar-pulse" />
                  <circle r="34" fill="none" stroke="rgba(212,160,48,0.08)" strokeWidth="0.4" opacity="0.2" className="skill-avatar-pulse" style={{ animationDelay: "1s" }} />
                  <text textAnchor="middle" dominantBaseline="central" fill="#d4a030" fontSize="18" fontWeight="600" fontFamily="Inter, sans-serif" letterSpacing="2">U</text>
                </g>
              </svg>
            )}

            {/* Skill chips */}
            {skillNodes.map((sk) => (
              <div key={sk.name} className="skill-chip"
                onClick={() => setSelectedSkill(sk.name)}
                onMouseEnter={(e) => {
                  setTooltipSkill({ cat: sk.cat, name: sk.name, desc: sk.desc });
                  setTooltipXY({ x: sk.px, y: sk.py });
                  e.currentTarget.style.borderColor = "rgba(212,160,48,0.5)";
                  e.currentTarget.style.background = "rgba(212,160,48,0.08)";
                  e.currentTarget.style.color = "#ffffff";
                  e.currentTarget.style.boxShadow = "0 0 28px rgba(212,160,48,0.15)";
                  e.currentTarget.style.transform = "translate(-50%,-50%) scale(1.12)";
                }}
                onMouseLeave={(e) => {
                  setTooltipSkill(null);
                  e.currentTarget.style.borderColor = "rgba(212,160,48,0.25)";
                  e.currentTarget.style.background = "rgba(10,10,22,0.55)";
                  e.currentTarget.style.color = "#ecd898";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.transform = "translate(-50%,-50%) scale(1)";
                }}
                style={{
                  position: "absolute",
                  left: sk.px, top: sk.py,
                  transform: "translate(-50%,-50%)",
                  padding: "5px 12px",
                  borderRadius: 6,
                  fontSize: 10,
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                  border: "1px solid",
                  borderColor: "rgba(212,160,48,0.25)",
                  background: "rgba(10,10,22,0.55)",
                  color: "#ecd898",
                  letterSpacing: "0.02em",
                  fontFamily: "'Inter', sans-serif",
                  transition: "all 0.2s cubic-bezier(0.4,0,0.2,1)",
                  zIndex: 10,
                  userSelect: "none",
                  animationDelay: `${skillNodes.indexOf(sk) * 0.04}s`,
                }}>
                {sk.name}
              </div>
            ))}

            {/* Tooltip — premium */}
            {tooltipSkill && (
              <div style={{
                position: "absolute",
                left: tooltipXY.x + (tooltipXY.x > skillWebDims.cx ? -192 : 20),
                top: tooltipXY.y - 48,
                background: "rgba(12,12,24,0.92)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(212,160,48,0.2)",
                borderRadius: 12,
                padding: "12px 16px",
                pointerEvents: "none",
                zIndex: 50,
                width: 180,
                boxShadow: "0 12px 48px rgba(0,0,0,0.6), 0 0 20px rgba(212,160,48,0.04)",
              }}>
                <div style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(212,160,48,0.5)", marginBottom: 4, fontWeight: 500 }}>
                  {{ sap: "Core SAP", supply: "Supply Chain", auto: "Automation", tech: "Technical", proc: "Process" }[tooltipSkill.cat] || tooltipSkill.cat}
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#f0eeff", marginBottom: 4 }}>
                  {tooltipSkill.name}
                </div>
                <div style={{ fontSize: 10.5, color: "rgba(200,196,255,0.5)", lineHeight: 1.5 }}>
                  {tooltipSkill.desc}
                </div>
              </div>
            )}
          </div>
          )}

          {/* ─── CERTIFICATIONS & AWARDS ─── */}
          <div style={{
            background: `linear-gradient(135deg, ${t.card}88, ${t.surface}44)`,
            border: `1px solid ${t.border}`,
            borderRadius: 20,
            padding: "36px 40px",
            backdropFilter: "blur(8px)",
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 24, color: t.text, display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6"/><path d="M12 2v.5"/><path d="M12 22v-6"/><path d="M22 12h-.5"/><path d="M2 12h.5"/><path d="m19.07 4.93-.37.37"/><path d="m5.3 18.7-.37.37"/><path d="m18.7 18.7-.37-.37"/><path d="m4.93 4.93-.37-.37"/>
              </svg>
              Credentials &amp; Recognition
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 12 }}>
              {RESUME_DATA.certifications.map((c, i) => (
                <div key={i} style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "center",
                  background: t.card,
                  border: `1px solid ${t.border}`,
                  borderRadius: 12,
                  padding: "16px 18px",
                  transition: "all 0.2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.background = t.accentGlow; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.card; }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 16, flexShrink: 0,
                  }}>🏆</div>
                  <span style={{ fontSize: 13, color: t.muted, lineHeight: 1.5, fontWeight: 500 }}>{c}</span>
                </div>
              ))}
              <div style={{
                display: "flex",
                gap: 14,
                alignItems: "center",
                background: t.card,
                border: `1px solid ${t.border}`,
                borderRadius: 12,
                padding: "16px 18px",
                transition: "all 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.background = t.accentGlow; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.background = t.card; }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, flexShrink: 0,
                }}>⭐</div>
                <span style={{ fontSize: 13, color: t.muted, lineHeight: 1.5, fontWeight: 500 }}>{RESUME_DATA.awards[0]}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <hr style={s.divider} />

      {/* ─── EDUCATION ─── */}
      <section id="education" style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={s.sectionLabel}>Academic Background</p>
          <h2 style={s.sectionTitle}>Education</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px,1fr))", gap: 20 }}>
            {RESUME_DATA.education.map((edu, i) => (
              <div key={i} style={{ ...s.card, borderTop: `3px solid ${t.accent}` }}>
                <div style={{ fontSize: 12, color: t.muted, marginBottom: 8 }}>{edu.period}</div>
                <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, margin: "0 0 8px" }}>{edu.degree}</h3>
                <p style={{ color: t.muted, fontSize: 13, margin: 0 }}>{edu.institution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr style={s.divider} />

      {/* ─── TRAVEL DUMPS ─── */}
      {showTravel && (<section id="travel" style={{ padding: "80px 5%" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <p style={s.sectionLabel}>Life Beyond Work</p>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
            <h2 style={{ ...s.sectionTitle, marginBottom: 0, display: "flex", alignItems: "center", gap: 12 }}>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ filter: `drop-shadow(0 0 8px ${t.accentGlow})` }}>
                <circle cx="12" cy="12" r="10"/>
                <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={t.accent} stroke="none"/>
              </svg>
              Travel Dumps
            </h2>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {!isAdmin ? (
                <button style={{ background: "none", border: `1px solid ${t.border}`, color: t.muted, borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6 }}
                  onClick={() => setShowAdminLogin(true)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  Admin</button>
              ) : (
                <>
                  <span style={{ fontSize: 12, color: t.highlight, fontWeight: 600 }}>Admin</span>
                  <button style={{ background: "none", border: `1px solid ${t.border}`, color: t.muted, borderRadius: 8, padding: "6px 14px", cursor: "pointer", fontSize: 11, fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 5 }}
                    onClick={() => openPlaceEditor(null)}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s-8-5.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 6.3-8 11.8-8 11.8z"/><circle cx="12" cy="10" r="3"/><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="14" x2="12" y2="18"/></svg>
                    Places</button>
                  <button style={s.uploadBtn} onClick={() => fileInputRef.current?.click()}>+ Upload</button>
                  <button style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.25)", color: t.highlight, borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}
                    onClick={goToAdmin}>Panel</button>
                  <button style={{ background: "none", border: `1px solid ${t.border}`, color: t.muted, borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}
                    onClick={() => setIsAdmin(false)}>Logout</button>
                </>
              )}
              <input ref={fileInputRef} type="file" accept="image/*,video/*" style={{ display: "none" }} onChange={openEditor} />
            </div>
          </div>

          <div style={{ marginBottom: 36, position: "relative" }}>
            <style>{`
              .sticky-track { display: flex; gap: 16; overflow-x: auto; padding: 8px 4px 16px; scrollbar-width: thin; scrollbar-color: ${t.accent}44 transparent; }
              .sticky-track::-webkit-scrollbar { height: 4px; }
              .sticky-track::-webkit-scrollbar-thumb { background: ${t.accent}44; border-radius: 4px; }
              .sticky-note { flex-shrink: 0; width: 130px; border-radius: 12px; overflow: hidden; position: relative; cursor: default; transition: all 0.3s cubic-bezier(0.4,0,0.2,1); box-shadow: 0 4px 16px rgba(0,0,0,0.1); transform: rotate(var(--r,0deg)); }
              .sticky-note:hover { transform: rotate(0deg) translateY(-6px) scale(1.04); box-shadow: 0 12px 40px rgba(0,0,0,0.2), 0 0 30px ${t.accentGlow}; }
              .sticky-pin { position: absolute; top: -6px; left: 50%; transform: translateX(-50%); z-index: 2; filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3)); }
            `}</style>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Places Visited
              </div>
              <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg, ${t.border}, transparent)` }} />
            </div>
            <div style={{ position: "relative" }}>
              <button style={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 5, background: `linear-gradient(90deg, ${t.bg} 50%, transparent)`, border: "none", color: t.muted, cursor: "pointer", width: 36, height: 80, display: "flex", alignItems: "center", justifyContent: "flex-start", paddingLeft: 4, fontFamily: "inherit", transition: "color 0.2s" }}
                onClick={() => placesTrackRef.current?.scrollBy({ left: -300, behavior: "smooth" })}
                onMouseEnter={e => e.target.style.color = t.accent}
                onMouseLeave={e => e.target.style.color = t.muted}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 5, background: `linear-gradient(-90deg, ${t.bg} 50%, transparent)`, border: "none", color: t.muted, cursor: "pointer", width: 36, height: 80, display: "flex", alignItems: "center", justifyContent: "flex-end", paddingRight: 4, fontFamily: "inherit", transition: "color 0.2s" }}
                onClick={() => placesTrackRef.current?.scrollBy({ left: 300, behavior: "smooth" })}
                onMouseEnter={e => e.target.style.color = t.accent}
                onMouseLeave={e => e.target.style.color = t.muted}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div ref={placesTrackRef} className="sticky-track">
                {places.map((p, i) => (
                  <div key={p.id} className="sticky-note" style={{"--r": `${(i % 5 - 2) * 1.5}deg`}}
                  onMouseEnter={e => { e.currentTarget.style.zIndex = "5" }}
                  onMouseLeave={e => { e.currentTarget.style.zIndex = "1" }}>
                  <div className="sticky-pin">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#888"><circle cx="12" cy="5" r="3" fill="#bbb"/><path d="M12 8c-1.5 0-3 1-3 3l1 8c0 1 .5 2 2 2s2-1 2-2l1-8c0-2-1.5-3-3-3z" fill="#999"/></svg>
                  </div>
                  <div style={{ aspectRatio: "4/3", background: `url(${p.image}) center/cover`, borderRadius: 12, position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(transparent 50%, rgba(0,0,0,0.7))", borderRadius: 12 }} />
                    <span style={{ position: "absolute", bottom: 8, left: 10, right: 10, color: "#fff", fontSize: 11, fontWeight: 600, lineHeight: 1.3, textShadow: "0 1px 4px rgba(0,0,0,0.5)" }}>{p.name}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>

          <div style={s.tabRow}>
            <button style={s.tabBtn(travelTab === "foreign")} onClick={() => setTravelTab("foreign")}>🌍 Foreign</button>
            <button style={s.tabBtn(travelTab === "local")} onClick={() => setTravelTab("local")}>🇮🇳 Local</button>
          </div>

          <div style={{ position: "relative", marginBottom: 32 }}>
            <input value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search memories..." 
              style={{ width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 12, padding: "12px 16px 12px 44px", color: t.text, fontSize: 14, outline: "none", fontFamily: "inherit", transition: "border-color 0.2s" }}
              onFocus={e => e.target.style.borderColor = t.accent}
              onBlur={e => e.target.style.borderColor = t.border} />
            <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={t.muted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          </div>

          {(() => {
            if (visibleMedia.length === 0) {
              return (
                <div style={{ textAlign: "center", padding: "100px 20px", color: t.muted, border: `2px dashed ${t.border}`, borderRadius: 24 }}>
                  <div style={{ fontSize: 64, marginBottom: 20, opacity: 0.5 }}>{travelTab === "foreign" ? "🌍" : "🇮🇳"}</div>
                  <p style={{ fontSize: 18, fontWeight: 500, color: t.text }}>{searchQuery ? "No memories match your search" : `No ${travelTab} travel memories yet`}</p>
                  <p style={{ fontSize: 13, marginTop: 8 }}>{searchQuery ? "Try a different search term" : isAdmin ? "Upload your travel media to share" : "No public stories available right now"}</p>
                </div>
              );
            }
            const displayed = visibleMedia;
            return (
              <>
                <style>{`
                  .travel-card {
                    transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
                    will-change: transform;
                    backface-visibility: hidden;
                    border-radius: 16px;
                    overflow: hidden;
                    cursor: pointer;
                  }
                  .travel-card:hover {
                    transform: translateY(-8px) !important;
                    box-shadow: 0 20px 60px rgba(0,0,0,0.15), 0 0 40px ${t.accentGlow} !important;
                    border-color: ${t.accent} !important;
                  }
                  .travel-card-img {
                    transition: transform 0.5s;
                    will-change: transform;
                  }
                  .travel-card-img:hover {
                    transform: scale(1.08);
                  }
                `}</style>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                  gap: 28,
                  padding: 4,
                }}>
                  {displayed.slice(0, visibleCount).map((m, i) => {
                    const isLiked = likedIds.includes(m.id);
                    return (
                      <div key={m.id} className="travel-card" style={{
                        background: t.card,
                        border: `1px solid ${t.border}`,
                        transform: "translateY(0)",
                        boxShadow: `0 2px 8px rgba(0,0,0,0.06)`,
                      }}
                        onClick={() => setSelectedMedia(m)}>
                        <div style={{ position: "relative", aspectRatio: "4/3", background: "#000", overflow: "hidden" }}>
                          {m.type === "video" ? (
                            <>
                              <video src={m.url} muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover", filter: mediaCssFilter(m) }}
                                onMouseEnter={e => e.target.play().catch(() => {})}
                                onMouseLeave={e => { e.target.pause(); e.target.currentTime = 0; }} />
                              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none" }}>
                                <div style={{ width: 48, height: 48, borderRadius: "50%", background: "rgba(0,0,0,0.6)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><polygon points="8,5 19,12 8,19"/></svg>
                                </div>
                              </div>
                            </>
                          ) : (
                            <img src={m.url} alt={m.name} loading="lazy" className="travel-card-img" style={{ width: "100%", height: "100%", objectFit: "cover", filter: mediaCssFilter(m) }} />
                          )}
                          <button style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.35)", border: "none", borderRadius: "50%", width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", backdropFilter: "blur(4px)", transition: "all 0.2s", zIndex: 2 }}
                            onClick={e => { e.stopPropagation(); setLikedIds(prev => prev.includes(m.id) ? prev.filter(id => id !== m.id) : [...prev, m.id]); }}
                            onMouseEnter={e => e.currentTarget.style.background = "rgba(0,0,0,0.6)"}
                            onMouseLeave={e => e.currentTarget.style.background = "rgba(0,0,0,0.35)"}>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? "#ff4060" : "none"} stroke={isLiked ? "#ff4060" : "#fff"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                          </button>
                          {isAdmin && (
                            <div style={{ position: "absolute", bottom: 8, left: 8, display: "flex", gap: 4, zIndex: 2 }}>
                              <span style={{ fontSize: 9, background: m.visibility === "private" ? "rgba(255,180,0,0.7)" : "rgba(0,200,100,0.7)", color: "#fff", padding: "2px 8px", borderRadius: 6, fontWeight: 600, letterSpacing: "0.03em" }}>{m.visibility === "private" ? "PRIVATE" : "PUBLIC"}</span>
                            </div>
                          )}
                        </div>
                        <div style={{ padding: "16px 18px 18px" }}>
                          <div style={{ fontSize: 12, color: t.muted, marginBottom: 6, display: "flex", alignItems: "center", gap: 6 }}>
                            <span>{m.type === "video" ? "🎬" : "📷"}</span>
                            <span>{m.type === "video" ? "Video" : "Photo"}</span>
                            <span style={{ opacity: 0.3 }}>·</span>
                            <span>{isLiked ? "❤️" : "🤍"} {likedIds.includes(m.id) ? "Liked" : "Like"}</span>
                          </div>
                          <p style={{ margin: 0, fontSize: 14, fontWeight: 500, color: t.text, lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{m.name}</p>
                          <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                            {isAdmin && (
                              <>
                                <button style={{ flex: 1, background: t.surface, border: `1px solid ${t.border}`, color: t.muted, borderRadius: 8, padding: "6px 0", fontSize: 11, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                                  onClick={e => { e.stopPropagation(); toggleVisibility(m.id); }}
                                  onMouseEnter={e => { e.target.style.borderColor = t.accent; e.target.style.color = t.highlight }}
                                  onMouseLeave={e => { e.target.style.borderColor = t.border; e.target.style.color = t.muted }}>
                                  {m.visibility === "public" ? "Make Private" : "Make Public"}
                                </button>
                                <button style={{ flex: 1, background: "rgba(255,60,60,0.08)", border: "1px solid rgba(255,60,60,0.2)", color: t.muted, borderRadius: 8, padding: "6px 0", fontSize: 11, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                                  onClick={e => { e.stopPropagation(); deleteMedia(m.id); }}
                                  onMouseEnter={e => { e.target.style.borderColor = "#ff4060"; e.target.style.color = "#ff4060" }}
                                  onMouseLeave={e => { e.target.style.borderColor = "rgba(255,60,60,0.2)"; e.target.style.color = t.muted }}>
                                  Delete
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {visibleCount < displayed.length ? (
                  <div style={{ textAlign: "center", marginTop: 40 }}>
                    <button style={{ background: "none", border: `1px solid ${t.border}`, color: t.muted, borderRadius: 12, padding: "14px 40px", cursor: "pointer", fontSize: 14, fontFamily: "inherit", transition: "all 0.3s", display: "inline-flex", alignItems: "center", gap: 10 }}
                      onMouseEnter={e => { e.target.style.borderColor = t.accent; e.target.style.color = t.highlight; e.target.style.background = t.accentGlow }}
                      onMouseLeave={e => { e.target.style.borderColor = t.border; e.target.style.color = t.muted; e.target.style.background = "none" }}
                      onClick={() => setVisibleCount(prev => Math.min(prev + 10, displayed.length))}>
                      <span>View More ({displayed.length - visibleCount} remaining)</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
                    </button>
                  </div>
                ) : displayed.length > 3 ? (
                  <div style={{ textAlign: "center", marginTop: 40, fontSize: 12, color: t.muted }}>
                    Showing all {displayed.length} {displayed.length === 1 ? "memory" : "memories"}
                  </div>
                ) : null}
              </>
            );
          })()}
        </div>
      </section>)}

      {/* ─── ADMIN LOGIN MODAL ─── */}
      {showAdminLogin && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(8px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 20, padding: 40, maxWidth: 400, width: "90%" }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8, color: t.text }}>Admin Access</h3>
            <p style={{ fontSize: 13, color: t.muted, marginBottom: 20 }}>Enter the admin password to manage travel content.</p>
            <input value={adminPassInput} onChange={e => setAdminPassInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && handleAdminLogin()}
              type="password" placeholder="Password" autoFocus
              style={{ width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "12px 16px", color: t.text, fontSize: 14, outline: "none", fontFamily: "inherit", marginBottom: 16 }} />
            <div style={{ display: "flex", gap: 12 }}>
              <button style={{ flex: 1, background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", padding: "12px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontWeight: 600, fontFamily: "inherit" }}
                onClick={handleAdminLogin}>Login</button>
              <button style={{ flex: 1, background: "none", border: `1px solid ${t.border}`, color: t.muted, padding: "12px", borderRadius: 10, cursor: "pointer", fontSize: 14, fontFamily: "inherit" }}
                onClick={() => { setShowAdminLogin(false); setAdminPassInput("") }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ─── EDITOR MODAL ─── */}
      {showEditor && editFile && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(12px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 32, maxWidth: 820, width: "100%", maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0 }}>Edit Media</h3>
              <button style={{ background: "none", border: "none", color: t.muted, cursor: "pointer", fontSize: 22, fontFamily: "inherit" }} onClick={() => { setShowEditor(false); setEditFile(null); setEditPreview(""); }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
              <div style={{ borderRadius: 16, overflow: "hidden", background: "#000", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {editFile.type.startsWith("video") ? (
                  <video src={editPreview} controls style={{ width: "100%", height: "100%", objectFit: "contain", filter: cssFilter(editFilter, editBrightness, editContrast, editSaturation) }} />
                ) : (
                  <img src={editPreview} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", filter: cssFilter(editFilter, editBrightness, editContrast, editSaturation) }} />
                )}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <label style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Caption</label>
                  <input value={editCaption} onChange={e => setEditCaption(e.target.value)}
                    style={{ width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 14px", color: t.text, fontSize: 13, outline: "none", fontFamily: "inherit" }} />
                </div>
                <div>
                  <label style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Filters</label>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    {filters.map(f => (
                      <button key={f} style={{ background: editFilter === f ? t.accent : t.surface, border: `1px solid ${editFilter === f ? t.accent : t.border}`, color: editFilter === f ? "#fff" : t.muted, padding: "6px 12px", borderRadius: 8, fontSize: 11, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                        onClick={() => setEditFilter(f)}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Adjustments</label>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      { label: "Brightness", val: editBrightness, set: setEditBrightness },
                      { label: "Contrast", val: editContrast, set: setEditContrast },
                      { label: "Saturation", val: editSaturation, set: setEditSaturation },
                    ].map(s => (
                      <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 11, color: t.muted, width: 70, flexShrink: 0 }}>{s.label}</span>
                        <input type="range" min="0" max="200" value={s.val} onChange={e => s.set(Number(e.target.value))}
                          style={{ flex: 1, height: 4, accentColor: t.accent, cursor: "pointer" }} />
                        <span style={{ fontSize: 11, color: t.muted, width: 32, textAlign: "right" }}>{s.val}%</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <label style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Visibility</label>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: editVisibility === "public" ? t.accent : t.surface, border: `1px solid ${editVisibility === "public" ? t.accent : t.border}`, color: editVisibility === "public" ? "#fff" : t.muted, padding: "8px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}
                      onClick={() => setEditVisibility("public")}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M22 12c0 5.52-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2c2.17 0 4.17.69 5.8 1.86"/><path d="M22 2v8h-8"/></svg>
                      Public
                    </button>
                    <button style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: editVisibility === "private" ? t.accent : t.surface, border: `1px solid ${editVisibility === "private" ? t.accent : t.border}`, color: editVisibility === "private" ? "#fff" : t.muted, padding: "8px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontFamily: "inherit" }}
                      onClick={() => setEditVisibility("private")}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                      Private
                    </button>
                  </div>
                </div>
                <button style={{ background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", padding: "14px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: 4, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, letterSpacing: "0.02em" }}
                  onClick={handleDump}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                  Dump Media
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── PLACES EDITOR MODAL ─── */}
      {showPlacesEditor && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(12px)", zIndex: 500, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
          onClick={() => { setShowPlacesEditor(false); setEditPlaceName(""); setEditPlaceImage(""); setEditingPlaceId(null); }}>
          <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, padding: 36, maxWidth: 560, width: "100%", maxHeight: "80vh", overflowY: "auto" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: t.text, margin: 0, display: "flex", alignItems: "center", gap: 10 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={t.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                {editingPlaceId ? "Edit Place" : "Add Place"}
              </h3>
              <button style={{ background: "none", border: "none", color: t.muted, cursor: "pointer", fontSize: 22, fontFamily: "inherit" }}
                onClick={() => { setShowPlacesEditor(false); setEditPlaceName(""); setEditPlaceImage(""); setEditingPlaceId(null); }}>✕</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
              <div>
                <label style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Place Name</label>
                <input value={editPlaceName} onChange={e => setEditPlaceName(e.target.value)} placeholder="e.g. Zürich, Switzerland"
                  style={{ width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 14px", color: t.text, fontSize: 13, outline: "none", fontFamily: "inherit" }} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 8, display: "block" }}>Image URL <span style={{ fontWeight: 400, textTransform: "none" }}>(leave empty for random)</span></label>
                <input value={editPlaceImage} onChange={e => setEditPlaceImage(e.target.value)} placeholder="https://picsum.photos/id/.../400/300"
                  style={{ width: "100%", background: t.surface, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 14px", color: t.text, fontSize: 13, outline: "none", fontFamily: "inherit" }} />
              </div>
              <button style={{ background: `linear-gradient(135deg, ${t.gradStart}, ${t.gradEnd})`, border: "none", color: "#fff", padding: "12px 24px", borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}
                onClick={savePlace}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                {editingPlaceId ? "Update Place" : "Add Place"}
              </button>
            </div>
            <div style={{ borderTop: `1px solid ${t.border}`, paddingTop: 20 }}>
              <div style={{ fontSize: 11, color: t.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 16 }}>Current Places ({places.length})</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {places.map(p => (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, background: t.surface, borderRadius: 10, padding: "8px 12px", border: `1px solid ${t.border}` }}>
                    <div style={{ width: 40, height: 30, borderRadius: 6, background: `url(${p.image}) center/cover`, flexShrink: 0 }} />
                    <span style={{ flex: 1, fontSize: 13, color: t.text, fontWeight: 500 }}>{p.name}</span>
                    <button style={{ background: "none", border: `1px solid ${t.border}`, color: t.muted, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 10, fontFamily: "inherit" }}
                      onClick={() => openPlaceEditor(p)}>Edit</button>
                    <button style={{ background: "none", border: "1px solid rgba(255,60,60,0.3)", color: "#ff4060", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 10, fontFamily: "inherit" }}
                      onClick={() => deletePlace(p.id)}>Delete</button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {selectedMedia && (() => {
        const idx = visibleMedia.findIndex(m => m.id === selectedMedia.id);
        const total = visibleMedia.length;
        const hasNav = total > 1;
        const goNext = () => {
          if (!hasNav) return;
          const next = (idx + 1) % total;
          setSelectedMedia(visibleMedia[next]);
        };
        const goPrev = () => {
          if (!hasNav) return;
          const prev = (idx - 1 + total) % total;
          setSelectedMedia(visibleMedia[prev]);
        };
        return (
          <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", backdropFilter: "blur(16px)", zIndex: 300,
            display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 20,
            animation: "fadeIn 0.25s ease",
          }}
            onClick={() => setSelectedMedia(null)}
            onKeyDown={e => {
              if (e.key === "Escape") setSelectedMedia(null);
              if (e.key === "ArrowRight") goNext();
              if (e.key === "ArrowLeft") goPrev();
            }}
            tabIndex={0}
            ref={el => el?.focus()}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 1, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", background: "linear-gradient(rgba(0,0,0,0.6), transparent)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: "0.05em" }}>{idx + 1} / {total}</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>·</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{selectedMedia.type === "video" ? "🎬 Video" : "📷 Photo"}</span>
              </div>
              <button style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", borderRadius: 10, padding: "8px 16px", cursor: "pointer", fontSize: 13, fontFamily: "inherit", backdropFilter: "blur(8px)", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 6 }}
                onClick={() => setSelectedMedia(null)}
                onMouseEnter={e => { e.target.style.background = "rgba(255,255,255,0.15)" }}
                onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.08)" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                Close
              </button>
            </div>

            <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "90vw", maxWidth: 1000 }} onClick={e => e.stopPropagation()}>
              {hasNav && (
                <button style={{ position: "absolute", left: -20, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", fontFamily: "inherit", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.target.style.background = t.accent; e.target.style.borderColor = t.accent }}
                  onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.borderColor = "rgba(255,255,255,0.1)" }}
                  onClick={goPrev}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
                </button>
              )}
              <div style={{ borderRadius: 16, overflow: "hidden", background: "#000", boxShadow: "0 20px 80px rgba(0,0,0,0.6)", maxHeight: "75vh" }}>
                {selectedMedia.type === "video" ? (
                  <video key={selectedMedia.id} src={selectedMedia.url} controls autoPlay style={{ maxWidth: "85vw", maxHeight: "75vh", objectFit: "contain", filter: mediaCssFilter(selectedMedia), display: "block" }} />
                ) : (
                  <img key={selectedMedia.id} src={selectedMedia.url} alt={selectedMedia.name} style={{ maxWidth: "85vw", maxHeight: "75vh", objectFit: "contain", filter: mediaCssFilter(selectedMedia), display: "block" }} />
                )}
              </div>
              {hasNav && (
                <button style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", zIndex: 10, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", width: 44, height: 44, borderRadius: "50%", cursor: "pointer", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(8px)", fontFamily: "inherit", transition: "all 0.2s" }}
                  onMouseEnter={e => { e.target.style.background = t.accent; e.target.style.borderColor = t.accent }}
                  onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.08)"; e.target.style.borderColor = "rgba(255,255,255,0.1)" }}
                  onClick={goNext}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
                </button>
              )}
            </div>

            <div style={{ maxWidth: 640, textAlign: "center", padding: "0 20px" }} onClick={e => e.stopPropagation()}>
              <p style={{ margin: 0, fontSize: 16, color: "#fff", fontWeight: 500, lineHeight: 1.5 }}>{selectedMedia.name}</p>
              {isAdmin && (
                <div style={{ marginTop: 16, display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
                  {filters.map(f => (
                    <button key={f} style={{ background: selectedMedia.filter === f ? t.accent : "rgba(255,255,255,0.06)", border: `1px solid ${selectedMedia.filter === f ? t.accent : "rgba(255,255,255,0.1)"}`, color: "#fff", padding: "5px 14px", borderRadius: 8, fontSize: 11, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                      onClick={() => { applyFilter(selectedMedia.id, f); setSelectedMedia({ ...selectedMedia, filter: f }); }}>
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              )}
              <div style={{ marginTop: 12, fontSize: 11, color: "rgba(255,255,255,0.3)", letterSpacing: "0.03em" }}>
                {isAdmin && <span style={{ marginRight: 12 }}>Visibility: {selectedMedia.visibility === "public" ? "🌍 Public" : "🔒 Private"}</span>}
                <span>Click outside or press Esc to close · Arrow keys to navigate</span>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ─── SKILL MODAL ─── */}
      {selectedSkill && (
        <div style={s.skillOverlay} onClick={() => setSelectedSkill(null)}>
          <div style={s.skillModal} onClick={e => e.stopPropagation()}>
            <button style={{ position: "absolute", top: 18, right: 20, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)", color: "rgba(200,196,255,0.4)", cursor: "pointer", fontSize: 16, fontFamily: "inherit", width: 32, height: 32, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
              onMouseEnter={e => { e.target.style.background = "rgba(212,160,48,0.15)"; e.target.style.color = "#fff"; }}
              onMouseLeave={e => { e.target.style.background = "rgba(255,255,255,0.04)"; e.target.style.color = "rgba(200,196,255,0.4)"; }}
              onClick={() => setSelectedSkill(null)}>✕</button>
            <div style={s.skillModalIcon}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#d4a030" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z"/>
                <circle cx="12" cy="12" r="2" fill="#d4a030" stroke="none"/>
              </svg>
            </div>
            <h3 style={{ fontSize: 24, fontWeight: 600, marginBottom: 16, color: "#f0eeff", letterSpacing: "-0.01em" }}>{selectedSkill}</h3>
            <p style={{ color: "rgba(200,196,255,0.6)", lineHeight: 1.9, fontSize: 14 }}>{SKILL_DESCRIPTIONS[selectedSkill] || "Description coming soon."}</p>
            <div style={{ marginTop: 28, display: "flex", gap: 12 }}>
              <button style={{ background: "rgba(212,160,48,0.12)", border: "1px solid rgba(212,160,48,0.25)", color: "#ecd898", padding: "12px 32px", borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}
                onMouseEnter={e => { e.target.style.background = "rgba(212,160,48,0.2)"; e.target.style.borderColor = "rgba(212,160,48,0.4)"; }}
                onMouseLeave={e => { e.target.style.background = "rgba(212,160,48,0.12)"; e.target.style.borderColor = "rgba(212,160,48,0.25)"; }}
                onClick={() => setSelectedSkill(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      <hr style={s.divider} />

      {/* ─── CONTACT ─── */}
      <section id="contact" style={{ padding: "80px 5%", position: "relative", overflow: "hidden" }}>
        <canvas ref={networkCanvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 1 }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <p style={s.sectionLabel}>Let's Connect</p>
          <h2 style={s.sectionTitle}>Get In Touch</h2>
          <div style={s.contactGrid}>
            {[
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>, label: "Email", value: RESUME_DATA.email, href: `mailto:${RESUME_DATA.email}`, copy: RESUME_DATA.email },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, label: "Phone", value: RESUME_DATA.phone, href: `tel:${RESUME_DATA.phone}`, copy: RESUME_DATA.phone },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>, label: "LinkedIn", value: "linkedin.com/in/ubhash", href: RESUME_DATA.linkedin, copy: null },
              { icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Location", value: RESUME_DATA.location, href: null, copy: null },
            ].map((c, i) => (
              <div key={i} style={s.contactCard}
                onMouseEnter={e => { e.currentTarget.style.borderColor = t.accent; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${t.accentGlow}`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = t.border; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={s.contactCardAccent} />
                <div style={s.contactIcon}>{c.icon}</div>
                <div style={{ fontSize: 11, color: t.muted, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase" }}>{c.label}</div>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" style={{ color: t.highlight, fontSize: 14, textDecoration: "none", wordBreak: "break-all", fontWeight: 500 }}>{c.value}</a>
                ) : (
                  <span style={{ color: t.text, fontSize: 14, fontWeight: 500 }}>{c.value}</span>
                )}
                {c.copy && (
                  <button onClick={() => { navigator.clipboard?.writeText(c.copy); }}
                    style={{ background: "none", border: `1px solid ${t.border}`, color: t.muted, borderRadius: 8, padding: "6px 12px", fontSize: 11, cursor: "pointer", marginTop: 4, fontFamily: "inherit", transition: "all 0.2s", alignSelf: "flex-start" }}
                    onMouseEnter={e => { e.target.style.borderColor = t.accent; e.target.style.color = t.highlight; }}
                    onMouseLeave={e => { e.target.style.borderColor = t.border; e.target.style.color = t.muted; }}>
                    Copy
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={s.footer}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: t.highlight, marginBottom: 12 }}>UB.</div>
          <p>Utkarsh Bhashkar · SAP EWM Expert · Jharkhand, India</p>
          <p style={{ marginTop: 8 }}>Built with passion · {new Date().getFullYear()}</p>
        </div>
      </footer>

      {/* ─── CHAT FAB ─── */}
      <button style={s.chatFab} onClick={() => setChatOpen(o => !o)} title="Chat with AI">
        {chatOpen ? "✕" : "💬"}
      </button>

      {/* ─── CHAT WINDOW ─── */}
      {chatOpen && (
        <div style={s.chatWindow}>
          <div style={s.chatHeader}>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>Utkarsh's Assistant</div>
              <div style={{ fontSize: 12, opacity: 0.8 }}>Ask me anything about his profile</div>
            </div>
            <button style={{ background: "rgba(255,255,255,0.2)", border: "none", color: "#fff", borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontFamily: "inherit" }} onClick={() => setChatOpen(false)}>✕</button>
          </div>
          <div style={s.chatBody}>
            {messages.map((m, i) => (
              <div key={i} style={s.chatBubble(m.role === "user")}>{m.content}</div>
            ))}
            {chatLoading && (
              <div style={{ ...s.chatBubble(false), color: t.muted }}>Thinking...</div>
            )}
            <div ref={chatEndRef} />
          </div>
          <div style={s.chatInput}>
            <input
              style={s.chatInputField}
              value={chatInput}
              onChange={e => setChatInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendChat()}
              placeholder="Ask about skills, experience..."
            />
            <button style={s.chatSend} onClick={sendChat}>Send</button>
          </div>
        </div>
      )}
      </>
      )}
    </div>
  );
}