// Buy vs Rent Calculator Logic
const homePriceInput = document.getElementById('home-price');
const downPaymentInput = document.getElementById('down-payment');
const mortgageRateInput = document.getElementById('mortgage-rate');
const propertyTaxInput = document.getElementById('property-tax');
const appreciationInput = document.getElementById('appreciation');
const monthlyRentInput = document.getElementById('monthly-rent');
const rentIncreaseInput = document.getElementById('rent-increase');
const investmentReturnInput = document.getElementById('investment-return');
const timeHorizonInput = document.getElementById('time-horizon');

const savingsDifferenceDisplay = document.getElementById('savings-difference');
const verdictBadge = document.getElementById('verdict-badge');
const breakevenDisplay = document.getElementById('breakeven');
const buyWealthDisplay = document.getElementById('buy-wealth');
const rentWealthDisplay = document.getElementById('rent-wealth');

const ledgerSummary = document.getElementById('ledger-summary');
const receiptBuy = document.getElementById('receipt-buy');
const receiptRent = document.getElementById('receipt-rent');
const receiptDiff = document.getElementById('receipt-diff');

let comparisonChart = null;

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function formatCurrencyPrecise(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
}

function calculateBuyVsRent() {
    const homePrice = parseFloat(homePriceInput.value);
    const downPaymentPct = parseFloat(downPaymentInput.value) / 100;
    const mortgageRate = parseFloat(mortgageRateInput.value) / 100;
    const propertyTaxRate = parseFloat(propertyTaxInput.value) / 100;
    const appreciationRate = parseFloat(appreciationInput.value) / 100;
    const monthlyRent = parseFloat(monthlyRentInput.value);
    const rentIncreaseRate = parseFloat(rentIncreaseInput.value) / 100;
    const investmentReturn = parseFloat(investmentReturnInput.value) / 100;
    const years = parseInt(timeHorizonInput.value);

    // Calculate buying scenario
    const downPayment = homePrice * downPaymentPct;
    const loanAmount = homePrice - downPayment;
    const monthlyRate = mortgageRate / 12;
    const numPayments = 30 * 12;
    
    // Monthly mortgage payment (P&I)
    const monthlyMortgage = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Track buying costs and wealth over time
    let buyingWealth = [];
    let rentingWealth = [];
    let balance = loanAmount;
    let homeValue = homePrice;
    let totalBuyingCost = downPayment;
    let totalRentCost = 0;
    let rentInvestment = downPayment; // Renter invests down payment
    let currentRent = monthlyRent;
    
    for (let year = 1; year <= years; year++) {
        // Buying: annual costs
        let yearlyMortgage = 0;
        let yearlyPrincipal = 0;
        
        for (let month = 0; month < 12; month++) {
            const interestPayment = balance * monthlyRate;
            const principalPayment = monthlyMortgage - interestPayment;
            balance -= principalPayment;
            yearlyMortgage += monthlyMortgage;
            yearlyPrincipal += principalPayment;
        }
        
        const yearlyPropertyTax = homeValue * propertyTaxRate;
        const yearlyMaintenance = homeValue * 0.01; // 1% maintenance
        const yearlyInsurance = homeValue * 0.005; // 0.5% insurance
        
        totalBuyingCost += yearlyMortgage + yearlyPropertyTax + yearlyMaintenance + yearlyInsurance;
        
        // Home appreciates
        homeValue *= (1 + appreciationRate);
        
        // Buying wealth = home equity
        const equity = homeValue - Math.max(0, balance);
        buyingWealth.push(equity);
        
        // Renting: annual costs
        let yearlyRent = 0;
        for (let month = 0; month < 12; month++) {
            yearlyRent += currentRent;
        }
        totalRentCost += yearlyRent;
        
        // Renter invests the difference
        const buyingMonthlyCost = (yearlyMortgage + yearlyPropertyTax + yearlyMaintenance + yearlyInsurance) / 12;
        const monthlySavings = buyingMonthlyCost - currentRent;
        
        // Grow investment
        rentInvestment *= (1 + investmentReturn);
        if (monthlySavings > 0) {
            rentInvestment += monthlySavings * 12;
        }
        
        rentingWealth.push(rentInvestment);
        
        // Rent increases for next year
        currentRent *= (1 + rentIncreaseRate);
    }

    const finalBuyWealth = buyingWealth[years - 1] || 0;
    const finalRentWealth = rentingWealth[years - 1] || 0;
    const difference = finalBuyWealth - finalRentWealth;

    // Find break-even point
    let breakeven = null;
    for (let i = 0; i < years; i++) {
        if (buyingWealth[i] >= rentingWealth[i] && (i === 0 || buyingWealth[i-1] < rentingWealth[i-1])) {
            breakeven = i + 1;
            break;
        }
    }

    updateDisplay(difference, finalBuyWealth, finalRentWealth, breakeven, years);
    updateLedger(homePrice, downPayment, monthlyMortgage, totalBuyingCost, totalRentCost, difference);
    updateChart(buyingWealth, rentingWealth, years);
}

function updateDisplay(difference, buyWealth, rentWealth, breakeven, years) {
    const absDiff = Math.abs(difference);
    savingsDifferenceDisplay.textContent = formatCurrency(absDiff);
    
    if (difference > 0) {
        verdictBadge.textContent = 'BUY WINS';
        verdictBadge.style.borderColor = '#22c55e';
    } else if (difference < 0) {
        verdictBadge.textContent = 'RENT WINS';
        verdictBadge.style.borderColor = '#3b82f6';
    } else {
        verdictBadge.textContent = 'TIE';
        verdictBadge.style.borderColor = '#ffffff';
    }
    
    breakevenDisplay.textContent = breakeven ? `${breakeven} years` : `>${years} years`;
    buyWealthDisplay.textContent = formatCurrency(buyWealth);
    rentWealthDisplay.textContent = formatCurrency(rentWealth);
}

function updateLedger(homePrice, downPayment, monthlyMortgage, totalBuyCost, totalRentCost, difference) {
    receiptBuy.textContent = formatCurrencyPrecise(totalBuyCost);
    receiptRent.textContent = formatCurrencyPrecise(totalRentCost);
    
    const diffFormatted = difference >= 0 ? `+${formatCurrencyPrecise(difference)}` : formatCurrencyPrecise(difference);
    receiptDiff.textContent = diffFormatted;

    ledgerSummary.innerHTML = `
        <li><span>HOME PRICE</span><span>${formatCurrency(homePrice)}</span></li>
        <li><span>DOWN PAYMENT</span><span>${formatCurrency(downPayment)}</span></li>
        <li><span>MONTHLY P&I</span><span>${formatCurrency(monthlyMortgage)}</span></li>
        <li><span>LOAN TERM</span><span>30 YEARS</span></li>
    `;
}

function updateChart(buyingWealth, rentingWealth, years) {
    const labels = [];
    for (let i = 1; i <= years; i++) {
        labels.push(`Year ${i}`);
    }

    const ctx = document.getElementById('comparison-chart').getContext('2d');
    
    if (comparisonChart) {
        comparisonChart.destroy();
    }

    comparisonChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Buying (Equity)',
                    data: buyingWealth,
                    borderColor: '#050505',
                    backgroundColor: 'rgba(5, 5, 5, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Renting (Investments)',
                    data: rentingWealth,
                    borderColor: '#7a7a7a',
                    backgroundColor: 'rgba(122, 122, 122, 0.1)',
                    fill: true,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: (value) => formatCurrency(value)
                    }
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { family: 'Departure Mono' }
                    }
                }
            }
        }
    });
}

function setHorizon(years) {
    timeHorizonInput.value = years;
    calculateBuyVsRent();
}

// Event Listeners
const inputs = [homePriceInput, downPaymentInput, mortgageRateInput, propertyTaxInput, appreciationInput, monthlyRentInput, rentIncreaseInput, investmentReturnInput, timeHorizonInput];
inputs.forEach(input => {
    input.addEventListener('input', calculateBuyVsRent);
});

// Navigation Scroll Spy
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// Initial calculation
calculateBuyVsRent();

