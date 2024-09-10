import React from 'react';
import useIndicators from '../hooks/useIndicators';

interface IndicatorsProps {
    period: 'daily' | 'weekly' | 'monthly';
}

const Indicators: React.FC<IndicatorsProps> = ({ period }) => {
    const { indicators, loading, error } = useIndicators(period);

    if (loading) {
        return <p>Loading indicators...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!indicators) {
        return <p>No indicators available</p>;
    }

    return (
        <div>
            <h2>{period.charAt(0).toUpperCase() + period.slice(1)} Indicators</h2>
            <p>Total Calls: {indicators.totalCalls}</p>
            <p>Average Answering Time: {indicators.avgAnswering}</p>
            <p>Average Late Time: {indicators.avgLate}</p>
            <p>Uptime: {indicators.upTime}</p>
        </div>
    );
};

export default Indicators;
