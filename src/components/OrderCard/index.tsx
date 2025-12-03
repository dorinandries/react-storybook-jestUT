// src/components/OrderCard/index.tsx
import { Badge, Card, CardTitle, Subtle } from './styles';
import { Order } from '../../types';
import { formatDateTime } from '../../utilities';
import CardDetails, { CardDetailsStatus } from './CardDetails';
import { Led } from '../../styles';

export default function OrderCard({
	order,
	onOpen,
	selected,
}: {
	order: Order;
	onOpen: () => void;
	selected?: boolean;
}) {
	const { date, time } = formatDateTime(order.createdAt);
	const latest = order.stages[order.stages.length - 1];

	return (
		<Card
			onClick={onOpen}
			aria-label={`Open order ${order.idOrder}`}
			$selected={selected}
			data-testid={`order-card-${order.idOrder}`}
		>
			<CardTitle data-testid={`order-card-title`}>
				<CardDetails
					title={`Order #${order.idOrder}`}
					prop1={<Badge $status={latest.status}>{latest.title}</Badge>}
					prop2={<Led $orderStatus={order.orderStatus} />}
					// $space_between={true}
				/>
			</CardTitle>

			<Subtle data-testid={`order-card-`}>
				<CardDetails title={'Customer'} prop1={order.user.name} />
				<CardDetails title={'Address'} prop1={order.user.address} />
				<CardDetails title={'Created'} prop1={`${date} • ${time}`} />
			</Subtle>
		</Card>
	);
}
