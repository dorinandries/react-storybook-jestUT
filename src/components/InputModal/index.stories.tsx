import { expect, userEvent, waitFor, within } from 'storybook/test';

import { StageStatusEnum } from '../../types';
import InputModal from './';
import { Meta, StoryObj } from '@storybook/react-webpack5';
import { useState } from 'react';

const meta: Meta<typeof InputModal> = {
	title: 'order_management/InputModal',
	component: InputModal,
	parameters: {
		layout: 'fullscreen',
	},
};
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

Default.args = {
	isOpen: true,
	title: 'Add new stage',
	primaryLabel: 'Save',
	secondaryLabel: 'Cancel',
	onClose: () => {
		alert('Close clicked');
	},
	onSave: () => {
		alert('Save clicked');
	},
	fields: [
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
	],
};

export const InitialValues: Story = {};

InitialValues.args = {
	...Default.args,
	values: {
		title: 'Test Title',
		description: 'Test Description',
		extraDescription: '',
		status: StageStatusEnum.Info,
	},
};
