import { BASE_STAGE_ID } from '../../mock/mockOrders';
import { Order, OrderStatusEnum, Stage, StageStatusEnum } from '../../types';
import { getDateTime } from '../../utilities';
import {
	STAGE_DESCRIPTION_CANCELED,
	STAGE_DESCRIPTION_COMPLETED,
	STAGE_EXTRADESCRIPTION_COMPLETED,
	STAGE_EXTRADESCRIPTION_CANCELED,
	STAGE_TITLE_CANCELED,
	STAGE_TITLE_COMPLETED,
} from './constants';

export function isCanceled(orderStatus: OrderStatusEnum): boolean {
	return orderStatus === OrderStatusEnum.Canceled;
}

export function getValue(orderStatus: OrderStatusEnum, canceledValue: string, completedValue: string): string {
	return isCanceled(orderStatus) ? canceledValue : completedValue;
}

export function getFinalStage(order: Order): Stage {
	const { date, time } = getDateTime();
	const { orderStatus } = order;;

	const result = {
		id: `${BASE_STAGE_ID}${order.stages.length + 1}`,
		title: getValue(orderStatus, STAGE_TITLE_CANCELED, STAGE_TITLE_COMPLETED),
		description: getValue(
			orderStatus,
			STAGE_DESCRIPTION_CANCELED,
			STAGE_DESCRIPTION_COMPLETED
		),
		date,
		time,
		status: getValue(
			orderStatus,
			StageStatusEnum.Error,
			StageStatusEnum.Completed
		) as StageStatusEnum,
		extraDescription: getValue(
			orderStatus,
			STAGE_EXTRADESCRIPTION_CANCELED,
			STAGE_EXTRADESCRIPTION_COMPLETED
		),
		isLastElement: true,
	};
	console.log(order);
	console.log(result);

	return result;
}
