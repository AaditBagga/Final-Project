import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { getAuth, onIdTokenChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import { AuthContext } from '../AuthContext'; 
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function DashboardPage() {
    const [budgets, setBudget] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().split('-')[1]); 
    const [expenses, setExpenses] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [tokenExpiryWarning, setTokenExpiryWarning] = useState(false);

    useEffect(() => {
        fetchBudget();
        fetchExpenses();
    }, [selectedMonth, currentUser.uid]);

    const fetchBudget = () => {
        axios.get('http://157.245.132.124:3001/api/budget', { params: { userId: currentUser.uid } })
            .then(response => setBudget(response.data))
            .catch(error => console.error('Error fetching budget data:', error));
    };

    const fetchExpenses = () => {
        axios.get('http://157.245.132.124:3001/api/expenses', { params: { userId: currentUser.uid, month: selectedMonth } })
            .then(response => setExpenses(response.data))
            .catch(error => console.error('Error fetching expenses data:', error));
    };

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;

    if (user) {
        // Set a timeout for 40 seconds after login
        const tokenTimer = setTimeout(() => {
            setTokenExpiryWarning(true);
        }, 40000); // 40 seconds
      
        // Clean up the timer on component unmount
        return () => clearTimeout(tokenTimer);
        }
    }, []);

    const refreshToken = () => {
        const auth = getAuth();
        auth.currentUser.getIdToken(true).then(() => {
          console.log('Token refreshed');
          setTokenExpiryWarning(false);
        });
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    const totalBudget = budgets.reduce((acc, budget) => acc + budget.amount, 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    const remainingBudget = totalBudget - totalExpense;

    // Prepare monthly expenses
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const monthlyExpenses = months.map(month => {
        const monthExpenses = expenses.filter(e => new Date(e.date).getMonth() === months.indexOf(month) - 1);
        return monthExpenses.reduce((acc, e) => acc + e.amount, 0);
    });
        
    const monthlyBudget = months.map(month => {
        return totalBudget; // Assuming an equal budget for each month
    });
    
    const monthlyExcess = monthlyExpenses.map((expense, index) => expense > monthlyBudget[index] ? expense - monthlyBudget[index] : 0);

    const budgetChart = {
        labels: budgets.map(b => b.category),
        datasets: [
            {
                label: 'Budget',
                data: budgets.map(b => b.amount),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            },
            {
                label: 'Expenses',
                data: budgets.map(b => {
                    const expenseAmount = expenses.find(e => e.category === b.category)?.amount || 0;
                    return expenseAmount;
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    const pieChartData = {
        labels: ['Remaining Budget', 'Expenses'],
        datasets: [
            {
                data: [remainingBudget, totalExpense],
                backgroundColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                hoverBackgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
            }
        ]
    };

    const stackedBarChartData = {
        labels: months,
        datasets: [
            {
                label: 'Expenses within Budget',
                data: monthlyExpenses.map((expense, index) => Math.min(expense, monthlyBudget[index])),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
            {
                label: 'Expenses Exceeding Budget',
                data: monthlyExcess,
                backgroundColor: 'rgba(255, 99, 132, 0.6)',
            }
        ]
    };

    const stackedBarChartOptions = {
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true
            }
        }
    };


    return (
        <div>
            <nav>
                <Link to="/budget">Budget Page</Link>
                <Link to="/expense">Expense Page</Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <h1>Dashboard</h1>
            {tokenExpiryWarning && (
                <div>
                    <p>Your session is about to expire.</p>
                    <button onClick={refreshToken}>Refresh Session</button>
                </div>
            )}
            <div>
                <label>
                    Select Month:
                    <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
                        <option value="">All Months</option>
                        <option value="January">January</option>
                        <option value="February">February</option>
                        <option value="March">March</option>
                        <option value="April">April</option>
                        <option value="May">May</option>
                        <option value="June">June</option>
                        <option value="July">July</option>
                        <option value="August">August</option>
                        <option value="September">September</option>
                        <option value="October">October</option>
                        <option value="November">November</option>
                        <option value="December">December</option>
                    </select>
                </label>
                <h2>Bar Chart: Budget Vs Expense</h2>
                <div>Total Budget: {totalBudget}</div>
                <div>Total Expenses: {totalExpense}</div>
                <Bar data={budgetChart}  />
                <div>
                    <h2>Pie Chart: Budget Overview</h2>
                    <Pie data={pieChartData} />
                </div>
                <div>
                    <h2>Bar Chart: Monthly Expense Overview</h2>
                    <Bar data={stackedBarChartData} options={stackedBarChartOptions} />
                </div>
            </div>
        </div>
    );
}

export default DashboardPage;
