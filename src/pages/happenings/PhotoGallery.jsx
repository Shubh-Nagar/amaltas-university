import React from "react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";

const GALLERY = [
  "/assets/images%20of%20university/photo-gallery/2U8A8516.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A8702.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A8968.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A9059.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A9276.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A9378.jpg",
  "/assets/images%20of%20university/photo-gallery/DJI_0019.jpg",
  "/assets/images%20of%20university/photo-gallery/DJI_0034.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A0028.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A0147.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A0233.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A0439.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A0526.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A0665.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A0731.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A0849.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A1075.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A1253.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A1433.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A1767.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A2375.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A2411.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A2472.jpg",
  "/assets/images%20of%20university/photo-gallery/2U8A8363.jpg",
];

export default function PhotoGallery() {
  return (
    <>
      <PageHero
        crumb="Happenings / Photo Gallery"
        eyebrow="Happenings"
        title="Photo Gallery."
        sub="A visual walk through the Amaltas University campus — its people, ceremonies, and everyday moments."
        bgImg="/assets/images%20of%20university/photo-gallery/2U8A9276.jpg"
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
