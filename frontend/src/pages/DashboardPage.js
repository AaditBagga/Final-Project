import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig'; 
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function DashboardPage() {
    const [budgetData, setBudgetData] = useState([]);
    const navigate = useNavigate();

    // Fetch budget data from backend
    useEffect(() => {
        axios.get('http://localhost:3001/api/budget')
            .then(response => {
                setBudgetData(response.data);
            })
            .catch(error => console.error('Error fetching budget data:', error));
    }, []);

    // Logout handler
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Example visualization - Monthly Budget Overview
    const budgetChart = {
        labels: budgetData.map(data => data.month), // Assuming 'month' is a field in your data
        datasets: [
            {
                label: 'Monthly Budget',
                data: budgetData.map(data => data.amount), // Replace with actual data fields
                backgroundColor: 'green',
                borderColor: 'darkgreen',
                borderWidth: 1,
                hoverBackgroundColor: 'lightgreen',
                hoverBorderColor: 'green'
            },
            // Additional datasets for other visualizations...
        ]
    };

    return (
        <div>
            <nav>
                <Link to="/budget">Budget Page</Link>
                <Link to="/expense">Expense Page</Link>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <h1>Dashboard</h1>
            <div>
                <Bar data={budgetChart} options={{ /* Chart.js options */ }} />
                {/* Additional chart components... */}
            </div>
        </div>
    );
}

export default DashboardPage;
