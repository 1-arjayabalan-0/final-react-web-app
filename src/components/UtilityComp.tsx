import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Toast } from "primereact/toast";
import { hideToast } from "../redux/slices/common/alertsSlice";
import { ProgressSpinner } from "primereact/progressspinner";

export const getSeverity = (status) => {
  switch (status) {
    case "Active":
      return "success";
    case "Inactive":
      return "warning";
    case "OUTOFSTOCK":
      return "danger";

    default:
      return null;
  }
};

export function AppProgressSpinner() {
  return (
    <div className="card">
      <ProgressSpinner
        style={{ width: "50px", height: "50px" }}
        strokeWidth="8"
        fill="var(--surface-ground)"
        animationDuration=".5s"
      />
    </div>
  );
}

const ToastComponent = () => {
  const dispatch = useDispatch();

  const { severity, summary, detail, life } = useSelector(
    (state: any) => state.alerts
  );

  const toastRef = useRef(null);

  const onHide = () => {
    dispatch(hideToast());
  };

  return (
    <Toast
      ref={toastRef}
      position="top-right"
      onHide={onHide}
      {...{ severity, summary, detail, life }}
    />
  );
};

export default ToastComponent;
