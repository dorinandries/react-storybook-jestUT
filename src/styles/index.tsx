// styles/index.tsx
import styled, { css, keyframes } from 'styled-components';
import { OrderStatusEnum, Stage, StageStatusEnum } from '../types';

export const getColorByKey = (key: string): string => {
	const colors: Record<string, string> = {
		[StageStatusEnum.Pending]: '#3498db', // blue
		[StageStatusEnum.Completed]: '#2ecc71', // green
		[StageStatusEnum.Info]: '#f39c12', // orange
		[StageStatusEnum.Error]: '#d61803', // red
		[StageStatusEnum.Neutral]: '#7f8c8d', // gray
	};
	return colors[key] ?? colors[StageStatusEnum.Neutral];
};

export const getColorByOrderStatus = (key: string): string => {
	const colors: Record<string, string> = {
		canceled: '#d61803', // red
		preparing: '#3498db', // blue
		completed: '#2ecc71', // green
		neutral: '#7f8c8d', // gray
	};
	return colors[key] ?? colors.neutral;
};

/** orderStatus led indicator **/
const pulse = keyframes`
  0%   { opacity: 0.55; box-shadow: 0 0 0 0 rgba(0,0,0,0.10); filter: brightness(0.95); }
  50%  { opacity: 1;    box-shadow: 0 0 12px 0 rgba(0,0,0,0.15); filter: brightness(0.75); }
  100% { opacity: 0.55; box-shadow: 0 0 0 0 rgba(0,0,0,0.10); filter: brightness(0.95); }
`;

/*************************
 * General layout styles
 *************************/

export const Page = styled.div`
	min-height: 100vh;
	padding: 1.2rem;
	background: #edeff1;
	color: #1f2937;
	min-width: 400px;
	h2 {
		margin-bottom: 1rem;
	}
	@media (max-width: 768px) {
		h2 {
			margin: 1rem auto;
			text-align: center;
		}
	}
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));
	gap: 1rem;
	@media (max-width: 768px) {
		grid-template-columns: fit-content(100%);
		justify-content: center;
	}
`;

export const StyledBox = styled.div<{ $status: string }>`
	background-color: ${({ $status }) => getColorByKey($status)};
	color: white;
	padding: 1rem;
	border-radius: 8px;
`;

export const Led = styled.span<{ $orderStatus: string }>`
	display: inline-block;
	width: 12px;
	height: 12px;
	border-radius: 999px;
	margin-left: 8px;
	vertical-align: middle;

	${({ $orderStatus }) => {
		const color = getColorByOrderStatus($orderStatus);

		if ($orderStatus === OrderStatusEnum.Preparing) {
			return css`
				background: ${color};
				animation: ${pulse} 1.2s ease-in-out infinite;
			`;
		}

		return css`
			background: ${color};
		`;
	}}
`;

/*************************
 * Order Card & Details
 *************************/

export const DetailsWrap = styled.div`
	margin-top: 40px;
	padding: 16px;
	border-radius: 12px;
	background: #fff;
	border: 1px solid #e5e7eb;
`;

export const DetailsHeader = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between; /* title left, actions right */
	gap: 12px;

	@media (max-width: 550px) {
		flex-direction: column;
	}
`;

export const Rows = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	width: 100%;
	gap: 20px;
`;

export const Cols = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: 20px;
`;
export const UserCard = styled.div`
	background: #fff;
	padding: 12px;
	border-radius: 12px;
	border: 1px solid #e5e7eb;
`;
