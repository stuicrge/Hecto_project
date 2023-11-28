import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const AnswerChart = ({ positiveAnswerCount, negativeAnswerCount }) => {
    console.log('positiveAnswerCount:', positiveAnswerCount);
    console.log('negativeAnswerCount:', negativeAnswerCount);
    const data = {

        labels: ['Positive Answers', 'Negative Answers'],
        datasets: [
            {
                label: 'Answer Count',
                backgroundColor: ['#36A2EB', '#FF6384'],
                borderColor: 'rgba(255,255,255,0.75)',
                data: [positiveAnswerCount, negativeAnswerCount],
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
