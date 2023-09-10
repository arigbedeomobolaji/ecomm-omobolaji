// jshint ignore:start
import React from 'react';

const InputText = ({
	type,
	name,
	label,
	placeholder,
	onChange,
	isRequired,
	...props
}) => {
	return (
		<div className='form__group'>
			<label className='form__label' htmlFor={name}>
				{label}
			</label>
			<input
				{...props}
				type={type}
				id={name}
				className='form__input'
				required={!!isRequired}
				placeholder={placeholder}
				onChange={onChange}
			></input>
		</div>
	);
};

InputText.defaultProps = {
	type: 'text',
};

export default InputText;
