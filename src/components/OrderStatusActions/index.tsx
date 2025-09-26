// src/components/OrderStatusActions/index.tsx
import {
  ContainerButtons,
  DangerButton,
  InfoButton,
  SuccessButton,
} from "./styles";

export default function OrderStatusActions({
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
    <ContainerButtons>
      {canCancel && (
        <DangerButton onClick={onCancel}>Cancel order</DangerButton>
      )}
      {canComplete && (
        <SuccessButton onClick={onComplete}>Mark as completed</SuccessButton>
      )}
      {canAddStageForm && (
        <InfoButton onClick={onAddStageForm}>Add stage</InfoButton>
      )}
    </ContainerButtons>
  );
}
