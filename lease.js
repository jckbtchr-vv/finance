// Lease Calculator Logic
const msrpInput = document.getElementById('msrp');
const residualPercentInput = document.getElementById('residual');
const moneyFactorInput = document.getElementById('money-factor');
const termInput = document.getElementById('term');

const monthlyPaymentDisplay = document.getElementById('monthly-payment');
const totalCostDisplay = document.getElementById('total-cost-display');
const displayDepreciation = document.getElementById('display-depreciation');
const displayRent = document.getElementById('display-rent');
const residualBadge = document.getElementById('residual-badge');

const ledgerSummary = document.getElementById('ledger-summary');
const receiptDepreciation = document.getElementById('receipt-depreciation');
const receiptRent = document.getElementById('receipt-rent');
const receiptTotal = document.getElementById('receipt-total');

let leaseChart = null;

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

function calculateLease() {
    const msrp = parseFloat(msrpInput.value);
    const residualPercent = parseFloat(residualPercentInput.value);
    const mf = parseFloat(moneyFactorInput.value);
    const months = parseInt(termInput.value);

    const residualValue = msrp * (residualPercent / 100);
    const depreciationTotal = msrp - residualValue;
    const monthlyDepreciation = depreciationTotal / months;
    
    const monthlyRentCharge = (msrp + residualValue) * mf;
    const monthlyTotal = monthlyDepreciation + monthlyRentCharge;
    const totalLeaseCost = monthlyTotal * months;

    updateDisplay(monthlyTotal, totalLeaseCost, depreciationTotal, monthlyRentCharge * months, residualPercent);
    updateLedger(monthlyDepreciation, monthlyRentCharge, monthlyTotal);
    updateChart(monthlyDepreciation, monthlyRentCharge);
}

function updateDisplay(monthly, total, depreciation, rent, residual) {
    monthlyPaymentDisplay.textContent = formatCurrency(monthly);
    totalCostDisplay.textContent = formatCurrency(total);
    displayDepreciation.textContent = formatCurrency(depreciation);
    displayRent.textContent = formatCurrency(rent);
    residualBadge.textContent = `${residual}% RESIDUAL`;
}

function updateLedger(depreciation, rent, total) {
    receiptDepreciation.textContent = formatCurrencyPrecise(depreciation);
    receiptRent.textContent = formatCurrencyPrecise(rent);
    receiptTotal.textContent = formatCurrencyPrecise(total);

    ledgerSummary.innerHTML = `
        <li>
            <span>MSRP</span>
            <span>${formatCurrency(parseFloat(msrpInput.value))}</span>
        </li>
        <li>
            <span>TERM</span>
            <span>${termInput.value} MONTHS</span>
        </li>
        <li>
            <span>MONEY FACTOR</span>
            <span>${moneyFactorInput.value}</span>
        </li>
        <li>
            <span>RESIDUAL</span>
            <span>${residualPercentInput.value}%</span>
        </li>
    `;
}

function updateChart(depreciation, rent) {
    const ctx = document.getElementById('lease-breakdown-chart').getContext('2d');
    
    if (leaseChart) {
        leaseChart.destroy();
    }

    leaseChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Depreciation', 'Rent Charge'],
            datasets: [{
                data: [depreciation, rent],
                backgroundColor: ['#050505', '#d9d7d1'],
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
                        font: { family: 'Departure Mono', size: 14 }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

function setResidual(percent) {
    residualPercentInput.value = percent;
    calculateLease();
}

function setTerm(months) {
    termInput.value = months;
    calculateLease();
}

// Event Listeners
[msrpInput, residualPercentInput, moneyFactorInput, termInput].forEach(input => {
    input.addEventListener('input', calculateLease);
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
calculateLease();

