import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AnswerChart = ({ mostposAnswerCount,positiveAnswerCount, normalAnswerCount, negativeAnswerCount,mostnegAnswerCount }) => {
    console.log('positiveAnswerCount:', positiveAnswerCount);
    console.log('negativeAnswerCount:', negativeAnswerCount);
    const data = {

        labels: ['Most Positive','Positive', 'Normal','Negative','Most Negative'],
        datasets: [
            {
                label: 'Answer Count',
                backgroundColor: ['#36A2EB', '#FF6384', '#4CAF50', '#FF5733', '#8A2BE2'],
                borderColor: 'rgba(255,255,255,0.75)',
                data: [mostposAnswerCount,positiveAnswerCount,normalAnswerCount, negativeAnswerCount,mostnegAnswerCount],
            },
        ],
    };

    const options = {
        scales: {
            y: {
                type: 'linear', // Ensure 'linear' is used instead of 'linear' (typo)
                beginAtZero: true,
            },
        },
    };


    return (
        <div>
            <h2>Answer Count Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default AnswerChart;
