// src/components/Skills.tsx
import React from "react";
import { motion } from "framer-motion";

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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 12h10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    category: "Cloud & Data",
    skills: ["AWS Cloud", "Google Cloud", "Snowflake", "PySpark", "SQL", "Teradata"],
    accent: "from-violet-400 via-fuchsia-400 to-rose-400",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
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
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2" />
        <path d="M8 12h8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    category: "Mobile & Tools",
    skills: ["React Native", "Git / GitHub", "VS Code", "Testing (Unit / Manual)"],
    accent: "from-sky-400 via-cyan-400 to-emerald-400",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M7 3h10v18H7z" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="12" cy="17" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

/* Animation variants (kept same as before) */
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.06, delayChildren: 0.06 * i },
  }),
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 120, damping: 16 } },
};

const chipVariants = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.32 } },
};

/* Return a small colored SVG icon component for known skills */
function getSkillIcon(skill: string) {
  const name = skill.toLowerCase();

  if (name.includes("react") && !name.includes("native")) {
    // React atom icon (blue)
    return (
      <svg className="h-5 w-5 flex-none" viewBox="0 0 128 128" aria-hidden>
        <g fill="none" stroke="#61DAFB" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round">
          <ellipse cx="64" cy="64" rx="48" ry="16" transform="rotate(0 64 64)" />
          <ellipse cx="64" cy="64" rx="48" ry="16" transform="rotate(60 64 64)" />
          <ellipse cx="64" cy="64" rx="48" ry="16" transform="rotate(-60 64 64)" />
        </g>
        <circle cx="64" cy="64" r="8" fill="#61DAFB" />
      </svg>
    );
  }

  if (name.includes("three")) {
    // simple Three.js style icon (muted cyan)
    return (
      <svg className="h-5 w-5 flex-none" viewBox="0 0 24 24" aria-hidden>
        <circle cx="12" cy="12" r="2.2" fill="#00D9FF" />
        <path d="M12 2 C16 6, 22 6, 22 12 C22 18, 16 18, 12 22 C8 18, 2 18, 2 12 C2 6, 8 6, 12 2 Z" stroke="#00D9FF" strokeWidth="0.8" fill="none" />
        <path d="M6 6 L18 18" stroke="#00D9FF" strokeWidth="0.9" strokeLinecap="round" />
      </svg>
    );
  }

  if (name.includes("blender")) {
    // Blender-inspired icon (orange/purple)
    return (
      <svg className="h-5 w-5 flex-none" viewBox="0 0 24 24" aria-hidden>
        <path d="M3 12c0-5 7-9 9-9s9 4 9 9 -4 9 -9 9S3 17 3 12z" fill="#F5792A" />
        <circle cx="17" cy="7" r="1.7" fill="#FFFFFF" opacity="0.95" />
      </svg>
    );
  }

  if (name.includes("aws")) {
    // AWS simple orange cloud/cube badge
    return (
      <svg className="h-5 w-5 flex-none" viewBox="0 0 24 24" aria-hidden>
        <path d="M2 15a6 6 0 0 1 0-6h4a6 6 0 0 1 10-2 5 5 0 1 1 0 10H2z" fill="#FF9900" />
      </svg>
    );
  }

  if (name.includes("google")) {
    // Google Cloud stylized multicolor cloud
    return (
      <svg className="h-5 w-5 flex-none" viewBox="0 0 24 24" aria-hidden>
        <path d="M6 14a5 5 0 0 1 0-4h2a5 5 0 0 1 9.9-1.2A4 4 0 0 1 20 15H6z" fill="#4285F4" />
        <path d="M6 14h14v1a3 3 0 0 1-3 3H8a4 4 0 0 1-2-3v-1z" fill="#34A853" opacity="0.95" />
      </svg>
    );
  }

  if (name.includes("git") || name.includes("github")) {
    return (
      <svg className="h-5 w-5 flex-none" viewBox="0 0 24 24" aria-hidden>
        <path fill="#F1502F" d="M12 .5C5.65.5.87 5.28.87 11.63c0 4.72 3.05 8.71 7.28 10.12.53.1.72-.23.72-.51 0-.25-.01-1.08-.02-1.97-2.96.64-3.58-1.17-3.58-1.17-.48-1.23-1.17-1.56-1.17-1.56-.96-.66.07-.65.07-.65 1.07.08 1.63 1.1 1.63 1.1.95 1.62 2.5 1.15 3.11.88.09-.69.37-1.15.67-1.41-2.36-.27-4.84-1.18-4.84-5.22 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.36.1-2.83 0 0 .88-.28 2.88 1.08a9.99 9.99 0 0 1 5.24 0c2-.36 2.88-1.08 2.88-1.08.57 1.47.21 2.56.1 2.83.67.74 1.08 1.67 1.08 2.82 0 4.04-2.49 4.95-4.86 5.21.38.33.72.97.72 1.96 0 1.42-.01 2.56-.01 2.91 0 .28.19.61.73.51C20.07 20.33 23.12 16.35 23.12 11.63 23.12 5.28 18.34.5 12 .5z" />
      </svg>
    );
  }

  // default tiny circle (keeps layout consistent)
  return <span className="h-2.5 w-2.5 rounded-full bg-primary inline-block flex-none" />;
}

export default function Skills(): JSX.Element {
  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-secondary/5">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          custom={0}
          variants={containerVariants}
          className="mb-12 text-center"
        >
          <motion.h2 className="text-4xl md:text-5xl font-extrabold mb-4" variants={cardVariants}>
            Technical <span className="gradient-text">Skills</span>
          </motion.h2>
          <motion.div
            variants={cardVariants}
            className="mx-auto w-28 h-1 rounded-full bg-gradient-to-r from-primary to-cyan-400/80"
          />
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {skillCategories.map((category, idx) => (
            <motion.div
              key={category.category}
              variants={cardVariants}
              className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 backdrop-blur-md shadow-sm"
              aria-labelledby={`skills-${idx}-title`}
            >
              {/* Accent strip */}
              <div
                className={`absolute left-0 top-0 h-1 w-full bg-gradient-to-r ${category.accent} opacity-90`}
                aria-hidden
              />

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/50 border border-border/50 text-primary">
                  {category.icon}
                </div>
                <div>
                  <h3 id={`skills-${idx}-title`} className="text-xl font-semibold text-foreground">
                    {category.category}
                  </h3>
                  <p className="text-sm text-muted-foreground">Selected tools & technologies</p>
                </div>
              </div>

              {/* Skill chips */}
              <motion.div
                className="flex flex-wrap gap-3"
                variants={containerVariants}
                custom={idx}
              >
                {category.skills.map((skill) => (
                  <motion.button
                    key={skill}
                    variants={chipVariants}
                    whileHover={{ scale: 1.03, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    className="group relative inline-flex items-center gap-3 rounded-full px-4 py-2 bg-secondary/30 border border-border/50 shadow-sm hover:shadow-[0_8px_30px_rgba(0,217,255,0.08)] transition-all"
                    aria-label={skill}
                    title={skill}
                    type="button"
                  >
                    {/* icon for the skill (colored or default dot) */}
                    <span className="flex items-center justify-center">
                      {getSkillIcon(skill)}
                    </span>

                    <span className="text-sm font-medium text-foreground">{skill}</span>

                    {/* subtle animated highlight on hover */}
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{
                        background: "linear-gradient(90deg, rgba(0,217,255,0.06), rgba(0,0,0,0))",
                      }}
                    />
                  </motion.button>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
