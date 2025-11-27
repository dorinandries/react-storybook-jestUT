// src/components/OrderDetails/StageForm/style.tsx

import styled from 'styled-components';
import { StageStatusEnum } from '../../types';
import { getColorByKey } from '../../styles';

export const StageFormContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: -200px;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.3);
	z-index: 999;
`;

export const StageFormContent = styled.div`
	background: #fff;
	padding: 24px;
	border-radius: 12px;
	min-width: 320px;
	box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
	.formField {
		margin-bottom: 12px;

		input,
		select {
			width: 100%;
		}
	}
	.formActions {
		display: flex;
		justify-content: space-around;
		gap: 8px;
		margin-top: 24px;
		button {
			cursor: pointer;
			padding: 8px 12px;
			border-radius: 8px;
			background: ${() => getColorByKey(StageStatusEnum.Error)};
			color: #fff;
			&:nth-child(2) {
				background: ${() => getColorByKey(StageStatusEnum.Pending)};
			}
		}
	}
`;
