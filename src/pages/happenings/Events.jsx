import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Phone, CalendarDays, X, ChevronLeft, ChevronRight, Images, Search, SlidersHorizontal, Check } from "lucide-react";
import { PageHero } from "../../components/Layout.jsx";
import { Reveal } from "../../components/Primitives.jsx";
import { C } from "../../theme.js";
import { CONTACT } from "../../data/content.js";
import SEO from "../../components/SEO.jsx";
import UpcomingEvents from "../../components/UpcomingEvents.jsx";
import { breadcrumbSchema } from "../../data/schema.js";

/* builds encoded gallery paths from a folder name + file list */
const EV_BASE = "/assets/images%20of%20university/events";
const gal = (folder, files) => files.map((f) => `${EV_BASE}/${encodeURIComponent(folder)}/${f}`);

const EVENTS = [
  {
    img: "/assets/images%20of%20university/events/De-addiction%20Guest%20Lecture/1.jpeg",
    date: "22 September 2026",
    title: "अमलतास इंस्टीट्यूट ऑफ आयुर्वेद में डी-एडिक्शन एंड इट्स आयुर्वेदिक मैनेजमेंट विषय पर गेस्ट लेक्चर आयोजित",
    desc: "माननीय फाउंडर चेयरमैन (अमलतास ग्रुप देवास) श्री सुरेश सिंह भदौरिया एवं माननीय चेयरमैन श्री मयंकराज सिंह भदौरिया के शुभाशीष एवं मार्गदर्शन में तथा अमलतास ग्रुप के डायरेक्टर डॉ. अभिजीत तायडे सर, महाप्रबंधक डॉ. मनीष शर्मा सर एवं प्राचार्या डॉ. अनिता घोडके के विशेष मार्गदर्शन में दिनांक 22/09/2026 को 11वें आयुर्वेद दिवस के पावन अवसर पर अमलतास इंस्टीट्यूट ऑफ आयुर्वेद के अगदतंत्र एवं विधि वैद्यक विभाग के द्वारा एक भव्य कार्यक्रम का आयोजन किया गया। “डी-एडिक्शन एंड इट्स आयुर्वेदिक मैनेजमेंट” विषय पर गेस्ट लेक्चर का आयोजन किया गया, जिसमें शासकीय अष्टांग आयुर्वेद महाविद्यालय, इंदौर के डॉ. नितिन उरमलिया (एसोसिएट प्रोफेसर एवं एच.ओ.डी., अगदतंत्र विभाग) प्रमुख वक्ता रहे। इस संपूर्ण कार्यक्रम का सफल संचालन डॉ. विची शर्मा (असिस्टेंट प्रोफेसर, अगदतंत्र विभाग) ने किया तथा इस कार्यक्रम का आयोजन डॉ. विजया मोरे (एच.ओ.डी. एवं प्रोफेसर) एवं डॉ. महांतेश हिरेमठ (प्रोफेसर) के सफल मार्गदर्शन में संपन्न हुआ। कार्यक्रम के दौरान संस्थान के सभी विभागों की फैकल्टीज़, मेडिकल ऑफिसर्स, कंसल्टेंट्स एवं विद्यार्थियों की गरिमामयी उपस्थिति रही। अंत में डॉ. अश्विन पंड्या (एसोसिएट प्रोफेसर) ने कार्यक्रम के सफल आयोजन के लिए सभी अतिथियों, आयोजन समिति के सदस्यों एवं सहभागियों के प्रति आभार व्यक्त किया।",
    gallery: gal("De-addiction Guest Lecture", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Vijigishu%202026%20Chairman%20Address/1.jpeg",
    date: "21 September 2026",
    title: "दूरदर्शी सोच के साथ लक्ष्य तय करें और सफलता के लिए निरंतर मेहनत करें!",
    desc: "मालवांचल यूनिवर्सिटी एवं इंडेक्स समूह संस्थान के चेयरमैन श्री सुरेशसिंह भदौरिया ने एमिटी यूनिवर्सिटी, नोएडा में आयोजित तीन दिवसीय अंतरराष्ट्रीय सम्मेलन 'विजीगिशु-2026' में विद्यार्थियों से संवाद किया। उन्होंने छात्रों को केवल अपने विषय तक सीमित न रहकर सामाजिक, आर्थिक, राजनीतिक और रणनीतिक बदलावों की वैश्विक समझ विकसित करने, असफलताओं से सीखने और निरंतर उत्कृष्टता की ओर बढ़ने का संदेश दिया। सम्मेलन के सातवें संस्करण का विषय था: \"दक्षिण पूर्व एशिया और वैश्विक दक्षिण : बहुध्रुवीय दुनिया में उभरती सुरक्षा, स्थिरता और रणनीतिक गतिशीलता\"। सम्मेलन में विभिन्न देशों के राजनयिकों, शिक्षाविदों, नीति विशेषज्ञों और विद्यार्थियों ने वैश्विक परिस्थितियों एवं बदलती अंतरराष्ट्रीय व्यवस्था पर विचार साझा किए। इस अवसर पर भारत-आसियान संबंध, BRICS, भारत-रूस संबंध, वैश्विक दक्षिण की भूमिका और अंतरराष्ट्रीय सुरक्षा जैसे महत्वपूर्ण विषयों पर चर्चा हुई। सम्मेलन सारांश पुस्तिका का विमोचन भी किया गया।",
    gallery: gal("Vijigishu 2026 Chairman Address", ["1.jpeg", "2.jpeg", "3.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Model%20Exhibition%20Ayurveda%20Day/1.jpeg",
    date: "18 September 2026",
    title: "अमलतास इंस्टीट्यूट ऑफ आयुर्वेद में 11वें आयुर्वेद दिवस पर मॉडल एग्जीबिशन का आयोजन",
    desc: "माननीय फाउंडर चेयरमैन (अमलतास ग्रुप देवास) श्री सुरेश सिंह भदौरिया एवं माननीय चेयरमैन श्री मयंकराज सिंह भदौरिया के शुभाशीष एवं मार्गदर्शन में तथा अमलतास ग्रुप के डायरेक्टर डॉ. अभिजीत तायडे सर, महाप्रबंधक डॉ. मनीष शर्मा सर एवं प्राचार्या डॉ. अनिता घोडके के विशेष मार्गदर्शन में दिनांक 18/09/2026 को 11वें आयुर्वेद दिवस के पावन अवसर पर अमलतास इंस्टीट्यूट ऑफ आयुर्वेद के क्रिया शरीर विभाग (Kriya Sharir Department) में एक भव्य कार्यक्रम का आयोजन किया गया। इस अवसर पर \"Ayurveda: Our Heritage, Our Health, Our Future\" विषय पर आधारित मॉडल एग्जीबिशन (Model Exhibition) का आयोजन प्रोफेसर डॉ. सी. पी. शर्मा (Prof. Dr. C. P. Sharma) एवं डॉ. प्रतिभा तोमर (असिस्टेंट प्रोफेसर) Dr. Pratibha Tomar (Assistant Professor) के मार्गदर्शन में किया गया। इस मॉडल एग्जीबिशन में डॉ. महानतेश हिरेमठ सर (Dr. Mahantesh Hiremath) एवं डॉ. मीना सावते (Dr. Meena Sawate) ने निर्णायक (Judge) की भूमिका निभाई। उन्होंने सभी संभागियों द्वारा प्रस्तुत मॉडलों का बेहद बारीकी से परीक्षण व मूल्यांकन किया और विजेताओं (Winners & Runners-up) के नामों की घोषणा की। कार्यक्रम के दौरान संस्थान के सभी विभागों की फैकल्टीज़ (Faculties) की गरिमामयी उपस्थिति रही, जिन्होंने विद्यार्थियों के प्रयासों की सराहना की। विद्यार्थियों ने आयुर्वेद के सिद्धांतों एवं उनके आधुनिक महत्व पर आधारित सुंदर एवं ज्ञानवर्धक मॉडल प्रस्तुत किए। अंत में डॉ. अश्विन पंड्या ने कार्यक्रम के सफल आयोजन के लिए सभी अतिथियों, आयोजन समिति के सदस्यों एवं सहभागियों के प्रति आभार व्यक्त किया गया।",
    gallery: gal("Model Exhibition Ayurveda Day", ["1.jpeg", "2.jpeg", "3.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Vridhashram%20Yoga%20Ayurveda%20Day/1.jpeg",
    date: "18 September 2026",
    title: "अमलतास वृद्धाश्रम में 11वें आयुर्वेद दिवस पर वरिष्ठ नागरिकों के लिए योग एवं स्वास्थ्य जागरूकता कार्यक्रम",
    desc: "माननीय फाउंडर चेयरमैन (अमलतास ग्रुप देवास) श्री सुरेश सिंह भदौरिया एवं माननीय चेयरमैन श्री मयंकराज सिंह भदौरिया के शुभाशीष एवं मार्गदर्शन में तथा अमलतास ग्रुप के डायरेक्टर डॉ. अभिजीत तायडे सर, महाप्रबंधक डॉ. मनीष शर्मा सर एवं प्राचार्या डॉ. अनिता घोडके के विशेष मार्गदर्शन में दिनांक 18/09/2026 को 11वें आयुर्वेद दिवस के अवसर पर अमलतास हॉस्पिटल परिसर स्थित अमलतास वृद्धाश्रम में सुस्वास्थ्य एवं योग विभाग द्वारा वरिष्ठ नागरिकों के लिए योग एवं स्वास्थ्य जागरूकता कार्यक्रम का आयोजन किया गया। कार्यक्रम का उद्देश्य वृद्धाश्रम के निवासियों को स्वस्थ, सक्रिय एवं संतुलित जीवनशैली के प्रति जागरूक करना तथा योग एवं आयुर्वेद के माध्यम से स्वास्थ्य संरक्षण का संदेश देना था। कार्यक्रम में स्वास्थवृत्त एवं योग विभाग के प्रोफेसर डॉ. नानासो बोडके ने वरिष्ठ नागरिकों को आयुर्वेदिक दिनचर्या, ऋतुचर्या, संतुलित आहार एवं स्वस्थ जीवनशैली के महत्व के बारे में जानकारी दी। उन्होंने नियमित दिनचर्या अपनाने और स्वास्थ्य के प्रति सजग रहने के लिए प्रेरित किया। असिस्टेंट प्रोफेसर डॉ. रेशमा शेख ने वृद्धावस्था में पोषण, प्राकृतिक आहार, जीवनशैली प्रबंधन तथा आयुर्वेदिक उपायों से संबंधित उपयोगी जानकारी साझा की और वरिष्ठ नागरिकों की स्वास्थ्य संबंधी जिज्ञासाओं का समाधान किया। योग प्रशिक्षक उर्वशी यादव ने वरिष्ठ नागरिकों की आयु एवं क्षमता के अनुरूप सरल योगाभ्यास कराया। इसमें प्राणायाम, श्वसन अभ्यास, सूक्ष्म व्यायाम एवं ध्यान आदि का अभ्यास कराया गया। प्रतिभागियों ने उत्साहपूर्वक योगाभ्यास में भाग लिया।",
    gallery: gal("Vridhashram Yoga Ayurveda Day", ["1.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Ashtavinayak%20Ayurveda%20Day/1.jpeg",
    date: "16 September 2026",
    title: "अमलतास इंस्टीट्यूट ऑफ आयुर्वेदा में अष्टविनायक 2026 एवं 11वें आयुर्वेद दिवस का आयोजन",
    desc: "देवास। अमलतास यूनिवर्सिटी के अंतर्गत अमलतास इंस्टीट्यूट ऑफ आयुर्वेदा, बांगर, देवास में अष्टविनायक 2026 एवं 11वें आयुर्वेद दिवस के अवसर पर विविध कार्यक्रमों का आयोजन किया गया। कार्यक्रम का उद्देश्य भगवान श्री गणेश के प्रति श्रद्धा व्यक्त करने के साथ-साथ आयुर्वेद के महत्व, स्वस्थ जीवनशैली एवं भारतीय चिकित्सा पद्धति के प्रति जागरूकता बढ़ाना रहा। कार्यक्रम में संस्थान के संस्थापक अध्यक्ष श्री सुरेश सिंह भदौरिया जी, अध्यक्ष श्री मयंक राज सिंह भदौरिया जी, के मार्गदर्शन में एवं निदेशक डॉ. अभिजीत तायडे, महाप्रबंधक डॉ. मनीष शर्मा एवं प्राचार्या डॉ. अनिता एस. घोड़के सहित शिक्षकगण, कर्मचारीगण एवं छात्र-छात्राएं उपस्थित रहे। इस अवसर पर सांस्कृतिक समिति के सदस्यों डॉ. अश्विन पंड्या, डॉ. प्रियंका माथुर, डॉ. भावना चतुर्वेदी, डॉ. अक्षय शर्मा एवं प्रशांत परमार ने आयोजन की व्यवस्थाओं एवं समन्वय में महत्वपूर्ण भूमिका निभाई। वहीं सभी विद्यार्थियों ने उत्साहपूर्वक सहभागिता की। कार्यक्रम के दौरान आयुर्वेद को स्वस्थ एवं संतुलित जीवनशैली का आधार बताते हुए इसके ज्ञान एवं संदेश को जन-जन तक पहुँचाने का संकल्प लिया गया। आयोजन के सफल संचालन में संस्थान के समस्त शिक्षकगण, कर्मचारीगण, स्वयंसेवकों एवं विद्यार्थियों का सराहनीय सहयोग रहा। अंत में डॉ. अश्विन पंड्या ने कार्यक्रम के सफल आयोजन के लिए सभी अतिथियों, आयोजन समिति के सदस्यों एवं सहभागियों के प्रति आभार व्यक्त किया गया।",
    gallery: gal("Ashtavinayak Ayurveda Day", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Ganesh%20Sthapana%20Nursing/1.jpeg",
    date: "14 September 2026",
    title: "श्री गणेश जी का शुभ आगमन — अमलतास इंस्टीट्यूट ऑफ नर्सिंग साइंसेज",
    desc: "Amaltas Institute of Nursing Sciences में विघ्नहर्ता भगवान श्री गणेश जी की स्थापना कर सभी के सुख, समृद्धि, ज्ञान और सफलता की मंगलकामना की गई। गणपति बप्पा मोरया!",
    gallery: gal("Ganesh Sthapana Nursing", ["1.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Ganesh%20Sthapana%20University/1.jpeg",
    date: "14 September 2026",
    title: "श्री गणेशाय नमः — अमलतास यूनिवर्सिटी परिसर में भगवान श्री गणेश जी का शुभ आगमन एवं स्थापना",
    desc: "ज्ञान, बुद्धि और समृद्धि के प्रतीक भगवान श्री गणेश जी का अमलतास यूनिवर्सिटी परिसर में शुभ आगमन एवं स्थापना की गई। विघ्नहर्ता श्री गणेश जी की कृपा से विश्वविद्यालय परिवार में सुख, शांति, समृद्धि और सफलता का संचार हो। गणपति बप्पा मोरया!",
    gallery: gal("Ganesh Sthapana University", ["1.jpeg", "2.jpeg", "3.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Ganesh%20Sthapana%20Ayurveda/1.jpeg",
    date: "14 September 2026",
    title: "श्री गणेशाय नमः — अमलतास इंस्टीट्यूट ऑफ आयुर्वेद में भगवान श्री गणेश जी की मंगलमय स्थापना",
    desc: "अमलतास इंस्टीट्यूट ऑफ आयुर्वेद एवं अमलतास आयुर्वेदिक हॉस्पिटल एंड रिसर्च सेंटर में विघ्नहर्ता भगवान श्री गणेश जी की मंगलमय स्थापना की गई। भगवान गणेश जी की कृपा से सभी के जीवन में सुख, शांति, समृद्धि एवं सफलता का आगमन हो। गणपति बप्पा मोरया!",
    gallery: gal("Ganesh Sthapana Ayurveda", ["1.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Ganesh%20Chaturthi%20Celebration%20Pharmacy/1.jpeg",
    date: "14 September 2026",
    title: "Ganesh Chaturthi Celebration at Amaltas Institute of Pharmacy",
    desc: "With devotion in our hearts and positivity all around, Amaltas Institute of Pharmacy celebrated the divine arrival of Lord Ganesha. May Ganpati Bappa bless our students, faculty and the entire Amaltas family with wisdom, happiness, success and good health. Ganpati Bappa Morya!",
    gallery: gal("Ganesh Chaturthi Celebration Pharmacy", Array.from({ length: 11 }, (_, i) => `${i + 1}.jpeg`)),
  },
  {
    img: "/assets/images%20of%20university/events/Ganesh%20Chaturthi%20Celebration%20Homeopathy/1.jpeg",
    date: "14 September 2026",
    title: "Ganesh Chaturthi Celebration at Amaltas Institute of Homoeopathy",
    desc: "With devotion in our hearts and positivity all around, Amaltas Institute of Homoeopathy celebrated the divine arrival of Lord Ganesha. May Ganpati Bappa bless our students, faculty and the entire Amaltas family with wisdom, happiness, success and good health. Ganpati Bappa Morya!",
    gallery: gal("Ganesh Chaturthi Celebration Homeopathy", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Pharmacon%202026%20AI%20in%20Pharmacy/1.jpeg",
    date: "11 September 2026",
    title: "Role of AI in Modern Pharmacy: Opportunities & Challenges — Pharmacon 2026",
    desc: "Our students attended the National Conference — Pharmacon 2026, themed \"Role of AI in Modern Pharmacy: Opportunities & Challenges,\" held at Ravindra Bhavan, Bhopal, organized by Arogya Bharati in collaboration with the Pharmacy Council of India (PCI) and the State Pharmacy Council. The conference brought together distinguished pharmacy leaders, experts and academicians, with the President of the Pharmacy Council addressing the growing role of Artificial Intelligence in pharmaceutical research, drug development and healthcare services. An engaging panel discussion explored the challenges and opportunities of AI in pharmacy and the skills future pharmacy professionals will need. Students actively participated in poster presentations and competitions, showcasing their creativity, research aptitude and innovative thinking.",
    gallery: gal("Pharmacon 2026 AI in Pharmacy", Array.from({ length: 12 }, (_, i) => `${i + 1}.jpeg`)),
  },
  {
    img: "/assets/images%20of%20university/events/Industry%20Visit%20MCW%20Healthcare/1.jpeg",
    date: "11 September 2026",
    title: "Industry Visit to MCW Healthcare Pvt. Ltd., Indore",
    desc: "Our students had the valuable opportunity to visit MCW Healthcare Pvt. Ltd., gaining firsthand exposure to the functioning of the healthcare industry and the practical application of classroom concepts. During the visit, students observed industry processes, workplace practices, quality standards, operational procedures and professional work culture, while interacting with industry professionals to understand the importance of knowledge, skills, teamwork, discipline and innovation. Such industry visits play a vital role in bridging the gap between academic learning and real-world experience, preparing students to become confident and industry-ready professionals. A special thanks to MCW Healthcare Pvt. Ltd. for welcoming our students and providing such a valuable learning experience.",
    gallery: gal("Industry Visit MCW Healthcare", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Nutritional%20Day%20Homeopathy/1.jpeg",
    date: "11 September 2026",
    title: "अमलतास इंस्टीट्यूट ऑफ होम्योपैथी में मनाया गया न्यूट्रिशनल डे",
    desc: "देवास। अमलतास इंस्टीट्यूट ऑफ होम्योपैथी में न्यूट्रिशनल डे के अवसर पर पोषण एवं स्वस्थ जीवनशैली के प्रति जागरूकता बढ़ाने के उद्देश्य से विशेष कार्यक्रम का आयोजन किया गया। कार्यक्रम में विद्यार्थियों एवं स्टाफ ने उत्साहपूर्वक सहभागिता की। कार्यक्रम का आयोजन डॉ. शैला, डॉ. गीता एवं डॉ. शहाना द्वारा किया गया। इस अवसर पर विद्यार्थियों द्वारा 10 से अधिक फ्लेमलेस फूड स्टॉल लगाए गए, जिनमें विभिन्न प्रकार के पौष्टिक एवं स्वादिष्ट व्यंजन प्रस्तुत किए गए। विद्यार्थियों ने अपनी रचनात्मकता के माध्यम से स्वस्थ एवं संतुलित आहार का महत्व प्रदर्शित किया। इस अवसर पर अमलतास इंस्टीट्यूट ऑफ होम्योपैथी के प्राचार्य एवं मेडिकल सुपरिंटेंडेंट प्रो. डॉ. योगेंद्र सिंह भदौरिया ने कहा कि स्वस्थ शरीर एवं स्वस्थ मन के लिए संतुलित पोषण अत्यंत आवश्यक है। चेयरमैन श्री मयंक राज सिंह भदौरिया ने कार्यक्रम की सराहना करते हुए कहा कि विद्यार्थियों के सर्वांगीण विकास के साथ-साथ उन्हें स्वास्थ्य, पोषण एवं स्वस्थ जीवनशैली के प्रति जागरूक करना संस्थान की महत्वपूर्ण जिम्मेदारी है।",
  },
  {
    img: "/assets/images%20of%20university/events/Ayurveda%20Day%20Educational%20Visit/1.jpeg",
    date: "10 September 2026",
    title: "11वें आयुर्वेद दिवस के उपलक्ष्य में विशेष शैक्षणिक भ्रमण एवं जन-जागरूकता कार्यक्रम",
    desc: "अमलतास इंस्टीट्यूट ऑफ आयुर्वेद, देवास के रचना शरीर विभाग द्वारा 11वें आयुर्वेद दिवस के सुअवसर पर एक विशेष शैक्षणिक एवं आध्यात्मिक/जन-जागरूकता भ्रमण का सफल आयोजन किया गया। इस यात्रा के दौरान विद्यार्थियों एवं संकाय सदस्यों ने शासकीय धन्वंतरि आयुर्वेद मेडिकल कॉलेज एवं अस्पताल, उज्जैन का शैक्षणिक भ्रमण किया तथा उज्जैन स्थित श्री मंगलनाथ मंदिर में दर्शन कर आयुर्वेद एवं स्वास्थ्य जागरूकता का संदेश दिया। यह भ्रमण अमलतास ग्रुप के माननीय फाउंडर चेयरमैन श्री सुरेश सिंह भदौरिया एवं चेयरमैन श्री मयंकराज सिंह भदौरिया के संरक्षण, डायरेक्टर डॉ. अभिजीत तायडे, श्री विकास मंडाड, महाप्रबंधक डॉ. मनीष शर्मा एवं प्राचार्या डॉ. अनिता घोडके के मार्गदर्शन तथा डॉ. ओ.पी. व्यास (प्राचार्य, शासकीय धन्वंतरि आयुर्वेद मेडिकल कॉलेज, उज्जैन) एवं डॉ. योगेश वाणे (विभागाध्यक्ष, रचना शरीर विभाग) के विशेष सहयोग से सफलतापूर्वक संपन्न हुआ।",
    gallery: gal("Ayurveda Day Educational Visit", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Ayurveda%20Day%20Special%20Initiative/1.jpeg",
    date: "10 September 2026",
    title: "11वें आयुर्वेद दिवस पर अमलतास इंस्टीट्यूट ऑफ आयुर्वेद की विशेष पहल",
    desc: "11वें आयुर्वेद दिवस के उपलक्ष्य में अमलतास इंस्टीट्यूट ऑफ आयुर्वेद, देवास द्वारा आयुर्वेद के प्रति जन-जागरूकता बढ़ाने हेतु एक विशेष पहल का आयोजन किया गया, जिसमें विद्यार्थियों एवं संकाय सदस्यों ने उत्साहपूर्वक सहभागिता की।",
    gallery: gal("Ayurveda Day Special Initiative", ["1.jpeg", "2.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/World%20Suicide%20Prevention%20Day%202026/1.jpeg",
    date: "10 September 2026",
    title: "World Suicide Prevention Day — Mental Health Awareness Program",
    desc: "Amaltas University organized a Mental Health & Suicide Prevention Awareness Program in collaboration with the Institute of Nursing, Paramedical College, and Department of Allied & Rehabilitation Sciences. The program highlighted the importance of open conversations about mental health, active listening, emotional support, and timely professional help. Chief Guest Dr. Vijaya Sakpal encouraged everyone to stand by those facing stress, loneliness, hopelessness, or emotional distress. The event was chaired by Vice Chancellor Dr. R.K. Singh, with the presence of university officials, principals, faculty members, and students. Together, let's create a compassionate environment where seeking help is never a hesitation.",
    gallery: gal("World Suicide Prevention Day 2026", Array.from({ length: 9 }, (_, i) => `${i + 1}.jpeg`)),
  },
  {
    img: "/assets/images%20of%20university/events/Guest%20Lecture%20on%20Suicide%20Prevention/1.jpeg",
    date: "10 September 2026",
    title: "11वें विश्व आयुर्वेद दिवस के उपलक्ष्य में आत्महत्या रोकथाम पर अतिथि व्याख्यान",
    desc: "देवास। अमलतास इंस्टीट्यूट ऑफ आयुर्वेद में 11वें विश्व आयुर्वेद दिवस एवं विश्व आत्महत्या रोकथाम दिवस के उपलक्ष्य में \"सुसाइड प्रिवेंशन फॉर अ हेल्दियर टुमॉरो\" विषय पर अतिथि व्याख्यान का आयोजन लेक्चर हॉल नंबर वन में किया गया। मुख्य वक्ता डॉ. प्रमोद बाना (बी.ए.एम.एस., एम.डी. आयुर्वेद) ने बेहतर मानसिक स्वास्थ्य, सुदृढ़ सहयोग प्रणाली एवं समग्र स्वास्थ्य में आयुर्वेद की भूमिका पर विद्यार्थियों एवं स्टाफ को विस्तृत जानकारी दी। कार्यक्रम का संदेश रहा — \"आप अकेले नहीं हैं, मिलकर हम इसे रोक सकते हैं।\"",
    gallery: gal("Guest Lecture on Suicide Prevention", [
      "1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg",
      "9.jpeg", "10.jpeg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg", "17.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/Teachers%20Day%20Celebration%20Nursing/1.jpeg",
    date: "5 September 2026",
    title: "Celebrating the Guiding Hands of Education!",
    desc: "Amaltas Institute of Nursing Sciences celebrated Teachers' Day with joy, gratitude, and heartfelt appreciation for the incredible teachers who inspire, guide, and empower future healthcare professionals. Their dedication, wisdom, and constant encouragement continue to shape confident and compassionate nursing professionals. Happy Teachers' Day to all our inspiring educators!",
    gallery: gal("Teachers Day Celebration Nursing", Array.from({ length: 9 }, (_, i) => `${i + 1}.jpeg`)),
  },
  {
    img: "/assets/images%20of%20university/events/Khelo%20India%20Samvad/6.jpeg",
    date: "27 August 2026",
    title: "प्रधानमंत्री श्री नरेंद्र मोदी ने देशभर के युवाओं से किया संवाद",
    desc: "युवा कार्यक्रम एवं खेल मंत्रालय, भारत सरकार द्वारा 'मेरा युवा भारत' एवं भारतीय खेल प्राधिकरण (SAI) के सहयोग से आयोजित 'खेलो इंडिया संवाद' कार्यक्रम के अंतर्गत प्रधानमंत्री श्री नरेंद्र मोदी ने वीडियो कॉन्फ्रेंसिंग के माध्यम से देशभर के युवाओं से संवाद किया। अमलतास यूनिवर्सिटी, देवास इस राष्ट्रीय कार्यक्रम के सहभागी केंद्रों में से एक रही, जहां चेयरमैन श्री मयंकराज सिंह भदौरिया एवं अन्य गणमान्य अतिथियों की उपस्थिति में दीप प्रज्वलन के साथ कार्यक्रम का शुभारंभ हुआ। इस अवसर पर एक राष्ट्रीय स्तर के खिलाड़ी भी विशेष अतिथि के रूप में उपस्थित रहे और विद्यार्थियों को खेल एवं जीवन में अनुशासन तथा हौसलों की दौड़ से सफलता की ओर प्रेरित किया।",
    gallery: gal("Khelo India Samvad", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg", "11.jpeg", "12.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Guest%20Lecture%20on%20Agadtantra/1.jpeg",
    date: "24 August 2026",
    title: "त्वचा विकारों के प्रबंधन में अगदतंत्र की भूमिका पर अतिथि व्याख्यान",
    desc: "देवास। माननीय फाउंडर चेयरमैन, अमलतास ग्रुप देवास, श्री सुरेश सिंह भदौरिया एवं माननीय चेयरमैन श्री मयंकराज सिंह भदौरिया के शुभाशीष एवं मार्गदर्शन में अमलतास इंस्टीट्यूट ऑफ आयुर्वेद में 24 अगस्त 2026 को अगदतंत्र एवं विधि वैद्यक विभाग द्वारा “त्वचा विकारों के प्रबंधन में अगदतंत्र की भूमिका” विषय पर अतिथि व्याख्यान का आयोजन किया गया। कार्यक्रम में विषय विशेषज्ञ के रूप में डॉ. बेनिल पी.बी., प्रोफेसर एवं विभागाध्यक्ष, अगदतंत्र विभाग, वैद्यरत्नम् पी.एस. वारियर आयुर्वेद कॉलेज, कोट्टक्कल, केरल ने व्याख्यान प्रस्तुत किया। उन्होंने विभिन्न त्वचा विकारों के प्रबंधन में अगदतंत्र की अवधारणाओं, विषजन्य कारणों तथा आयुर्वेदिक चिकित्सा दृष्टिकोण के व्यावहारिक एवं नैदानिक पहलुओं पर विस्तृत जानकारी प्रदान की। कार्यक्रम में संस्थान के डायरेक्टर डॉ. अभिजीत तायडे, जनरल मैनेजर श्री मनीष शर्मा, प्राचार्या डॉ. अनीता घोडके एवं मेडिकल सुपरिंटेंडेंट डॉ. अजय गुर्जर का मार्गदर्शन एवं सहयोग प्राप्त हुआ। कार्यक्रम का संचालन अगदतंत्र एवं विधि वैद्यक विभाग की असिस्टेंट प्रोफेसर डॉ. विची शर्मा द्वारा विभागाध्यक्ष डॉ. विजया मोरे एवं प्रोफेसर डॉ. महांतेश हिरेमठ के मार्गदर्शन में किया गया। इस अवसर पर संस्थान के विभिन्न विभागों के विभागाध्यक्ष, शिक्षकगण एवं अन्य स्टाफ सदस्य उपस्थित रहे। अतिथि व्याख्यान विद्यार्थियों के लिए त्वचा विकारों के आयुर्वेदिक एवं अगदतंत्र आधारित प्रबंधन को समझने की दिशा में ज्ञानवर्धक एवं उपयोगी रहा।",
    gallery: gal("Guest Lecture on Agadtantra", ["1.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Independence%20Day%20Celebration/1.jpeg",
    date: "15 August 2026",
    title: "Independence Day Celebration 2026",
    desc: "The Independence Day Celebration on 15th August was celebrated at Amaltas University with great enthusiasm, patriotic spirit, and pride. The program commenced with the flag hoisting ceremony by Mr. Mayank Raj Singh Bhadoria, Chairman, Amaltas Group, who extended heartfelt Independence Day wishes to everyone. The Chief Guests, Mr. Rajesh Rathore, Executive Director, MPIDC, and Mr. Dileep Jat, Sarpanch of Village Bangar, addressed the gathering with inspiring words, encouraging students to contribute meaningfully to nation-building. The event was graced by senior university officials, principals, doctors, staff members, students, and members of the Amaltas family. Patriotic songs, dances, and poetry performances by the students filled the entire campus with a strong sense of patriotism and pride. The program concluded with the National Anthem, further strengthening the values of unity, respect, patriotism, and love for the nation among everyone present.",
    gallery: gal("Independence Day Celebration", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg", "8.jpeg", "9.jpeg", "10.jpeg", "11.jpeg", "12.jpeg", "13.jpeg", "14.jpeg", "15.jpeg", "16.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Clinical%20Teaching%20Session%20Conducted/1.jpeg",
    date: "13 August 2026",
    title: "Clinical Teaching Session on Culturing and Staining Process",
    desc: "Amaltas Institute of Medical Sciences (Paramedical Sciences) conducted a clinical teaching session for pathology students in the Department of Microbiology on 13 August 2026, led by Mr. Suraj Sharma on \"Culturing and Staining Process.\" Students learned the basic principles of microbial culture, culture media, aseptic techniques, and staining methods, with special emphasis on Gram staining and its clinical importance. The interactive session strengthened students' practical understanding of microbiological laboratory procedures, concluding successfully with active participation and valuable learning outcomes.",
    gallery: gal("Clinical Teaching Session Conducted", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/antiragging%20campaign/1.jpeg",
    date: "12 August 2026",
    title: "Anti-Ragging Campaign — Kadam Badhao, Ragging Hatao",
    desc: "\"A campus free of fear, a campus full of cheer: let's make it real.\" Amaltas University pledged for a ragging-free campus, calling on students to build camaraderie, not chaos, and join the 'Good Bye Ragging' movement.",
    gallery: gal("antiragging campaign", ["1.jpeg", "2.jpeg", "3.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/अंतिम%20विदाई%20में%20भी%20परोपकार/1.jpeg",
    date: "11 August 2026",
    title: "अंतिम विदाई में भी परोपकार: सेवाधाम आश्रम के कर्मयोगी का देहदान एवं नेत्र दान, समाज के लिए बने मिसाल",
    desc: "देवास: मानवता की सेवा और चिकित्सा शिक्षा के क्षेत्र में देवास का अमलतास मेडिकल कॉलेज एक ऐतिहासिक पल का साक्षी बना। सेवाधाम आश्रम (अंकितग्राम) में निवासरत 65 वर्षीय विजय दीनानाथ बाथम का देहदान संकल्प मंगलवार को पूरे राजकीय सम्मान के साथ पूर्ण हुआ। मध्यप्रदेश के मुख्यमंत्री डॉ. मोहन यादव की मंशानुसार, देहदानियों को सर्वोच्च सम्मान देने के लिए अमलतास मेडिकल कॉलेज परिसर में पुलिस विभाग की टुकड़ी द्वारा 'गार्ड ऑफ ऑनर' प्रदान किया गया। इस भावुक क्षण के दौरान वहां उपस्थित पुलिस बल, कॉलेज डीन डॉ. ए.के. पिठावा, एनाटॉमी विभाग के हेड डॉ. करखायले एम. एल, मेडिकल छात्र, डॉक्टर्स ने नम आंखों से इस महान आत्मा को अंतिम विदाई दी। यह पुनीत कार्य सेवाधाम आश्रम, ग्राम अम्बोदिया (उज्जैन) के संस्थापक श्री सुधीर भाई गोयल के विशेष प्रयासों से संपन्न हुआ। देहदान अधिकारी श्री गजानंद चौहान एवं मो. रेहानुद्दीन ने कॉर्निया एवं देहदान की प्रक्रिया की जानकारी दी और इसे संपन्न कराया। अमलतास वेलफेयर सोसायटी के चेयरमैन महोदय ने श्री सुधीर भाई गोयल जी के प्रति हृदय से आभार व्यक्त किया।",
    gallery: gal("अंतिम विदाई में भी परोपकार", ["1.jpeg", "2.jpeg", "3.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/World%20Breastfeeding%20Week%20Nursing/1.jpeg",
    date: "7 August 2026",
    title: "अमलतास इंस्टीट्यूट ऑफ नर्सिंग साइंसेस में मनाया गया 'विश्व स्तनपान सप्ताह'",
    desc: "देवास- अमलतास इंस्टीट्यूट ऑफ नर्सिंग साइंसेस द्वारा अस्पताल परिसर में 'विश्व स्तनपान सप्ताह' का आयोजन उत्साहपूर्वक किया गया। इस वर्ष यह कार्यक्रम \"Prioritize Breastfeeding: Create Sustainable Support Systems\" की थीम पर केंद्रित रहा। आयोजन का मुख्य उद्देश्य नवजात शिशुओं के सर्वांगीण विकास के लिए माँ के दूध के महत्व और माँ-बच्चे दोनों के बेहतर स्वास्थ्य के प्रति जनजागरूकता फैलाना है। कार्यक्रम में मुख्य अतिथि के रूप में यू.एस. विदेशी सेवा (U.S. Foreign Service) के क्षेत्रीय चिकित्सा अधिकारी डॉ. राजेश व्यास विशेष रूप से उपस्थित रहे। अमलतास नर्सिंग कॉलेज की प्राचार्य डॉ. संगीता तिवारी ने कहा, \"स्तनपान नवजात शिशु के लिए पहला और सबसे महत्वपूर्ण सुरक्षा कवच है। माँ का दूध बच्चे को संपूर्ण पोषण के साथ-साथ गंभीर बीमारियों से लड़ने की प्रतिरोधक क्षमता देता है।\" संस्थान के चेयरमैन मयंकराज सिंह भदौरिया ने अपने संदेश में कहा, \"माँ का दूध नवजात शिशु के लिए प्रकृति का सबसे अनमोल उपहार है। एक स्वस्थ बच्चे से ही सशक्त और समृद्ध समाज का निर्माण होता है।\"",
    gallery: gal("World Breastfeeding Week Nursing", Array.from({ length: 10 }, (_, i) => `${i + 1}.jpeg`)),
  },
  {
    img: "/assets/images%20of%20university/events/Pediatrics%20UG%20Quiz%20Competition%202026/1.jpeg",
    date: "1 August 2026",
    title: "Pediatrics UG Quiz Competition 2026",
    desc: "The Pediatrics UG Quiz Competition was successfully conducted at Amaltas Institute of Medical Sciences. MBBS students showcased their knowledge, teamwork and clinical skills with great enthusiasm and excellence — knowledge today, better care tomorrow.",
    gallery: gal("Pediatrics UG Quiz Competition 2026", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/World%20Breastfeeding%20Week/1.jpeg",
    date: "2026",
    title: "World Breastfeeding Week Celebration",
    desc: "Nourishing the future, one feed at a time — Amaltas marked World Breastfeeding Week by creating spaces where every parent feels supported, celebrating the grit, grace and dedication behind the breastfeeding journey.",
    gallery: gal("World Breastfeeding Week", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Guru%20Purnima%20Mahotsav/1.jpeg",
    date: "29 July 2026",
    title: "अमलतास इंस्टीट्यूट ऑफ आयुर्वेद में श्रद्धा एवं उत्साह के साथ मनाया गया 'गुरु पूर्णिमा महोत्सव'",
    desc: "देवास: अमलतास इंस्टीट्यूट ऑफ आयुर्वेद में 'गुरु पूर्णिमा' का पावन पर्व अत्यंत श्रद्धा, उत्साह और गरिमामय वातावरण में संपन्न हुआ। कार्यक्रम की शुरुआत भगवान धन्वंतरि और महर्षि चरक के पूजन व वंदना के साथ हुई। समारोह के दौरान विद्यार्थियों ने अपने गुरुजनों का पारंपरिक रूप से तिलक लगाकर और पुष्पगुच्छ भेंट कर आत्मीय स्वागत किया तथा उनके प्रति कृतज्ञता व्यक्त की।",
    gallery: gal("Guru Purnima Mahotsav", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Tree%20Plantation%20by%20Special%20Guest/1.jpg",
    date: "24 July 2026",
    title: "अमलतास विश्वविद्यालय में पधारे विशेष अतिथि द्वारा पौधारोपण",
    desc: "अमलतास विश्वविद्यालय में पधारे विशेष अतिथि द्वारा परिसर में पौधारोपण किया गया, जो पर्यावरण संरक्षण एवं हरियाली को बढ़ावा देने की दिशा में विश्वविद्यालय की प्रतिबद्धता को दर्शाता है।",
    gallery: gal("Tree Plantation by Special Guest", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Medhavi%20Samman%20Samaroh/1.jpeg",
    date: "23 July 2026",
    title: "दैनिक भास्कर मेधावी सम्मान समारोह",
    desc: "दैनिक भास्कर द्वारा आयोजित मेधावी सम्मान समारोह में देवास जिले के 54 स्कूलों के 700 से अधिक प्रतिभाशाली विद्यार्थियों को उनकी शैक्षणिक उत्कृष्टता के लिए सम्मानित किया गया। इस गरिमामयी अवसर पर अमलतास यूनिवर्सिटी के चेयरमैन श्री मयंकराज सिंह भदौरिया विशेष अतिथि के रूप में उपस्थित रहे और विद्यार्थियों को उनके उज्ज्वल भविष्य के लिए शुभकामनाएँ देते हुए मेहनत, अनुशासन और लक्ष्य के प्रति समर्पण का संदेश दिया।",
    gallery: gal("Medhavi Samman Samaroh", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/World%20Brain%20Day/1.jpeg",
    date: "22 July 2026",
    title: "World Brain Day",
    desc: "Amaltas observed World Brain Day on 22 July 2026 with an awareness programme highlighting brain health and neurological wellbeing.",
    gallery: gal("World Brain Day", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/Visit%20to%20Anatomy%20Lab/1.jpeg",
    date: "20 July 2026",
    title: "Student Visit to Anatomy Lab",
    desc: "Students visited the Anatomy Lab on 20 July 2026 for a hands-on academic session.",
    gallery: gal("Visit to Anatomy Lab", ["1.jpeg", "2.jpeg", "3.jpeg", "4.jpeg", "5.jpeg", "6.jpeg", "7.jpeg"]),
  },
  {
    img: "/assets/images%20of%20university/events/u1.jpg",
    date: "4 July 2026",
    title: "Early Detection Saves Lives: AI & Bronchoscopy in Focus at Bronchopulmonary World Congress 2026",
    desc: "Amaltas University hosted the Bronchopulmonary World Congress 2026, convening pulmonologists, researchers and clinicians from across the globe. Sessions spotlighted the growing role of artificial intelligence and advanced bronchoscopy in the early detection of respiratory disease — alongside keynote lectures, hands-on demonstrations and collaborative research presentations.",
    gallery: gal("Bronchopulmonary World Congress", [
      "1078759148.jpg", "1098045294.jpg", "2961273970.jpg", "3098288172.jpg", "3159100228.jpg",
      "369119561.jpg", "4007722889.jpg", "4186091772.jpg", "45357817.jpg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/MoU%20IIT%20Indore%20DRISHTI%20CPS/1.jpg",
    date: "29 June 2026",
    title: "अमलतास यूनिवर्सिटी और IIT इंदौर (DRISHTI CPS) के बीच हुआ औपचारिक सहमति ज्ञापन, डिजिटल हेल्थकेयर पर विशेषज्ञों ने किया मंथन",
    desc: "देवास। चिकित्सा शिक्षा और आधुनिक तकनीक के समन्वय को नई दिशा देने के उद्देश्य से अमलतास यूनिवर्सिटी और भारतीय प्रौद्योगिकी संस्थान, इंदौर (IIT Indore) की DRISHTI CPS फाउंडेशन के बीच एक ऐतिहासिक समझौता ज्ञापन (MoU) पर हस्ताक्षर किए गए। इस अवसर पर “डिजिटल हेल्थकेयर: ट्रांसफॉर्मिंग द फ्यूचर ऑफ पेशेंट केयर” विषय पर एक विशेष इंटरएक्टिव सत्र आयोजित किया गया, जिसमें दोनों संस्थानों के विशेषज्ञों ने डिजिटल तकनीक के माध्यम से स्वास्थ्य सेवाओं को अधिक प्रभावी और सुलभ बनाने पर विचार साझा किए। विशेषज्ञों ने बताया कि डिजिटल हेल्थकेयर भविष्य की आवश्यकता है, जिसके माध्यम से दूरस्थ क्षेत्रों तक बेहतर चिकित्सा सेवाएं और मरीजों की प्रभावी मॉनिटरिंग संभव होगी। इस दौरान रिसर्च पार्टनरशिप, स्टूडेंट एंगेजमेंट और इनोवेशन प्रोग्राम को बढ़ावा देने पर भी सहमति बनी। इस सहयोग से अमलतास यूनिवर्सिटी के विद्यार्थियों को IIT इंदौर के विशेषज्ञों के मार्गदर्शन में चिकित्सा तकनीक और शोध के क्षेत्र में नए अवसर प्राप्त होंगे। अमलतास ग्रुप के चेयरमैन ने इसे मेडिकल साइंस और टेक्नोलॉजी का महत्वपूर्ण संगम बताते हुए कहा कि यह साझेदारी गुणवत्तापूर्ण शिक्षा, शोध और डिजिटल हेल्थकेयर के क्षेत्र में नए आयाम स्थापित करेगी। कार्यक्रम में प्रो. चांसलर डॉ. सलिल भार्गव, चांसलर डॉ. आर.के. सिंह, डॉ. एस.के. नेमा, डॉ. ए.के. पिठवा, डॉ. अभय गुप्ता, डॉ. यू.एस. तिवारी सहित IIT इंदौर के प्रोफेसरों, फैकल्टी और विद्यार्थियों ने सहभागिता की।",
    gallery: gal("MoU IIT Indore DRISHTI CPS", [
      "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
      "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/International%20Yoga%20Day/1.jpg",
    date: "21 June 2026",
    title: "अंतरराष्ट्रीय योग दिवस प्रेरणादायक वातावरण में मनाया गया",
    desc: "अमलतास विश्वविद्यालय में अंतरराष्ट्रीय योग दिवस प्रेरणादायक वातावरण में मनाया गया। विद्यार्थियों, शिक्षकों एवं स्टाफ ने सामूहिक रूप से योगाभ्यास कर स्वस्थ जीवनशैली और आत्मिक शांति का संदेश दिया।",
    gallery: gal("International Yoga Day", ["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg"]),
  },
  {
    img: "/assets/images%20of%20university/events/MoU%20Vikram%20University/1.jpg",
    date: "9 June 2026",
    title: "अमलतास विश्वविद्यालय और विक्रम विश्वविद्यालय के बीच MoU हस्ताक्षरित",
    desc: "देवास। चिकित्सा शिक्षा, अनुसंधान एवं नवाचार को नई दिशा देने के उद्देश्य से अमलतास विश्वविद्यालय, देवास एवं विक्रम विश्वविद्यालय, उज्जैन के मध्य एक महत्वपूर्ण समझौता ज्ञापन (MoU) पर हस्ताक्षर किए गए। इस शैक्षणिक एवं शोध सहयोग के तहत चिकित्सा, फार्मेसी, बायोटेक्नोलॉजी, मॉलिक्यूलर बायोलॉजी, माइक्रोबायोलॉजी तथा स्वास्थ्य विज्ञान के क्षेत्रों में संयुक्त अनुसंधान को बढ़ावा दिया जाएगा। इस अवसर पर विक्रम विश्वविद्यालय के कुलगुरु प्रो. अर्पण भारद्वाज, अमलतास विश्वविद्यालय के कुलगुरु डॉ. आर.के. सिंह, प्रो-चांसलर डॉ. सलिल भार्गव सहित अन्य वरिष्ठ शिक्षाविद उपस्थित रहे।",
    gallery: gal("MoU Vikram University", ["1.jpg", "2.jpg", "3.jpg", "4.jpg"]),
  },
  {
    img: "/assets/images%20of%20university/events/we1.jpg",
    date: "5 June 2026",
    title: "World Environment Day Celebration at Amaltas University",
    desc: "Students, faculty and staff came together to mark World Environment Day with tree-plantation drives, awareness walks and sustainability pledges across the campus. The celebration reaffirmed the Amaltas commitment to a greener, healthier future — where healing grows for both people and the planet.",
    gallery: gal("World Environment Day", [
      "1631972698.jpg", "2603873168.jpg", "2754476936.jpg", "3031353413.jpg", "3554367168.jpg", "3658607544.jpg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/P1_yoga.jpg",
    date: "1 June 2026",
    title: "Index Group & Amaltas Set a World Record with a Mass Yoga Session of 35,000+ Participants",
    desc: "In partnership with the Index Group, Amaltas took part in a record-setting mass yoga session with more than 35,000 participants. The sea of practitioners moved as one through guided asanas and pranayama, celebrating wellness, discipline and the enduring spirit of community that defines campus life.",
    gallery: gal("World Record with a Mass Yoga Session", [
      "1672916145.jpg", "2381182752.jpg", "2533750096.jpg", "3118974039.jpg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-05-13-at-13.48.30.jpeg",
    date: "2026",
    title: "Nurses Day Celebration",
    desc: "The Amaltas Institute of Nursing Sciences honoured its students and faculty on International Nurses Day with a heartfelt ceremony of lamp-lighting, oath renewal and cultural performances — a tribute to the compassion, courage and care that nurses bring to every bedside.",
    gallery: gal("Nurses Day Celebration", [
      "184447220.jpeg", "1984864632.jpeg", "2016098136.jpeg", "2344910398.jpeg", "3000633580.jpeg",
      "3189715197.jpeg", "373299387.jpeg", "3853472221.jpeg", "405114523.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-23-at-10.46.55-2.jpeg",
    date: "2026",
    title: "Grand Lamp Lighting & Oath Taking Ceremony held at Amaltas Institute of Nursing Science, Dewas",
    desc: "The incoming nursing cohort was formally welcomed at the Grand Lamp Lighting & Oath Taking Ceremony at the Amaltas Institute of Nursing Science, Dewas. Carrying the lamp — a symbol of knowledge and service — students pledged themselves to the Nightingale ideals of dignity, integrity and selfless patient care.",
    gallery: gal("Grand Lamp Lighting", [
      "141757211.jpeg", "2548327512.jpeg", "2777917031.jpeg", "3367670757.jpeg", "3806233540.jpeg", "902668302.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-18-at-18.06.07.jpeg",
    date: "2026",
    title: "Workshop on Advanced Medical Techniques at Amaltas Medical College",
    desc: "Amaltas Medical College conducted an intensive workshop on advanced medical techniques, giving students and young clinicians hands-on exposure to modern diagnostic and procedural skills. Expert-led stations, simulation practice and live demonstrations bridged classroom theory with real-world clinical confidence.",
    gallery: gal("Workshop on Advanced Medical", [
      "135491927.jpeg", "1460543249.jpeg", "2688546606.jpeg", "3461667021.jpeg", "35206013.jpeg",
      "395516020.jpeg", "4105597983.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/2.jpeg",
    date: "2026",
    title: "World Homoeopathy Day Celebration",
    desc: "The Amaltas Institute of Homoeopathy marked World Homoeopathy Day with lectures, awareness sessions and student presentations honouring the legacy of Dr. Samuel Hahnemann. The celebration reaffirmed the university's commitment to gentle, patient-centred healing and the continued advancement of homoeopathic education and research.",
    gallery: gal("World Homoeopathy Day Celebration", [
      "1059695508.jpeg", "147216227.jpeg", "1509994228.jpeg", "1629207928.jpeg", "2412249410.jpeg",
      "2588556869.jpeg", "3056387985.jpeg", "31754711.jpeg", "3217034130.jpeg", "4184558858.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-13-at-10.13.17-1.jpeg",
    date: "2026",
    title: "Celebrating the Healing Power of Nature",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-04-13-at-16.58.39.jpeg",
    date: "2026",
    title: "Graduation Ceremony",
    desc: "Amaltas University celebrated its graduating cohort at a proud convocation of caps, gowns and heartfelt farewells. Faculty, families and friends gathered to honour the achievements of the new healers stepping into the world — a milestone marking the end of one journey and the beginning of a lifetime of care and service.",
    gallery: gal("Graduation Ceremony", [
      "123863021.jpeg", "1518999223.jpeg", "2091041859.jpeg", "2275031415.jpeg", "2435276082.jpeg",
      "2694355762.jpeg", "283588566.jpeg", "2912066821.jpeg", "3058615207.jpeg", "3543631332.jpeg",
      "3731153976.jpeg", "4254481663.jpeg", "45267966.jpeg", "503457223.jpeg", "566631592.jpeg",
      "705010436.jpeg", "967192149.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-23-at-21.48.31.jpeg",
    date: "2026",
    title: "National Conference on “Emerging Trends in Artificial Intelligence for Advanced Health Care Delivery”",
    desc: "Amaltas University hosted a National Conference exploring how artificial intelligence is reshaping modern healthcare delivery. Academicians, clinicians and industry experts shared research on AI-driven diagnostics, predictive care and digital health — sparking rich discussion on the future of technology-enabled, patient-first medicine.",
    gallery: gal("National Conference", [
      "1213249757.jpeg", "1322534202.jpeg", "1505087871.jpeg", "1624770962.jpeg", "1740693344.jpeg",
      "1864246546.jpeg", "1987359000.jpeg", "24447729.jpeg", "2702887579.jpeg", "3791936862.jpeg",
      "3806879209.jpeg", "3930057147.jpeg", "4068829486.jpeg", "408677529.jpeg", "422106650.jpeg",
      "997386420.jpeg", "998804634.jpeg",
    ]),
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-17-at-15.26.47.jpeg",
    date: "2026",
    title: "Orientation at Amaltas Institute of Medical Sciences",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-10-at-16.48.43.jpeg",
    date: "2026",
    title: "Women's Day Celebration 2k26",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-03-07-at-14.58.06.jpeg",
    date: "2026",
    title: "National Pharmacy Education Day",
  },
  {
    img: "/assets/images%20of%20university/events/3.jpeg",
    date: "2026",
    title: "Holi Celebrated with Great Joy at Amaltas Institute of Ayurveda",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2026-02-20-at-17.13.30.jpeg",
    date: "2026",
    title: "Amaltas Ayurveda Wins First Prize at Mahakal Van Mela 2026, Provides Free Treatment to 4,000 Patients",
  },
  {
    img: "/assets/images%20of%20university/events/feb-1.jpeg",
    date: "2026",
    title: "Freshers' Party",
  },
  {
    img: "/assets/images%20of%20university/events/jan-1.jpeg",
    date: "2026",
    title: "CME on “Mantrayoga as Mind Medicine”",
  },
  {
    img: "/assets/images%20of%20university/events/WhatsApp-Image-2025-12-18-at-15.07.02.jpeg",
    date: "2025",
    title: "Two-Day NCMSAP 2025 Held at Amaltas University, Dewas",
  },
];

const yearOf = (ev) => (ev.date.match(/\b(20\d{2})\b/) || [, "2026"])[1];

const ENRICHED_EVENTS = EVENTS.map((ev, i) => ({ ...ev, _idx: i, _year: yearOf(ev) }));
const YEARS = [...new Set(ENRICHED_EVENTS.map((e) => e._year))].sort((a, b) => b - a);
const SORT_OPTIONS = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "az", label: "Title A–Z" },
];

function toggleInSet(setter, value) {
  setter((prev) => {
    const next = new Set(prev);
    next.has(value) ? next.delete(value) : next.add(value);
    return next;
  });
}

/**
 * Card thumbnail that flips through the event's gallery while the pointer is
 * over it, and settles back on the cover shot as soon as the pointer leaves.
 *
 * The extra frames are only mounted after the first hover (`armed`), so a page
 * with 25 galleries still loads just 25 images up front. Auto-play is skipped
 * for visitors who ask for reduced motion — they keep the static cover.
 */
function EventMedia({ ev, hasGallery }) {
  // cover first, then the rest of the gallery minus any duplicate of the cover
  const frames = React.useMemo(
    () => (hasGallery ? [ev.img, ...ev.gallery.filter((g) => g !== ev.img)] : [ev.img]),
    [ev, hasGallery]
  );
  const [idx, setIdx] = useState(0);
  const [armed, setArmed] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearInterval(timer.current), []);

  const start = () => {
    if (frames.length < 2) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    setArmed(true);
    clearInterval(timer.current);
    timer.current = setInterval(() => setIdx((i) => (i + 1) % frames.length), 900);
  };

  const stop = () => {
    clearInterval(timer.current);
    timer.current = null;
    setIdx(0);
  };

  return (
    <div className="ev-media" onMouseEnter={start} onMouseLeave={stop}>
      {frames.map((src, i) => {
        // frame 0 always renders; the rest wait for the first hover
        if (i > 0 && !armed) return null;
        return (
          <img
            key={src}
            className="ev-frame"
            src={src}
            alt={i === 0 ? ev.title : ""}
            aria-hidden={i === 0 ? undefined : true}
            loading="lazy"
            decoding="async"
            /* the cover stays lit underneath, so a frame that hasn't finished
               downloading yet reveals the cover rather than a white flash */
            style={{ opacity: i === 0 || i === idx ? 1 : 0 }}
          />
        );
      })}

      {hasGallery && (
        <span className="ev-photo-badge">
          <Images size={13} /> {ev.gallery.length} photos
        </span>
      )}

      {frames.length > 1 && (
        <span className="ev-strip" aria-hidden="true">
          {frames.map((src, i) => (
            <i key={src} className={i === idx ? "on" : ""} />
          ))}
        </span>
      )}
    </div>
  );
}

export default function Events() {
  const [open, setOpen] = useState(null);        // event object shown in the modal
  const [lightbox, setLightbox] = useState(null); // index into open.gallery, or null
  const [query, setQuery] = useState("");

  const [filtersOpen, setFiltersOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");
  const [yearFilter, setYearFilter] = useState(() => new Set());
  const [photosOnly, setPhotosOnly] = useState(false);
  const filterRef = useRef(null);

  const activeFilterCount = yearFilter.size + (photosOnly ? 1 : 0);

  const clearFilters = () => {
    setYearFilter(new Set());
    setPhotosOnly(false);
    setSortBy("newest");
  };

  const filteredEvents = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = ENRICHED_EVENTS.filter((ev) => {
      if (q && ![ev.title, ev.desc, ev.date].some((f) => f && f.toLowerCase().includes(q))) return false;
      if (yearFilter.size && !yearFilter.has(ev._year)) return false;
      if (photosOnly && !(Array.isArray(ev.gallery) && ev.gallery.length > 0)) return false;
      return true;
    });
    if (sortBy === "oldest") list = [...list].reverse();
    else if (sortBy === "az") list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    return list;
  }, [query, yearFilter, photosOnly, sortBy]);

  // close the filter panel on outside click or Escape
  useEffect(() => {
    if (!filtersOpen) return;
    const onDown = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) setFiltersOpen(false);
    };
    const onKey = (e) => { if (e.key === "Escape") setFiltersOpen(false); };
    document.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [filtersOpen]);

  // body-scroll lock + Escape / arrow-key handling while a modal is open
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") {
        if (lightbox !== null) setLightbox(null);
        else setOpen(null);
      } else if (lightbox !== null && open.gallery) {
        if (e.key === "ArrowRight") setLightbox((i) => (i + 1) % open.gallery.length);
        if (e.key === "ArrowLeft") setLightbox((i) => (i - 1 + open.gallery.length) % open.gallery.length);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, lightbox]);

  return (
    <>
      <SEO
        title="Events — Conferences, Celebrations & Campus Activities"
        description="Explore events at Amaltas University, Dewas — global medical congresses, awareness campaigns, cultural celebrations and community programmes across the campus calendar."
        path="/happenings/events"
        jsonLd={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Happenings", path: "/happenings/events" }, { name: "Events", path: "/happenings/events" }])}
      />
      <PageHero
        crumb="Happenings / Events"
        eyebrow="Happenings"
        title="Events."
        sub="A look at the conferences, ceremonies, workshops, and celebrations that fill the Amaltas campus calendar."
        bgImg="/assets/images%20of%20university/events/P1_yoga.jpg"
        aside={<UpcomingEvents />}
      />

      {/* ── EVENTS GRID ── */}
      <section className="sec wrap">
        <Reveal cls="ev-toolbar-reveal">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, flexWrap: "wrap", marginBottom: 40 }}>
            <div>
              <span className="eyebrow">The archive</span>
              <h2 style={{ marginTop: 14, marginBottom: 0 }}>Everything that's happened.</h2>
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
              <div className="ev-filter" ref={filterRef}>
                <button
                  type="button"
                  className="ev-filter-btn"
                  onClick={() => setFiltersOpen((o) => !o)}
                  aria-expanded={filtersOpen}
                  aria-haspopup="true"
                  data-open={filtersOpen || activeFilterCount > 0 || undefined}
                >
                  <SlidersHorizontal size={15} strokeWidth={2.25} />
                  Filters
                  {activeFilterCount > 0 && <span className="ev-filter-badge">{activeFilterCount}</span>}
                </button>

                {filtersOpen && (
                  <div className="ev-filter-panel" role="dialog" aria-label="Filter and sort events">
                    <div className="ev-filter-section">
                      <div className="ev-filter-label">Sort by</div>
                      <div className="ev-filter-chips">
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt.value}
                            type="button"
                            className={`ev-chip${sortBy === opt.value ? " on" : ""}`}
                            onClick={() => setSortBy(opt.value)}
                          >
                            {sortBy === opt.value && <Check size={12} strokeWidth={3} />}
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>


                    <div className="ev-filter-section">
                      <div className="ev-filter-label">Year</div>
                      <div className="ev-filter-chips">
                        {YEARS.map((yr) => (
                          <button
                            key={yr}
                            type="button"
                            className={`ev-chip${yearFilter.has(yr) ? " on" : ""}`}
                            onClick={() => toggleInSet(setYearFilter, yr)}
                          >
                            {yearFilter.has(yr) && <Check size={12} strokeWidth={3} />}
                            {yr}
                          </button>
                        ))}
                      </div>
                    </div>

                    <label className="ev-filter-toggle">
                      <input type="checkbox" checked={photosOnly} onChange={(e) => setPhotosOnly(e.target.checked)} />
                      With photo gallery only
                    </label>

                    <div className="ev-filter-footer">
                      <button type="button" className="ev-filter-clear" onClick={clearFilters} disabled={activeFilterCount === 0 && sortBy === "newest"}>
                        Clear all
                      </button>
                      <button type="button" className="ev-filter-done" onClick={() => setFiltersOpen(false)}>
                        Show {filteredEvents.length} events
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="ev-search">
                <Search size={16} strokeWidth={2.25} className="ev-search-icon" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events…"
                  aria-label="Search events"
                  className="ev-search-input"
                />
                {query && (
                  <button
                    type="button"
                    className="ev-search-clear"
                    onClick={() => setQuery("")}
                    aria-label="Clear search"
                  >
                    <X size={13} strokeWidth={2.25} />
                  </button>
                )}
                <span className="ev-search-underline" aria-hidden="true" />
              </div>
            </div>
          </div>
        </Reveal>
        {filteredEvents.length === 0 && (
          <p style={{ color: C.slate, fontSize: 15, marginBottom: 40 }}>
            No events match your filters{query ? ` for "${query}"` : ""}. Try clearing a filter or searching something else.
          </p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 24 }}>
          {filteredEvents.map((ev, i) => {
            const hasGallery = Array.isArray(ev.gallery) && ev.gallery.length > 0;
            return (
              <Reveal key={ev.img} delay={`d${(i % 3) + 1}`}>
                <div
                  className="card-lift"
                  onClick={hasGallery ? () => setOpen(ev) : undefined}
                  role={hasGallery ? "button" : undefined}
                  tabIndex={hasGallery ? 0 : undefined}
                  onKeyDown={hasGallery ? (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(ev); } } : undefined}
                  aria-label={hasGallery ? `${ev.title} — view photo gallery` : undefined}
                  style={{ background: "#fff", borderRadius: 18, overflow: "hidden", border: "1px solid rgba(11,44,24,.07)", height: "100%", display: "flex", flexDirection: "column", cursor: hasGallery ? "pointer" : "default" }}
                >
                  <EventMedia ev={ev} hasGallery={hasGallery} />
                  <div style={{ padding: "18px 20px 22px", display: "flex", flexDirection: "column", flex: 1 }}>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: C.slate, marginBottom: 9 }}>
                      <CalendarDays size={13} /> {ev.date}
                    </div>
                    <h3 style={{ fontSize: 15.5, lineHeight: 1.4, margin: 0 }}>{ev.title}</h3>
                    {hasGallery && (
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, marginTop: 12, fontSize: 12.5, fontWeight: 700, color: C.emerald }}>
                        View gallery <ArrowRight size={14} />
                      </span>
                    )}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: `radial-gradient(120% 140% at 80% 20%,${C.emerald} 0%,${C.navy} 55%)`, padding: "100px 0" }}>
        <div className="wrap" style={{ textAlign: "center", color: C.ivory }}>
          <Reveal>
            <span className="eyebrow" style={{ color: C.goldL }}>Be part of it</span>
            <h2 style={{ color: C.ivory, margin: "14px auto 0", maxWidth: 600 }}>Campus life never stands still.</h2>
            <p style={{ color: "rgba(247,244,236,.72)", fontSize: 16, maxWidth: 460, margin: "16px auto 34px", lineHeight: 1.7 }}>
              From conferences to celebrations, there's always something happening at Amaltas. Reach out to learn what's next.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <Link to="/admissions" className="btn btn-gold">
                Begin Application <ArrowRight size={17} />
              </Link>
              <a href={`tel:${CONTACT.tollFree.replace(/-/g, "")}`} className="btn btn-ghost">
                <Phone size={15} /> {CONTACT.tollFree}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── EVENT GALLERY MODAL ── */}
      {open && (
        <div className="ev-modal-backdrop" onClick={() => setOpen(null)}>
          <div className="ev-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={open.title}>
            <button className="ev-modal-close" onClick={() => setOpen(null)} aria-label="Close">
              <X size={18} />
            </button>
            <div className="ev-modal-date"><CalendarDays size={13} /> {open.date}</div>
            <h2 className="ev-modal-title">{open.title}</h2>
            {open.desc && <p className="ev-modal-desc">{open.desc}</p>}
            {Array.isArray(open.gallery) && open.gallery.length > 0 && (
              <div className="ev-modal-gallery">
                {open.gallery.map((src, i) => (
                  <button key={src} className="ev-modal-thumb" onClick={() => setLightbox(i)} aria-label={`Open photo ${i + 1}`}>
                    <img src={src} alt={`${open.title} — photo ${i + 1}`} loading="lazy" />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── FULL-SIZE LIGHTBOX ── */}
      {open && lightbox !== null && open.gallery && (
        <div className="ev-lightbox" onClick={() => setLightbox(null)}>
          <button className="ev-lightbox-close" onClick={() => setLightbox(null)} aria-label="Close photo">
            <X size={22} />
          </button>
          {open.gallery.length > 1 && (
            <button
              className="ev-lightbox-nav prev"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + open.gallery.length) % open.gallery.length); }}
              aria-label="Previous photo"
            >
              <ChevronLeft size={26} />
            </button>
          )}
          <img className="ev-lightbox-img" src={open.gallery[lightbox]} alt={`${open.title} — photo ${lightbox + 1}`} onClick={(e) => e.stopPropagation()} loading="lazy" decoding="async" />
          {open.gallery.length > 1 && (
            <button
              className="ev-lightbox-nav next"
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % open.gallery.length); }}
              aria-label="Next photo"
            >
              <ChevronRight size={26} />
            </button>
          )}
          <div className="ev-lightbox-count">{lightbox + 1} / {open.gallery.length}</div>
        </div>
      )}
    </>
  );
}
