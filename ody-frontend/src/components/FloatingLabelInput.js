import React, { useState } from 'react';

function FloatingLabelInput({ id, type, value, onChange, label }) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = () => {
        setIsFocused(false);
    };

    const hasValue = value.length > 0;

    return (
        <div className="relative">
            <label
                htmlFor={id}
                className={`absolute left-2 transition-all ${isFocused || hasValue ? 'top-0 text-sm' : 'top-1/2 -translate-y-1/2 text-base'} px-1 bg-white`}
            >
                {label}
            </label>
            <input
                id={id}
                type={type}
                value={value}
                onChange={onChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="w-full p-2 border rounded-sm bg-gray-50"
                placeholder={isFocused || hasValue ? '' : label}
            />
        </div>
    );
}

export default FloatingLabelInput;
