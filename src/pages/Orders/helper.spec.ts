import { Order, OrderStatusEnum, StageStatusEnum } from '../../types';
import { getFinalStage, getValue, isCanceled } from './helper';
import { BASE_STAGE_ID } from '../../mock/mockOrders';

import {
	STAGE_DESCRIPTION_CANCELED,
	STAGE_DESCRIPTION_COMPLETED,
	STAGE_EXTRADESCRIPTION_CANCELED,
	STAGE_EXTRADESCRIPTION_COMPLETED,
	STAGE_TITLE_CANCELED,
	STAGE_TITLE_COMPLETED,
} from './constants';
import { mockOrders } from '../../mock/mockOrders';

// jest.mock('../../utilities/index.tsx', () => ({
// 	getDateTime: jest.fn().mockReturnValue({ date: 'Sat Jan 25', time: '19:30' }),
// }));

const mockDate = new Date('2025-01-25T19:30:00+02:00');

jest.spyOn(global, 'Date').mockImplementation(() => mockDate);

const { date, time } = {
	date: 'Sat Jan 25',
	time: '19:30',
};

const mockOrder = mockOrders[0];

describe('getFinalStage helper function', () => {
	// test('function receive order with orderStatus Canceled', () => {
	// 	const response = getFinalStage({
	// 		...mockOrder,
	// 		orderStatus: OrderStatusEnum.Canceled,
	// 	});
	// 	expect(response).toEqual({
	// 		title: STAGE_TITLE_CANCELED,
	// 		description: STAGE_DESCRIPTION_CANCELED,
	// 		date,
	// 		time,
	// 		status: StageStatusEnum.Error,
	// 		isLastElement: true,
	// 		extraDescription: STAGE_EXTRADESCRIPTION_CANCELED,
	// 	});
	// });
	// test('function receive order with orderStatus NOT Canceled', () => {
	// 	const response = getFinalStage({
	// 		...mockOrder,
	// 		orderStatus: OrderStatusEnum.Completed,
	// 	});
	// 	expect(response).toEqual({
	// 		title: STAGE_TITLE_COMPLETED,
	// 		description: STAGE_DESCRIPTION_COMPLETED,
	// 		date,
	// 		time,
	// 		status: StageStatusEnum.Completed,
	// 		isLastElement: true,
	// 		extraDescription: STAGE_EXTRADESCRIPTION_COMPLETED,
	// 	});
	// });

	test.each([
		{
			input: OrderStatusEnum.Canceled,
			expected: {
				id: `${BASE_STAGE_ID}${mockOrder.stages.length + 1}`,
				title: STAGE_TITLE_CANCELED,
				description: STAGE_DESCRIPTION_CANCELED,
				date,
				time,
				status: StageStatusEnum.Error,
				isLastElement: true,
				extraDescription: STAGE_EXTRADESCRIPTION_CANCELED,
			},
		},
		{
			input: OrderStatusEnum.Completed,
			expected: {
				id: `${BASE_STAGE_ID}${mockOrder.stages.length + 1}`,
				title: STAGE_TITLE_COMPLETED,
				description: STAGE_DESCRIPTION_COMPLETED,
				date,
				time,
				status: StageStatusEnum.Completed,
				isLastElement: true,
				extraDescription: STAGE_EXTRADESCRIPTION_COMPLETED,
			},
		},
	])(
		'returns expected final stage for orderStatus %s',
		({ input, expected }) => {
			const response = getFinalStage({
				...mockOrder,
				orderStatus: input,
			});
			expect(response).toEqual(expected);
		}
	);
});
describe('isCanceled helper function', () => {
	test.each([
		[OrderStatusEnum.Canceled, true],
		[OrderStatusEnum.Completed, false],
		[OrderStatusEnum.Preparing, false],
	])('returns expected result for %s', (input, expected) => {
		const result = isCanceled(input);
		expect(result).toBe(expected);
	});
});

describe('getValue helper function', () => {
	const cases = [
		{
			input: {
				orderStatus: OrderStatusEnum.Canceled,
				canceledValue: 'Canceled Value',
				completedValue: 'Completed Value',
			},
			expected: 'Canceled Value',
		},
		{
			input: {
				orderStatus: OrderStatusEnum.Completed,
				canceledValue: 'Canceled Value',
				completedValue: 'Completed Value',
			},
			expected: 'Completed Value',
		},
		{
			input: {
				orderStatus: OrderStatusEnum.Preparing,
				canceledValue: 'Canceled Value',
				completedValue: 'Completed Value',
			},
			expected: 'Completed Value',
		},
	];

	test.each(cases)(
		'returns expected result [%#] for %j',
		({ input, expected }) => {
			const result = getValue(
				input.orderStatus,
				input.canceledValue,
				input.completedValue
			);
			expect(result).toBe(expected);
		}
	);
});
