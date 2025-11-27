import React, { useState } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import InputModal from './index';
import { StageStatusEnum } from '../../types';
import { FieldProps } from './types';

const mockOnClose = jest.fn();
const mockOnSave = jest.fn();

const mockFields: FieldProps[] = [
	{
		type: 'text',
		label: 'Title',
		value: '',
		name: 'title',
		required: true,
		placeholder: 'Title',
	},
	{
		type: 'textarea',
		label: 'Description',
		value: '',
		name: 'description',
		required: true,
		placeholder: 'Enter your description',
	},
	{
		type: 'textarea',
		label: 'Extra Description',
		value: '',
		name: 'extraDescription',
		required: false,
		placeholder: 'Enter any extra description',
	},
	{
		type: 'select',
		label: 'Status',
		value: '',
		options: [
			{ label: 'Pending', value: StageStatusEnum.Pending },
			{ label: 'Info', value: StageStatusEnum.Info },
			{ label: 'Completed', value: StageStatusEnum.Completed },
			{ label: 'Error', value: StageStatusEnum.Error },
		],
		name: 'status',
		required: true,
	},
];

describe('InputModal', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('renders correctly with initial values', () => {
		render(
			<InputModal
				isOpen={true}
				title='Add new stage'
				primaryLabel='Save'
				secondaryLabel='Cancel'
				fields={mockFields}
				values={{
					title: 'Test Title',
					description: 'Test Description',
					extraDescription: '',
					status: StageStatusEnum.Info,
				}}
				onClose={mockOnClose}
				onSave={mockOnSave}
			/>
		);
		const titleInput = screen.getByTestId('input-title');
		const descriptionInput = screen.getByTestId('textarea-description');
		const statusSelect = screen.getByTestId('select-status');

		expect(titleInput).toHaveValue('Test Title');
		expect(descriptionInput).toHaveValue('Test Description');
		expect(statusSelect).toHaveValue(StageStatusEnum.Info);
	});

	it('renders correctly when open', () => {
		render(
			<InputModal
				isOpen={true}
				title='Add new stage'
				primaryLabel='Save'
				secondaryLabel='Cancel'
				fields={mockFields}
				values={{}}
				onClose={mockOnClose}
				onSave={mockOnSave}
			/>
		);
		expect(screen.getByText('Add new stage')).toBeInTheDocument();
		expect(screen.getByText('Save')).toBeInTheDocument();
		expect(screen.getByText('Cancel')).toBeInTheDocument();
		expect(screen.getByLabelText('Title*')).toBeInTheDocument();
		expect(screen.getByTestId('input-title')).toBeInTheDocument();
		expect(screen.getByLabelText('Description*')).toBeInTheDocument();
		expect(screen.getByTestId('textarea-description')).toBeInTheDocument();
		expect(screen.getByLabelText('Extra Description')).toBeInTheDocument();
		expect(screen.getByTestId('textarea-extraDescription')).toBeInTheDocument();
		expect(screen.getByLabelText('Status*')).toBeInTheDocument();
		expect(screen.getByTestId('select-status')).toBeInTheDocument();
	});

	it('does not render when closed', () => {
		render(
			<InputModal
				isOpen={false}
				title='Add new stage'
				primaryLabel='Save'
				secondaryLabel='Cancel'
				fields={mockFields}
				values={{}}
				onClose={mockOnClose}
				onSave={mockOnSave}
			/>
		);
		expect(screen.queryByText('Add new stage')).not.toBeInTheDocument();
	});
	it('calls onClose when Cancel button is clicked', async () => {
		render(
			<InputModal
				isOpen={true}
				title='Add new stage'
				primaryLabel='Save'
				secondaryLabel='Cancel'
				fields={mockFields}
				values={{}}
				onClose={mockOnClose}
				onSave={mockOnSave}
			/>
		);
		const user = userEvent;
		const cancelButton = screen.getByText('Cancel');
		user.click(cancelButton);
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});
	it('calls onClose when Cancel button is clicked', async () => {
		render(
			<InputModal
				isOpen={true}
				title='Add new stage'
				primaryLabel='Save'
				secondaryLabel='Cancel'
				fields={mockFields}
				values={{}}
				onClose={mockOnClose}
				onSave={mockOnSave}
			/>
		);
		const user = userEvent;
		const cancelButton = screen.getByText('Cancel');
		user.click(cancelButton);
		expect(mockOnClose).toHaveBeenCalledTimes(1);
	});
	it('calls onSave only when required fields are completed', async () => {
		render(
			<InputModal
				isOpen={true}
				title='Add new stage'
				primaryLabel='Save'
				secondaryLabel='Cancel'
				fields={mockFields}
				values={{}}
				onClose={mockOnClose}
				onSave={mockOnSave}
			/>
		);
		const user = userEvent;
		const saveButton = screen.getByText('Save');

		user.click(saveButton);
		expect(mockOnSave).not.toHaveBeenCalled();

		const titleInput = screen.getByTestId('input-title');
		user.type(titleInput, 'Test Title');
		const descriptionInput = screen.getByTestId('textarea-description');
		user.type(descriptionInput, 'Test Description');
		const statusSelect = screen.getByTestId('select-status');
		user.selectOptions(statusSelect, StageStatusEnum.Info);

		expect(titleInput).toHaveValue('Test Title');
		expect(descriptionInput).toHaveValue('Test Description');
		expect(statusSelect).toHaveValue(StageStatusEnum.Info);

		user.click(saveButton);
		expect(mockOnSave).toHaveBeenCalledWith({
			title: 'Test Title',
			description: 'Test Description',
			extraDescription: '',
			status: StageStatusEnum.Info,
		});
	});
});
