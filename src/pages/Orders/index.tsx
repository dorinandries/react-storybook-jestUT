// pages/Orders.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { Grid, Page } from '../../styles';
import { getOrders } from '../../api/getOrders';
import OrderDetails from '../../components/OrderDetails';
import OrderCard from '../../components/OrderCard';
import {
	OrderStatusEnum,
	Stage,
	StageStatusEnum,
	type Order,
} from '../../types';
import { getDateTime } from '../../utilities';
import { getFinalStage } from './helper';

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
	const selectedOrder = useMemo(
		() => orders.find((o) => o.idOrder === selectedOrderId) ?? null,
		[orders, selectedOrderId]
	);

	const appendTerminalStage = (id: string, orderStatus: OrderStatusEnum) => {
		setOrders((prev) =>
			prev.map((item: Order) => {
				if (item.idOrder !== id) return item;

				// // if already terminal or already at 5 stages, keep as is
				// if (item.stages.length >= 5 || item.orderStatus === orderStatus)
				// 	return item;

				const finalStage = getFinalStage({...item, orderStatus});

				const prevStages = item.stages.map((stage) => ({
					...stage,
					isLastElement: false,
				}));

				return {
					...item,
					stages: [...prevStages, finalStage],//.slice(0, 5),
					orderStatus,
				};
			})
		);
	};

	const cancelOrder = (id: string) =>
		appendTerminalStage(id, OrderStatusEnum.Canceled);
	const completeOrder = (id: string) =>
		appendTerminalStage(id, OrderStatusEnum.Completed);

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
								onOpen={() => setSelectedOrderId(o.idOrder)}
								selected={selectedOrderId === o.idOrder}
							/>
						))
					) : (
						<p>No orders available</p>
					)}
				</Grid>
			</section>

			<section data-testid='orders-details'>
				{/* Details section below the grid */}
				{selectedOrder && (
					<OrderDetails
						selectedOrder={selectedOrder}
						setOrders={setOrders}
						onCancel={cancelOrder}
						onComplete={completeOrder}
					/>
				)}
			</section>
		</Page>
	);
}

export default Orders;
