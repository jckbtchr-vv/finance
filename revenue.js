// Revenue data for companies and creators
const entities = [
    // Tech Giants
    {
        id: 'apple',
        name: 'Apple',
        type: 'Tech Giant',
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
            'Wearables bigger than iPad and Mac combined',
            'Switching costs keep customers locked in ecosystem'
        ],
        lesson: 'Build a product people love, then sell them everything else. The ecosystem is the moat.'
    },
    {
        id: 'google',
        name: 'Google',
        type: 'Tech Giant',
        category: 'tech',
        totalRevenue: 307000000000,
        period: 'FY 2023',
        model: 'Advertising',
        streams: [
            { name: 'Search Ads', amount: 175000000000, percent: 57 },
            { name: 'YouTube Ads', amount: 31500000000, percent: 10 },
            { name: 'Network Ads', amount: 31300000000, percent: 10 },
            { name: 'Google Cloud', amount: 33100000000, percent: 11 },
            { name: 'Other', amount: 35000000000, percent: 11 }
        ],
        insights: [
            '77% of revenue comes from advertising',
            'You are the product being sold to advertisers',
            'Cloud is the growth engine, finally profitable',
            'YouTube alone is a $30B+ business',
            'Free products funded by attention monetization'
        ],
        lesson: 'If the product is free, you are the product. Attention is the new oil.'
    },
    {
        id: 'amazon',
        name: 'Amazon',
        type: 'Tech Giant',
        category: 'tech',
        totalRevenue: 575000000000,
        period: 'FY 2023',
        model: 'E-commerce + Cloud',
        streams: [
            { name: 'Online Stores', amount: 231900000000, percent: 40 },
            { name: 'Third-Party Seller Services', amount: 140000000000, percent: 24 },
            { name: 'AWS', amount: 90800000000, percent: 16 },
            { name: 'Advertising', amount: 47000000000, percent: 8 },
            { name: 'Subscriptions', amount: 40200000000, percent: 7 },
            { name: 'Physical Stores', amount: 20000000000, percent: 3 }
        ],
        insights: [
            'AWS generates most of the profit despite 16% of revenue',
            'Retail runs on razor-thin margins',
            'Advertising is a hidden $47B giant',
            'Prime membership creates recurring lock-in',
            'Third-party sellers pay Amazon to compete with Amazon'
        ],
        lesson: 'Loss-lead in one area to dominate another. AWS profits subsidize retail conquest.'
    },
    {
        id: 'meta',
        name: 'Meta',
        type: 'Tech Giant',
        category: 'tech',
        totalRevenue: 135000000000,
        period: 'FY 2023',
        model: 'Advertising',
        streams: [
            { name: 'Facebook Ads', amount: 84000000000, percent: 62 },
            { name: 'Instagram Ads', amount: 42000000000, percent: 31 },
            { name: 'WhatsApp', amount: 2000000000, percent: 1 },
            { name: 'Reality Labs', amount: 2000000000, percent: 1 },
            { name: 'Other', amount: 5000000000, percent: 4 }
        ],
        insights: [
            '97%+ of revenue from advertising',
            'Instagram drives growth while Facebook maintains',
            'Reality Labs loses billions per year on metaverse bet',
            'Average revenue per user: $40/year in US',
            'Your scrolling time is their inventory'
        ],
        lesson: 'Eyeballs convert to dollars. Engagement is everything in the attention economy.'
    },
    {
        id: 'microsoft',
        name: 'Microsoft',
        type: 'Tech Giant',
        category: 'tech',
        totalRevenue: 212000000000,
        period: 'FY 2023',
        model: 'Software + Cloud',
        streams: [
            { name: 'Intelligent Cloud (Azure)', amount: 88000000000, percent: 42 },
            { name: 'Productivity (Office 365)', amount: 69000000000, percent: 33 },
            { name: 'Personal Computing', amount: 54000000000, percent: 25 }
        ],
        insights: [
            'Azure growing faster than AWS in percentage terms',
            'Office 365 subscription converted one-time sales to recurring',
            'Gaming (Xbox) included in Personal Computing',
            'Enterprise software has massive switching costs',
            'GitHub, LinkedIn, and Teams all drive cloud adoption'
        ],
        lesson: 'Convert products to subscriptions. Recurring revenue is worth more than one-time sales.'
    },
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
            'Ad tier is newest revenue stream',
            'Content spend is $17B+ annually',
            '260M+ subscribers globally',
            'Password sharing crackdown boosted growth'
        ],
        lesson: 'Subscription models create predictable revenue. But content is a treadmill - you must keep running.'
    },
    {
        id: 'spotify',
        name: 'Spotify',
        type: 'Streaming',
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
            'Podcasts are a bet on owning audio',
            'Artists get $0.003-0.005 per stream',
            'Labels take 70% of streaming revenue'
        ],
        lesson: 'Freemium works when free users become paying customers. The free tier is marketing.'
    },
    // Retail
    {
        id: 'walmart',
        name: 'Walmart',
        type: 'Retail',
        category: 'retail',
        totalRevenue: 648000000000,
        period: 'FY 2024',
        model: 'Retail',
        streams: [
            { name: 'US Stores', amount: 420000000000, percent: 65 },
            { name: 'International', amount: 115000000000, percent: 18 },
            { name: "Sam's Club", amount: 86000000000, percent: 13 },
            { name: 'E-commerce', amount: 27000000000, percent: 4 }
        ],
        insights: [
            'Largest company by revenue in the world',
            'Operates on 2-3% profit margin',
            'Volume over margin strategy',
            'E-commerce growing but still small',
            'Walmart+ subscription gaining traction'
        ],
        lesson: 'Scale can overcome thin margins. Being the low-cost leader is a defensible position.'
    },
    {
        id: 'costco',
        name: 'Costco',
        type: 'Retail',
        category: 'retail',
        totalRevenue: 242000000000,
        period: 'FY 2023',
        model: 'Membership + Retail',
        streams: [
            { name: 'Merchandise Sales', amount: 237500000000, percent: 98 },
            { name: 'Membership Fees', amount: 4600000000, percent: 2 }
        ],
        insights: [
            'Membership fees are almost pure profit',
            'Products sold at near-cost',
            '92% membership renewal rate',
            'Limited SKUs = buying power',
            'The $1.50 hot dog is a loss leader'
        ],
        lesson: 'Membership fees = guaranteed recurring profit. Sell products at cost to keep members happy.'
    },
    // Creators
    {
        id: 'mrbeast',
        name: 'MrBeast',
        type: 'Creator',
        category: 'creator',
        totalRevenue: 700000000,
        period: 'Estimated 2023',
        model: 'Multi-Platform Creator',
        streams: [
            { name: 'Feastables (Chocolate)', amount: 250000000, percent: 36 },
            { name: 'YouTube AdSense', amount: 150000000, percent: 21 },
            { name: 'Beast Burger', amount: 100000000, percent: 14 },
            { name: 'Sponsorships', amount: 100000000, percent: 14 },
            { name: 'Merch & Licensing', amount: 50000000, percent: 7 },
            { name: 'Other Ventures', amount: 50000000, percent: 7 }
        ],
        insights: [
            'YouTube is the funnel, products are the business',
            'Reinvests most revenue back into content',
            'Videos cost $1-5M each to produce',
            'Feastables scaled to major retailer shelves',
            'Content is customer acquisition'
        ],
        lesson: 'Attention is the starting point, not the business. Convert audience to customers.'
    },
    {
        id: 'rogan',
        name: 'Joe Rogan',
        type: 'Creator',
        category: 'creator',
        totalRevenue: 60000000,
        period: 'Estimated Annual',
        model: 'Exclusive Licensing',
        streams: [
            { name: 'Spotify Deal', amount: 50000000, percent: 83 },
            { name: 'Sponsorships', amount: 8000000, percent: 13 },
            { name: 'Other', amount: 2000000, percent: 3 }
        ],
        insights: [
            'Sold exclusive rights to Spotify for $200M+ over multiple years',
            'Long-form content creates deep audience connection',
            'Consistency: 3-4 episodes per week',
            'No editing = authentic feel, low production cost',
            'Built audience before monetizing'
        ],
        lesson: 'Build an audience so valuable that platforms will pay for exclusivity.'
    },
    {
        id: 'iman',
        name: 'Iman Gadzhi',
        type: 'Creator',
        category: 'creator',
        totalRevenue: 30000000,
        period: 'Estimated Annual',
        model: 'Education + Agency',
        streams: [
            { name: 'Agency (IAG Media)', amount: 12000000, percent: 40 },
            { name: 'Education (Courses)', amount: 10000000, percent: 33 },
            { name: 'Software (AgenciFlow)', amount: 5000000, percent: 17 },
            { name: 'YouTube/Sponsorships', amount: 3000000, percent: 10 }
        ],
        insights: [
            'YouTube drives leads to high-ticket offers',
            'Agency provides real-world credibility',
            'Courses scale without his time',
            'Software creates recurring revenue',
            'Content is free, implementation is paid'
        ],
        lesson: 'Stack business models. Services prove expertise, courses scale it, software automates it.'
    },
    {
        id: 'hormozi',
        name: 'Alex Hormozi',
        type: 'Creator',
        category: 'creator',
        totalRevenue: 200000000,
        period: 'Acquisition.com Portfolio',
        model: 'Holding Company',
        streams: [
            { name: 'Portfolio Companies', amount: 150000000, percent: 75 },
            { name: 'Gym Launch/Prestige Labs', amount: 30000000, percent: 15 },
            { name: 'Books & Content', amount: 10000000, percent: 5 },
            { name: 'Workshops/Speaking', amount: 10000000, percent: 5 }
        ],
        insights: [
            'Gives away content to attract deal flow',
            'Acquires minority stakes in businesses',
            'Books sold at cost as lead magnets',
            'Content creates trust at scale',
            'Plays long game on brand building'
        ],
        lesson: 'Give away the secrets, sell the implementation. Free content is the best sales team.'
    },
    // Media
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
            'ESPN is declining but still massive',
            'Disney+ has 150M+ subscribers',
            'IP (Marvel, Star Wars, Pixar) drives everything'
        ],
        lesson: 'Own the IP, monetize it everywhere. Characters are infinitely scalable assets.'
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
            'Bundle strategy (News + Games + Cooking)',
            'Quality journalism as premium product'
        ],
        lesson: 'Bundle increases value per customer. Multiple products = higher retention.'
    },
    {
        id: 'nvidia',
        name: 'Nvidia',
        type: 'Tech Giant',
        category: 'tech',
        totalRevenue: 61000000000,
        period: 'FY 2024',
        model: 'Hardware (AI/GPU)',
        streams: [
            { name: 'Data Center (AI)', amount: 47500000000, percent: 78 },
            { name: 'Gaming GPUs', amount: 10600000000, percent: 17 },
            { name: 'Professional Visualization', amount: 1600000000, percent: 3 },
            { name: 'Automotive', amount: 1100000000, percent: 2 }
        ],
        insights: [
            'AI boom transformed the company',
            'Data center revenue grew 200%+ in one year',
            'Near-monopoly on AI training chips',
            'Software (CUDA) creates lock-in',
            'Gaming was king, now AI dominates'
        ],
        lesson: 'Be the picks and shovels in a gold rush. Platform lock-in through software + hardware.'
    },
    {
        id: 'airbnb',
        name: 'Airbnb',
        type: 'Platform',
        category: 'tech',
        totalRevenue: 9900000000,
        period: 'FY 2023',
        model: 'Marketplace',
        streams: [
            { name: 'Service Fees (Guest)', amount: 7500000000, percent: 76 },
            { name: 'Service Fees (Host)', amount: 2400000000, percent: 24 }
        ],
        insights: [
            'Takes ~14% of every booking',
            'Asset-light: owns no properties',
            'Network effects: more hosts = more guests',
            '7M+ listings worldwide',
            'Experiences expanding beyond lodging'
        ],
        lesson: 'Marketplaces are winner-take-most. Build both sides of the network.'
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
        return '$' + (amount / 1000000).toFixed(1) + 'M';
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
    document.querySelectorAll('.entity-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');

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
            labels: ['Subscription', 'Advertising', 'Marketplace', 'Hardware', 'Retail'],
            datasets: [{
                label: 'Profit Margin',
                data: [25, 35, 20, 15, 3],
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
                    max: 50,
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
        document.querySelector('.entity-btn')?.classList.add('active');
    }
});
