// Revenue data for public companies across industries
const entities = [
    // ═══════════════════════════════════════════════════════════════
    // TECH
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'apple',
        name: 'Apple',
        type: 'Consumer Electronics',
        category: 'tech',
        totalRevenue: 383000000000,
        period: 'FY 2023',
        model: 'Hardware + Services',
        streams: [
            { name: 'iPhone', amount: 200600000000, percent: 52 },
            { name: 'Services', amount: 85200000000, percent: 22 },
            { name: 'Mac', amount: 29400000000, percent: 8 },
            { name: 'iPad', amount: 28300000000, percent: 7 },
            { name: 'Wearables & Home', amount: 39800000000, percent: 10 }
        ],
        insights: [
            'iPhone still dominates but Services growing fastest',
            'Services include App Store, iCloud, Apple Music, Apple TV+',
            'App Store takes 15-30% of all app revenue',
            'Wearables bigger than iPad revenue',
            'Ecosystem creates massive switching costs'
        ],
        lesson: 'Build a product people love, then sell them everything else. The ecosystem is the moat.'
    },
    {
        id: 'google',
        name: 'Alphabet (Google)',
        type: 'Internet Services',
        category: 'tech',
        totalRevenue: 307000000000,
        period: 'FY 2023',
        model: 'Advertising',
        streams: [
            { name: 'Search Ads', amount: 175000000000, percent: 57 },
            { name: 'YouTube Ads', amount: 31500000000, percent: 10 },
            { name: 'Network Ads', amount: 31300000000, percent: 10 },
            { name: 'Google Cloud', amount: 33100000000, percent: 11 },
            { name: 'Other (Play, Hardware)', amount: 35000000000, percent: 11 }
        ],
        insights: [
            '77% of revenue comes from advertising',
            'Free products funded by attention monetization',
            'Cloud is the growth engine, finally profitable',
            'YouTube alone is a $30B+ business',
            'Search market share: ~90% globally'
        ],
        lesson: 'If the product is free, you are the product. Attention is the new oil.'
    },
    {
        id: 'amazon',
        name: 'Amazon',
        type: 'E-commerce & Cloud',
        category: 'tech',
        totalRevenue: 575000000000,
        period: 'FY 2023',
        model: 'E-commerce + Cloud',
        streams: [
            { name: 'Online Stores', amount: 231900000000, percent: 40 },
            { name: 'Third-Party Seller Fees', amount: 140000000000, percent: 24 },
            { name: 'AWS', amount: 90800000000, percent: 16 },
            { name: 'Advertising', amount: 47000000000, percent: 8 },
            { name: 'Subscriptions (Prime)', amount: 40200000000, percent: 7 },
            { name: 'Physical Stores', amount: 20000000000, percent: 3 }
        ],
        insights: [
            'AWS generates most profit despite 16% of revenue',
            'Retail runs on razor-thin margins',
            'Advertising quietly became a $47B business',
            'Prime creates recurring lock-in',
            'Third-party sellers pay Amazon to compete with Amazon'
        ],
        lesson: 'Loss-lead in one area to dominate another. AWS profits subsidize retail conquest.'
    },
    {
        id: 'meta',
        name: 'Meta',
        type: 'Social Media',
        category: 'tech',
        totalRevenue: 135000000000,
        period: 'FY 2023',
        model: 'Advertising',
        streams: [
            { name: 'Facebook Ads', amount: 84000000000, percent: 62 },
            { name: 'Instagram Ads', amount: 42000000000, percent: 31 },
            { name: 'WhatsApp', amount: 2000000000, percent: 1 },
            { name: 'Reality Labs (VR)', amount: 2000000000, percent: 1 },
            { name: 'Other', amount: 5000000000, percent: 4 }
        ],
        insights: [
            '97%+ of revenue from advertising',
            'Instagram drives growth, Facebook maintains',
            'Reality Labs loses $15B+ per year',
            'Average revenue per US user: ~$60/year',
            'Your scrolling time is their inventory'
        ],
        lesson: 'Eyeballs convert to dollars. Engagement is everything in the attention economy.'
    },
    {
        id: 'microsoft',
        name: 'Microsoft',
        type: 'Software & Cloud',
        category: 'tech',
        totalRevenue: 212000000000,
        period: 'FY 2023',
        model: 'Software + Cloud',
        streams: [
            { name: 'Intelligent Cloud (Azure)', amount: 88000000000, percent: 42 },
            { name: 'Productivity (Office 365)', amount: 69000000000, percent: 33 },
            { name: 'Personal Computing (Windows, Xbox)', amount: 54000000000, percent: 25 }
        ],
        insights: [
            'Azure growing faster than AWS by percentage',
            'Office 365 converted one-time sales to subscriptions',
            'Gaming (Xbox) included in Personal Computing',
            'Enterprise software has massive switching costs',
            'LinkedIn, GitHub drive cloud adoption'
        ],
        lesson: 'Convert products to subscriptions. Recurring revenue is worth more than one-time sales.'
    },
    {
        id: 'nvidia',
        name: 'Nvidia',
        type: 'Semiconductors',
        category: 'tech',
        totalRevenue: 61000000000,
        period: 'FY 2024',
        model: 'Hardware (AI/GPU)',
        streams: [
            { name: 'Data Center (AI chips)', amount: 47500000000, percent: 78 },
            { name: 'Gaming GPUs', amount: 10600000000, percent: 17 },
            { name: 'Professional Visualization', amount: 1600000000, percent: 3 },
            { name: 'Automotive', amount: 1100000000, percent: 2 }
        ],
        insights: [
            'AI boom transformed the company overnight',
            'Data center revenue grew 200%+ in one year',
            'Near-monopoly on AI training hardware',
            'CUDA software creates lock-in',
            'Gaming was king, AI now dominates'
        ],
        lesson: 'Be the picks and shovels in a gold rush. Software + hardware = lock-in.'
    },
    {
        id: 'salesforce',
        name: 'Salesforce',
        type: 'Enterprise Software',
        category: 'tech',
        totalRevenue: 34900000000,
        period: 'FY 2024',
        model: 'SaaS Subscriptions',
        streams: [
            { name: 'Sales Cloud', amount: 7500000000, percent: 21 },
            { name: 'Service Cloud', amount: 8000000000, percent: 23 },
            { name: 'Platform & Other', amount: 10000000000, percent: 29 },
            { name: 'Marketing & Commerce', amount: 5000000000, percent: 14 },
            { name: 'Data Cloud', amount: 4400000000, percent: 13 }
        ],
        insights: [
            'Pioneered cloud software subscriptions',
            'Land and expand: start small, upsell over time',
            'Acquisitions: Slack, Tableau, MuleSoft',
            '150,000+ customers globally',
            '95%+ revenue is subscription-based'
        ],
        lesson: 'Enterprise SaaS is sticky. Once embedded, switching costs are enormous.'
    },
    {
        id: 'adobe',
        name: 'Adobe',
        type: 'Creative Software',
        category: 'tech',
        totalRevenue: 19400000000,
        period: 'FY 2023',
        model: 'SaaS Subscriptions',
        streams: [
            { name: 'Creative Cloud', amount: 12500000000, percent: 64 },
            { name: 'Document Cloud (PDF)', amount: 2800000000, percent: 14 },
            { name: 'Experience Cloud', amount: 4100000000, percent: 21 }
        ],
        insights: [
            'Shifted from $2,500 licenses to $55/month subscriptions',
            'Revenue tripled since subscription pivot',
            'Photoshop, Illustrator, Premiere: industry standards',
            'PDF format = Document Cloud moat',
            '90%+ gross margins on software'
        ],
        lesson: 'Become the industry standard, then convert to subscriptions. Creative monopoly.'
    },
    {
        id: 'airbnb',
        name: 'Airbnb',
        type: 'Travel Platform',
        category: 'tech',
        totalRevenue: 9900000000,
        period: 'FY 2023',
        model: 'Marketplace',
        streams: [
            { name: 'Guest Service Fees', amount: 7500000000, percent: 76 },
            { name: 'Host Service Fees', amount: 2400000000, percent: 24 }
        ],
        insights: [
            'Takes ~14% of every booking',
            'Asset-light: owns zero properties',
            'Network effects: more hosts = more guests',
            '7M+ listings worldwide',
            '450M+ guest arrivals all-time'
        ],
        lesson: 'Marketplaces are winner-take-most. Build both sides of the network.'
    },
    {
        id: 'uber',
        name: 'Uber',
        type: 'Mobility Platform',
        category: 'tech',
        totalRevenue: 37300000000,
        period: 'FY 2023',
        model: 'Marketplace',
        streams: [
            { name: 'Mobility (Rides)', amount: 19800000000, percent: 53 },
            { name: 'Delivery (Eats)', amount: 12200000000, percent: 33 },
            { name: 'Freight', amount: 5300000000, percent: 14 }
        ],
        insights: [
            'Takes 20-30% of each ride',
            'Finally profitable in 2023',
            'Delivery grew from zero during pandemic',
            'Freight is B2B trucking logistics',
            'Drivers are contractors, not employees'
        ],
        lesson: 'Platform economics: take a cut of every transaction without owning assets.'
    },
    // ═══════════════════════════════════════════════════════════════
    // FINANCE
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'visa',
        name: 'Visa',
        type: 'Payment Network',
        category: 'finance',
        totalRevenue: 32700000000,
        period: 'FY 2023',
        model: 'Transaction Fees',
        streams: [
            { name: 'Service Revenues', amount: 14800000000, percent: 45 },
            { name: 'Data Processing', amount: 15400000000, percent: 47 },
            { name: 'International Transactions', amount: 11700000000, percent: 36 },
            { name: 'Other', amount: 2200000000, percent: 7 }
        ],
        insights: [
            'Takes ~0.15% of every transaction',
            'Processes 212 billion transactions/year',
            '$12.3 trillion in total payment volume',
            'Does not lend money or take credit risk',
            '65%+ operating margins'
        ],
        lesson: 'Toll booth on global commerce. Tiny fee x massive volume = huge profits.'
    },
    {
        id: 'mastercard',
        name: 'Mastercard',
        type: 'Payment Network',
        category: 'finance',
        totalRevenue: 25100000000,
        period: 'FY 2023',
        model: 'Transaction Fees',
        streams: [
            { name: 'Payment Network', amount: 17700000000, percent: 70 },
            { name: 'Value-Added Services', amount: 7400000000, percent: 30 }
        ],
        insights: [
            'Duopoly with Visa (together 80%+ market share)',
            'Processes 143 billion transactions/year',
            'Zero credit risk - banks take that',
            'Services include fraud detection, analytics',
            'Cross-border transactions are highest margin'
        ],
        lesson: 'Duopolies are powerful. Two players can both win without competing on price.'
    },
    {
        id: 'jpmorgan',
        name: 'JPMorgan Chase',
        type: 'Bank',
        category: 'finance',
        totalRevenue: 158100000000,
        period: 'FY 2023',
        model: 'Diversified Banking',
        streams: [
            { name: 'Consumer & Community Banking', amount: 57700000000, percent: 36 },
            { name: 'Corporate & Investment Bank', amount: 52100000000, percent: 33 },
            { name: 'Asset & Wealth Management', amount: 20100000000, percent: 13 },
            { name: 'Commercial Banking', amount: 15500000000, percent: 10 }
        ],
        insights: [
            'Largest US bank by assets ($3.7 trillion)',
            'Net interest income: difference between loan rates and deposit rates',
            'Investment banking: M&A advisory, IPOs',
            'Chase has 80+ million consumer customers',
            'Too big to fail = implicit government backing'
        ],
        lesson: 'Banks profit from the spread. Borrow cheap, lend dear, collect fees everywhere.'
    },
    {
        id: 'berkshire',
        name: 'Berkshire Hathaway',
        type: 'Conglomerate',
        category: 'finance',
        totalRevenue: 364000000000,
        period: 'FY 2023',
        model: 'Insurance + Investments',
        streams: [
            { name: 'Insurance (GEICO, etc)', amount: 100000000000, percent: 27 },
            { name: 'BNSF Railroad', amount: 23500000000, percent: 6 },
            { name: 'Berkshire Energy', amount: 26500000000, percent: 7 },
            { name: 'Manufacturing & Retail', amount: 160000000000, percent: 44 },
            { name: 'Investment Income', amount: 54000000000, percent: 15 }
        ],
        insights: [
            'Insurance float: gets paid premiums upfront, invests until claims',
            '$150B+ in cash and equivalents',
            'Owns GEICO, Dairy Queen, Duracell, Fruit of the Loom',
            'Largest shareholders of Apple, Coca-Cola, Amex',
            'Buffett: "Our favorite holding period is forever"'
        ],
        lesson: 'Insurance float is free leverage. Get paid to hold other people\'s money.'
    },
    {
        id: 'blackrock',
        name: 'BlackRock',
        type: 'Asset Management',
        category: 'finance',
        totalRevenue: 17900000000,
        period: 'FY 2023',
        model: 'Investment Management Fees',
        streams: [
            { name: 'Investment Advisory (Base Fees)', amount: 14500000000, percent: 81 },
            { name: 'Technology Services (Aladdin)', amount: 1500000000, percent: 8 },
            { name: 'Distribution Fees', amount: 1300000000, percent: 7 },
            { name: 'Advisory & Other', amount: 600000000, percent: 3 }
        ],
        insights: [
            '$10 trillion in assets under management',
            'Largest asset manager in the world',
            'iShares ETFs are market leaders',
            'Aladdin platform manages risk for institutions',
            'Fees average ~0.2% of assets managed'
        ],
        lesson: 'Tiny percentage of huge number = massive business. Scale is everything in asset management.'
    },
    {
        id: 'goldmansachs',
        name: 'Goldman Sachs',
        type: 'Investment Bank',
        category: 'finance',
        totalRevenue: 46300000000,
        period: 'FY 2023',
        model: 'Investment Banking',
        streams: [
            { name: 'Global Banking & Markets', amount: 33500000000, percent: 72 },
            { name: 'Asset & Wealth Management', amount: 12800000000, percent: 28 }
        ],
        insights: [
            'Trading and market-making is largest segment',
            'M&A advisory fees for big deals',
            'IPO underwriting fees typically 3-7%',
            'Wealth management for ultra-high-net-worth',
            'Exited consumer banking (Marcus) after losses'
        ],
        lesson: 'Advisory and trading for the wealthy and corporate. High touch, high fee.'
    },
    // ═══════════════════════════════════════════════════════════════
    // RETAIL & CONSUMER
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'walmart',
        name: 'Walmart',
        type: 'Retail',
        category: 'retail',
        totalRevenue: 648000000000,
        period: 'FY 2024',
        model: 'Retail',
        streams: [
            { name: 'Walmart US', amount: 441000000000, percent: 68 },
            { name: 'International', amount: 115000000000, percent: 18 },
            { name: "Sam's Club", amount: 86000000000, percent: 13 },
            { name: 'E-commerce', amount: 6000000000, percent: 1 }
        ],
        insights: [
            'Largest company by revenue in the world',
            'Operates on 2-3% profit margin',
            'Volume over margin strategy',
            '2.1 million employees globally',
            'Walmart+ subscription competing with Prime'
        ],
        lesson: 'Scale conquers margins. Being the low-cost leader is defensible.'
    },
    {
        id: 'costco',
        name: 'Costco',
        type: 'Membership Retail',
        category: 'retail',
        totalRevenue: 242000000000,
        period: 'FY 2023',
        model: 'Membership + Retail',
        streams: [
            { name: 'Merchandise Sales', amount: 237500000000, percent: 98 },
            { name: 'Membership Fees', amount: 4600000000, percent: 2 }
        ],
        insights: [
            'Membership fees are nearly pure profit',
            'Products sold at near-cost (11% markup max)',
            '92% membership renewal rate',
            'Limited SKUs (4,000 vs 30,000+ at Walmart) = buying power',
            'The $1.50 hot dog is a famous loss leader'
        ],
        lesson: 'Membership fees create guaranteed profit. Sell products at cost to keep members happy.'
    },
    {
        id: 'nike',
        name: 'Nike',
        type: 'Apparel',
        category: 'retail',
        totalRevenue: 51200000000,
        period: 'FY 2023',
        model: 'Brand + Wholesale',
        streams: [
            { name: 'Footwear', amount: 33100000000, percent: 65 },
            { name: 'Apparel', amount: 13600000000, percent: 27 },
            { name: 'Equipment', amount: 1700000000, percent: 3 },
            { name: 'Converse', amount: 2400000000, percent: 5 }
        ],
        insights: [
            'Brand value estimated at $30B+',
            'Shifting to direct-to-consumer (Nike.com, stores)',
            'Marketing spend: $4B+ annually',
            'Athlete endorsements create aspiration',
            'Owns Converse and Jordan Brand'
        ],
        lesson: 'Brand is the moat. People pay premium for the swoosh, not the shoe.'
    },
    {
        id: 'mcdonalds',
        name: "McDonald's",
        type: 'Fast Food',
        category: 'retail',
        totalRevenue: 23200000000,
        period: 'FY 2023',
        model: 'Franchise + Real Estate',
        streams: [
            { name: 'Franchised Restaurants', amount: 15400000000, percent: 66 },
            { name: 'Company-Operated Restaurants', amount: 7800000000, percent: 34 }
        ],
        insights: [
            '95% of restaurants are franchised',
            'Makes money from rent + royalties (4-5% of sales)',
            'Owns the real estate, franchisees pay rent',
            '40,000+ locations in 100+ countries',
            'Real estate portfolio worth $30B+'
        ],
        lesson: 'McDonald\'s is a real estate company that sells burgers. Own the land, franchise the operations.'
    },
    {
        id: 'starbucks',
        name: 'Starbucks',
        type: 'Coffee',
        category: 'retail',
        totalRevenue: 36000000000,
        period: 'FY 2023',
        model: 'Company-Operated Stores',
        streams: [
            { name: 'Company-Operated Stores', amount: 29500000000, percent: 82 },
            { name: 'Licensed Stores', amount: 4200000000, percent: 12 },
            { name: 'Packaged Goods & Other', amount: 2300000000, percent: 6 }
        ],
        insights: [
            'Opposite of McDonald\'s: mostly company-owned',
            '35,000+ stores globally',
            'Starbucks Rewards: 30M+ active US members',
            'Mobile orders = 25%+ of transactions',
            'Stored value on Starbucks cards: $2B+ (interest-free loan)'
        ],
        lesson: 'Prepaid cards are interest-free loans from customers. Loyalty programs are banks.'
    },
    {
        id: 'cocacola',
        name: 'Coca-Cola',
        type: 'Beverages',
        category: 'retail',
        totalRevenue: 46000000000,
        period: 'FY 2023',
        model: 'Concentrate + Licensing',
        streams: [
            { name: 'Concentrate Operations', amount: 20000000000, percent: 43 },
            { name: 'Finished Products', amount: 26000000000, percent: 57 }
        ],
        insights: [
            'Sells syrup concentrate to bottlers',
            'Bottlers handle manufacturing, distribution',
            '200+ countries, 2B+ servings daily',
            'Owns 200+ brands (Sprite, Fanta, Dasani)',
            'Marketing spend: $4B+ annually'
        ],
        lesson: 'Own the formula, franchise the heavy lifting. High-margin concentrate, low-margin bottling.'
    },
    {
        id: 'homedepot',
        name: 'Home Depot',
        type: 'Home Improvement',
        category: 'retail',
        totalRevenue: 153000000000,
        period: 'FY 2023',
        model: 'Retail',
        streams: [
            { name: 'DIY Customers', amount: 75000000000, percent: 49 },
            { name: 'Professional Customers', amount: 70000000000, percent: 46 },
            { name: 'Online Sales', amount: 8000000000, percent: 5 }
        ],
        insights: [
            'Largest home improvement retailer',
            'Pro customers (contractors) are fastest growing',
            '2,300+ stores in North America',
            'Average ticket: $90',
            'Housing market directly impacts sales'
        ],
        lesson: 'Serve both retail and professional. Pros buy more frequently and in larger quantities.'
    },
    // ═══════════════════════════════════════════════════════════════
    // HEALTHCARE
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'unitedhealth',
        name: 'UnitedHealth',
        type: 'Health Insurance',
        category: 'healthcare',
        totalRevenue: 372000000000,
        period: 'FY 2023',
        model: 'Insurance + Services',
        streams: [
            { name: 'UnitedHealthcare (Insurance)', amount: 282000000000, percent: 76 },
            { name: 'Optum Health', amount: 91000000000, percent: 24 },
            { name: 'Optum Rx (Pharmacy)', amount: 117000000000, percent: 31 },
            { name: 'Optum Insight (Analytics)', amount: 15000000000, percent: 4 }
        ],
        insights: [
            'Largest health insurer in the US',
            '50+ million members covered',
            'Optum is vertical integration: care delivery + pharmacy + data',
            'Owns physician practices, surgery centers',
            'Revenue equals 1.5% of US GDP'
        ],
        lesson: 'Vertical integration in healthcare: insure, provide care, fill prescriptions, analyze data.'
    },
    {
        id: 'jnj',
        name: 'Johnson & Johnson',
        type: 'Healthcare Conglomerate',
        category: 'healthcare',
        totalRevenue: 85200000000,
        period: 'FY 2023',
        model: 'Diversified Healthcare',
        streams: [
            { name: 'Innovative Medicine (Pharma)', amount: 54800000000, percent: 64 },
            { name: 'MedTech (Devices)', amount: 30400000000, percent: 36 }
        ],
        insights: [
            'Spun off consumer products (Kenvue) in 2023',
            'Pharma: cancer, immunology drugs',
            'MedTech: surgical robots, orthopedics',
            'R&D spend: $15B+ annually',
            '135+ years old, AAA credit rating'
        ],
        lesson: 'Diversification across healthcare reduces risk. Steady pharma + device income.'
    },
    {
        id: 'pfizer',
        name: 'Pfizer',
        type: 'Pharmaceutical',
        category: 'healthcare',
        totalRevenue: 58500000000,
        period: 'FY 2023',
        model: 'Drug Sales',
        streams: [
            { name: 'Primary Care', amount: 22000000000, percent: 38 },
            { name: 'Specialty Care', amount: 15000000000, percent: 26 },
            { name: 'Oncology', amount: 12000000000, percent: 20 },
            { name: 'COVID Products', amount: 9500000000, percent: 16 }
        ],
        insights: [
            'COVID vaccine generated $37B in 2022 alone',
            'Revenue dropped 40% as pandemic waned',
            'Patent cliffs: drugs lose exclusivity',
            'Acquisitions to refill pipeline (Seagen for $43B)',
            'R&D to revenue ratio: ~15%'
        ],
        lesson: 'Pharma is hits-driven. Blockbuster drugs carry the company until patents expire.'
    },
    {
        id: 'cvs',
        name: 'CVS Health',
        type: 'Healthcare & Pharmacy',
        category: 'healthcare',
        totalRevenue: 358000000000,
        period: 'FY 2023',
        model: 'Integrated Healthcare',
        streams: [
            { name: 'Pharmacy Services (PBM)', amount: 176000000000, percent: 49 },
            { name: 'Health Care Benefits (Aetna)', amount: 106000000000, percent: 30 },
            { name: 'Retail/Pharmacy', amount: 114000000000, percent: 32 }
        ],
        insights: [
            'Owns Aetna insurance + Caremark PBM',
            '9,000+ retail locations',
            'MinuteClinics: 1,100+ in-store clinics',
            'PBM: negotiates drug prices, keeps rebates',
            'Vertical integration: insure + fill + provide care'
        ],
        lesson: 'Control the full healthcare journey. Pharmacy + insurance + clinics = multiple revenue streams.'
    },
    // ═══════════════════════════════════════════════════════════════
    // MEDIA & ENTERTAINMENT
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'netflix',
        name: 'Netflix',
        type: 'Streaming',
        category: 'media',
        totalRevenue: 33700000000,
        period: 'FY 2023',
        model: 'Subscription',
        streams: [
            { name: 'Subscriptions', amount: 32300000000, percent: 96 },
            { name: 'Advertising', amount: 1400000000, percent: 4 }
        ],
        insights: [
            'Pure recurring revenue model',
            'Ad tier is newest growth driver',
            'Content spend: $17B+ annually',
            '260M+ subscribers globally',
            'Password sharing crackdown boosted growth'
        ],
        lesson: 'Subscription models create predictable revenue. But content is a treadmill.'
    },
    {
        id: 'disney',
        name: 'Disney',
        type: 'Entertainment',
        category: 'media',
        totalRevenue: 89000000000,
        period: 'FY 2023',
        model: 'Diversified Entertainment',
        streams: [
            { name: 'Parks & Experiences', amount: 32500000000, percent: 37 },
            { name: 'Linear Networks (ESPN, ABC)', amount: 28000000000, percent: 31 },
            { name: 'Streaming (Disney+, Hulu)', amount: 19000000000, percent: 21 },
            { name: 'Content Sales/Licensing', amount: 9500000000, percent: 11 }
        ],
        insights: [
            'Parks are profit engines, streaming loses money',
            'Content creates demand for parks',
            'ESPN declining but still massive',
            'Disney+ has 150M+ subscribers',
            'IP (Marvel, Star Wars, Pixar) drives everything'
        ],
        lesson: 'Own the IP, monetize it everywhere. Characters are infinitely scalable assets.'
    },
    {
        id: 'spotify',
        name: 'Spotify',
        type: 'Audio Streaming',
        category: 'media',
        totalRevenue: 13200000000,
        period: 'FY 2023',
        model: 'Freemium',
        streams: [
            { name: 'Premium Subscriptions', amount: 11800000000, percent: 89 },
            { name: 'Ad-Supported', amount: 1400000000, percent: 11 }
        ],
        insights: [
            'Free tier is a funnel to paid',
            '226M premium subscribers',
            'Podcasts: bet on owning all audio',
            'Artists get $0.003-0.005 per stream',
            'Labels take ~70% of streaming revenue'
        ],
        lesson: 'Freemium works when free users convert to paid. The free tier is marketing.'
    },
    {
        id: 'warnerbros',
        name: 'Warner Bros Discovery',
        type: 'Media Conglomerate',
        category: 'media',
        totalRevenue: 41300000000,
        period: 'FY 2023',
        model: 'Content + Distribution',
        streams: [
            { name: 'Studios (Film & TV)', amount: 11300000000, percent: 27 },
            { name: 'Networks (Cable)', amount: 21500000000, percent: 52 },
            { name: 'Direct-to-Consumer (Max)', amount: 8500000000, percent: 21 }
        ],
        insights: [
            'Merger of WarnerMedia + Discovery',
            'Owns HBO, CNN, Discovery, DC Comics',
            'Max streaming service: 96M+ subscribers',
            'Cable networks declining but profitable',
            '$50B+ debt from merger'
        ],
        lesson: 'Legacy media struggles to transition. Profitable cable subsidizes streaming losses.'
    },
    {
        id: 'nyt',
        name: 'NY Times',
        type: 'News',
        category: 'media',
        totalRevenue: 2400000000,
        period: 'FY 2023',
        model: 'Subscription + Ads',
        streams: [
            { name: 'Digital Subscriptions', amount: 1000000000, percent: 42 },
            { name: 'Print Subscriptions', amount: 500000000, percent: 21 },
            { name: 'Digital Advertising', amount: 300000000, percent: 12 },
            { name: 'Print Advertising', amount: 200000000, percent: 8 },
            { name: 'Other (Wirecutter, Games)', amount: 400000000, percent: 17 }
        ],
        insights: [
            'Successfully pivoted from print to digital',
            '10M+ total subscribers',
            'Wordle acquisition drives engagement',
            'Bundle: News + Games + Cooking + Wirecutter',
            'Quality journalism as premium product'
        ],
        lesson: 'Bundles increase value per customer. Multiple products = higher retention.'
    },
    {
        id: 'livnation',
        name: 'Live Nation',
        type: 'Live Entertainment',
        category: 'media',
        totalRevenue: 22700000000,
        period: 'FY 2023',
        model: 'Concerts + Ticketing',
        streams: [
            { name: 'Concerts', amount: 18000000000, percent: 79 },
            { name: 'Ticketmaster', amount: 2700000000, percent: 12 },
            { name: 'Sponsorship & Advertising', amount: 2000000000, percent: 9 }
        ],
        insights: [
            'Owns Ticketmaster: controls 80%+ of major venue ticketing',
            '100M+ tickets sold annually',
            'Manages 400+ artists',
            'Operates 200+ venues worldwide',
            'Under antitrust scrutiny for monopoly'
        ],
        lesson: 'Control the venue + ticketing + artist = the whole value chain. Vertical monopoly.'
    },
    // ═══════════════════════════════════════════════════════════════
    // INDUSTRIALS & ENERGY
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'tesla',
        name: 'Tesla',
        type: 'Electric Vehicles',
        category: 'industrial',
        totalRevenue: 96800000000,
        period: 'FY 2023',
        model: 'Vehicles + Energy',
        streams: [
            { name: 'Automotive Sales', amount: 78500000000, percent: 81 },
            { name: 'Automotive Regulatory Credits', amount: 1800000000, percent: 2 },
            { name: 'Energy Generation & Storage', amount: 6000000000, percent: 6 },
            { name: 'Services & Other', amount: 10500000000, percent: 11 }
        ],
        insights: [
            'Sells regulatory credits to other automakers',
            'Energy: Powerwall, Megapack, Solar',
            'Services: charging, insurance, repairs',
            'Software (FSD) sold as subscription',
            'Gross margin higher than legacy auto'
        ],
        lesson: 'Vertical integration: build batteries, cars, charging, insurance. Control the stack.'
    },
    {
        id: 'exxon',
        name: 'ExxonMobil',
        type: 'Oil & Gas',
        category: 'industrial',
        totalRevenue: 344600000000,
        period: 'FY 2023',
        model: 'Integrated Oil',
        streams: [
            { name: 'Upstream (Exploration & Production)', amount: 150000000000, percent: 44 },
            { name: 'Downstream (Refining & Retail)', amount: 160000000000, percent: 46 },
            { name: 'Chemical', amount: 34600000000, percent: 10 }
        ],
        insights: [
            'Upstream: find and extract oil/gas',
            'Downstream: refine into gasoline, jet fuel',
            'Profits swing wildly with oil prices',
            'Largest non-government oil company',
            '2022 profit: $56B (record year)'
        ],
        lesson: 'Commodity businesses are cyclical. Huge profits when prices spike, pain when they fall.'
    },
    {
        id: 'caterpillar',
        name: 'Caterpillar',
        type: 'Heavy Equipment',
        category: 'industrial',
        totalRevenue: 67100000000,
        period: 'FY 2023',
        model: 'Equipment + Services',
        streams: [
            { name: 'Construction Industries', amount: 27800000000, percent: 41 },
            { name: 'Resource Industries (Mining)', amount: 13200000000, percent: 20 },
            { name: 'Energy & Transportation', amount: 22400000000, percent: 33 },
            { name: 'Financial Products', amount: 3700000000, percent: 6 }
        ],
        insights: [
            'Equipment sold through independent dealers',
            'Financial Products: leasing and loans',
            'Aftermarket parts are high margin',
            'Equipment lasts 20+ years = recurring service',
            'Indicator of global construction activity'
        ],
        lesson: 'Sell the equipment, profit on parts and service. Razor and blades model.'
    },
    {
        id: 'deere',
        name: 'John Deere',
        type: 'Agriculture Equipment',
        category: 'industrial',
        totalRevenue: 55700000000,
        period: 'FY 2023',
        model: 'Equipment + Financing',
        streams: [
            { name: 'Production & Precision Ag', amount: 25000000000, percent: 45 },
            { name: 'Small Ag & Turf', amount: 13500000000, percent: 24 },
            { name: 'Construction & Forestry', amount: 14000000000, percent: 25 },
            { name: 'Financial Services', amount: 3200000000, percent: 6 }
        ],
        insights: [
            '180+ years old, iconic brand',
            'Software and precision ag growing fast',
            'Finances 50%+ of equipment sales',
            'Aftermarket parts and service recurring',
            'Criticized for limiting repair rights'
        ],
        lesson: 'Finance the purchase, lock in the service. Equipment + software + data = recurring revenue.'
    },
    {
        id: 'ups',
        name: 'UPS',
        type: 'Logistics',
        category: 'industrial',
        totalRevenue: 91000000000,
        period: 'FY 2023',
        model: 'Delivery Services',
        streams: [
            { name: 'US Domestic Package', amount: 58000000000, percent: 64 },
            { name: 'International Package', amount: 17000000000, percent: 19 },
            { name: 'Supply Chain Solutions', amount: 16000000000, percent: 17 }
        ],
        insights: [
            'Delivers 24+ million packages daily',
            'E-commerce boom increased volume',
            'Competes with FedEx and USPS',
            'Amazon building own logistics = threat',
            'Supply Chain: warehousing, freight, customs'
        ],
        lesson: 'Logistics is infrastructure. Essential service but commoditized and capital-intensive.'
    },
    {
        id: 'boeing',
        name: 'Boeing',
        type: 'Aerospace',
        category: 'industrial',
        totalRevenue: 77800000000,
        period: 'FY 2023',
        model: 'Aircraft + Defense',
        streams: [
            { name: 'Commercial Airplanes', amount: 33900000000, percent: 44 },
            { name: 'Defense, Space & Security', amount: 24900000000, percent: 32 },
            { name: 'Global Services', amount: 19000000000, percent: 24 }
        ],
        insights: [
            'Duopoly with Airbus in commercial jets',
            'Backlog: 5,600+ aircraft orders',
            'Defense contracts provide stability',
            'Services: parts, maintenance, training',
            '737 MAX issues damaged reputation and finances'
        ],
        lesson: 'Duopolies in capital-intensive industries. High barriers = few competitors.'
    },
    // ═══════════════════════════════════════════════════════════════
    // TRAVEL & HOSPITALITY
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'marriott',
        name: 'Marriott',
        type: 'Hotels',
        category: 'travel',
        totalRevenue: 23700000000,
        period: 'FY 2023',
        model: 'Franchise + Management',
        streams: [
            { name: 'Franchise Fees', amount: 3200000000, percent: 13 },
            { name: 'Management Fees', amount: 1100000000, percent: 5 },
            { name: 'Owned/Leased Hotels', amount: 1200000000, percent: 5 },
            { name: 'Cost Reimbursements', amount: 18200000000, percent: 77 }
        ],
        insights: [
            'Owns very few hotels - asset-light model',
            '8,600+ properties, 30+ brands',
            'Franchise: collect 4-6% of room revenue',
            'Management: run hotels for owners for fee',
            'Marriott Bonvoy: 200M+ loyalty members'
        ],
        lesson: 'Own the brand and system, not the real estate. Franchising = high returns, low risk.'
    },
    {
        id: 'delta',
        name: 'Delta Air Lines',
        type: 'Airlines',
        category: 'travel',
        totalRevenue: 58000000000,
        period: 'FY 2023',
        model: 'Passenger + Loyalty',
        streams: [
            { name: 'Passenger Revenue', amount: 49000000000, percent: 85 },
            { name: 'Cargo', amount: 700000000, percent: 1 },
            { name: 'Loyalty Program (SkyMiles)', amount: 5000000000, percent: 9 },
            { name: 'Other (Maintenance, etc)', amount: 3300000000, percent: 6 }
        ],
        insights: [
            'Largest US airline by revenue',
            'SkyMiles sold to Amex = pure profit',
            'Credit card deal worth $7B+ annually',
            'Premium cabins growing faster than economy',
            'Fuel is 20-25% of costs'
        ],
        lesson: 'Airlines are loyalty companies. Miles and credit card deals can be more profitable than flights.'
    },
    {
        id: 'booking',
        name: 'Booking Holdings',
        type: 'Travel Platform',
        category: 'travel',
        totalRevenue: 21400000000,
        period: 'FY 2023',
        model: 'Commissions',
        streams: [
            { name: 'Agency Revenue (Commissions)', amount: 16000000000, percent: 75 },
            { name: 'Merchant Revenue', amount: 4400000000, percent: 21 },
            { name: 'Advertising', amount: 1000000000, percent: 4 }
        ],
        insights: [
            'Owns Booking.com, Priceline, Kayak, OpenTable',
            'Takes 15-20% commission on bookings',
            '28M+ accommodation listings',
            'Google is both partner and competitor',
            'Largest online travel company globally'
        ],
        lesson: 'Aggregators capture value. Sit between supply and demand, take a cut of everything.'
    },
    // ═══════════════════════════════════════════════════════════════
    // TELECOM
    // ═══════════════════════════════════════════════════════════════
    {
        id: 'verizon',
        name: 'Verizon',
        type: 'Telecom',
        category: 'telecom',
        totalRevenue: 134000000000,
        period: 'FY 2023',
        model: 'Wireless + Broadband',
        streams: [
            { name: 'Wireless Service', amount: 77000000000, percent: 57 },
            { name: 'Wireless Equipment', amount: 20700000000, percent: 15 },
            { name: 'Fios & Broadband', amount: 12900000000, percent: 10 },
            { name: 'Business Solutions', amount: 23400000000, percent: 17 }
        ],
        insights: [
            '143M wireless connections',
            'Wireless service revenue is recurring',
            'Equipment sales are low margin',
            '5G network investment: $20B+',
            'Dividend aristocrat: 17+ years of increases'
        ],
        lesson: 'Telecom is infrastructure. Essential, recurring, but capital-intensive and slow-growing.'
    },
    {
        id: 'att',
        name: 'AT&T',
        type: 'Telecom',
        category: 'telecom',
        totalRevenue: 122400000000,
        period: 'FY 2023',
        model: 'Wireless + Fiber',
        streams: [
            { name: 'Mobility', amount: 84000000000, percent: 69 },
            { name: 'Business Wireline', amount: 22000000000, percent: 18 },
            { name: 'Consumer Wireline', amount: 13000000000, percent: 11 }
        ],
        insights: [
            'Spun off WarnerMedia to focus on telecom',
            '70M+ wireless subscribers',
            'Fiber expansion is growth priority',
            'Paying down $140B+ debt',
            'Massive capital expenditure for networks'
        ],
        lesson: 'Diversification failed. Refocused on core business after media disasters.'
    },
    {
        id: 'comcast',
        name: 'Comcast',
        type: 'Cable & Media',
        category: 'telecom',
        totalRevenue: 121600000000,
        period: 'FY 2023',
        model: 'Cable + Content',
        streams: [
            { name: 'Cable Communications', amount: 65800000000, percent: 54 },
            { name: 'NBCUniversal Media', amount: 21000000000, percent: 17 },
            { name: 'NBCUniversal Studios', amount: 11500000000, percent: 9 },
            { name: 'Theme Parks', amount: 8500000000, percent: 7 },
            { name: 'Sky (Europe)', amount: 14800000000, percent: 12 }
        ],
        insights: [
            'Largest US cable and internet provider',
            'Owns NBC, Universal Studios, Sky',
            'Internet: 32M+ subscribers',
            'Cord cutting hurting cable TV',
            'Peacock streaming: 30M+ subscribers'
        ],
        lesson: 'Broadband is the real business. TV bundles declining, internet essential.'
    }
];

let selectedEntity = null;
let currentCategory = 'all';
let patternsChart = null;

// Format currency for display
function formatCurrency(amount) {
    if (amount >= 1000000000) {
        return '$' + (amount / 1000000000).toFixed(1) + 'B';
    } else if (amount >= 1000000) {
        return '$' + (amount / 1000000).toFixed(0) + 'M';
    } else if (amount >= 1000) {
        return '$' + (amount / 1000).toFixed(0) + 'K';
    }
    return '$' + amount.toLocaleString();
}

// Render entity grid
function renderEntityGrid() {
    const grid = document.getElementById('entity-grid');
    const filtered = currentCategory === 'all'
        ? entities
        : entities.filter(e => e.category === currentCategory);

    grid.innerHTML = filtered.map(entity => `
        <button class="entity-btn ${selectedEntity?.id === entity.id ? 'active' : ''}"
                onclick="selectEntity('${entity.id}')">
            <span class="entity-name">${entity.name}</span>
            <span class="entity-type">${entity.type}</span>
        </button>
    `).join('');
}

// Filter by category
function filterCategory(category) {
    currentCategory = category;

    // Update button states
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.toLowerCase() === category ||
            (category === 'all' && btn.textContent === 'All')) {
            btn.classList.add('active');
        }
    });

    renderEntityGrid();
}

// Select an entity and display its data
function selectEntity(entityId) {
    selectedEntity = entities.find(e => e.id === entityId);
    if (!selectedEntity) return;

    // Update grid to show active state
    renderEntityGrid();

    // Update revenue breakdown
    document.getElementById('entity-title').textContent = selectedEntity.name.toUpperCase();
    document.getElementById('revenue-total').textContent = formatCurrency(selectedEntity.totalRevenue);
    document.getElementById('revenue-period').textContent = selectedEntity.period + ' REVENUE';
    document.getElementById('model-tag').textContent = selectedEntity.model;

    // Render streams
    const streamList = document.getElementById('stream-list');
    streamList.innerHTML = selectedEntity.streams.map(stream => `
        <div class="stream-item">
            <div class="stream-header">
                <span class="stream-name">${stream.name}</span>
                <span class="stream-amount">${formatCurrency(stream.amount)}</span>
            </div>
            <div class="stream-bar-container">
                <div class="stream-bar" style="width: ${stream.percent}%"></div>
            </div>
            <div class="stream-percent">${stream.percent}%</div>
        </div>
    `).join('');

    // Update insights
    document.getElementById('insight-title').textContent = `How ${selectedEntity.name} Makes Money`;
    const insightList = document.getElementById('insight-list');
    insightList.innerHTML = selectedEntity.insights.map(insight => `
        <li>${insight}</li>
    `).join('');

    // Update lesson
    const lessonCard = document.getElementById('lesson-card');
    lessonCard.style.display = 'block';
    document.getElementById('lesson-text').textContent = selectedEntity.lesson;
}

// Initialize patterns chart
function initPatternsChart() {
    const ctx = document.getElementById('patterns-chart').getContext('2d');

    patternsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['SaaS', 'Payments', 'Advertising', 'Marketplace', 'Hardware', 'Retail', 'Airlines'],
            datasets: [{
                label: 'Typical Profit Margin',
                data: [25, 50, 30, 20, 15, 3, 5],
                backgroundColor: '#050505',
                borderColor: '#050505',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: true,
                    text: 'TYPICAL PROFIT MARGINS BY BUSINESS MODEL',
                    font: {
                        family: "'Departure Mono', monospace",
                        size: 12
                    },
                    color: '#050505'
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 60,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            family: "'Departure Mono', monospace"
                        },
                        color: '#050505'
                    },
                    grid: {
                        color: '#d9d7d1',
                        drawBorder: false
                    }
                },
                x: {
                    ticks: {
                        font: {
                            family: "'Departure Mono', monospace",
                            size: 10
                        },
                        color: '#050505'
                    },
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// Scroll spy for navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('[data-section]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    renderEntityGrid();
    initPatternsChart();
    initScrollSpy();

    // Select first entity by default
    if (entities.length > 0) {
        selectEntity(entities[0].id);
    }
});
