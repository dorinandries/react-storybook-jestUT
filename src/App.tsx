// src/App.tsx
import React, { useMemo, useState } from "react";
import "./App.css";
import { Grid, Page } from "./styles";
import { mockOrders } from "./mock/mockOrders";
import OrderDetails from "./components/OrderDetails";
import OrderCard from "./components/OrderCard";
import { OrderStatusEnum, TimelineStatusEnum, type Order } from "./types";
import { nowStageDateTime } from "./utilities";

function App() {
  // ...existing code...
  const [orders, setOrders] = useState<Order[]>(() =>
    mockOrders.map((o) =>
      o.stages.length === 5 && o.orderStatus !== OrderStatusEnum.Canceled
        ? { ...o, orderStatus: OrderStatusEnum.Canceled }
        : o
    )
  );

  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const selectedOrder = useMemo(
    () => orders.find((o) => o.idOrder === selectedOrderId) ?? null,
    [orders, selectedOrderId]
  );

  const appendTerminalStage = (id: string, kind: OrderStatusEnum) => {
    setOrders((prev) =>
      prev.map((o) => {
        if (o.idOrder !== id) return o;

        // if already terminal or already at 5 stages, keep as is
        if (o.stages.length >= 5 || o.orderStatus === kind) return o;

        const { date, time } = nowStageDateTime();

        const title =
          kind === OrderStatusEnum.Canceled ? "Order canceled" : "Order completed";
        const description =
          kind === OrderStatusEnum.Canceled
            ? "Delivery could not be completed"
            : "Order successfully completed";
        const extraDescription =
          kind === OrderStatusEnum.Canceled ? "Order canceled" : "Order completed";
        const status: TimelineStatusEnum.Error | TimelineStatusEnum.Completed =
          kind === OrderStatusEnum.Canceled
            ? TimelineStatusEnum.Error
            : TimelineStatusEnum.Completed;

        const prevStages = o.stages.map((s) => ({
          ...s,
          isLastElement: false,
        }));

        const newStage = {
          title,
          description,
          date, // today
          time, // now
          status, // "error" | "completed"
          isLastElement: true,
          extraDescription,
        };

        return {
          ...o,
          stages: [...prevStages, newStage].slice(0, 5),
          orderStatus: kind,
        };
      })
    );
  };

  const cancelOrder = (id: string) => appendTerminalStage(id, OrderStatusEnum.Canceled);
  const completeOrder = (id: string) => appendTerminalStage(id, OrderStatusEnum.Completed);

  // Add stage popup state
  const [showAddStage, setShowAddStage] = useState(false);
  const [stageForm, setStageForm] = useState({
    title: "",
    description: "",
    extraDescription: "",
    status: TimelineStatusEnum.Pending,
  });

  // Helper to get current date/time in project format


  const handleAddStage = () => {
    setShowAddStage(true);
    setStageForm({
      title: "",
      description: "",
      extraDescription: "",
      status: TimelineStatusEnum.Pending,
    });
  };

  const handleCloseStage = () => {
    setShowAddStage(false);
  };

  const handleSaveStage = () => {
    if (!selectedOrder) return;
    const { date, time } = nowStageDateTime();
    const newStage = {
      title: stageForm.title,
      description: stageForm.description,
      date,
      time,
      extraDescription: stageForm.extraDescription,
      status: stageForm.status,
    };
    setOrders((prev) =>
      prev.map((o) =>
        o.idOrder === selectedOrder.idOrder
          ? { ...o, stages: [...o.stages, newStage] }
          : o
      )
    );
    setShowAddStage(false);
  };

  return (
    <Page>
      <h2>Orders</h2>

      {/* Cards grid */}
      <section aria-label="Orders grid">
        <Grid>
          {orders.map((o) => (
            <div key={o.idOrder}>
              <OrderCard
                order={o}
                onOpen={() => setSelectedOrderId(o.idOrder)}
                selected={selectedOrderId === o.idOrder}
              />
            </div>
          ))}
        </Grid>
      </section>

      {/* Details section below the grid */}
      {selectedOrder && (
        <div>
          <OrderDetails
            order={selectedOrder}
            onCancel={cancelOrder}
            onComplete={completeOrder}
            showAddStage={showAddStage}
            onAddStageForm={handleAddStage}
            onCloseStageForm={handleCloseStage}
            onSaveStageForm={handleSaveStage}
            stageForm={stageForm}
            setStageForm={setStageForm}
          />
        </div>
      )}
    </Page>
  );
}

export default App;
