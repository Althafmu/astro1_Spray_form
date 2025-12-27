import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

// Using placeholder images for now - in a real app, pass these as props or imports
const allProjects = [
  {
    id: 1,
    category: "Commercial",
    title: "Warehouse Insulation",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop",
    description: "Full facility insulation for temperature control.",
  },
  {
    id: 2,
    category: "Agricultural",
    title: "Pole Barn Ceiling",
    image:
      "https://images.unsplash.com/photo-1500076656116-558758c991c1?q=80&w=2071&auto=format&fit=crop",
    description: "Condensation control for equipment storage.",
  },
  {
    id: 3,
    category: "Residential",
    title: "Attic Conversion",
    image:
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1965&auto=format&fit=crop",
    description: "Transforming drafty attics into usable space.",
  },
  {
    id: 4,
    category: "Commercial",
    title: "Office Complex",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop",
    description: "Soundproofing and thermal barrier for offices.",
  },
  {
    id: 5,
    category: "Agricultural",
    title: "Dairy Barn",
    image:
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop",
    description: "Livestock comfort and pest reduction.",
  },
  {
    id: 6,
    category: "Specialized",
    title: "Roof Coating",
    image:
      "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=2670&auto=format&fit=crop",
    description: "Sealing flat roofs against leaks.",
  },
];

const categories = [
  "All",
  "Commercial",
  "Agricultural",
  "Residential",
  "Specialized",
];

export default function ProjectGallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  const openLightbox = (index) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % filteredProjects.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex(
      (prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
  };

  return (
    <div className="w-full">
      {/* Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${
              activeCategory === cat
                ? "bg-brand-blue text-white shadow-lg scale-105"
                : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-lg border border-gray-100 bg-white"
            onClick={() => openLightbox(index)}
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white p-4 text-center">
              <span className="text-brand-blue font-bold tracking-wider text-sm uppercase mb-2">
                {project.category}
              </span>
              <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
              <p className="text-white/80 text-sm mb-4">
                {project.description}
              </p>
              <div className="flex items-center gap-2 text-brand-blue font-bold">
                <ZoomIn className="w-5 h-5" />
                <span>View Project</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
            onClick={closeLightbox}
          >
            <X className="w-10 h-10" />
          </button>

          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hidden md:block"
            onClick={prevImage}
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div
            className="max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredProjects[currentImageIndex].image}
              alt={filteredProjects[currentImageIndex].title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mb-4"
            />
            <div className="text-center text-white">
              <h3 className="text-2xl font-bold mb-1">
                {filteredProjects[currentImageIndex].title}
              </h3>
              <p className="text-white/70">
                {filteredProjects[currentImageIndex].description}
              </p>
            </div>
          </div>

          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all hidden md:block"
            onClick={nextImage}
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
}
