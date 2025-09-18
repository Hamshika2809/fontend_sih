import React, { useState } from 'react';
import { Leaf, Users, Building2, Shield, Truck, CheckCircle, FlaskConical, Factory, Settings, Globe, Menu, X, Phone, Mail, MapPin } from 'lucide-react';

interface LandingPageProps {
  onFarmerClick: () => void;
  onAgentClick: () => void;
  onLabClick: () => void;
  onManufacturerClick: () => void;
  onAdminClick: () => void;
  language: 'en' | 'hi' | 'kn' | 'ta' | 'te';
  onLanguageChange: (lang: 'en' | 'hi' | 'kn' | 'ta' | 'te') => void;
}

const translations = {
  en: {
    title: "Blockchain-based Ayurvedic Herb Traceability System",
    subtitle: "Ensuring authenticity and quality of Ayurvedic herbs through transparent, secure blockchain technology from farm to consumer.",
    howItWorks: "How It Works",
    farmRegistration: "Farm Registration",
    farmRegistrationDesc: "Farmers register their herbs with location data, photos, and quality metrics",
    supplyChainTracking: "Supply Chain Tracking",
    supplyChainTrackingDesc: "Real-time tracking through collection, processing, and distribution",
    qualityAssurance: "Quality Assurance",
    qualityAssuranceDesc: "Immutable records ensure authenticity and prevent counterfeiting",
    accessPortal: "Access Portal",
    farmerPortal: "Farmer Portal",
    farmerPortalDesc: "Register your herbs, track batches, and manage your farm's contribution to the supply chain.",
    agentPortal: "Agent Portal",
    agentPortalDesc: "Manage collection operations, update batch statuses, and oversee the supply chain process.",
    labPortal: "Lab Portal",
    labPortalDesc: "Conduct quality testing, verify herb authenticity, and maintain testing records.",
    manufacturerPortal: "Manufacturer Portal",
    manufacturerPortalDesc: "Process herbs into products, maintain production records, and ensure quality standards.",
    adminPortal: "Admin Portal",
    adminPortalDesc: "Oversee the entire system, manage users, and monitor all operations.",
    whyChoose: "Why Choose Our System?",
    secureTransparent: "Secure & Transparent",
    secureTransparentDesc: "Blockchain ensures data integrity",
    qualityAssured: "Quality Assured",
    qualityAssuredDesc: "End-to-end quality tracking",
    farmerEmpowerment: "Farmer Empowerment",
    farmerEmpowermentDesc: "Direct market access",
    realTimeTracking: "Real-time Tracking",
    realTimeTrackingDesc: "Live supply chain visibility",
    home: "Home",
    about: "About",
    services: "Services",
    contact: "Contact",
    login: "Login",
    signup: "Sign Up",
    contactUs: "Contact Us",
    address: "123 Herb Street, Bangalore, Karnataka, India",
    phone: "+91 98765 43210",
    email: "info@herbtraceability.com"
  },
  hi: {
    title: "ब्लॉकचेन-आधारित आयुर्वेदिक जड़ी-बूटी ट्रेसेबिलिटी सिस्टम",
    subtitle: "पारदर्शी, सुरक्षित ब्लॉकचेन तकनीक के माध्यम से खेत से उपभोक्ता तक आयुर्वेदिक जड़ी-बूटियों की प्रामाणिकता और गुणवत्ता सुनिश्चित करना।",
    howItWorks: "यह कैसे काम करता है",
    farmRegistration: "फार्म पंजीकरण",
    farmRegistrationDesc: "किसान अपनी जड़ी-बूटियों को स्थान डेटा, फोटो और गुणवत्ता मेट्रिक्स के साथ पंजीकृत करते हैं",
    supplyChainTracking: "आपूर्ति श्रृंखला ट्रैकिंग",
    supplyChainTrackingDesc: "संग्रह, प्रसंस्करण और वितरण के माध्यम से वास्तविक समय ट्रैकिंग",
    qualityAssurance: "गुणवत्ता आश्वासन",
    qualityAssuranceDesc: "अपरिवर्तनीय रिकॉर्ड प्रामाणिकता सुनिश्चित करते हैं और नकली को रोकते हैं",
    accessPortal: "एक्सेस पोर्टल",
    farmerPortal: "किसान पोर्टल",
    farmerPortalDesc: "अपनी जड़ी-बूटियों को पंजीकृत करें, बैचों को ट्रैक करें, और आपूर्ति श्रृंखला में अपने फार्म के योगदान का प्रबंधन करें।",
    agentPortal: "एजेंट पोर्टल",
    agentPortalDesc: "संग्रह संचालन का प्रबंधन करें, बैच स्थिति अपडेट करें, और आपूर्ति श्रृंखला प्रक्रिया की देखरेख करें।",
    labPortal: "लैब पोर्टल",
    labPortalDesc: "गुणवत्ता परीक्षण करें, जड़ी-बूटी की प्रामाणिकता सत्यापित करें, और परीक्षण रिकॉर्ड बनाए रखें।",
    manufacturerPortal: "निर्माता पोर्टल",
    manufacturerPortalDesc: "जड़ी-बूटियों को उत्पादों में संसाधित करें, उत्पादन रिकॉर्ड बनाए रखें, और गुणवत्ता मानकों को सुनिश्चित करें।",
    adminPortal: "एडमिन पोर्टल",
    adminPortalDesc: "पूरे सिस्टम की देखरेख करें, उपयोगकर्ताओं का प्रबंधन करें, और सभी संचालन की निगरानी करें।",
    whyChoose: "हमारा सिस्टम क्यों चुनें?",
    secureTransparent: "सुरक्षित और पारदर्शी",
    secureTransparentDesc: "ब्लॉकचेन डेटा अखंडता सुनिश्चित करता है",
    qualityAssured: "गुणवत्ता आश्वासित",
    qualityAssuredDesc: "एंड-टू-एंड गुणवत्ता ट्रैकिंग",
    farmerEmpowerment: "किसान सशक्तिकरण",
    farmerEmpowermentDesc: "प्रत्यक्ष बाजार पहुंच",
    realTimeTracking: "वास्तविक समय ट्रैकिंग",
    realTimeTrackingDesc: "लाइव आपूर्ति श्रृंखला दृश्यता",
    home: "होम",
    about: "के बारे में",
    services: "सेवाएं",
    contact: "संपर्क",
    login: "लॉगिन",
    signup: "साइन अप",
    contactUs: "संपर्क करें",
    address: "123 हर्ब स्ट्रीट, बैंगलोर, कर्नाटक, भारत",
    phone: "+91 98765 43210",
    email: "info@herbtraceability.com"
  },
  kn: {
    title: "ಬ್ಲಾಕ್‌ಚೈನ್-ಆಧಾರಿತ ಆಯುರ್ವೇದಿಕ ಔಷಧೀಯ ಸಸ್ಯಗಳ ಪತ್ತೆಹಚ್ಚುವಿಕೆ ವ್ಯವಸ್ಥೆ",
    subtitle: "ಪಾರದರ್ಶಕ, ಸುರಕ್ಷಿತ ಬ್ಲಾಕ್‌ಚೈನ್ ತಂತ್ರಜ್ಞಾನದ ಮೂಲಕ ಕೃಷಿಯಿಂದ ಗ್ರಾಹಕರವರೆಗೆ ಆಯುರ್ವೇದಿಕ ಔಷಧೀಯ ಸಸ್ಯಗಳ ಸತ್ಯತೆ ಮತ್ತು ಗುಣಮಟ್ಟವನ್ನು ಖಾತ್ರಿಪಡಿಸುವುದು।",
    howItWorks: "ಇದು ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ",
    farmRegistration: "ಕೃಷಿ ನೋಂದಣಿ",
    farmRegistrationDesc: "ರೈತರು ತಮ್ಮ ಔಷಧೀಯ ಸಸ್ಯಗಳನ್ನು ಸ್ಥಳ ಡೇಟಾ, ಫೋಟೋಗಳು ಮತ್ತು ಗುಣಮಟ್ಟದ ಮೆಟ್ರಿಕ್ಸ್‌ಗಳೊಂದಿಗೆ ನೋಂದಾಯಿಸುತ್ತಾರೆ",
    supplyChainTracking: "ಪೂರೈಕೆ ಸರಪಳಿ ಟ್ರ್ಯಾಕಿಂಗ್",
    supplyChainTrackingDesc: "ಸಂಗ್ರಹಣೆ, ಸಂಸ್ಕರಣೆ ಮತ್ತು ವಿತರಣೆಯ ಮೂಲಕ ನೈಜ-ಸಮಯದ ಟ್ರ್ಯಾಕಿಂಗ್",
    qualityAssurance: "ಗುಣಮಟ್ಟದ ಭರವಸೆ",
    qualityAssuranceDesc: "ಬದಲಾಯಿಸಲಾಗದ ದಾಖಲೆಗಳು ಸತ್ಯತೆಯನ್ನು ಖಾತ್ರಿಪಡಿಸುತ್ತವೆ ಮತ್ತು ನಕಲಿಯನ್ನು ತಡೆಯುತ್ತವೆ",
    accessPortal: "ಪ್ರವೇಶ ಪೋರ್ಟಲ್",
    farmerPortal: "ರೈತ ಪೋರ್ಟಲ್",
    farmerPortalDesc: "ನಿಮ್ಮ ಔಷಧೀಯ ಸಸ್ಯಗಳನ್ನು ನೋಂದಾಯಿಸಿ, ಬ್ಯಾಚ್‌ಗಳನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ ಮತ್ತು ಪೂರೈಕೆ ಸರಪಳಿಯಲ್ಲಿ ನಿಮ್ಮ ಕೃಷಿಯ ಕೊಡುಗೆಯನ್ನು ನಿರ್ವಹಿಸಿ।",
    agentPortal: "ಏಜೆಂಟ್ ಪೋರ್ಟಲ್",
    agentPortalDesc: "ಸಂಗ್ರಹಣೆ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ, ಬ್ಯಾಚ್ ಸ್ಥಿತಿಗಳನ್ನು ನವೀಕರಿಸಿ ಮತ್ತು ಪೂರೈಕೆ ಸರಪಳಿ ಪ್ರಕ್ರಿಯೆಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ।",
    labPortal: "ಲ್ಯಾಬ್ ಪೋರ್ಟಲ್",
    labPortalDesc: "ಗುಣಮಟ್ಟದ ಪರೀಕ್ಷೆಯನ್ನು ನಡೆಸಿ, ಔಷಧೀಯ ಸಸ್ಯಗಳ ಸತ್ಯತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಪರೀಕ್ಷಾ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ।",
    manufacturerPortal: "ತಯಾರಕ ಪೋರ್ಟಲ್",
    manufacturerPortalDesc: "ಔಷಧೀಯ ಸಸ್ಯಗಳನ್ನು ಉತ್ಪನ್ನಗಳಾಗಿ ಸಂಸ್ಕರಿಸಿ, ಉತ್ಪಾದನಾ ದಾಖಲೆಗಳನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಗುಣಮಟ್ಟದ ಮಾನದಂಡಗಳನ್ನು ಖಾತ್ರಿಪಡಿಸಿ।",
    adminPortal: "ಅಡ್ಮಿನ್ ಪೋರ್ಟಲ್",
    adminPortalDesc: "ಸಂಪೂರ್ಣ ವ್ಯವಸ್ಥೆಯನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ, ಬಳಕೆದಾರರನ್ನು ನಿರ್ವಹಿಸಿ ಮತ್ತು ಎಲ್ಲಾ ಕಾರ್ಯಾಚರಣೆಗಳನ್ನು ಮೇಲ್ವಿಚಾರಣೆ ಮಾಡಿ।",
    whyChoose: "ನಮ್ಮ ವ್ಯವಸ್ಥೆಯನ್ನು ಏಕೆ ಆಯ್ಕೆ ಮಾಡಬೇಕು?",
    secureTransparent: "ಸುರಕ್ಷಿತ ಮತ್ತು ಪಾರದರ್ಶಕ",
    secureTransparentDesc: "ಬ್ಲಾಕ್‌ಚೈನ್ ಡೇಟಾ ಸಮಗ್ರತೆಯನ್ನು ಖಾತ್ರಿಪಡಿಸುತ್ತದೆ",
    qualityAssured: "ಗುಣಮಟ್ಟ ಖಾತ್ರಿ",
    qualityAssuredDesc: "ಅಂತ್ಯದಿಂದ ಅಂತ್ಯದವರೆಗೆ ಗುಣಮಟ್ಟದ ಟ್ರ್ಯಾಕಿಂಗ್",
    farmerEmpowerment: "ರೈತ ಸಬಲೀಕರಣ",
    farmerEmpowermentDesc: "ನೇರ ಮಾರುಕಟ್ಟೆ ಪ್ರವೇಶ",
    realTimeTracking: "ನೈಜ-ಸಮಯದ ಟ್ರ್ಯಾಕಿಂಗ್",
    realTimeTrackingDesc: "ಲೈವ್ ಪೂರೈಕೆ ಸರಪಳಿ ದೃಶ್ಯತೆ",
    home: "ಮುಖ್ಯಪುಟ",
    about: "ಬಗ್ಗೆ",
    services: "ಸೇವೆಗಳು",
    contact: "ಸಂಪರ್ಕ",
    login: "ಲಾಗಿನ್",
    signup: "ಸೈನ್ ಅಪ್",
    contactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    address: "123 ಹರ್ಬ್ ಸ್ಟ್ರೀಟ್, ಬೆಂಗಳೂರು, ಕರ್ನಾಟಕ, ಭಾರತ",
    phone: "+91 98765 43210",
    email: "info@herbtraceability.com"
  },
  ta: {
    title: "பிளாக்செயின் அடிப்படையிலான ஆயுர்வேத மூலிகை கண்காணிப்பு அமைப்பு",
    subtitle: "வெளிப்படையான, பாதுகாப்பான பிளாக்செயின் தொழில்நுட்பத்தின் மூலம் பண்ணையிலிருந்து நுகர்வோர் வரை ஆயுர்வேத மூலிகைகளின் நம்பகத்தன்மை மற்றும் தரத்தை உறுதி செய்தல்।",
    howItWorks: "இது எவ்வாறு செயல்படுகிறது",
    farmRegistration: "பண்ணை பதிவு",
    farmRegistrationDesc: "விவசாயிகள் தங்கள் மூலிகைகளை இடத் தரவு, புகைப்படங்கள் மற்றும் தர அளவீடுகளுடன் பதிவு செய்கிறார்கள்",
    supplyChainTracking: "விநியோகச் சங்கிலி கண்காணிப்பு",
    supplyChainTrackingDesc: "சேகரிப்பு, செயலாக்கம் மற்றும் விநியோகத்தின் மூலம் நிகழ்நேர கண்காணிப்பு",
    qualityAssurance: "தர உத்தரவாதம்",
    qualityAssuranceDesc: "மாற்ற முடியாத பதிவுகள் நம்பகத்தன்மையை உறுதி செய்து போலியானவற்றைத் தடுக்கின்றன",
    accessPortal: "அணுகல் போர்ட்டல்",
    farmerPortal: "விவசாயி போர்ட்டல்",
    farmerPortalDesc: "உங்கள் மூலிகைகளைப் பதிவு செய்யுங்கள், தொகுதிகளைக் கண்காணியுங்கள் மற்றும் விநியோகச் சங்கிலியில் உங்கள் பண்ணையின் பங்களிப்பை நிர்வகிக்கவும்।",
    agentPortal: "முகவர் போர்ட்டல்",
    agentPortalDesc: "சேகரிப்பு நடவடிக்கைகளை நிர்வகிக்கவும், தொகுதி நிலைகளை புதுப்பிக்கவும் மற்றும் விநியோகச் சங்கிலி செயல்முறையை மேற்பார்வையிடவும்।",
    labPortal: "ஆய்வகம் போர்ட்டல்",
    labPortalDesc: "தர சோதனை நடத்துங்கள், மூலிகை நம்பகத்தன்மையை சரிபார்க்கவும் மற்றும் சோதனை பதிவுகளை பராமரிக்கவும்।",
    manufacturerPortal: "உற்பத்தியாளர் போர்ட்டல்",
    manufacturerPortalDesc: "மூலிகைகளை தயாரிப்புகளாக செயலாக்கவும், உற்பத்தி பதிவுகளை பராமரிக்கவும் மற்றும் தர தரநிலைகளை உறுதி செய்யவும்।",
    adminPortal: "நிர்வாக போர்ட்டல்",
    adminPortalDesc: "முழு அமைப்பையும் மேற்பார்வையிடுங்கள், பயனர்களை நிர்வகிக்கவும் மற்றும் அனைத்து செயல்பாடுகளையும் கண்காணிக்கவும்।",
    whyChoose: "எங்கள் அமைப்பை ஏன் தேர்வு செய்ய வேண்டும்?",
    secureTransparent: "பாதுகாப்பான மற்றும் வெளிப்படையான",
    secureTransparentDesc: "பிளாக்செயின் தரவு ஒருமைப்பாட்டை உறுதி செய்கிறது",
    qualityAssured: "தர உத்தரவாதம்",
    qualityAssuredDesc: "முடிவிலிருந்து முடிவு வரை தர கண்காணிப்பு",
    farmerEmpowerment: "விவசாயி அதிகாரமளித்தல்",
    farmerEmpowermentDesc: "நேரடி சந்தை அணுகல்",
    realTimeTracking: "நிகழ்நேர கண்காணிப்பு",
    realTimeTrackingDesc: "நேரடி விநியோகச் சங்கிலி தெரிவுநிலை",
    home: "முகப்பு",
    about: "பற்றி",
    services: "சேவைகள்",
    contact: "தொடர்பு",
    login: "உள்நுழைவு",
    signup: "பதிவு செய்யுங்கள்",
    contactUs: "எங்களை தொடர்பு கொள்ளுங்கள்",
    address: "123 ஹர்ப் ஸ்ட்ரீட், பெங்களூர், கர்நாடகா, இந்தியா",
    phone: "+91 98765 43210",
    email: "info@herbtraceability.com"
  },
  te: {
    title: "బ్లాక్‌చైన్-ఆధారిత ఆయుర్వేద మూలికల గుర్తింపు వ్యవస్థ",
    subtitle: "పారదర్శక, సురక్షిత బ్లాక్‌చైన్ సాంకేతికత ద్వారా వ్యవసాయం నుండి వినియోగదారు వరకు ఆయుర్వేద మూలికల ప్రామాణికత మరియు నాణ్యతను నిర్ధారించడం।",
    howItWorks: "ఇది ఎలా పనిచేస్తుంది",
    farmRegistration: "వ్యవసాయ నమోదు",
    farmRegistrationDesc: "రైతులు తమ మూలికలను స్థాన డేటా, ఫోటోలు మరియు నాణ్యత మెట్రిక్స్‌తో నమోదు చేస్తారు",
    supplyChainTracking: "సరఫరా గొలుసు ట్రాకింగ్",
    supplyChainTrackingDesc: "సేకరణ, ప్రాసెసింగ్ మరియు పంపిణీ ద్వారా నిజ-సమయ ట్రాకింగ్",
    qualityAssurance: "నాణ్యత హామీ",
    qualityAssuranceDesc: "మార్చలేని రికార్డులు ప్రామాణికతను నిర్ధారిస్తాయి మరియు నకిలీలను నిరోధిస్తాయి",
    accessPortal: "యాక్సెస్ పోర్టల్",
    farmerPortal: "రైతు పోర్టల్",
    farmerPortalDesc: "మీ మూలికలను నమోదు చేయండి, బ్యాచ్‌లను ట్రాక్ చేయండి మరియు సరఫరా గొలుసులో మీ వ్యవసాయ సహకారాన్ని నిర్వహించండి।",
    agentPortal: "ఏజెంట్ పోర్టల్",
    agentPortalDesc: "సేకరణ కార్యకలాపాలను నిర్వహించండి, బ్యాచ్ స్థితులను అప్‌డేట్ చేయండి మరియు సరఫరా గొలుసు ప్రక్రియను పర్యవేక్షించండి।",
    labPortal: "ల్యాబ్ పోర్టల్",
    labPortalDesc: "నాణ్యత పరీక్షలు నిర్వహించండి, మూలిక ప్రామాణికతను ధృవీకరించండి మరియు పరీక్ష రికార్డులను నిర్వహించండి।",
    manufacturerPortal: "తయారీదారు పోర్టల్",
    manufacturerPortalDesc: "మూలికలను ఉత్పత్తులుగా ప్రాసెస్ చేయండి, ఉత్పత్తి రికార్డులను నిర్వహించండి మరియు నాణ్యత ప్రమాణాలను నిర్ధారించండి।",
    adminPortal: "అడ్మిన్ పోర్టల్",
    adminPortalDesc: "మొత్తం వ్యవస్థను పర్యవేక్షించండి, వినియోగదారులను నిర్వహించండి మరియు అన్ని కార్యకలాపాలను పర్యవేక్షించండి।",
    whyChoose: "మా వ్యవస్థను ఎందుకు ఎంచుకోవాలి?",
    secureTransparent: "సురక్షిత మరియు పారదర్శక",
    secureTransparentDesc: "బ్లాక్‌చైన్ డేటా సమగ్రతను నిర్ధారిస్తుంది",
    qualityAssured: "నాణ్యత హామీ",
    qualityAssuredDesc: "ఎండ్-టు-ఎండ్ నాణ్యత ట్రాకింగ్",
    farmerEmpowerment: "రైతు సాధికారత",
    farmerEmpowermentDesc: "ప్రత్యక్ష మార్కెట్ యాక్సెస్",
    realTimeTracking: "నిజ-సమయ ట్రాకింగ్",
    realTimeTrackingDesc: "లైవ్ సరఫరా గొలుసు దృశ్యమానత",
    home: "హోమ్",
    about: "గురించి",
    services: "సేవలు",
    contact: "సంప్రదింపులు",
    login: "లాగిన్",
    signup: "సైన్ అప్",
    contactUs: "మమ్మల్ని సంప్రదించండి",
    address: "123 హర్బ్ స్ట్రీట్, బెంగళూరు, కర్ణాటక, భారతదేశం",
    phone: "+91 98765 43210",
    email: "info@herbtraceability.com"
  }
};

const LandingPage: React.FC<LandingPageProps> = ({ 
  onFarmerClick, 
  onAgentClick, 
  onLabClick, 
  onManufacturerClick, 
  onAdminClick, 
  language, 
  onLanguageChange 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const t = translations[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg" 
                alt="Logo" 
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-xl font-bold text-green-600">HerbTrace</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#home" className="text-gray-700 hover:text-green-600 font-medium">{t.home}</a>
              <a href="#about" className="text-gray-700 hover:text-green-600 font-medium">{t.about}</a>
              <a href="#services" className="text-gray-700 hover:text-green-600 font-medium">{t.services}</a>
              <a href="#contact" className="text-gray-700 hover:text-green-600 font-medium">{t.contact}</a>
              
              {/* Language Selector */}
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value as any)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="kn">ಕನ್ನಡ</option>
                <option value="ta">தமிழ்</option>
                <option value="te">తెలుగు</option>
              </select>

              {/* Login Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                  className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
                >
                  {t.login}
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                {showLoginDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-10">
                    <button
                      onClick={() => { onFarmerClick(); setShowLoginDropdown(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Users className="w-4 h-4 inline mr-2" />
                      Farmer Login
                    </button>
                    <button
                      onClick={() => { onAgentClick(); setShowLoginDropdown(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Truck className="w-4 h-4 inline mr-2" />
                      Agent Login
                    </button>
                    <button
                      onClick={() => { onLabClick(); setShowLoginDropdown(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <FlaskConical className="w-4 h-4 inline mr-2" />
                      Lab Login
                    </button>
                    <button
                      onClick={() => { onManufacturerClick(); setShowLoginDropdown(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Factory className="w-4 h-4 inline mr-2" />
                      Manufacturer Login
                    </button>
                    <button
                      onClick={() => { onAdminClick(); setShowLoginDropdown(false); }}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      <Settings className="w-4 h-4 inline mr-2" />
                      Admin Login
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-700 hover:text-green-600"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden bg-white border-t border-gray-200">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <a href="#home" className="block px-3 py-2 text-gray-700 hover:text-green-600">{t.home}</a>
                <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-green-600">{t.about}</a>
                <a href="#services" className="block px-3 py-2 text-gray-700 hover:text-green-600">{t.services}</a>
                <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-green-600">{t.contact}</a>
                
                <select
                  value={language}
                  onChange={(e) => onLanguageChange(e.target.value as any)}
                  className="block w-full mt-2 border border-gray-300 rounded-lg px-3 py-2"
                >
                  <option value="en">English</option>
                  <option value="hi">हिंदी</option>
                  <option value="kn">ಕನ್ನಡ</option>
                  <option value="ta">தமிழ்</option>
                  <option value="te">తెలుగు</option>
                </select>

                <div className="pt-2 border-t border-gray-200">
                  <button onClick={onFarmerClick} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600">
                    <Users className="w-4 h-4 inline mr-2" />
                    Farmer Login
                  </button>
                  <button onClick={onAgentClick} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600">
                    <Truck className="w-4 h-4 inline mr-2" />
                    Agent Login
                  </button>
                  <button onClick={onLabClick} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600">
                    <FlaskConical className="w-4 h-4 inline mr-2" />
                    Lab Login
                  </button>
                  <button onClick={onManufacturerClick} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600">
                    <Factory className="w-4 h-4 inline mr-2" />
                    Manufacturer Login
                  </button>
                  <button onClick={onAdminClick} className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600">
                    <Settings className="w-4 h-4 inline mr-2" />
                    Admin Login
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Leaf className="w-20 h-20 text-green-600 animate-pulse" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full animate-bounce"></div>
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              {t.title.split(' ').slice(0, 2).join(' ')}
              <span className="text-green-600 block">{t.title.split(' ').slice(2, 4).join(' ')}</span>
              <span className="text-blue-600 block">{t.title.split(' ').slice(4).join(' ')}</span>
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
            
            {/* Animated Stats */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold text-green-600 mb-2">1000+</div>
                <div className="text-gray-600">Registered Farmers</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold text-blue-600 mb-2">50+</div>
                <div className="text-gray-600">Collection Agents</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-3xl font-bold text-purple-600 mb-2">10,000+</div>
                <div className="text-gray-600">Batches Tracked</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {t.howItWorks}
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t.farmRegistration}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.farmRegistrationDesc}
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t.supplyChainTracking}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.supplyChainTrackingDesc}
              </p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">{t.qualityAssurance}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t.qualityAssuranceDesc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {t.accessPortal}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Farmer Portal */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group">
              <div className="text-center">
                <div className="bg-gradient-to-br from-green-100 to-green-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-12 h-12 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.farmerPortal}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t.farmerPortalDesc}
                </p>
                <ul className="text-left text-sm text-gray-600 mb-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Register herb batches with geo-location
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Upload quality photos and documentation
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                    Track batch status in real-time
                  </li>
                </ul>
                <button
                  onClick={onFarmerClick}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 transform hover:scale-105"
                >
                  Access Farmer Portal
                </button>
              </div>
            </div>

            {/* Agent Portal */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group">
              <div className="text-center">
                <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-12 h-12 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.agentPortal}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t.agentPortalDesc}
                </p>
                <ul className="text-left text-sm text-gray-600 mb-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    View assigned batch collections
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    Update batch status and location
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                    Generate collection reports
                  </li>
                </ul>
                <button
                  onClick={onAgentClick}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-105"
                >
                  Access Agent Portal
                </button>
              </div>
            </div>

            {/* Lab Portal */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group">
              <div className="text-center">
                <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FlaskConical className="w-12 h-12 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.labPortal}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t.labPortalDesc}
                </p>
                <ul className="text-left text-sm text-gray-600 mb-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                    Conduct quality testing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                    Verify herb authenticity
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-purple-500 mr-3 flex-shrink-0" />
                    Maintain testing records
                  </li>
                </ul>
                <button
                  onClick={onLabClick}
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105"
                >
                  Access Lab Portal
                </button>
              </div>
            </div>

            {/* Manufacturer Portal */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group">
              <div className="text-center">
                <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Factory className="w-12 h-12 text-orange-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.manufacturerPortal}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t.manufacturerPortalDesc}
                </p>
                <ul className="text-left text-sm text-gray-600 mb-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                    Process herbs into products
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                    Maintain production records
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                    Ensure quality standards
                  </li>
                </ul>
                <button
                  onClick={onManufacturerClick}
                  className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-300 transform hover:scale-105"
                >
                  Access Manufacturer Portal
                </button>
              </div>
            </div>

            {/* Admin Portal */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-4 group md:col-span-2 lg:col-span-1">
              <div className="text-center">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Settings className="w-12 h-12 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{t.adminPortal}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {t.adminPortalDesc}
                </p>
                <ul className="text-left text-sm text-gray-600 mb-8 space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    Oversee entire system
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    Manage all users
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-gray-500 mr-3 flex-shrink-0" />
                    Monitor operations
                  </li>
                </ul>
                <button
                  onClick={onAdminClick}
                  className="w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white py-3 px-6 rounded-xl font-semibold hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-105"
                >
                  Access Admin Portal
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {t.whyChoose}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-3 text-lg">{t.secureTransparent}</h3>
              <p className="text-sm text-gray-600">{t.secureTransparentDesc}</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-3 text-lg">{t.qualityAssured}</h3>
              <p className="text-sm text-gray-600">{t.qualityAssuredDesc}</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-3 text-lg">{t.farmerEmpowerment}</h3>
              <p className="text-sm text-gray-600">{t.farmerEmpowermentDesc}</p>
            </div>
            <div className="text-center group">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold mb-3 text-lg">{t.realTimeTracking}</h3>
              <p className="text-sm text-gray-600">{t.realTimeTrackingDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            {t.contactUs}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Address</h3>
              <p className="text-gray-600">{t.address}</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-gray-600">{t.phone}</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-gray-600">{t.email}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="https://images.pexels.com/photos/4750274/pexels-photo-4750274.jpeg" 
                alt="Logo" 
                className="w-10 h-10 rounded-full mr-3"
              />
              <span className="text-2xl font-bold text-green-400">HerbTrace</span>
            </div>
            <p className="text-gray-400 mb-4">
              Ensuring authenticity and quality of Ayurvedic herbs through blockchain technology
            </p>
            <p className="text-gray-500 text-sm">
              © 2024 HerbTrace. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;