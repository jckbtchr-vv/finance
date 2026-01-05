// Burn Rate Calculator Logic
const incomeInput = document.getElementById('income');
const housingInput = document.getElementById('housing');
const utilitiesInput = document.getElementById('utilities');
const foodInput = document.getElementById('food');
const transportInput = document.getElementById('transport');
const subscriptionsInput = document.getElementById('subscriptions');
const otherInput = document.getElementById('other');
const savingsInput = document.getElementById('savings');

const dailyCostDisplay = document.getElementById('daily-cost');
const monthlyNetDisplay = document.getElementById('monthly-net');
const statusBadge = document.getElementById('status-badge');
const runwayDisplay = document.getElementById('runway');
const annualBurnDisplay = document.getElementById('annual-burn');

const ledgerSummary = document.getElementById('ledger-summary');
const receiptIncome = document.getElementById('receipt-income');
const receiptExpenses = document.getElementById('receipt-expenses');
const receiptNet = document.getElementById('receipt-net');

let breakdownChart = null;

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

function calculateBurnRate() {
    const income = parseFloat(incomeInput.value) || 0;
    const housing = parseFloat(housingInput.value) || 0;
    const utilities = parseFloat(utilitiesInput.value) || 0;
    const food = parseFloat(foodInput.value) || 0;
    const transport = parseFloat(transportInput.value) || 0;
    const subscriptions = parseFloat(subscriptionsInput.value) || 0;
    const other = parseFloat(otherInput.value) || 0;
    const savings = parseFloat(savingsInput.value) || 0;

    const totalExpenses = housing + utilities + food + transport + subscriptions + other;
    const monthlyNet = income - totalExpenses;
    const dailyCost = totalExpenses / 30;
    const annualBurn = totalExpenses * 12;
    
    // Runway calculation (if spending more than earning, how long until savings depleted)
    let runway;
    if (monthlyNet < 0) {
        runway = Math.abs(savings / monthlyNet);
    } else {
        runway = Infinity;
    }

    updateDisplay(dailyCost, monthlyNet, runway, annualBurn);
    updateLedger(income, housing, utilities, food, transport, subscriptions, other, totalExpenses, monthlyNet);
    updateChart(housing, utilities, food, transport, subscriptions, other);
}

function updateDisplay(dailyCost, monthlyNet, runway, annualBurn) {
    dailyCostDisplay.textContent = formatCurrency(dailyCost);
    
    const netFormatted = monthlyNet >= 0 ? `+${formatCurrency(monthlyNet)}` : formatCurrency(monthlyNet);
    monthlyNetDisplay.textContent = netFormatted;
    
    if (monthlyNet >= 0) {
        statusBadge.textContent = 'SURPLUS';
        statusBadge.style.borderColor = '#22c55e';
    } else {
        statusBadge.textContent = 'DEFICIT';
        statusBadge.style.borderColor = '#ef4444';
    }
    
    if (runway === Infinity) {
        runwayDisplay.textContent = '∞ (surplus)';
    } else {
        runwayDisplay.textContent = `${runway.toFixed(1)} months`;
    }
    
    annualBurnDisplay.textContent = formatCurrency(annualBurn);
}

function updateLedger(income, housing, utilities, food, transport, subscriptions, other, totalExpenses, monthlyNet) {
    receiptIncome.textContent = formatCurrencyPrecise(income);
    receiptExpenses.textContent = formatCurrencyPrecise(totalExpenses);
    
    const netFormatted = monthlyNet >= 0 ? `+${formatCurrencyPrecise(monthlyNet)}` : formatCurrencyPrecise(monthlyNet);
    receiptNet.textContent = netFormatted;

    ledgerSummary.innerHTML = `
        <li><span>HOUSING</span><span>${formatCurrency(housing)}</span></li>
        <li><span>UTILITIES</span><span>${formatCurrency(utilities)}</span></li>
        <li><span>FOOD</span><span>${formatCurrency(food)}</span></li>
        <li><span>TRANSPORT</span><span>${formatCurrency(transport)}</span></li>
        <li><span>SUBSCRIPTIONS</span><span>${formatCurrency(subscriptions)}</span></li>
        <li><span>OTHER</span><span>${formatCurrency(other)}</span></li>
    `;
}

function updateChart(housing, utilities, food, transport, subscriptions, other) {
    const ctx = document.getElementById('breakdown-chart').getContext('2d');
    
    if (breakdownChart) {
        breakdownChart.destroy();
    }

    breakdownChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Housing', 'Utilities', 'Food', 'Transport', 'Subscriptions', 'Other'],
            datasets: [{
                data: [housing, utilities, food, transport, subscriptions, other],
                backgroundColor: [
                    '#050505',
                    '#333333',
                    '#555555',
                    '#777777',
                    '#999999',
                    '#d9d7d1'
                ],
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { family: 'Departure Mono', size: 12 }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Event Listeners
const inputs = [incomeInput, housingInput, utilitiesInput, foodInput, transportInput, subscriptionsInput, otherInput, savingsInput];
inputs.forEach(input => {
    input.addEventListener('input', calculateBurnRate);
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
calculateBurnRate();

