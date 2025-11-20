// src/components/BlenderGallery.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Play, ChevronDown, ChevronUp } from "lucide-react";
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
  {id: 2,
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
  // collapsed by default (show only first 3)
  const [expanded, setExpanded] = useState(false);

  const visibleArtworks = expanded ? artworks : artworks.slice(0, 3);

  return (
    <section id="gallery" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            3D Artwork <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-muted-foreground text-center mb-4">
            Blender renders, animations, and creative projects
          </p>
          <div className="w-20 h-1 bg-primary mx-auto mb-16" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleArtworks.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onClick={() => setSelectedArtwork(artwork)}
              className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg bg-gradient-to-b from-white/2 to-white/3"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedArtwork(artwork);
              }}
            >
              <div className="aspect-square relative">
                <img
                  src={artwork.type === "video" ? artwork.thumbnail : artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity" />
                {artwork.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-primary/85 rounded-full flex items-center justify-center group-hover:scale-105 transition-transform">
                      <Play className="w-7 h-7 text-white ml-0.5" />
                    </div>
                  </div>
                )}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background/80 to-transparent">
                <h3 className="text-xl font-bold mb-1 text-white">{artwork.title}</h3>
                <p className="text-sm text-muted-foreground">{artwork.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expand / Collapse control */}
        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={() => setExpanded((s) => !s)}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 rounded-full px-5 py-3 bg-white/4 border border-white/6 backdrop-blur-sm text-sm font-medium hover:scale-105 transition transform"
            aria-expanded={expanded}
            aria-controls="gallery-expanded"
            title={expanded ? "Show less gallery" : "Show more gallery"}
          >
            {/* Opacity-styled icon that matches site */}
            <span className="flex items-center justify-center rounded-full w-9 h-9 bg-white/6 border border-white/8">
              {expanded ? (
                <ChevronUp className="w-5 h-5 text-white/90" />
              ) : (
                <ChevronDown className="w-5 h-5 text-white/80" />
              )}
            </span>

            <span className="text-white/90">
              {expanded ? "Show less" : `Show ${artworks.length - 3} more`}
            </span>
          </motion.button>
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedArtwork && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtwork(null)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            >
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 p-2 text-white hover:bg-white/10 rounded-lg transition-colors z-10"
                aria-label="Close gallery modal"
              >
                <X className="w-6 h-6" />
              </button>

              <motion.div
                initial={{ scale: 0.96 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.96 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-5xl w-full"
              >
                {selectedArtwork.type === "video" ? (
                  <video
                    src={selectedArtwork.video}
                    controls
                    autoPlay
                    className="w-full rounded-lg shadow-2xl"
                  />
                ) : (
                  <img
                    src={selectedArtwork.image}
                    alt={selectedArtwork.title}
                    className="w-full rounded-lg shadow-2xl"
                  />
                )}
                <div className="mt-4 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">{selectedArtwork.title}</h3>
                  <p className="text-gray-400">{selectedArtwork.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
