import React from "react";
import { ShieldCheck, Phone } from "lucide-react";
import { PageHero } from "../components/Layout.jsx";
import { Reveal } from "../components/Primitives.jsx";
import { C } from "../theme.js";

/* Content mirrored from https://amaltasuniversity.in/anti-ragging-committee/ */

const COMMITTEE = [
  { n: 1,  name: "Dr. R.K. Singh",  designation: "Vice-Chancellor",                              post: "Chairperson",       mobile: "9822268026", email: "vicechancellor@amaltasuniversity.in" },
  { n: 2,  name: "Dr. Abhay Gupta",         designation: "Registrar",                                    post: "Member",            mobile: "9404956221", email: "registrar@amaltasuniversity.in" },
  { n: 3,  name: "Dr. Madhurendra Rajput",     designation: "Boys Chief Warden, Dy. Dean",                  post: "Member",            mobile: "8770754769", email: "drmadhurendrarajput@gmail.com" },
  { n: 4,  name: "Dr. Abhilasha Dutta",        designation: "Director IQAC",                                post: "Member",            mobile: "9981964722", email: "drabhilashadutta@gmail.com" },
  { n: 5,  name: "Dr. Savita Rathod",          designation: "Girls Chief Warden Prof. & HOD Biochemistry",  post: "Member",            mobile: "8349986127", email: "savitarathore@gmail.com" },
  { n: 6,  name: "Dr. Pradyna Kulkarni",       designation: "Prof. & HOD Anatomy",                          post: "Member",            mobile: "9405955802", email: "drpradynakulkarni@amaltasuniversity.in" },
  { n: 7,  name: "Dr. Abhay John",             designation: "Prof. & HOD Pharmacology",                     post: "Member",            mobile: "9004044826", email: "abhayjohn@gmail.com" },
  { n: 8,  name: "Dr. Anita Ghodke",           designation: "Prof. & HOD Ayurveda",                         post: "Member",            mobile: "9421972027", email: "dranitaghodke@amaltasuniversity.in" },
  { n: 9,  name: "Dr. Manish Sharma",          designation: "Prof. & HOD CHN, GM",                          post: "Member",            mobile: "7024107445", email: "sharmamanish750@gmail.com" },
  { n: 10, name: "Dr. Mohsin Khan (Proctor)",  designation: "Chief Proctor",                                post: "Member",            mobile: "9001857748", email: "mohsinkhan4944@gmail.com" },
  { n: 11, name: "Dr. Sanjay Giri",            designation: "Assist Prof. Pharmacy",                        post: "Member",            mobile: "8120098742", email: "giri05126@gmail.com" },
  { n: 12, name: "Dr. Yogendra Bhadoria",      designation: "Prof. & HOD Homeopathy",                       post: "Member",            mobile: "8959681230", email: "gkssws@gmail.com" },
  { n: 13, name: "Dr. Anjali Mehata",          designation: "Prof. & HOD Paramedical",                      post: "Member",            mobile: "7879378428", email: "dr.anjalimehata5@gmail.com" },
  { n: 14, name: "Dr. Roshan Lal Kahar",       designation: "Dy. Registrar",                                post: "Member Secretary",  mobile: "9929698375", email: "dyregistrar.academic@amaltasuniversity.in" },
  { n: 15, name: "Dr. Neha Gaur",              designation: "Dean Student Welfare",                         post: "Member",            mobile: "9179541247", email: "dsw@amaltasuniversity.in" },
  { n: 16, name: "Anjali Dodwa",               designation: "Fresher student",                              post: "Student Member",    mobile: "9131179275", email: "dranjalidodwa@amaltasuniversity.in" },
  { n: 17, name: "Ankit Rathore",              designation: "Fresher student",                              post: "Student Member",    mobile: "7067228298", email: "ankitrathore@amaltasuniversity.in" },
  { n: 18, name: "Sonal Patidar",              designation: "2020-21 MBBS",                                 post: "Student Member",    mobile: "9414859744", email: "sonalpatidar@amaltasuniversity.in" },
  { n: 19, name: "Puneet Gauttam",             designation: "2021-22 MBBS",                                 post: "Student Member",    mobile: "9109329851", email: "puneetgauttam@amaltasuniversity.in" },
  { n: 20, name: "Bhakti Tiwari",              designation: "2022-23 MBBS",                                 post: "Student Member",    mobile: "9424081974", email: "bhaktitiwati@amaltasuniversity.in" },
  { n: 21, name: "Aman Sharma",                designation: "2022-23 MBBS",                                 post: "Student Member",    mobile: "8103519591", email: "amansharma@amaltasuniversity.in" },
  { n: 22, name: "Mr. Rajesh Shrivastav",      designation: "Student parents",                              post: "Parents Member",    mobile: "9890318479", email: "rajeshshrivastav@amaltasuniversity.in" },
  { n: 23, name: "Dr. Sanju Lata",             designation: "Student parents",                              post: "Parents Member",    mobile: "8223018805", email: "drsanjulata@amaltasuniversity.in" },
  { n: 24, name: "Ashwin Tanwar",              designation: "PRO",                                          post: "Member",            mobile: "9754829547", email: "pro@amaltasuniversity.in" },
  { n: 25, name: "Dr. Bhagwan Sharma",         designation: "NGO",                                          post: "Member",            mobile: "9425092709", email: "drbhagwansharma@amaltasuniversity.in" },
  { n: 26, name: "Mr. Chintaman Patel",        designation: "Securitory Officer",                           post: "Member",            mobile: "7479003072", email: "chintamanpatel@amaltasuniversity.in" },
  { n: 27, name: "Mr. Dilip Jaat",             designation: "Sarpanch Bangar",                              post: "Member",            mobile: "7424021666", email: "diplipjaat@amaltasuniversity.in" },
  { n: 28, name: "Mr. Mukesh Mukati",          designation: "Police Thana Incharge BNP Dewas",              post: "Member",            mobile: "9425854800", email: "mukeshmukati@amaltasuniversity.in" },
];

const SQUAD = [
  { n: 1, name: "Dr. Mohsin Khan",         designation: "Chief Proctor",                               post: "Chairperson", mobile: "9001857748", email: "mohsinkhan4944@gmail.com" },
  { n: 2, name: "Dr. Madhurendra Rajput",  designation: "Chief Warden, Dy. Dean",                      post: "Member",      mobile: "8770754769", email: "drmadhurendrarajput@gmail.com" },
  { n: 3, name: "Dr. Savita Rathod",       designation: "Girls Chief Warden Prof. & HOD Biochemistry", post: "Member",      mobile: "8349986127", email: "savitarathore@gmail.com" },
  { n: 4, name: "Dr. Manish Sharma",       designation: "Prof. & HOD CHN, GM",                         post: "Member",      mobile: "7024107445", email: "sharmamanish750@gmail.com" },
  { n: 5, name: "Dr. Pradyna Kulkarni",    designation: "Prof. & HOD Anatomy",                         post: "Member",      mobile: "9405955802", email: "drpradynakulkarni@amaltasuniversity.in" },
  { n: 6, name: "Ms. Ragini Thakur",       designation: "Non Teaching",                                post: "Member",      mobile: "9907670132", email: "raginiaccounts@amaltasuniversity.in" },
];

const th = {
  textAlign: "left", padding: "12px 14px", fontSize: 12.5, fontWeight: 700,
  letterSpacing: ".04em", textTransform: "uppercase", color: "#fff",
  background: `linear-gradient(135deg,${C.navy},${C.emerald})`, whiteSpace: "nowrap",
};
const td = { padding: "12px 14px", fontSize: 14, color: C.slate, verticalAlign: "top", lineHeight: 1.5 };

function MemberTable({ rows }) {
  return (
    <div style={{ overflowX: "auto", borderRadius: 14, border: "1px solid rgba(11,44,24,.1)", marginTop: 24 }}>
      <table style={{ borderCollapse: "collapse", width: "100%", minWidth: 760, background: "#fff" }}>
        <thead>
          <tr>
            <th style={{ ...th, width: 60 }}>Sr. No.</th>
            <th style={th}>Name</th>
            <th style={th}>Designation</th>
            <th style={th}>Post</th>
            <th style={th}>Mobile No.</th>
            <th style={th}>Email Id</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.n} style={{ borderTop: "1px solid rgba(11,44,24,.08)", background: i % 2 ? "rgba(16,128,59,.03)" : "#fff" }}>
              <td style={{ ...td, fontWeight: 700, color: C.ink }}>{r.n}</td>
              <td style={{ ...td, color: C.ink, fontWeight: 600, whiteSpace: "nowrap" }}>{r.name}</td>
              <td style={td}>{r.designation}</td>
              <td style={{ ...td, whiteSpace: "nowrap" }}>{r.post}</td>
              <td style={{ ...td, whiteSpace: "nowrap" }}>
                <a href={`tel:${r.mobile}`} style={{ color: C.emerald, textDecoration: "none" }}>{r.mobile}</a>
              </td>
              <td style={td}>
                <a href={`mailto:${r.email}`} style={{ color: C.emerald, textDecoration: "none", wordBreak: "break-all" }}>{r.email}</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function AntiRaggingCommittee() {
  return (
    <>
      <PageHero
        crumb="Anti-Ragging Committee"
        eyebrow="Student Safety & Welfare"
        title="Anti-Ragging Committee."
        sub="Amaltas University maintains a zero-tolerance policy on ragging. The committee and squad below are constituted to prevent, monitor and act on any incident."
        bgImg="/assets/images%20of%20university/campus%20life/2U8A2387.JPG"
      />

      {/* National anti-ragging helpline */}
      <section className="wrap" style={{ paddingTop: 40 }}>
        <Reveal>
          <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap", justifyContent: "space-between", background: "linear-gradient(135deg,#eef6f1 0%,#fdfce8 100%)", border: "1px solid rgba(11,44,24,.1)", borderRadius: 18, padding: "20px 26px" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
              <span style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg,${C.navy},${C.emerald})`, color: C.gold, display: "grid", placeItems: "center", flexShrink: 0 }}>
                <ShieldCheck size={20} />
              </span>
              <p style={{ margin: 0, color: C.slate, fontSize: 14.5, lineHeight: 1.6, maxWidth: 560 }}>
                Ragging is a punishable offence. Any student facing ragging may contact any committee member below, or the University at the number provided.
              </p>
            </div>
            <a href="tel:18005712131" className="btn btn-gold" style={{ padding: "11px 20px", fontSize: 14 }}>
              <Phone size={15} /> Toll Free 1800-571-2131
            </a>
          </div>
        </Reveal>
      </section>

      {/* Committee */}
      <section className="sec wrap" style={{ paddingTop: 56 }}>
        <Reveal>
          <span className="eyebrow">Anti-Ragging Committee</span>
          <h2 style={{ marginTop: 14 }}>Amaltas University Anti-Ragging Committee.</h2>
        </Reveal>
        <Reveal>
          <MemberTable rows={COMMITTEE} />
        </Reveal>
      </section>

      {/* Squad */}
      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <Reveal>
          <span className="eyebrow">Anti-Ragging Squad</span>
          <h2 style={{ marginTop: 14 }}>Amaltas University Anti-Ragging Squad.</h2>
        </Reveal>
        <Reveal>
          <MemberTable rows={SQUAD} />
        </Reveal>
      </section>
    </>
  );
}
