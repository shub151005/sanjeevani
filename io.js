 // --- ELEMENT SELECTORS ---
const languageSelector = document.getElementById('languageSelector');
const pages = document.querySelectorAll('.page');
const navCards = document.querySelectorAll('.nav-card');
const chatWindow = document.getElementById('chatWindow');
const aiChatWindow = document.getElementById('aiChatWindow');
const aiChatInput = document.getElementById('aiChatInput');
const aiChatSendBtn = document.getElementById('aiChatSendBtn');
const faqContainer = document.getElementById('faqContainer');


// --- STATE MANAGEMENT ---
let currentLanguage = 'en';

// --- ICON DATA ---
const icons = {
    headerIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12,2C6.48,2 2,6.48 2,12C2,17.52 6.48,22 12,22C17.52,22 22,17.52 22,12C22,6.48 17.52,2 12,2M16.5,18H7.5V16H16.5V18M16.5,14H7.5V12H16.5V14M16.5,10H7.5V8H16.5V10Z" /></svg>',
    aiChatIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M20,2H4C2.9,2 2,2.9 2,4V16C2,17.1 2.9,18 4,18H18L22,22V4C22,2.9 21.1,2 20,2M17,11H13.92L12,7.9L10.08,11H7L11,15.5L13,12.83L17,11Z" /></svg>',
    firstAidIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M18,14H14V18H10V14H6V10H10V6H14V10H18M20.59,2.41L22,3.82L20.59,5.23L19.18,3.82L20.59,2.41M3.82,19.18L2.41,20.59L3.82,22L5.23,20.59L3.82,19.18M3.82,5.23L5.23,3.82L3.82,2.41L2.41,3.82L3.82,5.23M19.18,20.59L20.59,19.18L22,20.59L20.59,22L19.18,20.59Z" /></svg>',
    consultationIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19,8V12H17V8H19M19,14V16H17V14H19M21,2H7C5.9,2 5,2.9 5,4V16C5,17.1 5.9,18 7,18H21C22.1,18 23,17.1 23,16V4C23,2.9 22.1,2 21,2M3,6H1V20C1,21.1 1.9,22 3,22H19V20H3V6M9,12H15V14H9V12M9,8H15V10H9V8Z" /></svg>',
    hospitalIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M18,6V4H16V6H14V8H16V10H18V8H20V6H18M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12C22,9.88 21.2,7.93 20,6.45V15H18V5.5C15.82,3.82 13,3 12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12H19A7,7 0 0,1 12,19A7,7 0 0,1 5,12A7,7 0 0,1 12,5C13.25,5 14.41,5.34 15.44,5.91L14,7.35V7.45C13.34,7.17 12.68,7 12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17A5,5 0 0,0 17,12V10H15V12A3,3 0 0,1 12,15A3,3 0 0,1 9,12A3,3 0 0,1 12,9C12.79,9 13.5,9.37 14,9.91V10H12V8H14V9.11A4.89,4.89 0 0,0 12,7A5,5 0 0,0 7,12A5,5 0 0,0 12,17Z" /></svg>',
    sendIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M2,21L23,12L2,3V10L17,12L2,14V21Z" /></svg>',
    expectIcon1: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M9,22A1,1 0 0,1 8,21V18H4A2,2 0 0,1 2,16V4C2,2.89 2.9,2 4,2H20A2,2 0 0,1 22,4V16A2,2 0 0,1 20,18H14.9L9.4,21.5C9.2,21.8 8.9,22 8.6,22H8V22H9Z" /></svg>',
    expectIcon2: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12,1L9,4H15L12,1M19,6H5C3.9,6 3,6.9 3,8V20C3,21.1 3.9,22 5,22H19C20.1,22 21,21.1 21,20V8C21,6.9 20.1,6 19,6M12,19C10.3,19 9,17.7 9,16C9,14.3 10.3,13 12,13C13.7,13 15,14.3 15,16C15,17.7 13.7,19 12,19Z" /></svg>',
    expectIcon3: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M16.2,16.2L11,13V7H12.5V12.2L17,14.9L16.2,16.2Z" /></svg>',
    facebookIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.32 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 12 2.04Z" /></svg>',
    instagramIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M7.8,2H16.2C19.4,2 22,4.6 22,7.8V16.2A5.8,5.8 0 0,1 16.2,22H7.8C4.6,22 2,19.4 2,16.2V7.8A5.8,5.8 0 0,1 7.8,2M7.6,4A3.6,3.6 0 0,0 4,7.6V16.4A3.6,3.6 0 0,0 7.6,20H16.4A3.6,3.6 0 0,0 20,16.4V7.6A3.6,3.6 0 0,0 16.4,4H7.6M17.2,6A1.2,1.2 0 0,1 18.4,7.2A1.2,1.2 0 0,1 17.2,8.4A1.2,1.2 0 0,1 16,7.2A1.2,1.2 0 0,1 17.2,6M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9Z" /></svg>',
    linkedinIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M19 3A2 2 0 0 1 21 5V19A2 2 0 0 1 19 21H5A2 2 0 0 1 3 19V5A2 2 0 0 1 5 3H19M18.5 18.5V13.2A3.26 3.26 0 0 0 15.24 9.94C14.39 9.94 13.4 10.46 13 11.1V10.28H10.13V18.5H13V13.57C13 12.8 13.09 12.03 14.17 12.03C15.24 12.03 15.24 12.91 15.24 13.6V18.5H18.5M6.88 8.56A1.68 1.68 0 0 0 8.56 6.88C8.56 6 8 5.44 7.19 5.44C6.38 5.44 5.81 6 5.81 6.88C5.81 7.77 6.38 8.56 7.19 8.56M8.27 18.5V10.28H5.13V18.5H8.27Z" /></svg>',
    emailIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M22 6C22 4.9 21.1 4 20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6M20 6L12 11L4 6H20M20 18H4V8L12 13L20 8V18Z" /></svg>',
    phoneIcon: '<svg fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79C8.06 13.62 10.38 15.94 13.21 17.38L15.41 15.18C15.69 14.9 16.08 14.82 16.43 14.93C17.55 15.3 18.75 15.5 20 15.5A1 1 0 0 1 21 16.5V20A1 1 0 0 1 20 21A17 17 0 0 1 3 4A1 1 0 0 1 4 3H7.5A1 1 0 0 1 8.5 4C8.5 5.25 8.7 6.45 9.07 7.57C9.18 7.92 9.1 8.31 8.82 8.59L6.62 10.79Z" /></svg>'
};


// --- ICON INJECTION ---
function loadIcons() {
    for (const iconId in icons) {
        const element = document.getElementById(iconId);
        if (element) {
            element.innerHTML = icons[iconId];
        }
    }
}


// --- NAVIGATION ---
function showPage(pageId) {
    // Hide all pages
    pages.forEach(page => {
        page.classList.remove('active');
    });

    // Show the requested page
    const newPage = document.getElementById(pageId);
    if (newPage) {
        newPage.classList.add('active');
        // If navigating to the AI Chat, ensure it's initialized
        if (pageId === 'aiChatPage' && aiChatWindow.children.length === 0) {
            addMessageToAIWindow(translations[currentLanguage].welcomeMessage, 'bot');
        }
    } else {
        // Fallback to home page if ID is invalid
        document.getElementById('homePage').classList.add('active');
    }
}

// Add click listeners to navigation cards
navCards.forEach(card => {
    card.addEventListener('click', () => {
        const pageId = card.getAttribute('data-page') + 'Page';
        showPage(pageId);
    });
});

// Add click listeners to all "back to home" buttons
document.querySelectorAll('.back-to-home').forEach(button => {
    button.addEventListener('click', () => showPage('homePage'));
});


// --- DATA STORE ---
const translations = {
    en: {
        appTitle: "Sanjeevani AI", appSubtitle: "Your Trusted Assistant",
        homeTitle: "Your Health Companion", homeSubtitle: "Free healthcare guidance, verified first-aid, and connect with nearby hospitals",
        emergencyText: "Emergency?", callNowText: "Call 108 Now",
        navChatTitle: "AI Chat", navChatSubtitle: "Ask health questions",
        navFirstAidTitle: "First Aid", navFirstAidSubtitle: "Emergency guidance",
        navConsultationTitle: "Book Consultation", navConsultationSubtitle: "Free tele-consultation",
        navHospitalTitle: "Find Hospital", navHospitalSubtitle: "Nearby facilities",
        welcomeMessage: "Hello! I'm your AI health assistant. I can help you with basic health queries, first-aid guidance, and connect you with healthcare services. How can I help you today?",
        aiChatWelcome: "You can ask me about symptoms like 'fever', 'headache', or ask to 'find hospitals near Jorhat'.",
        unknownQuery: "I'm sorry, I'm not trained to answer that yet. You can ask me about common symptoms or how to find a hospital.",
        firstAidSubtitle: "Select a symptom for quick guidance",
        backBtn: "Back to Symptoms",
        consultationSubtitle: "Connect with qualified doctors via phone call.",
        patientNameLabel: "Full Name *", phoneLabel: "Phone Number *", symptomsLabel: "Brief Description of Symptoms",
        submitBtn: "Submit Request",
        whatToExpectTitle: "What to Expect:",
        expectStep1: "Confirmation call within 2 hours",
        expectStep2: "Qualified MBBS doctors",
        expectStep3: "15-20 minute consultation",
        hospitalSubtitle: "Enter your district to find nearby facilities",
        searchBtn: "Search",
        consultationSuccess: "Thank you! Your request has been registered. A healthcare volunteer will call you back within 24 hours. Navigating back to home...",
        fever: "Fever", coughCold: "Cough & Cold", stomachPain: "Stomach Pain", injury: "Minor Injury", headache: "Headache", diarrhea: "Diarrhea/Vomiting",
        feverAdvice: "<strong>First-Aid for Fever:</strong><br>1. Rest in a cool place.<br>2. Drink plenty of fluids like water and ORS.<br>3. Place a cool, damp cloth on your forehead.<br>4. You can take Paracetamol as per standard dosage. If fever persists after 3 days, see a doctor.",
        coughAdvice: "<strong>First-Aid for Cough & Cold:</strong><br>1. Gargle with warm salt water.<br>2. Drink warm fluids like soup or tea.<br>3. Inhale steam from a bowl of hot water. If it doesn't improve in 5 days, see a doctor.",
        stomachPainAdvice: "<strong>First-Aid for Stomach Pain:</strong><br>1. Drink plenty of water, but in small sips.<br>2. Avoid solid food for a few hours.<br><strong>Warning:</strong> If pain is severe, seek medical help.",
        injuryAdvice: "<strong>First-Aid for Minor Cuts:</strong><br>1. Apply pressure with a clean cloth.<br>2. Clean the wound with antiseptic.<br>3. Cover with a bandage.",
        headacheAdvice: "<strong>First-Aid for Mild Headache:</strong><br>1. Rest in a quiet, dark room.<br>2. Apply a cold pack to your forehead.<br>3. Drink water.",
        diarrheaAdvice: "<strong>First-Aid for Diarrhea:</strong><br>1. Drink plenty of ORS (Oral Rehydration Solution).<br>2. Stick to bland foods like bananas and rice.<br>3. Avoid dairy and spicy foods.",
        faqTitle: "Frequently Asked Questions",
        contactUs: "Contact Us",
        faq1Q: "Is my conversation history data stored by the website?", faq1A: "For this prototype, no data is stored to ensure your privacy. In our final MERN stack application, chat history will be stored securely on your device or in an encrypted database, with your explicit consent.",
        faq2Q: "Which LLM models are available on this platform?", faq2A: "This prototype uses a rule-based system for instant, reliable answers to common questions. Our final plan is to integrate advanced, secure LLM models specifically trained for medical question-answering.",
        faq3Q: "Is the medical answer or diagnosis based on evidence?", faq3A: "All information provided is for first-aid and guidance purposes only; it is not a diagnosis. Our advice is based on publicly available guidelines from trusted sources like the WHO and Ministry of Health, India.",
        faq4Q: "Does this service offer an app in iOS or Android?", faq4A: "Currently, we are a web-based application to ensure maximum accessibility for everyone, especially in low-bandwidth areas, without requiring any downloads. A native app is part of our future roadmap.",
        faq5Q: "Is there a free plan?", faq5A: "Yes, our entire service is and will remain free for all users. Our mission is to improve access to primary healthcare guidance for everyone in rural and semi-urban areas.",
    },
    hi: {
        appTitle: "हेल्थकेयर एआई", appSubtitle: "आपका विश्वसनीय सहायक",
        homeTitle: "आपका स्वास्थ्य साथी", homeSubtitle: "मुफ़्त स्वास्थ्य मार्गदर्शन, सत्यापित प्राथमिक उपचार, और आस-पास के अस्पतालों से जुड़ें",
        emergencyText: "आपातकाल?", callNowText: "अभी 108 पर कॉल करें",
        navChatTitle: "एआई चैट", navChatSubtitle: "स्वास्थ्य प्रश्न पूछें",
        navFirstAidTitle: "प्राथमिक उपचार", navFirstAidSubtitle: "आपातकालीन मार्गदर्शन",
        navConsultationTitle: "परामर्श बुक करें", navConsultationSubtitle: "मुफ़्त टेली-परामर्श",
        navHospitalTitle: "अस्पताल खोजें", navHospitalSubtitle: "आस-पास की सुविधाएं",
        welcomeMessage: "नमस्ते! मैं आपका एआई स्वास्थ्य सहायक हूँ। मैं आपकी बुनियादी स्वास्थ्य प्रश्नों, प्राथमिक उपचार मार्गदर्शन, और स्वास्थ्य सेवाओं से जुड़ने में मदद कर सकता हूँ। मैं आपकी कैसे मदद कर सकता हूँ?",
        aiChatWelcome: "आप मुझसे 'बुखार', 'सिरदर्द' जैसे लक्षणों के बारे में पूछ सकते हैं, या 'जोरहाट के पास अस्पताल ढूंढें' पूछ सकते हैं।",
        unknownQuery: "मुझे क्षमा करें, मुझे अभी तक इसका उत्तर देने के लिए प्रशिक्षित नहीं किया गया है। आप मुझसे सामान्य लक्षणों या अस्पताल खोजने के तरीके के बारे में पूछ सकते हैं।",
        firstAidSubtitle: "त्वरित मार्गदर्शन के लिए एक लक्षण चुनें",
        backBtn: "लक्षणों पर वापस जाएं",
        consultationSubtitle: "योग्य डॉक्टरों से फोन कॉल के माध्यम से जुड़ें।",
        patientNameLabel: "पूरा नाम *", phoneLabel: "फोन नंबर *", symptomsLabel: "लक्षणों का संक्षिप्त विवरण",
        submitBtn: "अनुरोध जमा करें",
        whatToExpectTitle: "क्या अपेक्षा करें:",
        expectStep1: "2 घंटे के भीतर पुष्टि कॉल",
        expectStep2: "योग्य एमबीबीएस डॉक्टर",
        expectStep3: "15-20 मिनट का परामर्श",
        hospitalSubtitle: "आस-पास की सुविधाएं खोजने के लिए अपना जिला दर्ज करें",
        searchBtn: "खोजें",
        consultationSuccess: "धन्यवाद! आपका अनुरोध दर्ज कर लिया गया है। एक स्वास्थ्य स्वयंसेवक आपको 24 घंटे के भीतर वापस बुलाएगा। होम पर वापस जा रहे हैं...",
        fever: "बुखार", coughCold: "खांसी और जुकाम", stomachPain: "पेट दर्द", injury: "छोटी-मोटी चोट", headache: "सरदर्द", diarrhea: "दस्त / उल्टी",
        feverAdvice: "<strong>बुखार के लिए प्राथमिक उपचार:</strong><br>1. ठंडी जगह पर आराम करें।<br>2. पानी और ओआरएस जैसे खूब सारे तरल पदार्थ पिएं।<br>3. अपने माथे पर ठंडा, गीला कपड़ा रखें। यदि 3 दिनों के बाद भी बुखार बना रहता है, तो डॉक्टर से मिलें।",
        coughAdvice: "<strong>खांसी और जुकाम के लिए प्राथमिक उपचार:</strong><br>1. गर्म नमक वाले पानी से गरारे करें।<br>2. सूप या चाय जैसे गर्म तरल पदार्थ पिएं।<br>3. गर्म पानी के कटोरे से भाप लें। यदि 5 दिनों में सुधार नहीं होता है, तो डॉक्टर से मिलें।",
        stomachPainAdvice: "<strong>पेट दर्द के लिए प्राथमिक उपचार:</strong><br>1. खूब पानी पिएं, लेकिन छोटे घूंट में।<br>2. कुछ घंटों के लिए ठोस भोजन से बचें।<br><strong>चेतावनी:</strong> यदि दर्द गंभीर है, तो तुरंत चिकित्सा सहायता लें।",
        injuryAdvice: "<strong>मामूली कट के लिए प्राथमिक उपचार:</strong><br>1. एक साफ कपड़े से हल्का दबाव डालें।<br>2. घाव को एंटीसेप्टिक तरल से साफ करें।<br>3. एक पट्टी से ढक दें।",
        headacheAdvice: "<strong>हल्के सिरदर्द के लिए प्राथमिक उपचार:</strong><br>1. एक शांत, अंधेरे कमरे में आराम करें।<br>2. अपने माथे पर कोल्ड पैक लगाएं।<br>3. हाइड्रेटेड रहने के लिए पानी पिएं।",
        diarrheaAdvice: "<strong>दस्त के लिए प्राथमिक उपचार:</strong><br>1. निर्जलीकरण को रोकने के लिए खूब सारे ओआरएस पिएं।<br>2. केले और चावल जैसे नरम खाद्य पदार्थों का सेवन करें।<br>3. डेयरी और मसालेदार भोजन से बचें।",
        faqTitle: "अक्सर पूछे जाने वाले प्रश्न",
        contactUs: "हमसे संपर्क करें",
        faq1Q: "क्या मेरी बातचीत का इतिहास वेबसाइट द्वारा संग्रहीत किया जाता है?", faq1A: "इस प्रोटोटाइप के लिए, आपकी गोपनीयता सुनिश्चित करने के लिए कोई डेटा संग्रहीत नहीं किया जाता है। हमारे अंतिम MERN स्टैक एप्लिकेशन में, चैट इतिहास को आपकी स्पष्ट सहमति से आपके डिवाइस पर या एक एन्क्रिप्टेड डेटाबेस में सुरक्षित रूप से संग्रहीत किया जाएगा।",
        faq2Q: "इस प्लेटफॉर्म पर कौन से एलएलएम मॉडल उपलब्ध हैं?", faq2A: "यह प्रोटोटाइप सामान्य प्रश्नों के त्वरित, विश्वसनीय उत्तरों के लिए एक नियम-आधारित प्रणाली का उपयोग करता है। हमारी अंतिम योजना विशेष रूप से चिकित्सा प्रश्न-उत्तर के लिए प्रशिक्षित उन्नत, सुरक्षित एलएलएम मॉडल को एकीकृत करना है।",
        faq3Q: "क्या चिकित्सा उत्तर या निदान साक्ष्य पर आधारित है?", faq3A: "प्रदान की गई सभी जानकारी केवल प्राथमिक उपचार और मार्गदर्शन उद्देश्यों के लिए है; यह निदान नहीं है। हमारी सलाह डब्ल्यूएचओ और स्वास्थ्य मंत्रालय, भारत जैसे विश्वसनीय स्रोतों से सार्वजनिक रूप से उपलब्ध दिशानिर्देशों पर आधारित है।",
        faq4Q: "क्या यह सेवा आईओएस या एंड्रॉइड में ऐप प्रदान करती है?", faq4A: "वर्तमान में, हम यह सुनिश्चित करने के लिए एक वेब-आधारित एप्लिकेशन हैं कि हर किसी के लिए अधिकतम पहुंच हो, खासकर कम-बैंडविड्थ वाले क्षेत्रों में, बिना किसी डाउनलोड की आवश्यकता के। एक नेटिव ऐप हमारे भविष्य के रोडमैप का हिस्सा है।",
        faq5Q: "क्या कोई मुफ्त योजना है?", faq5A: "हाँ, हमारी पूरी सेवा सभी उपयोगकर्ताओं के लिए मुफ्त है और रहेगी। हमारा मिशन ग्रामीण और अर्ध-शहरी क्षेत्रों में सभी के लिए प्राथमिक स्वास्थ्य सेवा मार्गदर्शन तक पहुंच में सुधार करना है।",
    },
    as: {
        appTitle: "হেল্থকেয়াৰ এআই", appSubtitle: "আপোনাৰ বিশ্বাসী সহায়ক",
        homeTitle: "আপোনাৰ স্বাস্থ্য সঙ্গী", homeSubtitle: "বিনামূলীয়া স্বাস্থ্য নিৰ্দেশনা, প্ৰমাণিত প্ৰাথমিক চিকিৎসা, আৰু ওচৰৰ চিকিৎসালয়ৰ সৈতে সংযোগ কৰক",
        emergencyText: "জৰুৰীকালীন?", callNowText: "এতিয়া 108 নম্বৰত ফোন কৰক",
        navChatTitle: "এআই চেট", navChatSubtitle: "স্বাস্থ্যৰ প্ৰশ্ন সোধক",
        navFirstAidTitle: "প্ৰাথমিক চিকিৎসা", navFirstAidSubtitle: "জৰুৰীকালীন নিৰ্দেশনা",
        navConsultationTitle: "পৰামৰ্শ বুক কৰক", navConsultationSubtitle: "বিনামূলীয়া টেলি-পৰামৰ্শ",
        navHospitalTitle: " চিকিৎসালয় বিচাৰক", navHospitalSubtitle: "ওচৰৰ সুবিধাসমূহ",
        welcomeMessage: "নমস্কাৰ! মই আপোনাৰ এআই স্বাস্থ্য সহায়ক। মই আপোনাক সাধাৰণ স্বাস্থ্যৰ প্ৰশ্ন, প্ৰাথমিক চিকিৎসাৰ নিৰ্দেশনা, আৰু স্বাস্থ্য সেৱাৰ সৈতে সংযোগ কৰাত সহায় কৰিব পাৰোঁ। মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?",
        aiChatWelcome: "আপুনি মোক 'জ্বৰ', 'মূৰৰ বিষ' আদি লক্ষণৰ বিষয়ে সুধিব পাৰে, বা 'যোৰহাটৰ ওচৰত চিকিৎসালয় বিচাৰক' বুলি সুধিব পাৰে।",
        unknownQuery: "ক্ষমা কৰিব, মোক এতিয়াও তাৰ উত্তৰ দিবলৈ প্ৰশিক্ষণ দিয়া হোৱা নাই। আপুনি মোক সাধাৰণ লক্ষণ বা চিকিৎসালয় কেনেকৈ বিচাৰিব লাগে সেই বিষয়ে সুধিব পাৰে।",
        firstAidSubtitle: "দ্ৰুত নিৰ্দেশনাৰ বাবে এটা লক্ষণ বাছনি কৰক",
        backBtn: "লক্ষণলৈ ঘূৰি যাওক",
        consultationSubtitle: "ফোন কলৰ জৰিয়তে যোগ্য চিকিৎসকৰ সৈতে সংযোগ কৰক।",
        patientNameLabel: "সম্পূৰ্ণ নাম *", phoneLabel: "ফোন নম্বৰ *", symptomsLabel: "ৰোগৰ লক্ষণৰ সংক্ষিপ্ত বিৱৰণ",
        submitBtn: "অনুরোধ দাখিল কৰক",
        whatToExpectTitle: "কি আশা কৰিব:",
        expectStep1: "২ ঘণ্টাৰ ভিতৰত নিশ্চিতকৰণ কল",
        expectStep2: "যোগ্য এমবিবিএছ চিকিৎসক",
        expectStep3: "১৫-২০ মিনিটৰ পৰামৰ্শ",
        hospitalSubtitle: "ওচৰৰ সুবিধাসমূহ বিচাৰিবলৈ আপোনাৰ জিলাৰ নাম দিয়ক",
        searchBtn: "অনুসন্ধান কৰক",
        consultationSuccess: "ধন্যবাদ! আপোনাৰ অনুৰোধ পঞ্জীয়ন কৰা হৈছে। এজন স্বাস্থ্য স্বেচ্ছাসেৱকে আপোনাক ২৪ ঘণ্টাৰ ভিতৰত ফোন কৰিব। হোমলৈ ঘূৰি যোৱা হৈছে...",
        fever: "জ্বৰ", coughCold: "কাহ আৰু চৰ্দি", stomachPain: "পেটৰ বিষ", injury: "সৰু আঘাত", headache: "মূৰৰ বিষ", diarrhea: "ডায়েৰিয়া / বমি",
        feverAdvice: "<strong>জ্বৰৰ বাবে প্ৰাথমিক চিকিৎসা:</strong><br>১. শীতল ঠাইত জিৰণি লওক।<br>২. পানী আৰু অ’আৰএছৰ দৰে যথেষ্ট তৰল পদাৰ্থ খাওক।<br>৩. কপালত এটুকুৰা শীতল, তিতা কাপোৰ ৰাখক। যদি ৩ দিনৰ পিছতো জ্বৰ থাকে, চিকিৎসকৰ পৰামৰ্শ লওক।",
        coughAdvice: "<strong>কাহ আৰু চৰ্দিৰ বাবে প্ৰাথমিক চিকিৎসা:</strong><br>১. গৰম নিমখীয়া পানীৰে গাৰ্গল কৰক।<br>২. চুপ বা চাহৰ দৰে গৰম তৰল পদাৰ্থ খাওক।<br>৩. গৰম পানীৰ বাটিৰ পৰা ভাপ লওক। যদি ৫ দিনৰ ভিতৰত ভাল নহয়, চিকিৎসকৰ পৰামৰ্শ লওক।",
        stomachPainAdvice: "<strong>পেটৰ বিষৰ বাবে প্ৰাথমিক চিকিৎসা:</strong><br>১. যথেষ্ট পানী খাওক, কিন্তু সৰু সৰু চুমুকত।<br>২. কেইঘণ্টামানৰ বাবে গোটা খাদ্য পৰিহাৰ কৰক।<br><strong>সাৱধান:</strong> যদি বিষ তীব্ৰ হয়, তেন্তে লগে লগে চিকিৎসকৰ সহায় লওক।",
        injuryAdvice: "<strong>সৰু কটাৰ বাবে প্ৰাথমিক চিকিৎসা:</strong><br>১. পৰিষ্কাৰ কাপোৰেৰে লাহেকৈ হেঁচা দিয়ক।<br>২. এন্টিচেপ্টিক তৰলৰে ঘাঁ চাফা কৰক।<br>৩. বেণ্ডেজ লগাওক।",
        headacheAdvice: "<strong>সৰু মূৰৰ বিষৰ বাবে প্ৰাথমিক চিকিৎসা:</strong><br>১. শান্ত, আন্ধাৰ কোঠাত জিৰণি লওক।<br>২. কপালত ঠাণ্ডা পেক লগাওক।<br>৩. হাইড্ৰেটেড হৈ থাকিবলৈ পানী খাওক।",
        diarrheaAdvice: "<strong>ডায়েৰিয়াৰ বাবে প্ৰাথমিক চিকিৎসা:</strong><br>১. ডিহাইড্ৰেচন ৰোধ কৰিবলৈ যথেষ্ট ORS খাওক।<br>২. কল, ভাত আদিৰ দৰে পাতল খাদ্য খাওক।<br>৩. গাখীৰ আৰু মচলাযুক্ত খাদ্য পৰিহাৰ কৰক।",
        faqTitle: "সঘনাই সোধা প্ৰশ্ন",
        contactUs: "আমাৰ লগত যোগাযোগ কৰক",
        faq1Q: "মোৰ কথোপকথনৰ ইতিহাস ৱেবছাইটত সংৰক্ষণ কৰা হয় নেকি?", faq1A: "এই প্ৰ’ট’টাইপৰ বাবে, আপোনাৰ গোপনীয়তা নিশ্চিত কৰিবলৈ কোনো তথ্য সংৰক্ষণ কৰা নহয়। আমাৰ চূড়ান্ত MERN стек এপ্লিকেচনত, চেট ইতিহাস আপোনাৰ ডিভাইচত বা এটা এনক্ৰিপ্ট কৰা ডাটাবেচত, আপোনাৰ স্পষ্ট সন্মতিৰে সুৰক্ষিতভাৱে সংৰক্ষণ কৰা হ'ব।",
        faq2Q: "এই প্লেটফৰ্মত কোনবোৰ LLM মডেল উপলব্ধ?", faq2A: "এই প্ৰ’ট’টাইপে সাধাৰণ প্ৰশ্নৰ তৎকালীন, নিৰ্ভৰযোগ্য উত্তৰৰ বাবে এটা নিয়ম-ভিত্তিক প্ৰণালী ব্যৱহাৰ কৰে। আমাৰ চূড়ান্ত পৰিকল্পনা হৈছে বিশেষকৈ চিকিৎসাৰ প্ৰশ্ন-উত্তৰৰ বাবে প্ৰশিক্ষণ দিয়া উন্নত, সুৰক্ষিত LLM মডেল একত্ৰিত কৰা।",
        faq3Q: "চিকিৎসাৰ উত্তৰ বা নিদান প্ৰমাণৰ ওপৰত ভিত্তি কৰি দিয়া হয়নে?", faq3A: "ইয়াত দিয়া সকলো তথ্য কেৱল প্ৰাথমিক চিকিৎসা আৰু নিৰ্দেশনাৰ বাবেহে; ই কোনো নিদান নহয়। আমাৰ পৰামৰ্শ WHO আৰু ভাৰতৰ স্বাস্থ্য মন্ত্ৰালয়ৰ দৰে বিশ্বাসযোগ্য উৎসৰ ৰাজহুৱাভাৱে উপলব্ধ নিৰ্দেশনাৰ ওপৰত ভিত্তি কৰি দিয়া হৈছে।",
        faq4Q: "এই সেৱাই iOS বা Androidত এপ আগবঢ়ায় নেকি?", faq4A: "বৰ্তমান, আমি এটা ৱেব-ভিত্তিক এপ্লিকেচন যাতে সকলোৰে বাবে, বিশেষকৈ কম-বেণ্ডউইথ থকা অঞ্চলত, কোনো ডাউনলোডৰ প্ৰয়োজন নোহোৱাকৈ সৰ্বাধিক সুবিধা উপলব্ধ হয়। এটা নেটিভ এপ আমাৰ ভৱিষ্যতৰ ৰোডমেপৰ অংশ।",
        faq5Q: "ইয়াত কোনো বিনামূলীয়া আঁচনি আছে নেকি?", faq5A: "হয়, আমাৰ সম্পূৰ্ণ সেৱা সকলো ব্যৱহাৰকাৰীৰ বাবে বিনামূলীয়া আৰু সদায় বিনামূলীয়া থাকিব। আমাৰ লক্ষ্য হৈছে গ্ৰাম্য আৰু অৰ্ধ-চহৰীয়া অঞ্চলত সকলোৰে বাবে প্ৰাথমিক স্বাস্থ্য সেৱাৰ নিৰ্দেশনাৰ সুবিধা উন্নত কৰা।",
    }
};

const hospitalData = {
    "Kamrup Metropolitan": [
        { name: "Gauhati Medical College and Hospital (GMCH)", address: "Bhargalupar, Narakasur Hilltop, Guwahati", phone: "0361-2450569" },
        { name: "Mahendra Mohan Choudhury Hospital (MMCH)", address: "Pan Bazaar, Guwahati", phone: "0361-2540294" },
    ],
    "Jorhat": [
        { name: "Jorhat Medical College and Hospital (JMCH)", address: "Kushal Konwar Path, Jorhat", phone: "0376-2370107" },
    ],
    "Dibrugarh": [
        { name: "Assam Medical College and Hospital (AMCH)", address: "Barbari, Dibrugarh", phone: "0373-2300080" },
    ],
     "Sonitpur": [
        { name: "Tezpur Medical College & Hospital", address: "Bihaguri, Tezpur, Sonitpur", phone: "03712-255502" },
    ]
};

// --- UI TEXT UPDATE FUNCTION ---
function updateUIText() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage][key]) {
            element.innerHTML = translations[currentLanguage][key];
        }
    });
}

// --- CHAT FUNCTIONS ---
function addMessage(text, sender, targetWindow) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', sender);
    messageDiv.innerHTML = text;
    targetWindow.appendChild(messageDiv);
    targetWindow.scrollTop = targetWindow.scrollHeight;
}

// --- AI CHAT PAGE LOGIC ---
function addMessageToAIWindow(text, sender) {
    addMessage(text, sender, aiChatWindow);
}

function getBotResponse(query) {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('fever') || lowerQuery.includes('बुखार') || lowerQuery.includes('জ্বৰ')) {
        return translations[currentLanguage].feverAdvice;
    }
    if (lowerQuery.includes('headache') || lowerQuery.includes('सिरदर्द') || lowerQuery.includes('মূৰৰ বিষ')) {
        return translations[currentLanguage].headacheAdvice;
    }
    if (lowerQuery.includes('cough') || lowerQuery.includes('खांसी') || lowerQuery.includes('কাহ')) {
        return translations[currentLanguage].coughAdvice;
    }
     if (lowerQuery.includes('hospital') || lowerQuery.includes('अस्पताल')) {
        showPage('findHospitalPage');
        return "You can find hospitals on this page. Please enter your district.";
    }
    
    return translations[currentLanguage].unknownQuery;
}

function handleUserQuery() {
    const query = aiChatInput.value.trim();
    if (!query) return;

    addMessageToAIWindow(query, 'user');
    aiChatInput.value = '';

    setTimeout(() => {
        const botResponse = getBotResponse(query);
        addMessageToAIWindow(botResponse, 'bot');
    }, 500);
}

aiChatSendBtn.addEventListener('click', handleUserQuery);
aiChatInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        handleUserQuery();
    }
});


// --- FIRST AID PAGE LOGIC ---
const firstAidGrid = document.getElementById('firstAidGrid');
const firstAidResult = document.getElementById('firstAidResult');
const firstAidContent = document.getElementById('firstAidContent');
const firstAidSymptoms = ['fever', 'coughCold', 'stomachPain', 'injury', 'headache', 'diarrhea'];

function showFirstAidSymptoms() {
    firstAidGrid.innerHTML = '';
    firstAidSymptoms.forEach(symptom => {
        const card = document.createElement('div');
        card.className = 'nav-card'; // Re-use nav-card style for consistency
        card.innerHTML = `<h3 data-key="${symptom}">${translations[currentLanguage][symptom]}</h3>`;
        card.onclick = () => showFirstAidAdvice(symptom);
        firstAidGrid.appendChild(card);
    });
    firstAidGrid.style.display = 'grid';
    firstAidResult.style.display = 'none';
}

function showFirstAidAdvice(symptom) {
     const adviceKey = {
        fever: 'feverAdvice',
        coughCold: 'coughAdvice',
        stomachPain: 'stomachPainAdvice',
        injury: 'injuryAdvice',
        headache: 'headacheAdvice',
        diarrhea: 'diarrheaAdvice'
    }[symptom];

    if (adviceKey) {
        firstAidContent.innerHTML = translations[currentLanguage][adviceKey];
        firstAidGrid.style.display = 'none';
        firstAidResult.style.display = 'block';
    } else {
        showPage('aiChatPage');
        addMessageToAIWindow(`I need first aid help for ${symptom}.`, 'user');
        addMessageToAIWindow("Okay, let's talk about that. Please describe the issue in more detail.", 'bot');
    }
}
document.querySelector('#firstAidResult .back-btn').addEventListener('click', showFirstAidSymptoms);

// --- HOSPITAL PAGE LOGIC ---
const districtSearch = document.getElementById('districtSearch');
const searchBtn = document.getElementById('searchBtn');
const hospitalResults = document.getElementById('hospitalResults');

function displayHospitalResults() {
    const query = districtSearch.value.trim().toLowerCase();
    hospitalResults.innerHTML = '';
    let found = false;

    if (!query) return;

    for (const district in hospitalData) {
        if (district.toLowerCase().includes(query)) {
            found = true;
            hospitalData[district].forEach(hospital => {
                const card = document.createElement('div');
                card.className = 'hospital-card';
                card.innerHTML = `
                    <h3>${hospital.name}</h3>
                    <p>${hospital.address}</p>
                    <p>Phone: ${hospital.phone || 'N/A'}</p>
                    <div class="hospital-actions">
                        <button class="directions-btn">Directions</button>
                        <button class="call-btn" onclick="window.location.href='tel:${hospital.phone}'">Call</button>
                    </div>
                `;
                hospitalResults.appendChild(card);
            });
        }
    }
    if (!found) {
        hospitalResults.innerHTML = `<p>No hospitals found for "${districtSearch.value}"</p>`;
    }
}
searchBtn.addEventListener('click', displayHospitalResults);
districtSearch.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        displayHospitalResults();
    }
});

// --- CONSULTATION PAGE LOGIC ---
const consultationForm = document.querySelector('#bookConsultationPage form');
consultationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert(translations[currentLanguage].consultationSuccess);
    consultationForm.reset();
    setTimeout(() => showPage('homePage'), 1000);
});

// --- FAQ LOGIC ---
function populateFAQs() {
    faqContainer.innerHTML = '';
    for (let i = 1; i <= 5; i++) {
        const qKey = `faq${i}Q`;
        const aKey = `faq${i}A`;
        if (translations[currentLanguage][qKey]) {
            const details = document.createElement('details');
            details.className = 'faq-item';
            details.innerHTML = `
                <summary data-key="${qKey}">${translations[currentLanguage][qKey]}</summary>
                <p data-key="${aKey}">${translations[currentLanguage][aKey]}</p>
            `;
            faqContainer.appendChild(details);
        }
    }
}


// --- INITIALIZATION ---
function init() {
    loadIcons();
    updateUIText();
    addMessage(translations[currentLanguage].welcomeMessage, 'bot', chatWindow);
    showFirstAidSymptoms(); 
    populateFAQs();
    
    languageSelector.addEventListener('change', (e) => {
        currentLanguage = e.target.value;
        updateUIText();
        chatWindow.innerHTML = '';
        aiChatWindow.innerHTML = '';
        addMessage(translations[currentLanguage].welcomeMessage, 'bot', chatWindow);
        addMessageToAIWindow(translations[currentLanguage].welcomeMessage, 'bot');
        showFirstAidSymptoms();
        populateFAQs();
    });
}

init();