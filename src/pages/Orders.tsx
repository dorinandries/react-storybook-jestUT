// pages/Orders.tsx
import React, { useMemo, useState, useEffect } from 'react';
import { Grid, Page } from '../styles';
import { getOrders } from '../api/getOrders';
import OrderDetails from '../components/OrderDetails';
import OrderCard from '../components/OrderCard';
import { OrderStatusEnum, StageStatusEnum, type Order } from '../types';
import { nowStageDateTime } from '../utilities';

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

	const appendTerminalStage = (id: string, kind: OrderStatusEnum) => {
		setOrders((prev) =>
			prev.map((o) => {
				if (o.idOrder !== id) return o;

				// if already terminal or already at 5 stages, keep as is
				if (o.stages.length >= 5 || o.orderStatus === kind) return o;

				const { date, time } = nowStageDateTime();

				const title =
					kind === OrderStatusEnum.Canceled
						? 'Order canceled'
						: 'Order completed';
				const description =
					kind === OrderStatusEnum.Canceled
						? 'Delivery could not be completed'
						: 'Order successfully completed';
				const extraDescription =
					kind === OrderStatusEnum.Canceled
						? 'Order canceled'
						: 'Order completed';
				const status: StageStatusEnum.Error | StageStatusEnum.Completed =
					kind === OrderStatusEnum.Canceled
						? StageStatusEnum.Error
						: StageStatusEnum.Completed;

				const prevStages = o.stages.map((s) => ({
					...s,
					isLastElement: false,
				}));

				const newStage = {
					title,
					description,
					date, // today
					time, // now
					status, // "error" | "completed"
					isLastElement: true,
					extraDescription,
				};

				return {
					...o,
					stages: [...prevStages, newStage].slice(0, 5),
					orderStatus: kind,
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
