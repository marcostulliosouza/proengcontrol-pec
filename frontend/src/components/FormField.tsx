import React from 'react';

interface FormFieldProps {
    label: string;
    children: React.ReactNode;
    required?: boolean;
    description?: string;
}

const FormField: React.FC<FormFieldProps> = ({ label, children, required, description }) => {
    return (
        <div className='flex flex-col gap-2'>
            <label className='text-lg font-bold text-pec'>
                {label} {required && <span className='text-red-600 text-lg font-bold'>*</span>}
            </label>
            {children}
            {description && <p className='text-sm text-gray-600'>{description}</p>}
        </div>
    );
};

export default FormField;