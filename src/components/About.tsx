import { motion } from 'framer-motion';
import { Code, Database, Palette } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Code,
      title: "Full-Stack Development",
      description: "Building scalable web applications with React, Node.js, and modern frameworks"
    },
    {
      icon: Database,
      title: "Data Engineering",
      description: "Designing cloud-native ETL pipelines with AWS, Snowflake, and PySpark"
    },
    {
      icon: Palette,
      title: "Creative Development",
      description: "Crafting interactive 3D experiences with Three.js and Blender"
    }
  ];

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-12" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              I am <span className="text-primary font-semibold">Jason Joshua</span> — a developer passionate about building interactive web applications, scalable systems, visually appealing front-end experiences, and cloud-native data pipelines.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My background spans full-stack development, AWS-based ETL engineering, Snowflake, Python automation, and front-end engineering using React and Three.js.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              Although currently working in testing (unit testing, manual testing, data validation), I specialize in development and I'm transitioning fully into a developer role where I can leverage both creativity and engineering.
            </p>

            <div className="flex gap-4 pt-4">
              <a
                href="https://www.linkedin.com/in/jason-joshua-w"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 glass rounded-lg hover:bg-white/10 transition-all"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/Jason-Joshua-JJ"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-2 glass rounded-lg hover:bg-white/10 transition-all"
              >
                GitHub
              </a>
            </div>
          </motion.div>

          {/* Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="glass p-6 rounded-xl hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
