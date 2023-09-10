// jshint ignore:start
import React from 'react';

export const Select = ({ value, name, label, data, onChange }) => {
	return (
		<div className='form__group--row'>
			<label className='form__label' htmlFor={name}>
				{label}
			</label>
			<select
				id={name}
				value={value}
				onChange={onChange}
				className='form__input'
			>
				{data &&
					data.length &&
					data.map((datum) => (
						<option
							key={datum}
							value={datum}
							className='form__option'
						>
							{datum}
						</option>
					))}
			</select>
		</div>
	);
};

export const TextArea = ({
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
			<textarea
				className='form__textarea'
				{...props}
				type={type}
				id={name}
				required={!!isRequired}
				placeholder={placeholder}
				onChange={onChange}
			></textarea>
		</div>
	);
};
