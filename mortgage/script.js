// Mortgage Calculator Logic
const principalInput = document.getElementById('principal');
const rateInput = document.getElementById('rate');
const termInput = document.getElementById('term');

const monthlyPaymentDisplay = document.getElementById('monthly-payment');
const totalInterestDisplay = document.getElementById('total-interest');
const totalCostDisplay = document.getElementById('total-cost');
const displayPrincipalDisplay = document.getElementById('display-principal');
const rateBadge = document.getElementById('rate-badge');

const ledgerSummary = document.getElementById('ledger-summary');
const receiptInterest = document.getElementById('receipt-interest');
const receiptPrincipal = document.getElementById('receipt-principal');
const receiptTotal = document.getElementById('receipt-total');

const rateComparisonGrid = document.getElementById('rate-comparison');

let amortizationChart = null;

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

function calculateMortgage() {
    const P = parseFloat(principalInput.value);
    const annualRate = parseFloat(rateInput.value);
    const years = parseInt(termInput.value);

    const r = annualRate / 100 / 12;
    const n = years * 12;

    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalCost = monthlyPayment * n;
    const totalInterest = totalCost - P;

    updateDisplay(monthlyPayment, totalInterest, totalCost, P, annualRate);
    updateLedger(P, totalInterest, totalCost);
    updateChart(P, annualRate, years);
    updateComparison(P, years);
}

function updateDisplay(monthly, interest, total, principal, rate) {
    monthlyPaymentDisplay.textContent = formatCurrency(monthly);
    totalInterestDisplay.textContent = formatCurrency(interest);
    totalCostDisplay.textContent = formatCurrency(total);
    displayPrincipalDisplay.textContent = formatCurrency(principal);
    rateBadge.textContent = `${rate.toFixed(2)}% RATE`;
}

function updateLedger(principal, interest, total) {
    receiptInterest.textContent = formatCurrencyPrecise(interest);
    receiptPrincipal.textContent = formatCurrencyPrecise(principal);
    receiptTotal.textContent = formatCurrencyPrecise(total);

    // Update lines in the ledger
    ledgerSummary.innerHTML = `
        <li>
            <span>TERM</span>
            <span>${termInput.value} YEARS</span>
        </li>
        <li>
            <span>ANNUAL RATE</span>
            <span>${rateInput.value}%</span>
        </li>
        <li>
            <span>MONTHS</span>
            <span>${termInput.value * 12}</span>
        </li>
    `;
}

function updateChart(P, annualRate, years) {
    const r = annualRate / 100 / 12;
    const n = years * 12;
    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

    const labels = [];
    const interestData = [];
    const principalData = [];

    let balance = P;
    
    // Aggregate by year for the chart
    for (let year = 1; year <= years; year++) {
        let yearlyInterest = 0;
        let yearlyPrincipal = 0;

        for (let month = 1; month <= 12; month++) {
            const interestM = balance * r;
            const principalM = monthlyPayment - interestM;
            yearlyInterest += interestM;
            yearlyPrincipal += principalM;
            balance -= principalM;
        }

        labels.push(`Year ${year}`);
        interestData.push(yearlyInterest);
        principalData.push(yearlyPrincipal);
    }

    const ctx = document.getElementById('amortization-chart').getContext('2d');
    
    if (amortizationChart) {
        amortizationChart.destroy();
    }

    amortizationChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Interest',
                    data: interestData,
                    backgroundColor: '#050505',
                },
                {
                    label: 'Principal',
                    data: principalData,
                    backgroundColor: '#d9d7d1',
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false }
                },
                y: {
                    stacked: true,
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

function updateComparison(P, years) {
    const currentRate = parseFloat(rateInput.value);
    const rates = [currentRate - 2, currentRate - 1, currentRate, currentRate + 1, currentRate + 2];
    
    rateComparisonGrid.innerHTML = '';
    
    rates.forEach(rate => {
        if (rate <= 0) return;
        
        const r = rate / 100 / 12;
        const n = years * 12;
        const monthly = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        const totalInterest = (monthly * n) - P;
        
        const card = document.createElement('div');
        card.className = 'comparison-card';
        card.innerHTML = `
            <p class="label">${rate.toFixed(2)}% RATE</p>
            <div class="value">${formatCurrency(monthly)}/mo</div>
            <p class="label">TOTAL INTEREST</p>
            <div class="value">${formatCurrency(totalInterest)}</div>
        `;
        rateComparisonGrid.appendChild(card);
    });
}

function setRate(rate) {
    rateInput.value = rate;
    calculateMortgage();
}

function setTerm(years) {
    termInput.value = years;
    calculateMortgage();
}

// Event Listeners
[principalInput, rateInput, termInput].forEach(input => {
    input.addEventListener('input', calculateMortgage);
});

// Navigation Scroll Spy (simplified)
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
calculateMortgage();

