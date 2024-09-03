// components/Widget.tsx
import React from 'react';

interface WidgetProps {
    title: string;
    children: React.ReactNode;
}

const Widget: React.FC<WidgetProps> = ({ title, children }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            {children}
        </div>
    );
};

export default Widget;