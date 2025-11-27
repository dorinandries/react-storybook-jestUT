// src/components/Timeline/TimelineItem/styles.tsx
import styled, { css, keyframes } from 'styled-components';
import { Stage } from '../../../types';

import { getColorByKey } from '../../../styles';

export const Item = styled.div`
	display: flex;
	flex-direction: row;
	padding: 0 20px;
`;

export const DataContainerStyled = styled.div`
	display: flex;
	flex-direction: column;
	background: #fff;
	border: 2px solid #d1d5db;
	border-radius: 10px;
	padding: 14px 16px;
	margin: 0.75rem;
	box-shadow: 0 2px 10px rgba(0, 0, 0, 0.04);
	&[$data-highlighted='true'] {
		border-color: ${getColorByKey('pending')};
		box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
	}
	// min-width: 400px;
	// width: 400px;

	@media (max-width: 768px) {
		flex-direction: row;
	}
`;

export const ContentStyled = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: baseline;
	gap: 12px;
	margin-bottom: 8px;
	width: 350px;

	@media (max-width: 550px) {
		width: 200px;
	}
`;

export const HeaderStyled = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;

	@media (max-width: 550px) {
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
	}
`;

export const Title = styled.h4`
	font-weight: 700;
	font-size: 1.2rem;
	word-wrap: break-word;
	max-width: 130px;

	text-align: center;
`;

export const SecondaryTitle = styled.h4`
	font-weight: 500;
	font-size: 1.2rem;
`;

export const MetaRight = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
`;

export const Desc = styled.p`
	margin: 6px 0 0;
	color: #6b7280;
	font-style: italic;
`;

export const Extra = styled.div<{ $status: Stage['status'] }>`
	margin-top: 10px;
	padding: 10px 12px;
	background: ${({ $status }) => getColorByKey($status || 'neutral')}1A;
	color: ${({ $status }) => getColorByKey($status || 'neutral')};
	border-radius: 8px;
	line-height: 1.4;
`;

export const Toggle = styled.button`
	margin-top: 8px;
	border: 1px solid #cbd5e1;
	background: #eef2ff;
	padding: 6px 10px;
	border-radius: 8px;
	color: #334155;
	cursor: pointer;
	width: 80px;
`;
