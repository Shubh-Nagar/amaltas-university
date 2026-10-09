import React from "react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import SEO from "../../components/SEO.jsx";
import { breadcrumbSchema } from "../../data/schema.js";

const GALLERY = [
  "/assets/images%20of%20university/photo-gallery/2U8A8516.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A8702.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A8968.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A9059.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A9276.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A9378.webp",
  "/assets/images%20of%20university/photo-gallery/DJI_0019.webp",
  "/assets/images%20of%20university/photo-gallery/DJI_0034.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A0028.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A0147.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A0233.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A0439.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A0526.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A0665.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A0731.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A0849.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A1075.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A1253.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A1433.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A1767.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A2375.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A2411.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A2472.webp",
  "/assets/images%20of%20university/photo-gallery/2U8A8363.webp",
];

export default function PhotoGallery() {
  return (
    <>
      <SEO
        title="Photo Gallery — Campus Life in Pictures"
        description="A visual tour of Amaltas University, Dewas — campus, hostels, labs, ceremonies and student life captured across the year."
        path="/happenings/photo-gallery"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Happenings", path: "/happenings/events" }, { name: "Photo Gallery", path: "/happenings/photo-gallery" }])}
      />
      <PageHero
        crumb="Happenings / Photo Gallery"
        eyebrow="Happenings"
        title="Photo Gallery."
        sub="A visual walk through the Amaltas University campus — its people, ceremonies, and everyday moments."
        bgImg="/assets/images%20of%20university/photo-gallery/2U8A9276.webp"
      />

      {/* ── MASONRY GALLERY ── */}
      <section className="sec wrap">
        <div
          style={{
            columnCount: 3,
            columnGap: 20,
          }}
          className="photo-masonry"
        >
          {GALLERY.map((img, i) => (
            <Reveal key={img} delay={`d${(i % 3) + 1}`}>
              <div
                className="card-lift"
                style={{
                  borderRadius: 18,
                  overflow: "hidden",
                  breakInside: "avoid",
                  marginBottom: 20,
                }}
              >
                <img
                  src={img}
                  alt="Amaltas University campus"
                  loading="lazy"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
