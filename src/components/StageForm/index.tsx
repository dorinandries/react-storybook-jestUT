// src/components/OrderDetails/StageForm/index.tsx
import { StageStatusEnum } from '../../types';
import { StageFormContainer, StageFormContent } from './styles';

export const StageForm = ({
	showAddStage,
	onCloseStageForm,
	onSaveStageForm,
	stageForm,
	setStageForm,
}: {
	showAddStage: boolean;
	onCloseStageForm: () => void;
	onSaveStageForm: () => void;
	stageForm: {
		title: string;
		description: string;
		extraDescription: string;
		status: StageStatusEnum;
	};
	setStageForm: React.Dispatch<
		React.SetStateAction<{
			title: string;
			description: string;
			extraDescription: string;
			status: StageStatusEnum;
		}>
	>;
}) => {
	return (
		<>
			{/* Add stage popup */}
			{showAddStage && (
				<StageFormContainer>
					<StageFormContent>
						<h3>Add Stage</h3>
						<form
							onSubmit={(e) => {
								e.preventDefault();
								onSaveStageForm();
							}}
						>
							<div className='formField'>
								<label>
									Title:
									<input
										type='text'
										value={stageForm.title}
										onChange={(e) =>
											setStageForm((f) => ({ ...f, title: e.target.value }))
										}
										required
									/>
								</label>
							</div>
							<div className='formField'>
								<label>
									Description:
									<input
										type='text'
										value={stageForm.description}
										onChange={(e) =>
											setStageForm((f) => ({
												...f,
												description: e.target.value,
											}))
										}
										required
									/>
								</label>
							</div>
							<div className='formField'>
								<label>
									Extra Description:
									<input
										type='text'
										value={stageForm.extraDescription}
										onChange={(e) =>
											setStageForm((f) => ({
												...f,
												extraDescription: e.target.value,
											}))
										}
									/>
								</label>
							</div>
							<div className='formField'>
								<label>
									Status:
									<select
										value={stageForm.status}
										onChange={(e) =>
											setStageForm((f) => ({
												...f,
												status: e.target.value as StageStatusEnum,
											}))
										}
									>
										<option value='pending'>Pending</option>
										<option value='info'>Info</option>
										<option value='error'>Error</option>
										<option value='completed'>Completed</option>
									</select>
								</label>
							</div>
							<div className='formActions'>
								<button type='button' onClick={onCloseStageForm}>
									Close
								</button>
								<button type='submit'>Save</button>
							</div>
						</form>
					</StageFormContent>
				</StageFormContainer>
			)}
		</>
	);
};
