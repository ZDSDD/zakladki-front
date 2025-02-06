import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { BsCheck2, BsXLg } from "react-icons/bs";

export type ButtonState = "default" | "success" | "failed" | "loading";
type ButtonType = "button" | "submit" | "reset";

interface MultiStateButtonProps {
  state: ButtonState;
  type?: ButtonType;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

type ButtonVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "dark"
  | "light"
  | "link"
  | "outline-primary"
  | "outline-secondary"
  | "outline-success"
  | "outline-danger"
  | "outline-warning"
  | "outline-info"
  | "outline-dark"
  | "outline-light";

interface ButtonConfig {
  variant: ButtonVariant;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const buttonConfigs: Record<ButtonState, ButtonConfig> = {
  default: { variant: "primary" },
  success: { variant: "outline-success", disabled: true, icon: <BsCheck2 /> },
  failed: { variant: "warning", icon: <BsXLg /> },
  loading: {
    variant: "outline-primary",
    disabled: true,
    icon: <Spinner size="sm" animation="border" />,
  },
};

const MultiStateButton: React.FC<MultiStateButtonProps> = ({
  state,
  onClick,
  type = "button",
  children,
  className = "",
  disabled: propDisabled,
}) => {
  const { variant, disabled: configDisabled, icon } = buttonConfigs[state];
  const isDisabled = propDisabled || configDisabled;

  return (
    <Button
      variant={variant}
      onClick={onClick}
      type={type}
      disabled={isDisabled}
      className={`position-relative d-flex align-items-center justify-content-center w-full ${className}`}
      aria-busy={state === "loading"}
    >
      {icon && <span className="position-absolute start-0 ms-2">{icon}</span>}
      <span className="mx-2">{children}</span>
    </Button>
  );
};

export default MultiStateButton;
