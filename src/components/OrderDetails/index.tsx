// src/components/OrderDetails/index.tsx
import { Order, OrderStatusEnum, TimelineStatusEnum } from "../../types";
import { formatDateTime } from "../../utilities";
import Timeline from "../Timeline";
import {
  DetailsHeader,
  DetailsWrap,
  StyledBox,
  TwoCol,
  TwoRows,
  UserCard,
} from "../../styles";
import OrderStatusActions from "../OrderStatusActions";
import { StageForm } from "../StageForm";
import { Subtle } from "../OrderCard/styles";
import CardDetails from "../OrderCard/CardDetails";
import { Item } from "../Timeline/TimelineItem/styles";
import { TimelineContainer } from "../Timeline/styles";
import InputModal from "../InputModal";

export default function OrderDetails({
  order,
  onCancel,
  onComplete,
  showAddStage,
  onAddStageForm,
  onCloseStageForm,
  onSaveStageForm,
  stageForm,
  setStageForm,
}: {
  order: Order;
  showAddStage: boolean;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
  onAddStageForm: (id: string) => void;
  onCloseStageForm: () => void;
  onSaveStageForm: () => void;
  stageForm: {
    title: string;
    description: string;
    extraDescription: string;
    status: TimelineStatusEnum;
  };
  setStageForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      extraDescription: string;
      status: TimelineStatusEnum;
    }>
  >;
}) {
  const latest = order.stages[order.stages.length - 1];
  const created = formatDateTime(order.createdAt);

  const stagesCount = order.stages.length;
  const isTerminal = order.orderStatus === OrderStatusEnum.Preparing;
  const canAct = stagesCount >= 1 && stagesCount <= 4 && isTerminal;

  const formFieldsStages = [
    {
      type: "text" as const,
      label: "Title",
      value: stageForm.title,
      name: "title",
      required: true,
      placeholder: "Title",
    },
    {
      type: "textarea" as const,
      label: "Description",
      value: stageForm.description,
      name: "description",
      required: true,
      placeholder: "Enter your description",
    },
    {
      type: "textarea" as const,
      label: "Extra Description (optional)",
      value: stageForm.extraDescription,
      name: "extraDescription",
      required: false,
      placeholder: "Enter extra description",
    },
    {
      type: "select" as const,
      label: "Status",
      value: stageForm.status,
      options: [
        { label: "Pending", value: TimelineStatusEnum.Pending },
        { label: "Info", value: TimelineStatusEnum.Info },
        { label: "Completed", value: TimelineStatusEnum.Completed },
        { label: "Error", value: TimelineStatusEnum.Error },
      ],
      name: "status",
      required: true,
    },
  ];
  return (
    <DetailsWrap data-testid={`order-details`}>
      <DetailsHeader>
        <h3>Order #{order.idOrder}</h3>

        <OrderStatusActions
          canCancel={canAct}
          canComplete={canAct}
          canAddStageForm={canAct}
          onCancel={() => onCancel(order.idOrder)}
          onComplete={() => onComplete(order.idOrder)}
          onAddStageForm={() => onAddStageForm(order.idOrder)}
        />
      </DetailsHeader>

      <TwoCol>
        <TwoRows>
          <CardDetails
            title={"Created:"}
            prop1={`${created.date} • ${created.time}`}
            $space_between={false}
          />
          <CardDetails
            title={"Latest status:"}
            prop1={latest.title}
            $space_between={false}
          />
          {/* </Subtle> */}

          <TwoRows data-testid="timeline-section">
            <StyledBox $status={TimelineStatusEnum.Pending}>
              Status timeline
            </StyledBox>

            <Timeline stages={order.stages} data-testid="order-timeline" />
          </TwoRows>
        </TwoRows>

        <TimelineContainer>
          <TwoRows>
            <StyledBox $status={OrderStatusEnum.Completed}>Customer</StyledBox>
            <UserCard>
              <Subtle>
                <strong>{order.user.name}</strong>
              </Subtle>
              <Subtle>{order.user.email}</Subtle>
              <Subtle>{order.user.address}</Subtle>
              <Subtle>{order.user.phone}</Subtle>
            </UserCard>
          </TwoRows>
        </TimelineContainer>
      </TwoCol>
      {/* <StageForm
        showAddStage={showAddStage}
        onCloseStageForm={onCloseStageForm}
        onSaveStageForm={onSaveStageForm}
        stageForm={stageForm}
        setStageForm={setStageForm}
      /> */}

      <InputModal
        isOpen={showAddStage}
        title="Add new stage"
        primaryLabel="Save"
        secondaryLabel="Cancel"
        onClose={onCloseStageForm}
        onSave={onSaveStageForm}
        fields={formFieldsStages}
        values={stageForm}
        onChange={(name, value) => {
          // Ensure enum typing for select:
          if (name === "status") {
            setStageForm((prev) => ({
              ...prev,
              status: value as TimelineStatusEnum,
            }));
          } else {
            setStageForm((prev) => ({
              ...prev,
              [name]: value as string,
            }));
          }
        }}
      />
    </DetailsWrap>
  );
}
