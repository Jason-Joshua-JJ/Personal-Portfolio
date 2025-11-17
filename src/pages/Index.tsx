import Navbar from '@/components/Navbar';
import Hero3D from '@/components/Hero3D';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Certifications from '@/components/Certifications';
import BlenderGallery from '@/components/BlenderGallery';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero3D />
        <About />
        <Skills />
        <Projects />
        <Certifications />
        <BlenderGallery />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
