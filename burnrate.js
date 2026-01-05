// Burn Rate Calculator Logic
const incomeInput = document.getElementById('income');
const housingInput = document.getElementById('housing');
const utilitiesInput = document.getElementById('utilities');
const foodInput = document.getElementById('food');
const transportInput = document.getElementById('transport');
const subscriptionsInput = document.getElementById('subscriptions');
const otherInput = document.getElementById('other');
const savingsInput = document.getElementById('savings');

const hourlyCostDisplay = document.getElementById('hourly-cost');
const dailyCostDisplay = document.getElementById('daily-cost');
const monthlyCostDisplay = document.getElementById('monthly-cost');
const statusBadge = document.getElementById('status-badge');
const timeBankedDisplay = document.getElementById('time-banked');
const runwayDisplay = document.getElementById('runway');
const annualBurnDisplay = document.getElementById('annual-burn');

const ledgerSummary = document.getElementById('ledger-summary');
const receiptIncome = document.getElementById('receipt-income');
const receiptExpenses = document.getElementById('receipt-expenses');
const receiptNet = document.getElementById('receipt-net');
const receiptTime = document.getElementById('receipt-time');

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

function formatTime(hours) {
    if (hours >= 24) {
        const days = Math.floor(hours / 24);
        const remainingHours = Math.round(hours % 24);
        if (remainingHours > 0) {
            return `${days}d ${remainingHours}h`;
        }
        return `${days} days`;
    }
    return `${Math.round(hours)} hours`;
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
    
    // Time-based calculations
    const dailyCost = totalExpenses / 30;
    const hourlyCost = totalExpenses / (30 * 24); // Cost per hour of existing
    const annualBurn = totalExpenses * 12;
    
    // Time banked: how many hours/days of freedom you're banking each month
    // If you have surplus, divide by hourly cost to get hours of freedom banked
    let timeBankedHours = 0;
    if (monthlyNet > 0 && hourlyCost > 0) {
        timeBankedHours = monthlyNet / hourlyCost;
    }
    
    // Runway calculation (if spending more than earning, how long until savings depleted)
    let runway;
    if (monthlyNet < 0) {
        runway = Math.abs(savings / monthlyNet);
    } else if (totalExpenses > 0) {
        runway = savings / totalExpenses; // How long savings would last at current burn
    } else {
        runway = Infinity;
    }

    updateDisplay(hourlyCost, dailyCost, totalExpenses, monthlyNet, timeBankedHours, runway, annualBurn);
    updateLedger(income, housing, utilities, food, transport, subscriptions, other, totalExpenses, monthlyNet, hourlyCost, timeBankedHours);
    updateChart(housing, utilities, food, transport, subscriptions, other);
}

function updateDisplay(hourlyCost, dailyCost, monthlyCost, monthlyNet, timeBankedHours, runway, annualBurn) {
    hourlyCostDisplay.textContent = `$${hourlyCost.toFixed(2)}`;
    dailyCostDisplay.textContent = formatCurrency(dailyCost);
    monthlyCostDisplay.textContent = formatCurrency(monthlyCost);
    
    if (monthlyNet >= 0) {
        statusBadge.textContent = 'SURPLUS';
        statusBadge.style.borderColor = '#22c55e';
    } else {
        statusBadge.textContent = 'DEFICIT';
        statusBadge.style.borderColor = '#ef4444';
    }
    
    // Time banked display
    if (monthlyNet > 0) {
        timeBankedDisplay.textContent = `+${formatTime(timeBankedHours)}/mo`;
    } else if (monthlyNet < 0) {
        const hoursLost = Math.abs(monthlyNet / (hourlyCost || 1));
        timeBankedDisplay.textContent = `-${formatTime(hoursLost)}/mo`;
    } else {
        timeBankedDisplay.textContent = '0 hours';
    }
    
    if (runway === Infinity) {
        runwayDisplay.textContent = '∞';
    } else {
        runwayDisplay.textContent = `${runway.toFixed(1)} mo`;
    }
    
    annualBurnDisplay.textContent = formatCurrency(annualBurn);
}

function updateLedger(income, housing, utilities, food, transport, subscriptions, other, totalExpenses, monthlyNet, hourlyCost, timeBankedHours) {
    receiptIncome.textContent = formatCurrencyPrecise(income);
    receiptExpenses.textContent = formatCurrencyPrecise(totalExpenses);
    
    const netFormatted = monthlyNet >= 0 ? `+${formatCurrencyPrecise(monthlyNet)}` : formatCurrencyPrecise(monthlyNet);
    receiptNet.textContent = netFormatted;
    
    // Time surplus in receipt
    if (monthlyNet > 0) {
        receiptTime.textContent = `+${formatTime(timeBankedHours)}`;
    } else if (monthlyNet < 0) {
        const hoursLost = Math.abs(monthlyNet / (hourlyCost || 1));
        receiptTime.textContent = `-${formatTime(hoursLost)}`;
    } else {
        receiptTime.textContent = '0 hours';
    }

    const dailyCost = totalExpenses / 30;
    
    ledgerSummary.innerHTML = `
        <li><span>COST/HOUR</span><span>$${hourlyCost.toFixed(2)}</span></li>
        <li><span>COST/DAY</span><span>${formatCurrency(dailyCost)}</span></li>
        <li><span>─────────</span><span>─────────</span></li>
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
