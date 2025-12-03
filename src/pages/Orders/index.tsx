// pages/Orders.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Grid, Page } from '../../styles';
import OrderDetails from '../../components/OrderDetails';
import OrderCard from '../../components/OrderCard';
import {
	OrderStatusEnum,
	Stage,
	StageStatusEnum,
	type Order,
} from '../../types';
import { getDateTime } from '../../utilities';
import { getOrders } from '../../api/getOrders';

function Orders() {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const data = await getOrders();
			if (data && Array.isArray(data)) {
				const updatedOrders = data.map((o: Order) =>
					o.stages.length === 5 && o.orderStatus !== OrderStatusEnum.Canceled
						? { ...o, orderStatus: OrderStatusEnum.Canceled }
						: o
				);
				setOrders(updatedOrders);
			}
		};
		fetchOrders();
	}, []);
	
	const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

	const navigate = useNavigate();

	const handleOrderClick = (orderId: string) => {
		navigate(`/order/${orderId}`);
	};

	return (
		<Page>
			<h2>Orders</h2>

			{/* Cards grid */}
			<section data-testid='orders-grid'>
				<Grid>
					{orders.length > 0 ? (
						orders.map((o) => (
							<OrderCard
								order={o}
								key={o.idOrder}
								onOpen={() => handleOrderClick(o.idOrder)}
								// selected={selectedOrderId === o.idOrder}
							/>
						))
					) : (
						<p>No orders available</p>
					)}
				</Grid>
			</section>
			{/* 
			<section data-testid='orders-details'>
				{selectedOrder && (
					<OrderDetails
						selectedOrder={selectedOrder}
						setOrders={setOrders}
						onCancel={cancelOrder}
						onComplete={completeOrder}
					/>
				)}
			</section> */}
		</Page>
	);
}

export default Orders;
