// src/components/OrderDetails/OrderDetails.spec.tsx

import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import OrderDetails from './index';
import { OrderStatusEnum, StageStatusEnum, type Order } from '../../types';
import { formatDateTime } from '../../utilities';

import { getOrders } from '../../api/getOrders';
import { mockOrders } from '../../mock/mockOrders';

jest.mock('../../api/getOrders', () => ({
	__esModule: true,
	getOrders: jest.fn(), // named export
}));

const mockedGetOrders = getOrders as unknown as jest.MockedFunction<
	() => Promise<Order[]>
>;

mockedGetOrders.mockResolvedValue([
	...mockOrders,
	{
		idOrder: 'ORD-2010-0125-001',
		user: {
			name: 'Alexander Smith',
			email: 'alexander.smith@example.com',
			address: '310 Regent Street, London W1B 3HH',
			phone: '+44 20 7946 0958',
		},
		createdAt: new Date(2010, 0, 25, 19, 21).toISOString(),
		stages: [
			{
				title: 'Order created',
				description: 'Order successfully created by customer',
				date: 'Mon Jan 6',
				time: '19:21',
				status: StageStatusEnum.Completed,
			},
		],
		orderStatus: OrderStatusEnum.Preparing,
	} as Order,
]);

type RenderOrderDetailsProps = Partial<
	React.ComponentProps<typeof OrderDetails>
>;

function RenderOrderDetails(orderProps: RenderOrderDetailsProps) {
	const [stageForm, setStageForm] = useState({
		title: '',
		description: '',
		extraDescription: '',
		status: StageStatusEnum.Pending,
	});

	const [orders, setOrders] = useState<Order[]>(mockOrders);

	return (
		<OrderDetails
			selectedOrder={mockOrders[2]}
			setOrders={setOrders}
			onCancel={jest.fn()}
			onComplete={jest.fn()}
			{...orderProps}
		/>
	);
}

describe('OrderDetails Component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it('renders without crashing', () => {
		render(<RenderOrderDetails />);
		expect(screen.getByTestId('order-details')).toBeInTheDocument();
	});
	it('renders first stage of the order', () => {
		render(<RenderOrderDetails />);
		expect(screen.getByText(/Order #ORD-2010-0125-001/i)).toBeInTheDocument();
	});
	it('renders order details without errors', () => {
		render(<RenderOrderDetails />);
		expect(screen.getByTestId('order-details')).toBeInTheDocument();
	});
	it('renders the created date correctly', () => {
		render(<RenderOrderDetails />);
		const createdDate = formatDateTime(mockOrders[0].createdAt);
		expect(
			screen.getByText(
				new RegExp(`Created: ${createdDate.date} • ${createdDate.time}`, 'i')
			)
		).toBeInTheDocument();
	});
	it('renders user information', () => {
		render(<RenderOrderDetails />);
		expect(screen.getByText(mockOrders[0].user.name)).toBeInTheDocument();
		expect(screen.getByText(mockOrders[0].user.email)).toBeInTheDocument();
		expect(screen.getByText(mockOrders[0].user.address)).toBeInTheDocument();
		expect(screen.getByText(mockOrders[0].user.phone)).toBeInTheDocument();
	});
	it('renders the timeline section', () => {
		render(<RenderOrderDetails />);
		expect(screen.getByTestId('timeline-section')).toBeInTheDocument();
		expect(screen.getByTestId('order-timeline')).toBeInTheDocument();
	});
	it('does not render timeline section if no stages are present', () => {
		const orderWithoutStages = { ...mockOrders[0], stages: [] };
		render(<RenderOrderDetails selectedOrder={orderWithoutStages} />);
		expect(screen.queryByTestId('timeline-section')).not.toBeInTheDocument();
		expect(screen.queryByTestId('order-timeline')).not.toBeInTheDocument();
	});
});
