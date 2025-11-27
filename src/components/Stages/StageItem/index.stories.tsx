// src/components/Timeline/StageItem/index.stories.tsx
import type { Meta, StoryObj } from '@storybook/react-webpack5';
import { expect, userEvent, waitFor, within } from 'storybook/test';
import StageItem from '.';
import { StageStatusEnum } from '../../../types';

const meta: Meta<typeof StageItem> = {
	title: 'PRJ_Marina/StageItem',
	component: StageItem,
	parameters: {
		layout: 'fullscreen',
	},
	argTypes: {
		status: {
			control: { type: 'radio' },
			options: [
				StageStatusEnum.Completed,
				StageStatusEnum.Error,
				StageStatusEnum.Neutral,
				StageStatusEnum.Info,
				StageStatusEnum.Pending,
			],
		},
	},
};
export default meta;

type Story = StoryObj<typeof meta>;

export const ContentOnly: Story = {};

ContentOnly.args = {
	title: 'Order created',
	description: 'Order successfully created by customer',
	date: 'Fri Sep 09',
	time: '09:36',
	status: StageStatusEnum.Completed,
	extraDescription: (
		<div>
			<p>Your order is ready.</p>
			<button onClick={() => alert('Picked up!')}>Mark as picked up</button>
		</div>
	),
};

ContentOnly.parameters = {
	controls: {
		exclude: ['isFirstElement', 'isLastElement'],
	},
};

export const EdgeFlagsOnly: Story = {};

EdgeFlagsOnly.args = {
	title: 'Order created',
	description: 'Order successfully created by customer',
	date: 'Fri Sep 19',
	time: '09:36',
	status: StageStatusEnum.Completed,
	extraDescription: 'We’re working on it. Estimated 10–15 minutes.',
	isFirstElement: true,
	isLastElement: false,
};

EdgeFlagsOnly.parameters = {
	controls: {
		include: ['isFirstElement', 'isLastElement'],
	},
};
