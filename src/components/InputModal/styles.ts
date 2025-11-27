import { styled } from 'styled-components';
import { getColorByKey } from '../../styles';
import { StageStatusEnum } from '../../types';

export const InputModalContainerStyled = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	background: rgba(0, 0, 0, 0.35);
	z-index: 1000;
`;

export const InputModalBodyStyled = styled.div`
	background: #fff;
	padding: 24px;
	border-radius: 12px;
	min-width: 320px;
	box-shadow: 0 2px 16px rgba(0, 0, 0, 0.2);
`;

export const InputModalTitleStyled = styled.div`
	margin-bottom: 12px;
	user-select: none;
`;

export const InputModalContentStyled = styled.div`
	display: flex;
	flex-direction: column;
	gap: 12px;
	margin: 16px 0;
`;

export const InputModalButtonStyled = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	user-select: none;

	button {
		cursor: pointer;
		padding: 8px 12px;
		border-radius: 8px;
		background: ${() => getColorByKey(StageStatusEnum.Completed)};
		color: #fff;
		&:nth-child(2) {
			background: ${() => getColorByKey(StageStatusEnum.Error)};
		}
	}
`;

export const LabelStyled = styled.label`
	display: flex;
	flex-direction: column;
	font-weight: 500;
	font-size: 14px;
	max-width: 100%;
	span {
		user-select: none;
	}

	textarea {
		//
		min-width: 320px;
	}

	input,
	textarea,
	select {
		border: 1px solid #ccc;
		border-radius: 12px;
		padding: 8px;
	}
`;
