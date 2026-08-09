import { NewsPost } from '../types/news';

export const SEED_POSTS: NewsPost[] = [
  {
    id: 'post-101',
    category: 'Technology',
    coverImageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
    author: 'Aarav Sharma',
    source: 'Tech Horizon',
    translations: {
      en: {
        title: 'Breakthrough Quantum Computer Achieves Room Temperature Stability in New Lab Trial',
        summary: 'Researchers at the premier institute have unveiled a room-temperature quantum processor capable of executing complex cryptography and drug discovery algorithms in seconds.',
        body: 'In what scientists are describing as a landmark moment for computer science, a team of international physicists and computer engineers has successfully demonstrated a room-temperature quantum computing chip. Unlike traditional quantum systems requiring near absolute-zero cryogenics, this design uses synthetic diamond micro-lattices to isolate qubits.\n\nThe implications for logistics, molecular simulation, encryption, and artificial intelligence are massive. Field trials are expected to begin with major research institutes next year.',
        readTime: '2 min read'
      },
      hi: {
        title: 'नए लैब परीक्षण में क्वांटम कंप्यूटर ने कमरे के तापमान पर हासिल की स्थिरता',
        summary: 'प्रमुख संस्थान के शोधकर्ताओं ने एक कमरे के तापमान पर काम करने वाले क्वांटम प्रोसेसर का अनावरण किया है जो सेकंड में जटिल एल्गोरिदम निष्पादित कर सकता है।',
        body: 'कंप्यूटर विज्ञान के क्षेत्र में एक ऐतिहासिक उपलब्धि हासिल करते हुए वैज्ञानिकों की टीम ने सामान्य कमरे के तापमान पर चलने वाली क्वांटम चिप का सफल प्रदर्शन किया है।\n\nपारंपरिक प्रणालियों के विपरीत जिन्हें शून्य तापमान की आवश्यकता होती है, यह डिजाइन सिंथेटिक डायमंड माइक्रो-लैटिस का उपयोग करता है। लॉजिस्टिक्स, आणविक सिमुलेशन और एआई के लिए इसके दूरगामी परिणाम होंगे।',
        readTime: '2 मिनट'
      },
      te: {
        title: 'నూతన ప్రయోగశాలలో గది ఉష్ణోగ్రత వద్ద స్థిరత్వాన్ని సాధించిన క్వాంటమ్ కంప్యూటర్',
        summary: 'సాధారణ గది ఉష్ణోగ్రత వద్ద సెకన్లలో సంక్లిష్ట ఆల్గారిథమ్‌లను అమలు చేయగల క్వాంటమ్ ప్రాసెసర్‌ను శాస్త్రవేత్తలు ఆవిష్కరించారు.',
        body: 'కంప్యూటర్ సైన్స్ రంగానికి ఇది ఒక మైలురాయి సమయం అని శాస్త్రవేత్తలు అభివర్ణిస్తున్నారు. అత్యంత తక్కువ ఉష్ణోగ్రతల అవసరం లేకుండా సింథటిక్ డైమండ్ మైక్రో ల్యాటిస్ సాంకేతికత ద్వారా ఈ చిప్ రూపుదిద్దుకుంది.\n\nక్రిప్టోగ్రఫీ, ఔషధ పరిశోధన మరియు కృత్రిమ మేధస్సు రంగాలలో ఈ ఆవిష్కరణ విప్లవాత్మక మార్పులు తేనుంది.',
        readTime: '2 నిమిషాల పఠనం'
      }
    }
  },
  {
    id: 'post-102',
    category: 'National',
    coverImageUrl: 'https://images.unsplash.com/photo-1597042675074-b52b217ec37c?q=80&w=1200&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
    author: 'Priya Mukherjee',
    source: 'National Chronicle',
    translations: {
      en: {
        title: 'High-Speed Bullet Train Corridor Expands: First Phase Tunneling Completed Ahead of Schedule',
        summary: 'Engineers celebrate the successful breakthrough of the undersea tunnel segment, marking a pivotal milestone in modernising the nation’s railway network.',
        body: 'The nationwide high-speed rail initiative reached a monumental high today as tunnel boring machines breached the final rock wall under the coastal bay segment.\n\nEquipped with magnetic levitation hybrid braking systems, the corridor promises to slash urban transit times between economic hubs by over 75 percent. Passenger trial runs are slated to start by late autumn.',
        readTime: '3 min read'
      },
      hi: {
        title: 'हाई-स्पीड बुलेट ट्रेन कॉरिडोर का विस्तार: समय से पहले पूरा हुआ पहला सुरंग चरण',
        summary: 'इंजीनियरों ने समुद्र के नीचे सुरंग खंड की सफलता का जश्न मनाया, जो देश के रेलवे नेटवर्क के आधुनिकीकरण में एक महत्वपूर्ण मील का पत्थर है।',
        body: 'देशव्यापी हाई-स्पीड रेल पहल आज एक महत्वपूर्ण बिंदु पर पहुंच गई क्योंकि टनल बोरिंग मशीनों ने तटीय खाड़ी खंड के तहत अंतिम चट्टान की दीवार को तोड़ दिया।\n\nआर्थिक केंद्रों के बीच यात्रा के समय को 75 प्रतिशत से अधिक कम करने का वादा करने वाली इस परियोजना के यात्री परीक्षण शरद ऋतु के अंत तक शुरू होंगे।',
        readTime: '3 मिनट'
      },
      te: {
        title: 'హై-స్పీడ్ బులెట్ రైలు కారిడార్ విస్తరణ: షెడ్యూల్ కంటే ముందే పూర్తయిన మొదటి దశ టన్నెల్',
        summary: 'సముద్ర అంతర్భాగంలో ప్రతిష్టాత్మకంగా నిర్మించిన రైల్వే టన్నెల్ నిర్మాణం విజయవంతంగా పూర్తయినట్లు ఇంజనీర్లు ప్రకటించారు.',
        body: 'దేశీయ రవాణా వ్యవస్థలో నూతన అధ్యాయం ప్రారంభమైంది. తీర ప్రాంత ఖండంలో సముద్ర గర్భం గుండా సాగే అత్యంత క్లిష్టమైన టన్నెల్ బోర్ వర్క్ విజయవంతమైంది.\n\nఈ కారిడార్ అందుబాటులోకి వస్తే రెండు ప్రధాన ఆర్థిక నగరాల మధ్య ప్రయాణ సమయం 75 శాతం తగ్గనుంది.',
        readTime: '3 నిమిషాల పఠనం'
      }
    }
  },
  {
    id: 'post-103',
    category: 'Business',
    coverImageUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=1200&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
    author: 'Vikram Mehta',
    source: 'Financial Express',
    translations: {
      en: {
        title: 'Global Renewable Energy Investments Surge 40% as Clean Grid Transition Accelerates',
        summary: 'Solar and wind infrastructure funding hits record highs across emerging markets, outpacing traditional fossil fuel capital allocation for the third straight quarter.',
        body: 'International capital markets are realigning around green power at an unprecedented pace. The latest quarterly capital allocation report confirms over $420 billion injected into renewable grid storage and offshore wind installations worldwide.\n\nAnalysts point to falling battery manufacturing costs and favorable sovereign incentives as key drivers boosting investor confidence.',
        readTime: '2 min read'
      },
      hi: {
        title: 'स्वच्छ ग्रिड परिवर्तन के गति पकड़ने से वैश्विक नवीकरणीय ऊर्जा निवेश में 40% की बढ़ोतरी',
        summary: 'उभरते बाजारों में सौर और पवन बुनियादी ढांचा वित्तपोषण रिकॉर्ड स्तर पर पहुंचा, लगातार तीसरी तिमाही में जीवाश्म ईंधन पूंजी आवंटन को पीछे छोड़ दिया।',
        body: 'अंतर्राष्ट्रीय पूंजी बाजार अभूतपूर्व गति से हरित ऊर्जा के इर्द-गिर्द पुनर्गठित हो रहे हैं। नवीनतम रिपोर्ट दुनिया भर में ग्रिड भंडारण और अपतटीय पवन प्रतिष्ठानों में $420 बिलियन से अधिक के निवेश की पुष्टि करती है।\n\nविश्लेषकों का कहना है कि घटती बैटरी निर्माण लागत और सरकारी प्रोत्साहन निवेशकों के विश्वास को बढ़ा रहे हैं।',
        readTime: '2 मिनट'
      },
      te: {
        title: 'హరిత ఇంధన దిశగా అడుగులు: పునరుత్పాదక శక్తి రంగంలో పెట్టుబడులు 40% వృద్ధి',
        summary: 'సౌర మరియు పవన విద్యుత్ రంగానికి నిధుల ప్రవాహం సరికొత్త రికార్డులను తాకింది. వరుసగా మూడవ త్రైమాసికంలోనూ బొగ్గు/చమురు పెట్టుబడులను అధిగమించింది.',
        body: 'ప్రపంచ ఇంధన రంగం పర్యావరణ అనుకూల ఇంధన దిశగా వేగంగా మళ్లుతోంది. తాజాగా విడుదలైన ఆర్థిక నివేదిక ప్రకారం వివిధ దేశాలలో ఇంధన నిల్వ సాంకేతికతకు 420 బిలియన్ డాలర్లకు పైగా పెట్టుబడులు వచ్చాయి.\n\nబ్యాటరీల తయారీ వ్యయం తగ్గడమే ఇందుకు ప్రధాన కారణమని విశ్లేషకులు భావిస్తున్నారు.',
        readTime: '2 నిమిషాల పఠనం'
      }
    }
  },
  {
    id: 'post-104',
    category: 'Science',
    coverImageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1000 * 60 * 720).toISOString(), // 12 hours ago
    author: 'Dr. Sunita Rao',
    source: 'Cosmos Journal',
    translations: {
      en: {
        title: 'Deep Space Observatory Captures Chemical Signatures of Water Vapor on Exoplanet Candidate',
        summary: 'Spectroscopic observations from the next-gen orbital telescope reveal atmospheric methane and water molecules orbiting an Earth-like star 120 light-years away.',
        body: 'Astronomers analyzing high-resolution data transmitted from deep space orbital sensors have discovered atmosphere composition rich in water vapor and organic carbon building blocks on exoplanet K2-78b.\n\nSituated well within its parent star’s habitable zone, the planet is becoming the primary candidate for detailed transit spectroscopy to detect atmospheric biomarkers.',
        readTime: '4 min read'
      },
      hi: {
        title: 'डीप स्पेस वेधशाला ने एक्सोप्लैनेट पर जल वाष्प के रासायनिक संकेतों को रिकॉर्ड किया',
        summary: 'अगली पीढ़ी के कक्षीय टेलीस्कोप के अवलोकनों से 120 प्रकाश वर्ष दूर पृथ्वी जैसे तारे की परिक्रमा कर रहे ग्रह पर जल अणुओं का पता चला है।',
        body: 'गहरे अंतरिक्ष कक्षीय सेंसरों से प्राप्त उच्च-रिज़ॉल्यूशन डेटा का विश्लेषण करने वाले खगोलविदों ने ग्रह K2-78b पर जल वाष्प और कार्बनिक कार्बन से समृद्ध वायुमंडल की खोज की है।\n\nअपने मूल तारे के रहने योग्य क्षेत्र में स्थित, यह ग्रह वायुमंडलीय बायोमार्कर का पता लगाने के लिए एक प्राथमिक उम्मीदवार बन रहा है।',
        readTime: '4 मिनट'
      },
      te: {
        title: 'మరో నివాసయోగ్య గ్రహంపై నీటి ఆవిరి జాడలను గుర్తించిన అంతరిక్ష టెలిస్కోప్',
        summary: 'భూమికి 120 కాంతి సంవత్సరాల దూరంలో ఉన్న నక్షత్రం చుట్టూ తిరుగుతున్న గ్రహంపై నీటి ఆవిరి సంకేతాలను సైంటిస్టులు గుర్తించారు.',
        body: 'ఖగోళ పరిశోధనలలో మరో గొప్ప ముందడుగు పడింది. K2-78b అనే గ్రహంపై నీటి ఆవిరి మరియు ఆర్గానిక్ కార్బన్ ఉన్నట్లు అంతరిక్ష స్పెక్ట్రోస్కోపిక్ డేటా స్పష్టం చేసింది.\n\nజీవ అనుకూల వాతావరణం ఉన్న ఈ గ్రహంపై మరిన్ని పరిశోధనలు నిర్వహించేందుకు శాస్త్రవేత్తలు సిద్ధమవుతున్నారు.',
        readTime: '4 నిమిషాల పఠనం'
      }
    }
  },
  {
    id: 'post-105',
    category: 'Sports',
    coverImageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1200&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1000 * 60 * 1200).toISOString(), // 20 hours ago
    author: 'Kabir Verma',
    source: 'Arena Sports',
    translations: {
      en: {
        title: 'Unseeded Prodigy Clinches Championship Title in Thrilling 5-Set Final Duel',
        summary: 'In an extraordinary demonstration of resilience and tactical mastery, 19-year-old underdog overcomes world number one under the stadium floodlights.',
        body: 'The packed stadium erupted into thunderous applause as the final match point sealed an unbelievable victory. Facing two match points against the reigning champion in the third set, the teenage prodigy executed a heroic comeback.\n\nWith blistering forehand winners and nerve of steel, this victory marks the youngest tournament winner in over three decades.',
        readTime: '3 min read'
      },
      hi: {
        title: 'रोमांचक 5-सेट के फाइनल मुकाबले में गैर-वरीयता प्राप्त युवा खिलाड़ी ने जीता खिताब',
        summary: 'लचीलेपन और सामरिक महारत के असाधारण प्रदर्शन में 19 वर्षीय खिलाड़ी ने स्टेडियम की दूधिया रोशनी में दुनिया के नंबर एक खिलाड़ी को हराया।',
        body: 'जैसे ही अंतिम मैच पॉइंट ने एक अविश्वसनीय जीत पर मुहर लगाई, खचाखच भरा स्टेडियम तालियों की गड़गड़ाहट से गूंज उठा। तीसरे सेट में मौजूदा चैंपियन के खिलाफ दो मैच प्वाइंट का सामना करते हुए, युवा खिलाड़ी ने शानदार वापसी की।\n\nयह जीत तीन दशकों से अधिक समय में सबसे कम उम्र के टूर्नामेंट विजेता को चिह्नित करती है।',
        readTime: '3 मिनट'
      },
      te: {
        title: 'సంచలనం రేపిన 19 ఏళ్ల యంగ్ స్టార్: సన్సేషనల్ ఫైనల్లో వరల్డ్ నంబర్ 1పై విజయం',
        summary: 'స్టేడియం సదుపాయాల నడుమ జరిగిన ఉత్కంఠభరిత 5-సెట్ల పోరులో అద్భుత ప్రదర్శనతో ఛాంపియన్‌షిప్ ట్రోఫీని కైవసం చేసుకుంది.',
        body: 'చివరి మ్యాచ్ పాయింట్ సాధించగానే స్టేడియం ఈలలు, చప్పట్లతో హోరెత్తింది. డిఫెండింగ్ ఛాంపియన్ నుండి తీవ్ర పోటీ ఎదురైనప్పటికీ, అద్భుతమైన షాట్లతో యంగ్ ప్లేయర్ విజయాన్ని అందుకుంది.\n\nగత ముప్పై ఏళ్ల టెన్నిస్ చరిత్రలో అత్యంత పిన్న వయస్కురాలైన ఛాంపియన్‌గా ఈ విజయం నిలిచింది.',
        readTime: '3 నిమిషాల పఠనం'
      }
    }
  },
  {
    id: 'post-106',
    category: 'World',
    coverImageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1000 * 60 * 1600).toISOString(),
    author: 'Elena Rostova',
    source: 'Global Affairs',
    translations: {
      en: {
        title: 'Historic Sustainable Urban Architecture Accord Signed by 40 Global Megacities',
        summary: 'Civic leaders assemble at the summit to ratify mandatory green rooftop and zero-carbon building standards effective across major capitals by 2030.',
        body: 'Mayors and urban planning directors representing 40 metropolitan regions signed a binding treaty committing to net-zero concrete substitutes and integrated micro-forest parks.\n\nThe initiative mandates that all major commercial real estate projects submitted after 2026 incorporate solar kinetic facades and rainwater recycling infrastructure.',
        readTime: '3 min read'
      },
      hi: {
        title: '40 वैश्विक मेगासिटी द्वारा ऐतिहासिक टिकाऊ शहरी वास्तुकला समझौते पर हस्ताक्षर',
        summary: 'नागरिक नेता 2030 तक प्रमुख राजधानियों में अनिवार्य ग्रीन रूफटॉप और शून्य-कार्बन भवन मानकों की पुष्टि करने के लिए शिखर सम्मेलन में एकत्र हुए।',
        body: '40 महानगरीय क्षेत्रों का प्रतिनिधित्व करने वाले महापौरों और शहरी नियोजन निदेशकों ने नेट-शून्य कंक्रीट विकल्पों और एकीकृत सूक्ष्म-वन पार्कों के लिए एक बाध्यकारी संधि पर हस्ताक्षर किए।\n\nयह पहल अनिवार्य करती है कि 2026 के बाद प्रस्तुत सभी प्रमुख वाणिज्यिक रियल एस्टेट प्रोजेक्ट सौर गतिज अग्रभाग और वर्षा जल रीसाइक्लिंग बुनियादी ढांचे को शामिल करें।',
        readTime: '3 मिनट'
      },
      te: {
        title: 'పర్యావరణ అనుకూల నగరాల నిర్మాణంపై 40 ప్రపంచ దిగ్గజ నగరాలు చారిత్రాత్మక ఒప్పందం',
        summary: '2030 నాటికి నగరాలలో సున్నా-కార్బన్ భవనాలు మరియు పచ్చదనం పెంపొందించడానికి ప్రపంచ మేయర్లు శీతాకాల సదస్సులో సంతకాలు చేశారు.',
        body: 'ప్రపంచంలోని 40 ప్రధాన నగరాల ప్రజాప్రతినిధులు పర్యావరణ పరిరక్షణ కోసం ఒకే వేదికపైకి వచ్చారు. కాంక్రీట్ భవనాలకు బదులుగా పర్యావరణ అనుకూల పదార్థాల వినియోగం మరియు సోలార్ ఎనర్జీ వ్యవస్థలను తప్పనిసరి చేశారు.\n\n2026 నుండి నిర్మించే అన్ని కమర్షియల్ ప్రాజెక్టులలో వర్షపు నీటి పునర్వినియోగం మరియు సోలార్ రూఫ్‌టాప్స్ తప్పనిసరి కానున్నాయి.',
        readTime: '3 నిమిషాల పఠనం'
      }
    }
  },
  {
    id: 'post-107',
    category: 'Entertainment',
    coverImageUrl: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1000 * 60 * 2400).toISOString(),
    author: 'Neha Kapoor',
    source: 'Cinephile Daily',
    translations: {
      en: {
        title: 'Indie Micro-Budget Feature Wins Grand Jury Award at International Film Festival',
        summary: 'Shot on vintage 16mm film in a secluded mountain village, the moving drama won universal praise for its poetic storytelling and haunting original score.',
        body: 'In an emotional ceremony, the jury unanimously awarded the top prize to director Maya Lin’s debut feature. Created with a modest crew of six people, the movie explores intergenerational memory and folklore.\n\nMajor distributors are engaged in a competitive bidding war for international streaming and theatrical rights.',
        readTime: '2 min read'
      },
      hi: {
        title: 'इंडिपेंडेंट माइक्रो-बजट फिल्म ने अंतर्राष्ट्रीय फिल्म महोत्सव में जीता ग्रैंड जूरी पुरस्कार',
        summary: 'एक अलग-थलग पहाड़ी गांव में विंटेज 16 मिमी फिल्म पर शूट की गई, इस मार्मिक ड्रामा ने अपनी काव्यात्मक कहानी की वजह से सराहना हासिल की।',
        body: 'एक भावनात्मक समारोह में, जूरी ने सर्वसम्मति से निर्देशक माया लिन की पहली फिल्म को शीर्ष पुरस्कार दिया। केवल छह लोगों की एक मामूली टीम के साथ बनाई गई यह फिल्म लोककथाओं की खोज करती है।\n\nप्रमुख वितरक अंतर्राष्ट्रीय स्ट्रीमिंग और नाटकीय अधिकारों के लिए बोली लगा रहे हैं।',
        readTime: '2 मिनट'
      },
      te: {
        title: 'అంతర్జాతీయ చలనచిత్రోత్సవంలో ప్రతిష్టాత్మక గ్రాండ్ జ్యూరీ అవార్డు గెలుచుకున్న స్వతంత్ర చిత్రం',
        summary: 'తక్కువ బడ్జెట్‌తో నిర్మించిన ఈ భావోద్వేగపూరిత డ్రామా చిత్రం ఇంటర్నేషనల్ ఫిల్మ్ ఫెస్టివల్‌లో ప్రశంసల వర్షం కురిపించింది.',
        body: 'కేవలం ఆరుగురు సభ్యుల బృందంతో మంచు కొండల నడుమ నిర్మించిన ఈ చిత్రం జ్యూరీ సభ్యుల మనసులను గెలుచుకుంది. గ్రామీణ వాతావరణం, మంత్రముగ్ధులను చేసే సంగీతం దీనికి ప్రధాన బలంగా నిలిచాయి.\n\nప్రస్తుతం ప్రముఖ ఓటీటీ మరియు థియేట్రికల్ డిస్ట్రిబ్యూటర్లు ఈ చిత్రం హక్కుల కోసం పోటీపడుతున్నారు.',
        readTime: '2 నిమిషాల పఠనం'
      }
    }
  },
  {
    id: 'post-108',
    category: 'Technology',
    coverImageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=1200&auto=format&fit=crop',
    publishedAt: new Date(Date.now() - 1000 * 60 * 3200).toISOString(),
    author: 'Rohan Deshmukh',
    source: 'Cyber Tech Review',
    translations: {
      en: {
        title: 'Open Source Neural Architecture Sets Efficiency Benchmark for Edge Computing Devices',
        summary: 'Engineers release a lightweight neural framework that reduces power consumption by 80% while retaining high precision image recognition on smart sensors.',
        body: 'A consortium of open-source artificial intelligence developers has published a breakthrough neural framework optimized for low-power microcontrollers.\n\nBy leveraging sparse tensor matrix factorization, the model allows localized smart processing on wearables and agricultural monitors without relying on constant cloud connectivity.',
        readTime: '3 min read'
      },
      hi: {
        title: 'ओपन सोर्स न्यूरल आर्किटेक्चर ने एज कंप्यूटिंग उपकरणों के लिए दक्षता मानक स्थापित किया',
        summary: 'इंजीनियरों ने एक हल्का न्यूरल ढांचा जारी किया है जो स्मार्ट सेंसर पर उच्च परिशुद्धता छवि पहचान बनाए रखते हुए बिजली की खपत को 80% कम करता है।',
        body: 'ओपन-सोर्स आर्टिफिशियल इंटेलिजेंस डेवलपर्स के एक संघ ने कम-बिजली वाले माइक्रोकंट्रोलर्स के लिए अनुकूलित एक ब्रेकथ्रू न्यूरल फ्रेमवर्क प्रकाशित किया है।\n\nयह मॉडल निरंतर क्लाउड कनेक्टिविटी पर भरोसा किए बिना पहनने योग्य और कृषि मॉनिटर पर स्थानीयकृत स्मार्ट प्रोसेसिंग की अनुमति देता है।',
        readTime: '3 मिनट'
      },
      te: {
        title: 'ఎడ్జ్ కంప్యూటింగ్ పరికరాల కోసం అత్యంత శక్తివంతమైన ఓపెన్ సోర్స్ న్యూరల్ నెట్‌వర్క్ ఆవిష్కరణ',
        summary: 'స్మార్ట్ సెన్సార్లలో విద్యుత్ వినియోగాన్ని 80% తగ్గిస్తూనే అధిక ఖచ్చితత్వంతో పనిచేసే ఓపెన్ సోర్స్ మోడల్‌ను ఇంజనీర్లు అందుబాటులోకి తెచ్చారు.',
        body: 'తక్కువ విద్యుత్ వినియోగంతో పనిచేసే మైక్రోకంట్రోలర్ల కోసం నూతన ఏఐ ఆర్కిటెక్చర్‌ను పరిశోధకులు రూపొందించారు.\n\nక్లౌడ్ నెట్‌వర్క్‌తో సంబంధం లేకుండా స్మార్ట్ పరికరాలు స్వయంచాలకంగా స్థానిక డేటాను ప్రాసెస్ చేసేందుకు ఇది ఎంతగానో దోహదపడుతుంది.',
        readTime: '3 నిమిషాల పఠనం'
      }
    }
  }
];
