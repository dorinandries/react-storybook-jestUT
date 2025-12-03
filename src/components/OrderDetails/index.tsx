// src/components/OrderDetails/index.tsx
import { Order, OrderStatusEnum, Stage, StageStatusEnum } from '../../types';
import { formatDateTime, getDateTime } from '../../utilities';
import Timeline from '../Stages';
import {
	DetailsHeader,
	DetailsWrap,
	StyledBox,
	Rows,
	Cols,
	UserCard,
} from '../../styles';
import OrderTimelineButtons from '../OrderTimelineButtons';
import { Subtle } from '../OrderCard/styles';
import CardDetails from '../OrderCard/CardDetails';
import { StagesContainer } from '../Stages/styles';
import InputModal from '../InputModal';
import { useState } from 'react';
import { BASE_STAGE_ID } from '../../mock/mockOrders';

export default function OrderDetails({
	order,
	setOrder,
	onCancel,
	onComplete,
}: {
	order: Order;
	setOrder: React.Dispatch<React.SetStateAction<Order[]>>;
	onCancel: (id: string) => void;
	onComplete: (id: string) => void;
}) {
	const latest = order.stages[order.stages.length - 1];
	const created = formatDateTime(order.createdAt);

	const stagesCount = order.stages.length;
	const isTerminal = order.orderStatus === OrderStatusEnum.Preparing;
	const canAct = stagesCount >= 1 && stagesCount <= 4 && isTerminal;

	const formFieldsStages = [
		{
			type: 'text' as const,
			label: 'Title',
			name: 'title',
			required: true,
			placeholder: 'Title',
		},
		{
			type: 'textarea' as const,
			label: 'Description',
			name: 'description',
			required: true,
			placeholder: 'Enter your description',
		},
		{
			type: 'textarea' as const,
			label: 'Extra Description (optional)',
			name: 'extraDescription',
			required: false,
			placeholder: 'Enter extra description',
		},
		{
			type: 'select' as const,
			label: 'Status',
			options: [
				{ label: 'Pending', value: StageStatusEnum.Pending },
				{ label: 'Info', value: StageStatusEnum.Info },
				{ label: 'Completed', value: StageStatusEnum.Completed },
				{ label: 'Error', value: StageStatusEnum.Error },
			],
			name: 'status',
			required: true,
		},
	];

	const [showAddStage, setShowAddStage] = useState(false);

	// Add stage popup state
	const [stageForm, setStageForm] = useState({
		id: undefined as string | undefined,
		title: '',
		description: '',
		extraDescription: '',
		status: StageStatusEnum.Pending,
	});

	// Helper to get current date/time in project format
	/**
	 * this method displays the modal and resets the inputs values
	 */
	const handleAddStageButton = () => {
		setShowAddStage(true);
		setStageForm({
			id: '',
			title: '',
			description: '',
			extraDescription: '',
			status: StageStatusEnum.Pending,
		});
	};

	const handleEditStageButton = (id: string) => {
		setShowAddStage(true);
		const stage = order.stages.filter((s) => s.id === id)[0]!;
		console.log(id);
		console.log(stage);
		setStageForm({
			id: id,
			title: stage.title ?? '',
			description: stage.description ?? '',
			extraDescription:
				typeof stage.extraDescription === 'string'
					? stage.extraDescription
					: '',
			status: stage.status ?? StageStatusEnum.Pending,
		});
	};

	const handleCloseStage = () => {
		setShowAddStage(false);
	};

	const handleSaveStage = (data: Stage) => {
		const { id, ...rest } = data;
		// alert(id);
		console.log(data);
		if (!id) {
			const { date, time } = getDateTime();
			const newStage = {
				...rest,
				date,
				time,
				id: `${BASE_STAGE_ID}${order.stages.length + 1}`,
			};
			setOrder((prev) =>
				prev.map((o) =>
					o.idOrder === order.idOrder
						? { ...o, stages: [...o.stages, newStage] }
						: o
				)
			);
		} else {
			setOrder((prev) =>
				prev.map((o) =>
					o.idOrder === order.idOrder
						? {
								...o,
								stages: o.stages.map((s) =>
									s.id === id ? { ...s, ...rest } : s
								),
						  }
						: o
				)
			);
		}
		setShowAddStage(false);
	};

	return (
		<DetailsWrap data-testid={`order-details`}>
			<DetailsHeader>
				<h4>Order #{order.idOrder}</h4>

				<OrderTimelineButtons
					canCancel={canAct}
					canComplete={canAct}
					canAddStageForm={canAct}
					onCancel={() => onCancel(order.idOrder)}
					onComplete={() => onComplete(order.idOrder)}
					onAddStageForm={handleAddStageButton}
				/>
			</DetailsHeader>

			<Rows>
				<Cols>
					<CardDetails
						prop1={`Created: ${created.date} • ${created.time}`}
						$space_between={false}
					/>
					<CardDetails
						prop1={`Latest status: ${latest.title}`}
						$space_between={false}
					/>
					{/* </Subtle> */}

					<Cols data-testid='timeline-section'>
						<StyledBox $status={StageStatusEnum.Pending}>
							Status timeline
						</StyledBox>

						<Timeline
							stages={order.stages}
							data-testid='order-timeline'
							handleEditStageButton={handleEditStageButton}
						/>
					</Cols>
				</Cols>
			</Rows>
			<Rows>
				<StagesContainer>
					<StyledBox $status={OrderStatusEnum.Completed}>Customer</StyledBox>
					<UserCard>
						<Subtle>
							<strong>{order.user.name}</strong>
						</Subtle>
						<Subtle>{order.user.email}</Subtle>
						<Subtle>{order.user.address}</Subtle>
						<Subtle>{order.user.phone}</Subtle>
					</UserCard>
				</StagesContainer>
			</Rows>
			{/* <StageForm
        showAddStage={showAddStage}
        onCloseStageForm={onCloseStageForm}
        onSaveStageForm={onSaveStageForm}
        stageForm={stageForm}
        setStageForm={setStageForm}
      /> */}

			<InputModal
				isOpen={showAddStage}
				title='Add new stage'
				primaryLabel='Save'
				secondaryLabel='Cancel'
				onClose={handleCloseStage}
				onSave={handleSaveStage}
				additionalFieldsForData={
					typeof stageForm.id === 'string' ? { id: stageForm.id } : undefined
				}
				fields={formFieldsStages}
				values={stageForm}
			/>
		</DetailsWrap>
	);
}
