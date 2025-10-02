// src/components/OrderTimelineButtons/index.tsx
import {
  ContainerButtons,
  DangerButton,
  InfoButton,
  SuccessButton,
} from "./styles";

export default function OrderTimelineButtons({
  canCancel,
  canComplete,
  canAddStageForm,
  onCancel,
  onComplete,
  onAddStageForm,
}: {
  canCancel: boolean;
  canComplete: boolean;
  canAddStageForm: boolean;
  onCancel: () => void;
  onComplete: () => void;
  onAddStageForm: () => void;
}) {
  if (!canCancel && !canComplete && !canAddStageForm) return null;

  return (
    <ContainerButtons data-testid="order-timeline-buttons">
      {canCancel && (
        <DangerButton onClick={onCancel} data-testid="button-cancel">Cancel order</DangerButton>
      )}
      {canComplete && (
        <SuccessButton onClick={onComplete} data-testid="button-complete">Mark as completed</SuccessButton>
      )}
      {canAddStageForm && (
        <InfoButton onClick={onAddStageForm} data-testid="button-add-stage">Add stage</InfoButton>
      )}
    </ContainerButtons>
  );
}
