// Habit Cost Calculator Logic
const habitCostInput = document.getElementById('habit-cost');
const frequencySelect = document.getElementById('frequency');
const returnRateInput = document.getElementById('return-rate');
const yearsInput = document.getElementById('years');

const futureValueDisplay = document.getElementById('future-value');
const totalSpentDisplay = document.getElementById('total-spent');
const yearlyCostDisplay = document.getElementById('yearly-cost');
const opportunityCostDisplay = document.getElementById('opportunity-cost');
const yearsBadge = document.getElementById('years-badge');

const ledgerSummary = document.getElementById('ledger-summary');
const receiptSpent = document.getElementById('receipt-spent');
const receiptInvested = document.getElementById('receipt-invested');
const receiptCost = document.getElementById('receipt-cost');

let growthChart = null;

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

function getYearlyAmount(habitCost, frequency) {
    switch (frequency) {
        case 'daily':
            return habitCost * 365;
        case 'weekly':
            return habitCost * 52;
        case 'monthly':
            return habitCost * 12;
        default:
            return habitCost * 365;
    }
}

function getFrequencyLabel(frequency) {
    switch (frequency) {
        case 'daily': return 'day';
        case 'weekly': return 'week';
        case 'monthly': return 'month';
        default: return 'day';
    }
}

function calculateHabitCost() {
    const habitCost = parseFloat(habitCostInput.value);
    const frequency = frequencySelect.value;
    const rate = parseFloat(returnRateInput.value) / 100;
    const years = parseInt(yearsInput.value);

    const yearlyAmount = getYearlyAmount(habitCost, frequency);
    const monthlyContribution = yearlyAmount / 12;
    
    // Calculate future value of recurring contributions
    // Using monthly compounding formula: FV = PMT × [((1 + r)^n - 1) / r]
    const monthlyRate = rate / 12;
    const totalMonths = years * 12;
    
    let futureValue = 0;
    if (monthlyRate > 0) {
        futureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    } else {
        futureValue = monthlyContribution * totalMonths;
    }
    
    const totalSpent = yearlyAmount * years;
    const opportunityCost = futureValue - totalSpent;

    updateDisplay(futureValue, totalSpent, yearlyAmount, opportunityCost, years);
    updateLedger(habitCost, frequency, yearlyAmount, totalSpent, futureValue, opportunityCost, rate, years);
    updateChart(yearlyAmount, rate, years);
}

function updateDisplay(futureValue, totalSpent, yearlyAmount, opportunityCost, years) {
    futureValueDisplay.textContent = formatCurrency(futureValue);
    totalSpentDisplay.textContent = formatCurrency(totalSpent);
    yearlyCostDisplay.textContent = formatCurrency(yearlyAmount);
    opportunityCostDisplay.textContent = formatCurrency(opportunityCost);
    yearsBadge.textContent = `${years} YEARS`;
}

function updateLedger(habitCost, frequency, yearlyAmount, totalSpent, futureValue, opportunityCost, rate, years) {
    receiptSpent.textContent = formatCurrencyPrecise(totalSpent);
    receiptInvested.textContent = formatCurrencyPrecise(futureValue);
    receiptCost.textContent = formatCurrencyPrecise(opportunityCost);

    const freqLabel = getFrequencyLabel(frequency);
    const monthlyContribution = yearlyAmount / 12;
    const monthlyRate = rate / 12;

    // Show milestones
    const milestones = [5, 10, 20, 30].filter(y => y <= years);
    let html = `<li><span>$${habitCost.toFixed(2)}/${freqLabel.toUpperCase()}</span><span>${formatCurrency(yearlyAmount)}/YR</span></li>`;
    
    milestones.forEach(y => {
        const months = y * 12;
        let value;
        if (monthlyRate > 0) {
            value = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        } else {
            value = monthlyContribution * months;
        }
        html += `<li><span>YEAR ${y}</span><span>${formatCurrency(value)}</span></li>`;
    });
    
    ledgerSummary.innerHTML = html;
}

function updateChart(yearlyAmount, rate, years) {
    const labels = [];
    const investedValues = [];
    const spentValues = [];
    
    const monthlyContribution = yearlyAmount / 12;
    const monthlyRate = rate / 12;

    for (let y = 0; y <= years; y++) {
        labels.push(`Year ${y}`);
        
        const months = y * 12;
        let invested;
        if (monthlyRate > 0) {
            invested = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
        } else {
            invested = monthlyContribution * months;
        }
        
        investedValues.push(invested);
        spentValues.push(yearlyAmount * y);
    }

    const ctx = document.getElementById('growth-chart').getContext('2d');
    
    if (growthChart) {
        growthChart.destroy();
    }

    growthChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'If Invested',
                    data: investedValues,
                    borderColor: '#050505',
                    backgroundColor: 'rgba(5, 5, 5, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Total Spent',
                    data: spentValues,
                    borderColor: '#999999',
                    borderDash: [5, 5],
                    fill: false
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

function setHabit(amount) {
    habitCostInput.value = amount;
    calculateHabitCost();
}

function setFrequency(freq) {
    frequencySelect.value = freq;
    calculateHabitCost();
}

function setReturn(rate) {
    returnRateInput.value = rate;
    calculateHabitCost();
}

function setYears(years) {
    yearsInput.value = years;
    calculateHabitCost();
}

// Event Listeners
[habitCostInput, returnRateInput, yearsInput].forEach(input => {
    input.addEventListener('input', calculateHabitCost);
});
frequencySelect.addEventListener('change', calculateHabitCost);

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
calculateHabitCost();
