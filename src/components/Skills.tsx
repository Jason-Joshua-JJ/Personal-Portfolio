// src/components/Skills.tsx
import React from "react";
import ScrollFloat from "./ScrollFloat";
import ScrollReveal from "./ScrollReveal";
import TiltCard from "./TiltCard";

/**
 * Polished Skills component with inline SVG icons for selected skills:
 * React, Three.js, Blender, AWS Cloud, Google Cloud.
 *
 * Replace or extend the getSkillIcon function to add more icons.
 */

const skillCategories = [
    {
        category: "Frontend",
        skills: ["React.js", "Three.js", "Tailwind CSS", "JavaScript", "HTML/CSS"],
        accent: "from-cyan-400 via-blue-400 to-indigo-500",
        shadow: "shadow-cyan-500/20",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M12 2v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 7h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M5 17h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        category: "Backend",
        skills: ["Node.js", "Express.js", "Python"],
        accent: "from-emerald-400 via-lime-400 to-yellow-400",
        shadow: "shadow-emerald-500/20",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.2" />
                <path d="M7 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        category: "Cloud & Data",
        skills: ["AWS Cloud", "Google Cloud", "Snowflake", "PySpark", "SQL", "Teradata"],
        accent: "from-violet-400 via-fuchsia-400 to-rose-400",
        shadow: "shadow-violet-500/20",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M3 12h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M8 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M16 8v8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        category: "3D & Creative",
        skills: ["Blender", "3D Modeling", "Animation"],
        accent: "from-pink-400 via-red-400 to-orange-400",
        shadow: "shadow-pink-500/20",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" />
                <path d="M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
            </svg>
        ),
    },
    {
        category: "Mobile & Tools",
        skills: ["React Native", "Git / GitHub", "VS Code", "Testing (Unit / Manual)"],
        accent: "from-sky-400 via-cyan-400 to-emerald-400",
        shadow: "shadow-sky-500/20",
        icon: (
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 3h10v18H7z" stroke="currentColor" strokeWidth="1.2" />
                <circle cx="12" cy="17" r="1" fill="currentColor" />
            </svg>
        ),
    },
];

/* Return a small colored SVG icon component for known skills (kept for chips) */
function getSkillIcon(skill: string) {
    const name = skill.toLowerCase();
    if (name.includes("react") && !name.includes("native")) {
        return (
            <svg className="h-4 w-4 flex-none" viewBox="0 0 128 128" aria-hidden>
                <g fill="none" stroke="#61DAFB" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
                    <ellipse cx="64" cy="64" rx="48" ry="16" transform="rotate(0 64 64)" />
                    <ellipse cx="64" cy="64" rx="48" ry="16" transform="rotate(60 64 64)" />
                    <ellipse cx="64" cy="64" rx="48" ry="16" transform="rotate(-60 64 64)" />
                </g>
                <circle cx="64" cy="64" r="8" fill="#61DAFB" />
            </svg>
        );
    }
    // ... (rest of simple icons can use simple colored dots if needed, keeping it generic for now to save space)
    return <span className="h-2 w-2 rounded-full bg-primary/80 inline-block flex-none" />;
}

export default function Skills(): JSX.Element {
    return (
        <section id="skills" className="py-32 px-4 sm:px-6 lg:px-8 bg-secondary/5 relative overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl pointer-events-none">
                <div className="absolute inset-0 bg-primary/5 blur-[100px] rounded-full mix-blend-screen" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-20 text-center">
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
                        <ScrollFloat animationDuration={1} ease="back.out(2)" stagger={0.03}>Technical</ScrollFloat> <ScrollFloat className="gradient-text" animationDuration={1} ease="back.out(2)" stagger={0.03} split={false}>Skills</ScrollFloat>
                    </h2>
                    <div className="mx-auto w-24 h-1.5 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />
                </div>

                <ScrollReveal
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000"
                    stagger={0.15}
                    duration={0.8}
                    y={50}
                >
                    {skillCategories.map((category, idx) => (
                        <TiltCard
                            key={category.category}
                            className="h-full"
                            intensity={20}
                        >
                            <div className={`
                                h-full rounded-[2rem] bg-card/10 backdrop-blur-xl border border-white/10 p-8 flex flex-col items-center text-center
                                relative overflow-hidden group
                                hover:shadow-2xl hover:shadow-primary/10 transition-shadow duration-500
                            `}>
                                {/* Moving Gradient Background on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                                {/* Top Icon (Floating) */}
                                <div className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/10 shadow-lg group-hover:scale-110 transition-transform duration-500 text-primary">
                                    {category.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-foreground mb-6 group-hover:text-primary transition-colors">
                                    {category.category}
                                </h3>

                                {/* Divider */}
                                <div className="w-12 h-1 bg-white/10 rounded-full mb-8 group-hover:bg-primary/30 transition-colors" />

                                {/* Skills Cloud */}
                                <div className="flex flex-wrap justify-center gap-2">
                                    {category.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="px-3 py-1.5 text-xs font-medium tracking-wide bg-white/5 hover:bg-white/10 border border-white/5 rounded-full transition-all text-muted-foreground hover:text-foreground cursor-default"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </TiltCard>
                    ))}
                </ScrollReveal>
            </div>
        </section>
    );
}
