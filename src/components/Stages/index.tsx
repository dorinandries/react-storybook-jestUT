// components/Timeline/index.tsx
import { useMemo } from 'react';
import { Stage } from '../../types';
import StageItem, { StageItemProps } from './StageItem';
import { StagesContainer } from './styles';

export default function Stages({
	stages,
	handleEditStageButton,
	...props
}: {
	stages: Stage[];
	handleEditStageButton: (index: number) => void;
	'data-testid'?: string;
}) {
	const { ['data-testid']: testId } = props;

	const onEditStage = (index: number) => () => {
		handleEditStageButton(index);
	};

	//console.log("Normalized Stages:", normalized);
	return (
		<StagesContainer data-testid={testId}>
			{stages.map((s, i) => (
				<StageItem
					key={`${s.title}-${i}`}
					{...s}
					isFirstElement={i === 0}
					isLastElement={i === stages.length - 1}
					data-testid={`timeline-item-${i}`}
					onEditStage={onEditStage(i)}
				/>
			))}
		</StagesContainer>
	);
}
