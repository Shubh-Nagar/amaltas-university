import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingBag, Heart, GraduationCap, Mail } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";

const MERCH_ITEMS = [
  { name: "Alumni Polo Tee",       tag: "Apparel",     price: "₹699",   badge: "Best Seller", color: C.emerald },
  { name: "Signature Hoodie",      tag: "Apparel",     price: "₹1,299", badge: "New",         color: C.navy   },
  { name: "Heritage Ceramic Mug",  tag: "Drinkware",   price: "₹399",   badge: null,          color: C.burg   },
  { name: "Campus Tote Bag",       tag: "Accessories", price: "₹499",   badge: "Eco",         color: "#1565C0"},
  { name: "Premium Leather Diary", tag: "Stationery",  price: "₹599",   badge: null,          color: "#4E342E"},
  { name: "Alumni Lapel Pin",      tag: "Accessories", price: "₹249",   badge: "New",         color: "#C07A00"},
];

const REQUIREMENTS = [
  { label: "Alumni Email IDs",    note: "Official @alumni communication channel"     },
  { label: "HOIS Alumni Data",   note: "Health Outcome Information System database" },
  { label: "Alumni Coordinator", note: "Dedicated point of contact per institution" },
  { label: "Website Portal",     note: "Integrated alumni-facing web page"           },
  { label: "Enquiry Form",       note: "Centralised inbound request handler"         },
];

export default function AlumniGivingBack() {
  return (
    <>
      <PageHero
        crumb="Alumni / Giving Back"
        eyebrow="Giving Back"
        title="Wear your Amaltas pride."
        sub="Every purchase from the Amaltas alumni merchandise store contributes directly to the Alumni Scholarship Fund — helping the next generation of healers afford a world-class health-sciences education."
        bgImg="/assets/images%20of%20university/campus%20life/sport.JPG"
      />

      {/* ── WHY IT MATTERS ── */}
      <section className="sec" style={{ background: "linear-gradient(135deg,#eef6f1 0%,var(--ivory) 60%,#fdfce8 100%)" }}>
        <div className="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
            {[
              { icon: ShoppingBag, title: "Quality merchandise", desc: "Official Amaltas-branded products made to last, designed to be worn with pride by graduates and their families.", color: C.emerald },
              { icon: Heart,       title: "Fund scholarships",   desc: "100% of net proceeds from the merchandise store go into the Alumni Scholarship Fund for meritorious students in need.", color: C.burg },
              { icon: GraduationCap, title: "Support the next batch", desc: "Your purchase directly funds tuition support for a student who — like you — deserves the chance to heal.", color: "#1565C0" },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={i} delay={`d${i + 1}`}>
                  <div style={{ background: "#fff", borderRadius: 18, padding: "28px 24px", border: "1px solid rgba(11,44,24,.08)", textAlign: "center", height: "100%" }}>
                    <div style={{ width: 52, height: 52, borderRadius: 14, background: `${item.color}14`, display: "grid", placeItems: "center", color: item.color, margin: "0 auto 16px" }}>
                      <Icon size={24} />
                    </div>
                    <h4 style={{ fontFamily: "Fraunces,serif", fontSize: 18, color: C.ink, marginBottom: 10 }}>{item.title}</h4>
                    <p style={{ color: C.slate, fontSize: 13.5, lineHeight: 1.7 }}>{item.desc}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MERCHANDISE GRID ── */}
      <section className="sec wrap">
        <Reveal>
          <span className="eyebrow">Official Store</span>
          <h2 style={{ marginTop: 14 }}>Amaltas merchandise.</h2>
          <p className="lead" style={{ marginTop: 18 }}>
            Available for delivery across India. To place an order, email{" "}
            <a href="mailto:alumni@amaltasuniversity.in" style={{ color: C.emerald, fontWeight: 600 }}>alumni@amaltasuniversity.in</a> with the item name, size, and quantity.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 20, marginTop: 52 }}>
          {MERCH_ITEMS.map((item, i) => (
            <Reveal key={i} delay={`d${(i % 4) + 1}`}>
              <div className="alumni-merch-card card-lift">
                {/* Visual placeholder */}
                <div style={{
                  height: 180, background: `linear-gradient(135deg,${item.color}16,${item.color}2e)`,
                  display: "flex", alignItems: "center", justifyContent: "center", position: "relative",
                }}>
                  <ShoppingBag size={54} color={item.color} opacity={0.45} />
                  {item.badge && (
                    <div style={{
                      position: "absolute", top: 12, right: 12,
                      background: item.color === C.gold ? C.ink : item.color,
                      color: item.color === C.gold ? C.gold : "#fff",
                      fontSize: 9.5, fontWeight: 700, letterSpacing: ".1em",
                      padding: "3px 9px", borderRadius: 100, textTransform: "uppercase",
                    }}>
                      {item.badge}
                    </div>
                  )}
                </div>
                <div style={{ padding: "16px 18px 20px", display: "flex", flexDirection: "column", gap: 8 }}>
                  <div style={{ fontSize: 10.5, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: C.slate }}>{item.tag}</div>
                  <div style={{ fontFamily: "Fraunces,serif", fontSize: 16.5, color: C.ink, lineHeight: 1.2 }}>{item.name}</div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 6, paddingTop: 14, borderTop: "1px solid rgba(11,44,24,.07)" }}>
                    <div style={{ fontFamily: "Fraunces,serif", fontSize: 19, color: C.emerald }}>{item.price}</div>
                    <button
                      onClick={e => e.preventDefault()}
                      style={{
                        padding: "8px 14px", borderRadius: 100,
                        background: `${item.color}16`, border: `1.5px solid ${item.color}44`,
                        color: item.color === C.gold ? C.ink : item.color,
                        fontFamily: "inherit", fontSize: 12, fontWeight: 700,
                        cursor: "pointer", transition: "all .25s",
                      }}>
                      Enquire
                    </button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Order enquiry note */}
        <Reveal>
          <div style={{
            marginTop: 40, padding: "22px 28px", borderRadius: 16,
            background: `${C.emerald}0e`, border: `1px solid ${C.emerald}22`,
            display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap",
          }}>
            <Mail size={20} color={C.emerald} style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 14.5, color: C.ink }}>How to Order</div>
              <p style={{ color: C.slate, fontSize: 13.5, margin: 0, lineHeight: 1.6 }}>
                Email <a href="mailto:alumni@amaltasuniversity.in" style={{ color: C.emerald, fontWeight: 600 }}>alumni@amaltasuniversity.in</a> with the item name, size (if applicable), quantity, and delivery address. We'll confirm availability and share payment details.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── REQUIREMENTS ── */}
      <section style={{ background: "linear-gradient(135deg,#eef6f1 0%,#fdfce8 100%)", padding: "80px 0" }}>
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">Requirements &amp; Infrastructure</span>
            <h2 style={{ marginTop: 14 }}>Building the alumni ecosystem.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              The following infrastructure is being established to support all alumni programmes — including the merchandise store, scholarship fund, and digital network.
            </p>
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14, marginTop: 44 }}>
            {REQUIREMENTS.map((r, i) => (
              <Reveal key={i} delay={`d${(i % 4) + 1}`}>
                <div style={{ background: "#fff", borderRadius: 14, padding: "18px 20px", border: "1px solid rgba(18,134,63,.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.emerald, flexShrink: 0 }} />
                    <div style={{ fontWeight: 700, fontSize: 13.5, color: C.ink }}>{r.label}</div>
                  </div>
                  <div style={{ fontSize: 12.5, color: C.slate, lineHeight: 1.55, paddingLeft: 16 }}>{r.note}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `linear-gradient(135deg,${C.navy2},${C.navy})`, padding: "80px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Alumni Scholarship Fund</span>
            <h2 style={{ marginTop: 14, color: C.ivory, maxWidth: 560, margin: "14px auto 0" }}>
              Every purchase makes a difference.
            </h2>
            <p style={{ color: "rgba(247,244,236,.68)", fontSize: 17, maxWidth: 480, margin: "16px auto 30px" }}>
              Want to contribute directly to the scholarship fund? Reach out to us through the Engage section.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/alumni/engage" className="btn btn-gold">Contact Us <ArrowRight size={18} /></Link>
              <Link to="/alumni" className="btn btn-ghost">Alumni Home <ArrowRight size={18} /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
