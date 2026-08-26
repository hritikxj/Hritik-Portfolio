'use client';

import { useState } from 'react';
import Reveal from './Reveal';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Work() {
  const categories = ["Branding", "Illustrations", "UI/UX"] as const;
  type Category = typeof categories[number];

  const [activeCategory, setActiveCategory] = useState<Category>("Branding");

  const works = [
    // Branding
    {
      title: "Purr Pantry — Premium Cat Food Brand",
      category: "Branding",
      section: "Branding",
      double: false,
      color: "#1A1A1A",
      thumbText: "Purr Pantry",
      textClass: "text-[clamp(32px,5vw,64px)] text-white/20",
      image: "/Purthumbnail.jpg",
      link: "/purr-pantry"
    },
    {
      title: "Dove #TheRealGrowth",
      category: "Campaign",
      section: "Branding",
      double: false,
      color: "#E8E2D6",
      thumbText: "Dove Campaign",
      textClass: "text-lg text-smoke",
      image: "/dove_thumb.jpg",
      link: "/dove"
    },
    {
      title: "Dash — Ultra-Fast Electronics Delivery",
      category: "Branding",
      section: "Branding",
      double: false,
      color: "#FF6B35",
      thumbText: "DASH",
      textClass: "text-lg text-white/30",
      image: "/dash/dash-slide-1.png",
      link: "/dash"
    },
    {
      title: "Social Media Creatives",
      category: "Social Media",
      section: "Branding",
      double: false,
      color: "#0F172A",
      thumbText: "Social Media Creatives",
      textClass: "text-lg text-white/30",
      image: "/social_thumb.png",
      link: "/social-media-creatives"
    },

    // UI/UX
    {
      title: "Nothing Community Edition",
      category: "UI/UX",
      section: "UI/UX",
      double: false,
      color: "#2C3E50",
      thumbText: "Nothing Widget",
      textClass: "text-lg text-white/30",
      image: "/nothing_thumb.jpg",
      link: "/nothing"
    },
  ];

  const illustrations = [
    {
      id: "comic-main",
      title: "Cricket Comic Strip",
      category: "Comic Art",
      image: "/Illustration section/1.jpg",
      description: "A sequential comic strip telling the story of a cricket ball breaking a window and the resulting reaction.",
      role: "Illustrator / Storyboard Artist",
      year: "2026",
      color: "#F5F5F0",
      thumbText: "Cricket Comic",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[1.41]"
    },
    {
      id: "comic-process",
      title: "Comic Strip Process & Sketches",
      category: "Process Work",
      image: "/Illustration section/1 process.jpg",
      description: "Development stages showing rough storyboards, line layouts, and color blocking phases for the cricket comic strip.",
      role: "Illustrator",
      year: "2026",
      color: "#F5F5F0",
      thumbText: "Comic Process",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[1.41]"
    },
    {
      id: "banaras",
      title: "Banaras Illustration (A4 - 24)",
      category: "Editorial Illustration",
      image: "/Illustration section/2 banaras illustration.jpg",
      description: "An editorial visual study depicting a traditional scene in Banaras, showcasing architecture and cultural elements.",
      role: "Illustrator",
      year: "2026",
      color: "#1A2E40",
      thumbText: "Banaras",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.71]"
    },
    {
      id: "samurai",
      title: "Samurai Illustration (A4 - 21)",
      category: "Character Design",
      image: "/Illustration section/3 samurai.jpg",
      description: "A bold character illustration depicting a Japanese samurai in action with striking red and white colors.",
      role: "Illustrator",
      year: "2026",
      color: "#B82525",
      thumbText: "Samurai",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.71]"
    },
    {
      id: "ghalib-illustration",
      title: "Ghalib Cover Art Study",
      category: "Book Cover Design",
      image: "/Illustration section/4 galib book cover illustration.jpg",
      description: "Intricate line-art illustration study for Ghalib's poetry book cover with color explorations.",
      role: "Illustrator / Cover Designer",
      year: "2026",
      color: "#1E2240",
      thumbText: "Ghalib Art",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.71]"
    },
    {
      id: "ghalib-cover",
      title: "Love Secrets of Ghalib Book Cover",
      category: "Book Cover Design",
      image: "/Illustration section/4 galib book cover .jpg",
      description: "The finalized cover design for 'Love Secrets of Ghalib' featuring custom lettering and line art details.",
      role: "Cover Designer",
      year: "2026",
      color: "#1E2240",
      thumbText: "Ghalib Cover",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.71]"
    },
    {
      id: "ghalib-mockup-1",
      title: "Ghalib Mockup - Front View",
      category: "Packaging Mockup",
      image: "/Illustration section/4 mockup 1.jpg",
      description: "Book cover mockup showing the final layout and texture of the cover in a print environment.",
      role: "Designer",
      year: "2026",
      color: "#FAF9F5",
      thumbText: "Mockup 1",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.75]"
    },
    {
      id: "ghalib-mockup-2",
      title: "Ghalib Mockup - Spread View",
      category: "Packaging Mockup",
      image: "/Illustration section/4 mockup 2.jpg",
      description: "Book spread mockup displaying the texture and print quality of the jacket paper and binding.",
      role: "Designer",
      year: "2026",
      color: "#FAF9F5",
      thumbText: "Mockup 2",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.75]"
    },
    {
      id: "ghalib-mockup-3",
      title: "Ghalib Mockup - Shelf Display",
      category: "Packaging Mockup",
      image: "/Illustration section/4 mockup 3.jpg",
      description: "Lifestyle print mockup showing the book styled on a bookshelf with accessories.",
      role: "Designer",
      year: "2026",
      color: "#FAF9F5",
      thumbText: "Mockup 3",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.75]"
    },
    {
      id: "ghalib-mockup-4",
      title: "Ghalib Mockup - Library Scene",
      category: "Packaging Mockup",
      image: "/Illustration section/4 mockup 4.jpg",
      description: "An alternative library shelf presentation showing the book spine and cover aesthetic in ambient lighting.",
      role: "Designer",
      year: "2026",
      color: "#FAF9F5",
      thumbText: "Mockup 4",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.75]"
    },
    {
      id: "ajji-kairuchi",
      title: "Ajji Kairuchi Packaging Illustration",
      category: "Brand Illustration",
      image: "/Illustration section/5 ajji kairuchi brand illustration for their packaging.jpg",
      description: "Warm, family-centric character illustration created for Ajji Kairuchi brand packaging, depicting grandmothers preparing traditional recipes.",
      role: "Illustrator",
      year: "2026",
      color: "#D67B27",
      thumbText: "Ajji Kairuchi",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[1.20]"
    },
    {
      id: "vaibhav-caricature",
      title: "Vaibhav Kumaresh Caricature",
      category: "Caricature Art",
      image: "/Illustration section/6 caricature illustration for Vaibhav Kumaresh.jpg",
      description: "A custom hand-drawn digital caricature of renowned Indian animation director Vaibhav Kumaresh.",
      role: "Illustrator",
      year: "2026",
      color: "#ECC844",
      thumbText: "Caricature",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.71]"
    },
    {
      id: "vaibhav-picture",
      title: "Presenting to Vaibhav Kumaresh",
      category: "Event Photo",
      image: "/Illustration section/6 Picture with Vaibhav Kumaresh.jpg",
      description: "A photograph capturing the moment of presenting the framed caricature to Vaibhav Kumaresh.",
      role: "Illustrator",
      year: "2026",
      color: "#F0EFEA",
      thumbText: "Presentation",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[1.50]"
    },
    {
      id: "coffee-concept",
      title: "Immortal Coffee Concept Sketch",
      category: "Brand Illustration",
      image: "/Illustration section/7 illustration for immortal coffee.jpg",
      description: "Minimalist black and white line-art logo/mascot sketch depicting a bull character with coffee elements.",
      role: "Brand Designer",
      year: "2026",
      color: "#FAF9F5",
      thumbText: "Coffee Sketch",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.75]"
    },
    {
      id: "coffee-neon",
      title: "Immortal Coffee Neon Branding",
      category: "Brand Signage",
      image: "/Illustration section/7 illustration for immortal coffee 2.jpg",
      description: "A glowing red acrylic neon signage mockup displaying the Immortal Coffee mascot character.",
      role: "Brand Designer",
      year: "2026",
      color: "#1E1212",
      thumbText: "Neon Sign",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.75]"
    },
    {
      id: "coffee-mockup-1",
      title: "Immortal Coffee Package Mockup (Front)",
      category: "Packaging Design",
      image: "/Illustration section/7 illustration for immortal coffee mockup 1.jpg",
      description: "Front view of the premium matte-black coffee bean packaging with gold-foil details.",
      role: "Packaging Designer",
      year: "2026",
      color: "#121212",
      thumbText: "Mockup 1",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.75]"
    },
    {
      id: "coffee-mockup-2",
      title: "Immortal Coffee Package Detail",
      category: "Packaging Design",
      image: "/Illustration section/7 illustration for immortal coffee mockup 2.jpg",
      description: "Close-up mockup highlighting the gold foil texture and contrast on the matte black packaging surface.",
      role: "Packaging Designer",
      year: "2026",
      color: "#121212",
      thumbText: "Mockup 2",
      textClass: "text-sm text-smoke",
      aspectClass: "aspect-[0.75]"
    }
  ];

  type WorkItem = typeof works[number];
  type IllustrationItem = typeof illustrations[number];
  type ShowcaseItem = WorkItem | IllustrationItem;

  const [selectedProject, setSelectedProject] = useState<ShowcaseItem | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.014
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 13 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1] as const // premium easeOutExpo
      }
    }
  };

  const filteredWorks = works.filter(work => work.section === activeCategory);

  return (
    <>
      <section id="work" className="scroll-mt-16 py-12 md:py-16">
        <div className="w-full px-5 md:px-12 lg:px-10">
          <Reveal>
            <div className="flex flex-col gap-5 mb-12 pb-5 border-b-[0.5px] border-border-subtle">
              <h2 className="font-display text-4xl md:text-5xl font-light text-ink">The Work</h2>

              {/* Category Filter Tabs */}
              <div className="flex items-center gap-1 p-1 bg-parchment/60 border border-border-subtle rounded-full w-full md:w-fit select-none scrollbar-none">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className="relative flex-1 md:flex-none px-5 py-2.5 rounded-full text-xs font-semibold tracking-wider uppercase cursor-pointer whitespace-nowrap select-none focus:outline-none"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="active-pill"
                          className="absolute inset-0 bg-brand-red rounded-full"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <span className={`relative z-10 transition-colors duration-300 ${isActive ? "text-off-white" : "text-smoke hover:text-ink"}`}>
                        {cat}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            {activeCategory === "Illustrations" ? (
              /* Immersive Custom Curated Bento Grid for Illustrations, preserving sequence with height alignment */
              <motion.div
                key="illustrations-grid"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -6, transition: { duration: 0.1, ease: "easeIn" } }}
                className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-start"
              >

                {/* Row 1: Comic Strip & Process (Landscape - 6 cols each) */}
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[0].image} alt={illustrations[0].title} width={1410} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 100vw, 50vw" />
                </motion.div>
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[1].image} alt={illustrations[1].title} width={1410} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 100vw, 50vw" />
                </motion.div>

                {/* Row 2: Poster Print Series (Portrait - 6 cols each) */}
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[2].image} alt={illustrations[2].title} width={710} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 100vw, 50vw" />
                </motion.div>
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-6 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[3].image} alt={illustrations[3].title} width={710} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 100vw, 50vw" />
                </motion.div>

                {/* Row 3: Ghalib Section (Left stacked, Right 2x2 grid) */}
                {/* Stacked Ghalib Art & Cover on Left (4 cols) */}
                <motion.div className="col-span-12 md:col-span-4 flex flex-col gap-6 w-full">
                  <motion.div variants={itemVariants} className="overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                    <Image src={illustrations[4].image} alt={illustrations[4].title} width={710} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 100vw, 33vw" />
                  </motion.div>
                  <motion.div variants={itemVariants} className="overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                    <Image src={illustrations[5].image} alt={illustrations[5].title} width={710} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 100vw, 33vw" />
                  </motion.div>
                </motion.div>
                {/* 2x2 Mockup Grid on Right (8 cols) */}
                <motion.div className="col-span-12 md:col-span-8 grid grid-cols-2 gap-6 w-full">
                  {illustrations.slice(6, 10).map((item) => (
                    <motion.div key={item.id} variants={itemVariants} className="overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                      <Image src={item.image} alt={item.title} width={750} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 50vw, 33vw" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Row 4: Ajji Kairuchi (Full Width - 12 cols) */}
                <motion.div variants={itemVariants} className="col-span-12 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[10].image} alt={illustrations[10].title} width={1200} height={1000} className="w-full h-auto object-contain block" sizes="100vw" />
                </motion.div>

                {/* Row 5: Vaibhav Caricature & Vaibhav Presentation Photo (Portrait - 4 cols, Landscape - 8 cols) */}
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-4 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[11].image} alt={illustrations[11].title} width={710} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 100vw, 33vw" />
                </motion.div>
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-8 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[12].image} alt={illustrations[12].title} width={1500} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 100vw, 66vw" />
                </motion.div>

                {/* Row 6: Coffee Branding (4-column row to keep Neon Signage sharp and compact) */}
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-3 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[13].image} alt={illustrations[13].title} width={750} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 50vw, 25vw" />
                </motion.div>
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-3 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[14].image} alt={illustrations[14].title} width={750} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 50vw, 25vw" />
                </motion.div>
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-3 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[15].image} alt={illustrations[15].title} width={750} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 50vw, 25vw" />
                </motion.div>
                <motion.div variants={itemVariants} className="col-span-12 md:col-span-3 overflow-hidden rounded border border-border-subtle bg-parchment/10 w-full block">
                  <Image src={illustrations[16].image} alt={illustrations[16].title} width={750} height={1000} className="w-full h-auto object-contain block" sizes="(max-width: 768px) 50vw, 25vw" />
                </motion.div>

              </motion.div>
            ) : (
              /* Regular Grid for Branding and UI/UX */
              <motion.div
                key="regular-works-grid"
                layout
                initial={{ opacity: 0, y: 13 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.22 } }}
                exit={{ opacity: 0, y: -6, transition: { duration: 0.1, ease: "easeIn" } }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                <AnimatePresence mode="popLayout">
                  {filteredWorks.map((work, idx) => {
                    const CardContent = (
                      <>
                        <div
                          className={`rounded mb-3.5 overflow-hidden relative transition-transform duration-300 group-hover:scale-[1.01] ${work.double ? 'aspect-video' : 'aspect-4/3'}`}
                          style={{ backgroundColor: work.image ? undefined : work.color }}
                        >
                          {work.image && (
                            <Image
                              src={work.image}
                              alt={work.title}
                              fill
                              className="object-cover"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              priority={idx < 3}
                            />
                          )}
                          {!work.image && (
                            <div className={`w-full h-full flex items-center justify-center font-display font-light ${work.textClass}`}>
                              {work.thumbText}
                            </div>
                          )}
                          <div className="absolute inset-0 bg-ink opacity-0 transition-opacity duration-300 flex items-center justify-center group-hover:opacity-85 z-10">
                            <span className="text-off-white text-xs tracking-[0.1em] uppercase">
                              {work.link ? (work.double ? 'View Case Study →' : 'View →') : 'Showcase →'}
                            </span>
                          </div>
                        </div>
                        <div className="flex justify-between items-baseline">
                          <span className="text-sm font-medium text-ink">{work.title}</span>
                          <span className="text-[10px] tracking-[0.1em] uppercase text-smoke">{work.category}</span>
                        </div>
                      </>
                    );

                    return (
                      <motion.div
                        key={work.title}
                        layout
                        initial={{ opacity: 0, y: 13 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.97 }}
                        transition={{ duration: 0.15, ease: "easeInOut", delay: idx * 0.011 }}
                        className={work.double ? 'md:col-span-2' : ''}
                      >
                        {work.link ? (
                          <Link
                            href={work.link}
                            onClick={() => {
                              try {
                                sessionStorage.setItem('portfolio-scroll-y', window.scrollY.toString());
                              } catch (e) {
                                console.warn(e);
                              }
                            }}
                            className="block cursor-pointer group h-full no-underline"
                          >
                            {CardContent}
                          </Link>
                        ) : (
                          <div
                            onClick={() => setSelectedProject(work)}
                            className="group h-full cursor-pointer"
                          >
                            {CardContent}
                          </div>
                        )}
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Showcase Lightbox Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 bg-ink/80 backdrop-blur-md z-[100] flex items-center justify-center p-4 md:p-6 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#FAF9F5] text-ink rounded-xl overflow-hidden max-w-3xl w-full border border-border-subtle shadow-2xl relative cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 text-smoke hover:text-ink transition-colors cursor-pointer p-2 z-10 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Visual Showcase (Image or Color block fallback) */}
                {selectedProject.image ? (
                  <div className="relative w-full min-h-[300px] md:h-full bg-parchment/10 flex items-center justify-center p-6 border-r border-border-subtle/50">
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-contain p-6"
                    />
                  </div>
                ) : (
                  <div
                    className="aspect-4/3 md:aspect-auto md:h-full min-h-[300px] relative flex items-center justify-center w-full"
                    style={{ backgroundColor: selectedProject.color || "#FAF9F5" }}
                  >
                    <span className={`font-display font-light text-[clamp(28px,4vw,54px)] text-white/20 select-none`}>
                      {selectedProject.thumbText || ""}
                    </span>
                  </div>
                )}

                {/* Details */}
                <div className="p-6 md:p-8 flex flex-col justify-between h-full min-h-[300px]">
                  <div>
                    <span className="text-[10px] tracking-[0.2em] uppercase text-smoke font-mono block mb-1">
                      {selectedProject.category}
                    </span>
                    <h3 className="font-display text-2xl md:text-3xl font-light text-ink mb-6">
                      {selectedProject.title}
                    </h3>

                    <p className="text-xs text-smoke leading-relaxed mb-6 font-light">
                      {('description' in selectedProject && selectedProject.description) || "Project details and visual assets are currently being curated for this showcase."}
                    </p>

                    <div className="grid grid-cols-2 gap-4 border-t border-border-subtle pt-5">
                      <div>
                        <span className="text-[9px] tracking-[0.1em] uppercase text-smoke block mb-0.5">Role</span>
                        <span className="text-xs text-ink font-medium">{('role' in selectedProject && selectedProject.role) || "Designer"}</span>
                      </div>
                      <div>
                        <span className="text-[9px] tracking-[0.1em] uppercase text-smoke block mb-0.5">Year</span>
                        <span className="text-xs text-ink font-medium">{('year' in selectedProject && selectedProject.year) || "2026"}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-border-subtle flex items-center justify-between">
                    <span className="text-[10px] text-smoke italic">
                      Case study under construction
                    </span>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="text-xs font-semibold tracking-wider uppercase border border-ink px-4 py-2 rounded-full hover:bg-ink hover:text-off-white transition-all cursor-pointer focus:outline-none"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

