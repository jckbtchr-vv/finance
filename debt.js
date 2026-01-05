// Debt Payoff Calculator Logic
let debts = [
    { name: 'Credit Card', balance: 5000, rate: 22, minimum: 150 },
    { name: 'Car Loan', balance: 12000, rate: 6, minimum: 300 },
    { name: 'Student Loan', balance: 25000, rate: 5, minimum: 280 }
];

const extraPaymentInput = document.getElementById('extra-payment');
const totalDebtDisplay = document.getElementById('total-debt');
const debtCountBadge = document.getElementById('debt-count');
const interestSavedDisplay = document.getElementById('interest-saved');
const snowballMonthsDisplay = document.getElementById('snowball-months');
const avalancheMonthsDisplay = document.getElementById('avalanche-months');

const ledgerSummary = document.getElementById('ledger-summary');
const receiptSnowballInterest = document.getElementById('receipt-snowball-interest');
const receiptAvalancheInterest = document.getElementById('receipt-avalanche-interest');
const receiptSavings = document.getElementById('receipt-savings');

// Strategy cards
const snowballTime = document.getElementById('snowball-time');
const snowballInterest = document.getElementById('snowball-interest');
const snowballTotal = document.getElementById('snowball-total');
const avalancheTime = document.getElementById('avalanche-time');
const avalancheInterest = document.getElementById('avalanche-interest');
const avalancheTotal = document.getElementById('avalanche-total');
const snowballCard = document.getElementById('snowball-card');
const avalancheCard = document.getElementById('avalanche-card');

let payoffChart = null;

function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function renderDebtList() {
    const container = document.getElementById('debt-list');
    container.innerHTML = debts.map((debt, index) => `
        <div class="debt-item">
            <div>
                <label>NAME</label>
                <input type="text" value="${debt.name}" onchange="updateDebt(${index}, 'name', this.value)">
            </div>
            <div>
                <label>BALANCE</label>
                <input type="number" value="${debt.balance}" onchange="updateDebt(${index}, 'balance', this.value)">
            </div>
            <div>
                <label>APR %</label>
                <input type="number" value="${debt.rate}" step="0.1" onchange="updateDebt(${index}, 'rate', this.value)">
            </div>
            <div>
                <label>MIN PMT</label>
                <input type="number" value="${debt.minimum}" onchange="updateDebt(${index}, 'minimum', this.value)">
            </div>
            <button onclick="removeDebt(${index})">×</button>
        </div>
    `).join('');
}

function addDebt() {
    debts.push({ name: 'New Debt', balance: 1000, rate: 10, minimum: 50 });
    renderDebtList();
    calculatePayoff();
}

function removeDebt(index) {
    debts.splice(index, 1);
    renderDebtList();
    calculatePayoff();
}

function updateDebt(index, field, value) {
    if (field === 'name') {
        debts[index][field] = value;
    } else {
        debts[index][field] = parseFloat(value) || 0;
    }
    calculatePayoff();
}

function simulatePayoff(debtsCopy, extraPayment, strategy) {
    // Deep copy debts
    let simDebts = debtsCopy.map(d => ({ ...d }));
    let totalInterest = 0;
    let months = 0;
    const maxMonths = 600; // Cap at 50 years
    const balanceHistory = [];
    
    // Sort debts based on strategy
    const sortDebts = () => {
        if (strategy === 'snowball') {
            simDebts.sort((a, b) => a.balance - b.balance);
        } else { // avalanche
            simDebts.sort((a, b) => b.rate - a.rate);
        }
    };

    while (simDebts.some(d => d.balance > 0) && months < maxMonths) {
        months++;
        sortDebts();
        
        let availableExtra = extraPayment;
        let monthlyTotalBalance = 0;
        
        // First, pay minimum on all debts and calculate interest
        for (let debt of simDebts) {
            if (debt.balance <= 0) continue;
            
            // Calculate monthly interest
            const monthlyRate = debt.rate / 100 / 12;
            const interest = debt.balance * monthlyRate;
            totalInterest += interest;
            debt.balance += interest;
            
            // Pay minimum
            const minPayment = Math.min(debt.minimum, debt.balance);
            debt.balance -= minPayment;
            
            if (debt.balance < 0) debt.balance = 0;
        }
        
        // Then apply extra payment to target debt
        for (let debt of simDebts) {
            if (debt.balance <= 0 || availableExtra <= 0) continue;
            
            const extraPaid = Math.min(availableExtra, debt.balance);
            debt.balance -= extraPaid;
            availableExtra -= extraPaid;
            
            if (debt.balance < 0) debt.balance = 0;
        }
        
        // Calculate total remaining balance
        for (let debt of simDebts) {
            monthlyTotalBalance += Math.max(0, debt.balance);
        }
        
        balanceHistory.push(monthlyTotalBalance);
    }
    
    const totalPaid = debtsCopy.reduce((sum, d) => sum + d.balance, 0) + totalInterest;
    
    return {
        months,
        totalInterest,
        totalPaid,
        balanceHistory
    };
}

function calculatePayoff() {
    if (debts.length === 0) {
        updateDisplayEmpty();
        return;
    }

    const extraPayment = parseFloat(extraPaymentInput.value) || 0;
    const totalDebt = debts.reduce((sum, d) => sum + d.balance, 0);
    
    // Simulate both strategies
    const snowball = simulatePayoff(debts, extraPayment, 'snowball');
    const avalanche = simulatePayoff(debts, extraPayment, 'avalanche');
    
    const interestSaved = snowball.totalInterest - avalanche.totalInterest;
    
    updateDisplay(totalDebt, snowball, avalanche, interestSaved);
    updateLedger(snowball, avalanche, interestSaved);
    updateStrategyCards(snowball, avalanche);
    updateChart(snowball.balanceHistory, avalanche.balanceHistory);
}

function updateDisplayEmpty() {
    totalDebtDisplay.textContent = '$0';
    debtCountBadge.textContent = '0 DEBTS';
    interestSavedDisplay.textContent = '$0';
    snowballMonthsDisplay.textContent = '0 mo';
    avalancheMonthsDisplay.textContent = '0 mo';
}

function updateDisplay(totalDebt, snowball, avalanche, interestSaved) {
    totalDebtDisplay.textContent = formatCurrency(totalDebt);
    debtCountBadge.textContent = `${debts.length} DEBT${debts.length !== 1 ? 'S' : ''}`;
    interestSavedDisplay.textContent = formatCurrency(Math.max(0, interestSaved));
    snowballMonthsDisplay.textContent = `${snowball.months} mo`;
    avalancheMonthsDisplay.textContent = `${avalanche.months} mo`;
}

function updateLedger(snowball, avalanche, interestSaved) {
    receiptSnowballInterest.textContent = formatCurrency(snowball.totalInterest);
    receiptAvalancheInterest.textContent = formatCurrency(avalanche.totalInterest);
    receiptSavings.textContent = formatCurrency(Math.max(0, interestSaved));

    let html = '';
    debts.forEach(debt => {
        html += `<li><span>${debt.name.toUpperCase()}</span><span>${formatCurrency(debt.balance)} @ ${debt.rate}%</span></li>`;
    });
    ledgerSummary.innerHTML = html;
}

function updateStrategyCards(snowball, avalanche) {
    const formatMonths = (months) => {
        const years = Math.floor(months / 12);
        const mo = months % 12;
        if (years === 0) return `${mo} months`;
        if (mo === 0) return `${years} years`;
        return `${years}y ${mo}mo`;
    };

    snowballTime.textContent = formatMonths(snowball.months);
    snowballInterest.textContent = formatCurrency(snowball.totalInterest);
    snowballTotal.textContent = formatCurrency(snowball.totalPaid);
    
    avalancheTime.textContent = formatMonths(avalanche.months);
    avalancheInterest.textContent = formatCurrency(avalanche.totalInterest);
    avalancheTotal.textContent = formatCurrency(avalanche.totalPaid);
    
    // Highlight winner
    snowballCard.classList.remove('winner');
    avalancheCard.classList.remove('winner');
    
    if (avalanche.totalInterest < snowball.totalInterest) {
        avalancheCard.classList.add('winner');
    } else if (snowball.totalInterest < avalanche.totalInterest) {
        snowballCard.classList.add('winner');
    }
}

function updateChart(snowballHistory, avalancheHistory) {
    const maxLength = Math.max(snowballHistory.length, avalancheHistory.length);
    const labels = [];
    for (let i = 1; i <= maxLength; i++) {
        if (i % 6 === 0 || i === 1 || i === maxLength) {
            labels.push(`Mo ${i}`);
        } else {
            labels.push('');
        }
    }

    // Pad shorter array with zeros
    while (snowballHistory.length < maxLength) snowballHistory.push(0);
    while (avalancheHistory.length < maxLength) avalancheHistory.push(0);

    const ctx = document.getElementById('payoff-chart').getContext('2d');
    
    if (payoffChart) {
        payoffChart.destroy();
    }

    payoffChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Snowball',
                    data: snowballHistory,
                    borderColor: '#050505',
                    backgroundColor: 'rgba(5, 5, 5, 0.05)',
                    fill: true,
                    tension: 0.2
                },
                {
                    label: 'Avalanche',
                    data: avalancheHistory,
                    borderColor: '#888888',
                    borderDash: [5, 5],
                    fill: false,
                    tension: 0.2
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

function setExtra(amount) {
    extraPaymentInput.value = amount;
    calculatePayoff();
}

// Event Listeners
extraPaymentInput.addEventListener('input', calculatePayoff);

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

// Initial render
renderDebtList();
calculatePayoff();

