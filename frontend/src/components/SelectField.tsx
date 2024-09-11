// components/SelectField.tsx
import React from 'react';
import Select from 'react-select';

interface SelectFieldProps {
    options: { value: number; label: string }[];
    onChange: (selectedOption: { value: number; label: string } | null) => void;
    placeholder: string;
    isDisabled?: boolean;
    customStyles?: any;
}

const SelectField: React.FC<SelectFieldProps> = ({ options, onChange, placeholder, isDisabled, customStyles }) => {
    return (
        <Select
            options={options}
            onChange={onChange}
            placeholder={placeholder}
            isDisabled={isDisabled}
            styles={customStyles}
            className='text-sm w-full'
        />
    );
};

export default SelectField;