export interface Project {
    id: number;
    title: string;
    description: string;
    tech: string[];
    category: string;
    github: string;
    demo?: string;
    features: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        title: "Voice Assistant for Desktop",
        description: "A voice-controlled desktop assistant using speech recognition, automation commands, and text-to-speech capabilities. Execute system commands and automate tasks using natural voice commands.",
        tech: ["Python", "SpeechRecognition", "PySimpleGUI", "TTS"],
        category: "AI/Automation",
        github: "https://github.com/Jason-Joshua-JJ/Celine-AI",
        features: [
            "Real-time voice recognition",
            "System automation commands",
            "Text-to-speech feedback",
            "User-friendly GUI interface"
        ]
    },
    {
        id: 2,
        title: "Data Security in Satellite Communication",
        description: "Blockchain-based security model ensuring tamper-proof communication in satellite systems. Implements IPFS for distributed storage and smart contracts for secure data transmission.",
        tech: ["Python", "Node.js", "Solidity", "Blockchain"],
        category: "Security/Blockchain",
        github: "https://github.com/Jason-Joshua-JJ",
        features: [
            "Blockchain-based security",
            "Smart contract validation",
        ]
    },
    {
        id: 3,
        title: "ETL Pipeline (AWS Cloud Architecture)",
        description: "Production-grade cloud ETL pipeline using AWS Glue (PySpark), S3, Lambda, Redshift, and Snowflake. Processes large-scale data with automated scheduling and monitoring.",
        tech: ["AWS Glue", "PySpark", "S3", "Lambda", "Redshift", "Snowflake", "SQL"],
        category: "Data Engineering",
        github: "https://github.com/Jason-Joshua-JJ",
        features: [
            "Automated data ingestion",
            "PySpark transformations",
            "Redshift & Snowflake integration",
            "Lambda-triggered workflows"
        ]
    },

    {
        id: 5,
        title: "SaaS Project Management",
        description: "A comprehensive project management tool designed for agile teams. Features task tracking, team collaboration, Kanban boards, and a real-time analytics dashboard for monitoring project health.",
        tech: ["React", "Node.js", "MongoDB", "Redux", "Express", "D3.js"],
        category: "SaaS/Full-Stack",
        github: "https://github.com/Jason-Joshua-JJ",
        features: [
            "Task & Sprint Management",
            "Real-time Analytics Dashboard",
            "Team Collaboration Tools",
            "Kanban & List Views"
        ]
    },
    {
        id: 6,
        title: "E-commerce Shoe Store",
        description: "A premium full-stack e-commerce platform for luxury footwear. Includes advanced product filtering, secure payment processing, user authentication, and an admin dashboard for inventory management.",
        tech: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Tailwind CSS"],
        category: "E-commerce/Full-Stack",
        demo: "https://example.com",
        github: "https://github.com/Jason-Joshua-JJ",
        features: [
            "Advanced Product Filtering",
            "Secure Stripe Checkout",
            "User Authentication (JWT)",
            "Admin Inventory Dashboard"
        ]
    }
];
