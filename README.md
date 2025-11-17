# Jason Joshua - Portfolio Website

A stunning, modern developer portfolio built with React, Vite, Three.js, Tailwind CSS, and Framer Motion.

## 🚀 Features

- **Interactive 3D Hero** - Three.js particle field with smooth animations
- **Responsive Design** - Beautiful on all devices
- **Modern UI** - GitHub/Linear-inspired dark theme with neon accents
- **Smooth Animations** - Framer Motion-powered transitions
- **Project Showcase** - Featured projects with detailed modals
- **3D Gallery** - Blender artwork showcase with lightbox
- **Certifications** - Verified professional certifications
- **Contact Form** - Validated contact form with success feedback
- **SEO Optimized** - Meta tags, semantic HTML, accessible

## 🛠️ Tech Stack

- **Framework:** React 18 + Vite
- **3D Graphics:** Three.js + react-three-fiber + drei
- **Styling:** Tailwind CSS + Shadcn/UI
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Type Safety:** TypeScript

## 📦 Installation

### Prerequisites
- Node.js 16+ and npm

### Setup

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd <YOUR_PROJECT_NAME>

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:8080`

## 🏗️ Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero3D.tsx          # Three.js hero section
│   ├── Navbar.tsx          # Navigation bar
│   ├── About.tsx           # About section
│   ├── Skills.tsx          # Skills grid
│   ├── Projects.tsx        # Projects showcase
│   ├── Certifications.tsx  # Certifications cards
│   ├── BlenderGallery.tsx  # 3D artwork gallery
│   ├── Contact.tsx         # Contact form
│   ├── Footer.tsx          # Footer
│   └── ui/                 # Shadcn UI components
├── data/
│   ├── projects.js         # Project data
│   └── certifications.js   # Certification data
├── assets/                 # Images and media
├── pages/
│   └── Index.tsx           # Main page
└── index.css               # Global styles & design system
```

## 🎨 Design System

The portfolio uses a custom dark theme with:

- **Background:** Deep navy (#0a0e1a)
- **Primary:** Neon cyan (#00d9ff)
- **Accents:** Blue and purple gradients
- **Typography:** System fonts with smooth rendering
- **Effects:** Glassmorphism, glows, smooth transitions

## 🔧 Customization

### Update Personal Information

Edit `src/data/projects.js` and `src/data/certifications.js` to update project and certification details.

### Change Colors

Modify design tokens in `src/index.css`:

```css
:root {
  --primary: 199 100% 50%;
  --neon-cyan: 199 100% 50%;
  --neon-blue: 217 91% 60%;
  /* ... */
}
```

### Add More Projects

Add new entries to `src/data/projects.js`:

```javascript
{
  id: 7,
  title: "Your Project",
  description: "Description here",
  tech: ["React", "Node.js"],
  category: "Full-Stack",
  github: "https://github.com/...",
  features: ["Feature 1", "Feature 2"]
}
```

## 📱 Social Links

- **Email:** jasonjoshua4444@gmail.com
- **LinkedIn:** [jason-joshua-w](https://www.linkedin.com/in/jason-joshua-w)
- **GitHub:** [Jason-Joshua-JJ](https://github.com/Jason-Joshua-JJ)

## 🎓 Certifications

- AWS Certified Data Engineer - Associate
- AWS Certified Cloud Practitioner
- Google Cloud Digital Leader

All certifications are verified and linked in the portfolio.

## 📄 License

This project is personal portfolio of Jason Joshua. All rights reserved.

## 🙏 Acknowledgments

- Built with [Lovable](https://lovable.dev)
- UI components from [Shadcn/UI](https://ui.shadcn.com)
- Icons from [Lucide](https://lucide.dev)
- 3D graphics with [Three.js](https://threejs.org)

---

**Developed by Jason Joshua** | Full-Stack Developer | Data Engineer | Creative Technologist
