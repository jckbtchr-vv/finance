// Salary Negotiation Impact Calculator Logic
const currentSalaryInput = document.getElementById('current-salary');
const raiseAmountInput = document.getElementById('raise-amount');
const annualRaiseInput = document.getElementById('annual-raise');
const yearsInput = document.getElementById('years-to-retirement');
const matchPercentInput = document.getElementById('match-percent');
const investmentReturnInput = document.getElementById('investment-return');

const lifetimeValueDisplay = document.getElementById('lifetime-value');
const negotiationWorthDisplay = document.getElementById('negotiation-worth');
const yearsBadge = document.getElementById('years-badge');
const earningsDiffDisplay = document.getElementById('earnings-diff');
const retirementDiffDisplay = document.getElementById('retirement-diff');

const ledgerSummary = document.getElementById('ledger-summary');
const receiptEarnings = document.getElementById('receipt-earnings');
const receiptRetirement = document.getElementById('receipt-retirement');
const receiptTotal = document.getElementById('receipt-total');

let projectionChart = null;

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function calculateNegotiationImpact() {
    const currentSalary = parseFloat(currentSalaryInput.value) || 0;
    const raiseAmount = parseFloat(raiseAmountInput.value) || 0;
    const annualRaise = parseFloat(annualRaiseInput.value) / 100 || 0;
    const years = parseInt(yearsInput.value) || 30;
    const matchPercent = parseFloat(matchPercentInput.value) / 100 || 0;
    const investmentReturn = parseFloat(investmentReturnInput.value) / 100 || 0;

    const newSalary = currentSalary + raiseAmount;

    // Calculate lifetime earnings for both scenarios
    let totalEarningsWithout = 0;
    let totalEarningsWith = 0;
    let salaryWithout = currentSalary;
    let salaryWith = newSalary;
    
    const withoutSalaries = [];
    const withSalaries = [];

    for (let year = 1; year <= years; year++) {
        totalEarningsWithout += salaryWithout;
        totalEarningsWith += salaryWith;
        
        withoutSalaries.push(salaryWithout);
        withSalaries.push(salaryWith);
        
        // Apply annual raise
        salaryWithout *= (1 + annualRaise);
        salaryWith *= (1 + annualRaise);
    }

    const earningsDifference = totalEarningsWith - totalEarningsWithout;

    // Calculate retirement account difference
    // Extra 401k match each year, invested and compounding
    let retirementWithout = 0;
    let retirementWith = 0;
    salaryWithout = currentSalary;
    salaryWith = newSalary;

    for (let year = 1; year <= years; year++) {
        // Annual 401k match contribution
        const matchWithout = salaryWithout * matchPercent;
        const matchWith = salaryWith * matchPercent;
        
        // Add to retirement and compound existing balance
        retirementWithout = (retirementWithout + matchWithout) * (1 + investmentReturn);
        retirementWith = (retirementWith + matchWith) * (1 + investmentReturn);
        
        // Apply annual raise for next year
        salaryWithout *= (1 + annualRaise);
        salaryWith *= (1 + annualRaise);
    }

    const retirementDifference = retirementWith - retirementWithout;
    const totalImpact = earningsDifference + retirementDifference;

    updateDisplay(totalImpact, earningsDifference, retirementDifference, years, raiseAmount);
    updateLedger(currentSalary, newSalary, raiseAmount, earningsDifference, retirementDifference, totalImpact, years);
    updateChart(withoutSalaries, withSalaries, years);
}

function updateDisplay(totalImpact, earningsDiff, retirementDiff, years, raiseAmount) {
    lifetimeValueDisplay.textContent = formatCurrency(totalImpact);
    negotiationWorthDisplay.textContent = formatCurrency(totalImpact);
    yearsBadge.textContent = `${years} YEARS`;
    earningsDiffDisplay.textContent = formatCurrency(earningsDiff);
    retirementDiffDisplay.textContent = formatCurrency(retirementDiff);
}

function updateLedger(currentSalary, newSalary, raiseAmount, earningsDiff, retirementDiff, totalImpact, years) {
    receiptEarnings.textContent = formatCurrency(earningsDiff);
    receiptRetirement.textContent = formatCurrency(retirementDiff);
    receiptTotal.textContent = formatCurrency(totalImpact);

    const multiplier = totalImpact / raiseAmount;

    ledgerSummary.innerHTML = `
        <li><span>CURRENT SALARY</span><span>${formatCurrency(currentSalary)}</span></li>
        <li><span>RAISE AMOUNT</span><span>+${formatCurrency(raiseAmount)}</span></li>
        <li><span>NEW SALARY</span><span>${formatCurrency(newSalary)}</span></li>
        <li><span>─────────</span><span>─────────</span></li>
        <li><span>YEARS</span><span>${years}</span></li>
        <li><span>MULTIPLIER</span><span>${multiplier.toFixed(0)}x</span></li>
    `;
}

function updateChart(withoutSalaries, withSalaries, years) {
    const labels = [];
    for (let i = 1; i <= years; i++) {
        labels.push(`Year ${i}`);
    }

    const ctx = document.getElementById('projection-chart').getContext('2d');
    
    if (projectionChart) {
        projectionChart.destroy();
    }

    projectionChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'With Raise',
                    data: withSalaries,
                    borderColor: '#050505',
                    backgroundColor: 'rgba(5, 5, 5, 0.1)',
                    fill: true,
                    tension: 0.4
                },
                {
                    label: 'Without Raise',
                    data: withoutSalaries,
                    borderColor: '#999999',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.4
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: false,
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

function setRaise(amount) {
    raiseAmountInput.value = amount;
    calculateNegotiationImpact();
}

function setYears(years) {
    yearsInput.value = years;
    calculateNegotiationImpact();
}

// Event Listeners
const inputs = [currentSalaryInput, raiseAmountInput, annualRaiseInput, yearsInput, matchPercentInput, investmentReturnInput];
inputs.forEach(input => {
    input.addEventListener('input', calculateNegotiationImpact);
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
calculateNegotiationImpact();

