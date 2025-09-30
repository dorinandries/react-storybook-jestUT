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
import { StageForm } from "./StageForm";
import { Subtle } from "../OrderCard/styles";
import CardDetails from "../OrderCard/CardDetails";
import { Item } from "../Timeline/TimelineItem/styles";
import { TimelineContainer } from "../Timeline/styles";

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
      <StageForm
        showAddStage={showAddStage}
        onCloseStageForm={onCloseStageForm}
        onSaveStageForm={onSaveStageForm}
        stageForm={stageForm}
        setStageForm={setStageForm}
      />
    </DetailsWrap>
  );
}
