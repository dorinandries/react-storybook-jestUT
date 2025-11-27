// src/components/OrderCard/OrderCard.spec.tsx
import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import OrderCard from './index';
import { OrderStatusEnum, StageStatusEnum } from '../../types';

const MOCK_ORDER = {
	idOrder: 'ORD-2025-0125-001',
	user: {
		name: 'Alexander Smith',
		email: 'alexander.smith@example.com',
		address: '310 Regent Street, London W1B 3HH',
		phone: '+44 20 7946 0958',
	},
	createdAt: new Date(2025, 0, 25, 19, 21).toISOString(),
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
};

describe('OrderCard', () => {
	it('renders without crashing', () => {
		const onOpenMock = jest.fn();
		render(<OrderCard order={MOCK_ORDER} onOpen={onOpenMock} />);
	});

	it('rendered order have a title with order id', () => {
		const onOpenMock = jest.fn();
		render(<OrderCard order={MOCK_ORDER} onOpen={onOpenMock} />);

		const container = screen.getByTestId('order-card-title');
		expect(
			within(container).getByText(`Order #${MOCK_ORDER.idOrder}`)
		).toBeInTheDocument();
	});

	it('renders the div with data-testid', () => {
		const onOpenMock = jest.fn();
		render(<OrderCard order={MOCK_ORDER} onOpen={onOpenMock} />);

		const divElement = screen.getByTestId(`order-card-${MOCK_ORDER.idOrder}`);

		expect(divElement).toBeInTheDocument();
		expect(divElement).toHaveTextContent(`Order #${MOCK_ORDER.idOrder}`);
	});

	it('renders the div and triggers onOpen when clicked', () => {
		const onOpenMock = jest.fn();
		render(<OrderCard order={MOCK_ORDER} onOpen={onOpenMock} />);

		const divElement = screen.getByTestId(`order-card-${MOCK_ORDER.idOrder}`);

		expect(divElement).toBeInTheDocument();

		fireEvent.click(divElement);

		expect(onOpenMock).toHaveBeenCalledTimes(1);
	});
});
