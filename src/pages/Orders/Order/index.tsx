import { useParams } from 'react-router-dom';
import { Order, OrderStatusEnum } from '../../../types';

import { getOrders } from '../../../api/getOrders';
import { getFinalStage } from '../helper';
import { useEffect, useState } from 'react';
import OrderDetails from '../../../components/OrderDetails';
import { Loading, Page } from '../../../styles';
import { StyledOrderPage } from './styles';

const OrderPage = () => {
	const { id } = useParams();

	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		const fetchOrders = async () => {
			const data = await getOrders();
			if (data && Array.isArray(data)) {
				const updatedOrders = data.map((o: Order) =>
					o.stages &&
					o.stages.length === 5 &&
					o.orderStatus !== OrderStatusEnum.Canceled
						? { ...o, orderStatus: OrderStatusEnum.Canceled }
						: o
				);
				setOrders(updatedOrders);
			}
		};
		fetchOrders();
	}, []);
	const selectedOrder = orders.find((o) => o.idOrder === id) as Order;

	const appendTerminalStage = (id: string, orderStatus: OrderStatusEnum) => {
		setOrders((prev) =>
			prev.map((item: Order) => {
				if (item.idOrder !== id) return item;

				const finalStage = getFinalStage({ ...item, orderStatus });

				const prevStages = item.stages.map((stage) => ({
					...stage,
					isLastElement: false,
				}));

				return {
					...item,
					stages: [...prevStages, finalStage],
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
		<StyledOrderPage>
			<section data-testid='order-details'>
				{selectedOrder ? (
					<OrderDetails
						order={selectedOrder}
						setOrder={setOrders}
						onCancel={cancelOrder}
						onComplete={completeOrder}
					/>
				) : (
				<Loading>
					<div className='loading'></div>
					<p>Loading...</p>
				</Loading>
				)}
			</section>
		</StyledOrderPage>
	);
};

export default OrderPage;
