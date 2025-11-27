// types/index.tsx
export type User = {
	name: string;
	email: string;
	address: string;
	phone: string;
};

export const enum OrderStatusEnum {
	Canceled = 'canceled',
	Preparing = 'preparing',
	Completed = 'completed',
}

export const enum StageStatusEnum {
	Pending = 'pending',
	Completed = 'completed',
	Info = 'info',
	Error = 'error',
	Neutral = 'neutral',
	Canceled = 'canceled',
}

export interface Stage {
	id?: number;
	title: string;
	description: string;
	date: string;
	time: string;
	extraDescription?: React.ReactNode;
	status: StageStatusEnum;
}

export type Order = {
	idOrder: string;
	user: User;
	createdAt: string;
	stages: Stage[];
	orderStatus: OrderStatusEnum;
};
