// Opportunity Cost Calculator Logic
const expenditureInput = document.getElementById('expenditure');
const returnRateInput = document.getElementById('return-rate');
const yearsInput = document.getElementById('years');

const futureValueDisplay = document.getElementById('future-value');
const opportunityCostDisplay = document.getElementById('opportunity-cost');
const multiplierDisplay = document.getElementById('multiplier');
const totalGainDisplay = document.getElementById('total-gain');
const yearsBadge = document.getElementById('years-badge');

const ledgerSummary = document.getElementById('ledger-summary');
const receiptSpent = document.getElementById('receipt-spent');
const receiptFuture = document.getElementById('receipt-future');
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

function calculateOpportunityCost() {
    const expenditure = parseFloat(expenditureInput.value);
    const rate = parseFloat(returnRateInput.value) / 100;
    const years = parseInt(yearsInput.value);

    // Future Value = P * (1 + r)^n
    const futureValue = expenditure * Math.pow(1 + rate, years);
    const opportunityCost = futureValue - expenditure;
    const multiplier = futureValue / expenditure;

    updateDisplay(futureValue, opportunityCost, multiplier, years);
    updateLedger(expenditure, futureValue, opportunityCost, rate, years);
    updateChart(expenditure, rate, years);
}

function updateDisplay(futureValue, opportunityCost, multiplier, years) {
    futureValueDisplay.textContent = formatCurrency(futureValue);
    opportunityCostDisplay.textContent = formatCurrency(opportunityCost);
    multiplierDisplay.textContent = multiplier.toFixed(2) + 'x';
    totalGainDisplay.textContent = formatCurrency(opportunityCost);
    yearsBadge.textContent = `${years} YEARS`;
}

function updateLedger(expenditure, futureValue, opportunityCost, rate, years) {
    receiptSpent.textContent = formatCurrencyPrecise(expenditure);
    receiptFuture.textContent = formatCurrencyPrecise(futureValue);
    receiptCost.textContent = formatCurrencyPrecise(opportunityCost);

    // Show milestones
    const milestones = [5, 10, 20, 30].filter(y => y <= years);
    let html = '';
    milestones.forEach(y => {
        const value = expenditure * Math.pow(1 + rate, y);
        html += `<li><span>YEAR ${y}</span><span>${formatCurrency(value)}</span></li>`;
    });
    ledgerSummary.innerHTML = html;
}

function updateChart(expenditure, rate, years) {
    const labels = [];
    const values = [];
    const baseline = [];

    for (let y = 0; y <= years; y++) {
        labels.push(`Year ${y}`);
        values.push(expenditure * Math.pow(1 + rate, y));
        baseline.push(expenditure);
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
                    label: 'Invested Value',
                    data: values,
                    borderColor: '#050505',
                    backgroundColor: 'rgba(5, 5, 5, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Original Amount',
                    data: baseline,
                    borderColor: '#d9d7d1',
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

function setReturn(rate) {
    returnRateInput.value = rate;
    calculateOpportunityCost();
}

function setYears(years) {
    yearsInput.value = years;
    calculateOpportunityCost();
}

// Event Listeners
[expenditureInput, returnRateInput, yearsInput].forEach(input => {
    input.addEventListener('input', calculateOpportunityCost);
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
calculateOpportunityCost();

