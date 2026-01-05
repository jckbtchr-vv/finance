// True Hourly Rate Calculator Logic
const salaryInput = document.getElementById('salary');
const weeklyHoursInput = document.getElementById('weekly-hours');
const commuteInput = document.getElementById('commute');
const prepTimeInput = document.getElementById('prep-time');
const overtimeInput = document.getElementById('overtime');
const workExpensesInput = document.getElementById('work-expenses');

const trueRateDisplay = document.getElementById('true-rate');
const advertisedRateDisplay = document.getElementById('advertised-rate');
const differenceBadge = document.getElementById('difference-badge');
const realHoursDisplay = document.getElementById('real-hours');
const netCompDisplay = document.getElementById('net-comp');

const ledgerSummary = document.getElementById('ledger-summary');
const receiptSalary = document.getElementById('receipt-salary');
const receiptExpenses = document.getElementById('receipt-expenses');
const receiptNet = document.getElementById('receipt-net');
const receiptTrueRate = document.getElementById('receipt-true-rate');

let hoursChart = null;

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

function calculateTrueRate() {
    const salary = parseFloat(salaryInput.value) || 0;
    const weeklyHours = parseFloat(weeklyHoursInput.value) || 40;
    const commuteMinutes = parseFloat(commuteInput.value) || 0;
    const prepMinutes = parseFloat(prepTimeInput.value) || 0;
    const overtimeHours = parseFloat(overtimeInput.value) || 0;
    const monthlyExpenses = parseFloat(workExpensesInput.value) || 0;

    const weeksPerYear = 50; // Assuming 2 weeks vacation
    const daysPerWeek = 5;

    // Calculate advertised hourly rate
    const advertisedHoursPerYear = weeklyHours * weeksPerYear;
    const advertisedRate = salary / advertisedHoursPerYear;

    // Calculate REAL hours spent on work
    const commuteHoursPerDay = commuteMinutes / 60;
    const prepHoursPerDay = prepMinutes / 60;
    
    const dailyWorkHours = (weeklyHours / daysPerWeek) + commuteHoursPerDay + prepHoursPerDay;
    const weeklyRealHours = (dailyWorkHours * daysPerWeek) + overtimeHours;
    const yearlyRealHours = weeklyRealHours * weeksPerYear;

    // Calculate net compensation (after work expenses)
    const yearlyExpenses = monthlyExpenses * 12;
    const netCompensation = salary - yearlyExpenses;

    // Calculate TRUE hourly rate
    const trueRate = netCompensation / yearlyRealHours;

    // Calculate difference
    const difference = ((trueRate - advertisedRate) / advertisedRate) * 100;

    updateDisplay(trueRate, advertisedRate, difference, yearlyRealHours, netCompensation);
    updateLedger(salary, yearlyExpenses, netCompensation, trueRate, advertisedHoursPerYear, yearlyRealHours, commuteHoursPerDay, prepHoursPerDay, overtimeHours, weeklyHours);
    updateChart(weeklyHours, commuteHoursPerDay * daysPerWeek, prepHoursPerDay * daysPerWeek, overtimeHours);
}

function updateDisplay(trueRate, advertisedRate, difference, realHours, netComp) {
    trueRateDisplay.textContent = `$${trueRate.toFixed(2)}`;
    advertisedRateDisplay.textContent = `$${advertisedRate.toFixed(2)}/hr`;
    
    const diffText = difference >= 0 ? `+${difference.toFixed(0)}%` : `${difference.toFixed(0)}%`;
    differenceBadge.textContent = diffText;
    differenceBadge.style.borderColor = difference >= 0 ? '#22c55e' : '#ef4444';
    
    realHoursDisplay.textContent = Math.round(realHours).toLocaleString();
    netCompDisplay.textContent = formatCurrency(netComp);
}

function updateLedger(salary, expenses, netComp, trueRate, advertisedHours, realHours, commutePerDay, prepPerDay, overtime, weeklyHours) {
    receiptSalary.textContent = formatCurrency(salary);
    receiptExpenses.textContent = `-${formatCurrency(expenses)}`;
    receiptNet.textContent = formatCurrency(netComp);
    receiptTrueRate.textContent = `$${trueRate.toFixed(2)}/hr`;

    const advertisedRate = salary / advertisedHours;
    const extraHours = realHours - advertisedHours;

    ledgerSummary.innerHTML = `
        <li><span>ADVERTISED RATE</span><span>$${advertisedRate.toFixed(2)}/hr</span></li>
        <li><span>ADVERTISED HRS/YR</span><span>${Math.round(advertisedHours).toLocaleString()}</span></li>
        <li><span>─────────</span><span>─────────</span></li>
        <li><span>COMMUTE/DAY</span><span>+${commutePerDay.toFixed(1)}h</span></li>
        <li><span>PREP/DAY</span><span>+${prepPerDay.toFixed(1)}h</span></li>
        <li><span>OVERTIME/WK</span><span>+${overtime}h</span></li>
        <li><span>─────────</span><span>─────────</span></li>
        <li><span>REAL HRS/YEAR</span><span>${Math.round(realHours).toLocaleString()}</span></li>
        <li><span>EXTRA HOURS</span><span>+${Math.round(extraHours).toLocaleString()}</span></li>
    `;
}

function updateChart(weeklyBase, weeklyCommute, weeklyPrep, weeklyOvertime) {
    const ctx = document.getElementById('hours-chart').getContext('2d');
    
    if (hoursChart) {
        hoursChart.destroy();
    }

    hoursChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Weekly Hours Breakdown'],
            datasets: [
                {
                    label: 'On the Clock',
                    data: [weeklyBase],
                    backgroundColor: '#050505'
                },
                {
                    label: 'Commute',
                    data: [weeklyCommute],
                    backgroundColor: '#555555'
                },
                {
                    label: 'Prep Time',
                    data: [weeklyPrep],
                    backgroundColor: '#888888'
                },
                {
                    label: 'Unpaid Overtime',
                    data: [weeklyOvertime],
                    backgroundColor: '#bbbbbb'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y',
            scales: {
                x: {
                    stacked: true,
                    title: {
                        display: true,
                        text: 'Hours per Week'
                    }
                },
                y: {
                    stacked: true
                }
            },
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { family: 'Departure Mono', size: 11 }
                    }
                }
            }
        }
    });
}

function setCommute(minutes) {
    commuteInput.value = minutes;
    calculateTrueRate();
}

// Event Listeners
const inputs = [salaryInput, weeklyHoursInput, commuteInput, prepTimeInput, overtimeInput, workExpensesInput];
inputs.forEach(input => {
    input.addEventListener('input', calculateTrueRate);
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
calculateTrueRate();

