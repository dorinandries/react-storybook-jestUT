// components/Timeline/StageItem/index.tsx
import React, { useState } from 'react';
import { StageStatusEnum, Stage } from '../../../types';
import {
	Item,
	DataContainerStyled,
	ContentStyled,
	Title,
	Desc,
	MetaRight,
	Extra,
	Toggle,
	SecondaryTitle,
	HeaderStyled,
} from './styles';
import { Indicator } from './Indicator';
import { Rows, Cols } from '../../../styles';
import { EditButton, InfoButton } from '../../OrderTimelineButtons/styles';

export interface StageItemProps extends Stage {

	'data-testid'?: string;
	onEditStage: () => void;
}

export default function StageItem({
	title,
	description,
	date,
	time,
	extraDescription,
	status = StageStatusEnum.Neutral,
	isFirstElement = false,
	isLastElement = false,
	onEditStage = () => {},
	...props
}: StageItemProps) {
	const [open, setOpen] = useState(false);
	const hasExtra = Boolean(extraDescription);
	const { ['data-testid']: testId } = props;

	return (
		<Item data-testid={testId}>
			<Indicator
				status={status}
				isFirstElement={isFirstElement}
				isLastElement={isLastElement}
			/>
			<DataContainerStyled
				$data-highlighted={
					status === StageStatusEnum.Pending ? 'true' : undefined
				}
				aria-label='Stage Item Data Container'
			>
				<ContentStyled>
					{/* <Rows>
            <Title data-testid="stage-item-title">{title}</Title>

            <Desc data-testid="stage-item-description">{description}</Desc>
          </Rows>
          <MetaRight>
            <Desc data-testid="stage-item-date">{date}</Desc>
            <Desc data-testid="stage-item-time">{time}</Desc>
          </MetaRight>
          <MetaRight>
            <InfoButton onClick={onEditStage} data-testid="button-edit-stage">
              Edit
            </InfoButton>
          </MetaRight> */}
					<Cols>
						<HeaderStyled>
							<Title data-testid='stage-item-title'>{title}</Title>

							<MetaRight>
								<SecondaryTitle data-testid='stage-item-time'>
									Time
								</SecondaryTitle>

								<Desc data-testid='stage-item-date'>{date}</Desc>
								<Desc data-testid='stage-item-time'>{time}</Desc>
							</MetaRight>

							<EditButton onClick={onEditStage} data-testid='button-edit-stage'>
								Edit
							</EditButton>
						</HeaderStyled>

						<Rows>
							<Cols>
								<Desc data-testid='stage-item-description'>{description}</Desc>
							</Cols>
						</Rows>

						{hasExtra && open && (
							<Extra $status={status}>
								{typeof extraDescription === 'string' ? (
									<p>{extraDescription}</p>
								) : (
									extraDescription
								)}
							</Extra>
						)}
						{hasExtra && (
							<Toggle onClick={() => setOpen((v) => !v)}>
								{open ? 'See less' : 'See more'}
							</Toggle>
						)}
					</Cols>
				</ContentStyled>
			</DataContainerStyled>
		</Item>
	);
}
