import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronDown } from "lucide-react";
import redBullImage from "@/assets/red-bull.jpg";
import watchImage from "@/assets/watch.png";
import mushroomImage from "@/assets/mushroom.jpg";
import spiderImage from "@/assets/spider.jpg";
import tiefighter from "@/assets/tie-fighter.png";
import Keyboard from "@/assets/Keyboard.png";
import celine from "@/assets/celine.jpg";
import FerreroRoacher from "@/assets/ferrero rocher.jpg";
import { Description } from "@radix-ui/react-toast";

const artworks = [
  {
    id: 1,
    title: "Red Bull Energy",
    image: redBullImage,
    description: "Product visualization with dynamic lighting and ice cubes",
    type: "image",
  },
  {
    id: 2,
    title: "Realistic Model",
    image: celine,
    Description: "Realistic cosplay model",
    type: "image",
  },
  {
    id: 7,
    title: "Minimalist Watch",
    image: watchImage,
    description: "Elegant timepiece with neon lighting effects",
    type: "image",
  },
  {
    id: 3,
    title: "Fantasy Mushrooms",
    image: mushroomImage,
    description: "Stylized 3D mushroom scene with vibrant colors",
    type: "image",
  },
  {
    id: 4,
    title: "Ferrero Rocher",
    image: FerreroRoacher,
    description: "3D Ferrero Rocher Design",
    type: "image",
  },

  {
    id: 8,
    title: "Spooky Spider",
    image: spiderImage,
    description: "Dark atmospheric render with dramatic lighting",
    type: "image",
  },
  {
    id: 5,
    title: "Keyboard Animation",
    video: "/keyboard animation.mp4",
    thumbnail: Keyboard,
    description: "Animated RGB Keyboard render showcasing rotation and lighting",
    type: "video",
  },
  {
    id: 6,
    title: "Tie Fighter from Star Wars",
    video: "/tie-fighter.mp4",
    thumbnail: tiefighter,
    description: "Animated Tie fighter design showcasing movements",
    type: "video",
  },
];

export default function BlenderGallery() {
  // selected artwork for lightbox
  const [selectedArtwork, setSelectedArtwork] = useState<typeof artworks[0] | null>(null);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    show: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 10 } }
  };

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8 bg-background min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors group">
            <div className="p-2 rounded-full bg-secondary/30 group-hover:bg-primary/20 transition-colors">
              <ChevronDown className="w-5 h-5 rotate-90" />
            </div>
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            3D Artwork <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Immersive collection of Blender renders and creative projects
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mb-16" />
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {artworks.map((artwork) => (
            <motion.div
              key={artwork.id}
              variants={item}
              onClick={() => setSelectedArtwork(artwork)}
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg bg-card/30 border border-border/30 hover:shadow-[0_0_30px_rgba(0,217,255,0.25)] transition-all duration-300"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedArtwork(artwork);
              }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <div className="aspect-square relative overflow-hidden">
                <img
                  src={artwork.type === "video" ? artwork.thumbnail : artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300" />
                {artwork.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-primary/85 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(0,217,255,0.5)]">
                      <Play className="w-7 h-7 text-white ml-0.5" />
                    </div>
                  </div>
                )}

                {/* Hover Overlay Details */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0 text-left">
                  <span className="text-primary font-bold text-sm tracking-widest uppercase mb-1">{artwork.type}</span>
                  <h3 className="text-2xl font-bold text-white mb-2 shadow-black drop-shadow-md">{artwork.title}</h3>
                  <p className="text-sm text-gray-200 line-clamp-2 drop-shadow-md">{artwork.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
              animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
              exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
              onClick={() => setSelectedArtwork(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
            >
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-10"
                aria-label="Close gallery modal"
              >
                <X className="w-8 h-8 drop-shadow-lg" />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-6xl w-full max-h-[90vh] flex flex-col overflow-hidden bg-card/10 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl"
              >
                <div className="relative flex-1 bg-black/50 flex items-center justify-center overflow-hidden">
                  {selectedArtwork.type === "video" ? (
                    <video
                      src={selectedArtwork.video}
                      controls
                      autoPlay
                      className="max-h-full max-w-full object-contain"
                    />
                  ) : (
                    <img
                      src={selectedArtwork.image}
                      alt={selectedArtwork.title}
                      className="max-h-full max-w-full object-contain"
                    />
                  )}
                </div>

                <div className="p-6 bg-background/95 border-t border-white/5">
                  <h3 className="text-2xl font-bold text-foreground mb-2">{selectedArtwork.title}</h3>
                  <p className="text-muted-foreground">{selectedArtwork.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
