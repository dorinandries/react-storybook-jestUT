// Orders.test.tsx
import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Orders from '.';

import { getOrders } from '../../api/getOrders';
import { mockOrders } from '../../mock/mockOrders';
import { OrderStatusEnum, StageStatusEnum, Order } from '../../types';

jest.mock('../api/getOrders', () => ({
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

describe('Orders Component', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});
	it('renders list when getOrders resolves with an array', async () => {
		render(<Orders />);

		expect(
			screen.getByRole('heading', { name: /orders/i })
		).toBeInTheDocument();
		expect(screen.getByTestId('orders-grid')).toBeVisible();
		expect(mockedGetOrders).toHaveBeenCalledTimes(1);
		const orderItems = await screen.findAllByTestId(/order-card/i);
		expect(orderItems.length).toBe(3);
	});

	it('renders the orders without the details panel initially', () => {
		render(<Orders />);

		expect(screen.getByTestId('orders-grid')).toBeVisible();
		expect(screen.queryByTestId(/order-details/i)).not.toBeInTheDocument();
	});
	it('opens first order for details on click', async () => {
		render(<Orders />);
		const user = userEvent;
		const firstOrder = await screen.findAllByTestId(/order-card/i);
		user.click(firstOrder[0]);
		const orderDetails = await screen.findByTestId(/order-details/i);
		expect(orderDetails).toBeInTheDocument();
	});
	it('shows timeline and first timeline item after opening order', async () => {
		render(<Orders />);
		const user = userEvent;
		const firstOrder = (await screen.findAllByTestId(/order-card/i))[0];
		user.click(firstOrder);

		const orderDetails = await screen.findByTestId(/order-details/i);

		const items = await within(orderDetails).findAllByTestId(
			/^timeline-item-\d+$/
		);
		expect(items[0]).toBeInTheDocument();
	});

	it('no order cards displayed', async () => {
		mockedGetOrders.mockResolvedValueOnce([]); // override for this test
		render(<Orders />);
		expect(await screen.findByText(/no orders available/i)).toBeInTheDocument();
		expect(screen.queryByTestId(/order-card/i)).not.toBeInTheDocument();
	});
});
