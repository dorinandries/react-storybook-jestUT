// src/components/OrderDetails/index.tsx
import { Order, OrderStatusEnum, TimelineStatusEnum } from "../../types";
import { formatDateTime, nowStageDateTime } from "../../utilities";
import Timeline from "../Timeline";
import {
  DetailsHeader,
  DetailsWrap,
  StyledBox,
  TwoCol,
  TwoRows,
  UserCard,
} from "../../styles";
import OrderTimelineButtons from "../OrderTimelineButtons";
import { StageForm } from "../StageForm";
import { Subtle } from "../OrderCard/styles";
import CardDetails from "../OrderCard/CardDetails";
import { Item } from "../Timeline/TimelineItem/styles";
import { TimelineContainer } from "../Timeline/styles";
import InputModal from "../InputModal";
import { useState } from "react";

export default function OrderDetails({
  selectedOrder,
  setOrders,
  onCancel,
  onComplete,
}: {
  selectedOrder: Order;
  setOrders: React.Dispatch<React.SetStateAction<Order[]>>;
  onCancel: (id: string) => void;
  onComplete: (id: string) => void;
}) {
  const latest = selectedOrder.stages[selectedOrder.stages.length - 1];
  const created = formatDateTime(selectedOrder.createdAt);

  const stagesCount = selectedOrder.stages.length;
  const isTerminal = selectedOrder.orderStatus === OrderStatusEnum.Preparing;
  const canAct = stagesCount >= 1 && stagesCount <= 4 && isTerminal;

  const formFieldsStages = [
    {
      type: "text" as const,
      label: "Title",
      name: "title",
      required: true,
      placeholder: "Title",
    },
    {
      type: "textarea" as const,
      label: "Description",
      name: "description",
      required: true,
      placeholder: "Enter your description",
    },
    {
      type: "textarea" as const,
      label: "Extra Description (optional)",
      name: "extraDescription",
      required: false,
      placeholder: "Enter extra description",
    },
    {
      type: "select" as const,
      label: "Status",
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

  const [showAddStage, setShowAddStage] = useState(false);

  // Add stage popup state
  const [stageForm, setStageForm] = useState({
    id: undefined as number | undefined,
    title: "",
    description: "",
    extraDescription: "",
    status: TimelineStatusEnum.Pending,
  });

  // Helper to get current date/time in project format
  /**
   * this method displays the modal and resets the inputs values
   */
  const handleAddStageButton = () => {
    setShowAddStage(true);
    setStageForm({
      id: undefined,
      title: "",
      description: "",
      extraDescription: "",
      status: TimelineStatusEnum.Pending,
    });
  };

  const handleEditStageButton = (id: number) => {
    setShowAddStage(true);
    const stage = selectedOrder.stages[id];
    setStageForm({
      id: id,
      title: stage.title ?? "",
      description: stage.description ?? "",
      extraDescription:
        typeof stage.extraDescription === "string"
          ? stage.extraDescription
          : "",
      status: stage.status ?? TimelineStatusEnum.Pending,
    });
  };

  const handleCloseStage = () => {
    setShowAddStage(false);
  };

  const handleSaveStage = (data: any) => {
    const { title, description, extraDescription, status, id } = data;
    if (!id) {
      const { date, time } = nowStageDateTime();
      const newStage = {
        title: title,
        description: description,
        date,
        time,
        extraDescription: extraDescription,
        status: status,
        id: selectedOrder.stages.length + 1,
      };
      setOrders((prev) =>
        prev.map((o) =>
          o.idOrder === selectedOrder.idOrder
            ? { ...o, stages: [...o.stages, newStage] }
            : o
        )
      );
    } else {
      alert("Updating existing stage " + id);
      setOrders((prev) =>
        prev.map((o) =>
          o.idOrder === selectedOrder.idOrder
            ? {
                ...o,
                stages: o.stages.map((s, idx) =>
                  idx === id ? { ...s, title, description, extraDescription, status } : s
                ),
              }
            : o
        )
      );
    }
    setShowAddStage(false);
  };

  return (
    <DetailsWrap data-testid={`order-details`}>
      <DetailsHeader>
        <h3>Order #{selectedOrder.idOrder}</h3>

        <OrderTimelineButtons
          canCancel={canAct}
          canComplete={canAct}
          canAddStageForm={canAct}
          onCancel={() => onCancel(selectedOrder.idOrder)}
          onComplete={() => onComplete(selectedOrder.idOrder)}
          onAddStageForm={handleAddStageButton}
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

            <Timeline
              stages={selectedOrder.stages}
              data-testid="order-timeline"
              handleEditStageButton={handleEditStageButton}
            />
          </TwoRows>
        </TwoRows>

        <TimelineContainer>
          <TwoRows>
            <StyledBox $status={OrderStatusEnum.Completed}>Customer</StyledBox>
            <UserCard>
              <Subtle>
                <strong>{selectedOrder.user.name}</strong>
              </Subtle>
              <Subtle>{selectedOrder.user.email}</Subtle>
              <Subtle>{selectedOrder.user.address}</Subtle>
              <Subtle>{selectedOrder.user.phone}</Subtle>
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
        onClose={handleCloseStage}
        onSave={handleSaveStage}
        additionalFieldsForData={typeof stageForm.id === "number" ? { id: stageForm.id } : undefined}
        fields={formFieldsStages}
        values={stageForm}
      />
    </DetailsWrap>
  );
}
