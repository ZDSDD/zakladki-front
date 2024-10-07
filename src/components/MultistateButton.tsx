import "bootstrap/dist/css/bootstrap.min.css";
import Button from "react-bootstrap/Button";
// Import Bootstrap styles
import Spinner from "react-bootstrap/Spinner";
import { BsCheck2 } from "react-icons/bs";
import { BsXLg } from "react-icons/bs";

export type ButtonState = "default" | "success" | "failed" | "loading";
type ButtonType = "button" | "submit" | "reset";
interface MultiStateButtonProps {
  state: ButtonState;
  type?: ButtonType;
  onClick?: () => void;
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
  className?: string;
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: ButtonType;
}

const MultiStateButton: React.FC<MultiStateButtonProps> = ({
  state,
  onClick,
  type = "button",
}) => {
  const getButtonProps = (): ButtonConfig => {
    switch (state) {
      case "success":
        return {
          variant: "outline-success",
          disabled: true,
          children: (
            <>
              <BsCheck2 className="absolute left-4" /> Success
            </>
          ),
        };
      case "failed":
        return {
          variant: "warning",
          onClick,
          children: (
            <>
              <BsXLg className="absolute left-4" /> Failed - Retry
            </>
          ),
        };
      case "loading":
        return {
          variant: "primary",
          disabled: true,
          children: (
            <>
              <Spinner className="absolute left-4" /> Loading...
            </>
          ),
        };
      default:
        return {
          variant: "primary",
          onClick,
          children: "Submit",
        };
    }
  };

  const buttonProps = getButtonProps();

  return (
    <div className="flex justify-center items-center">
      <Button
        {...buttonProps}
        className={`w-full relative flex items-center justify-center ${buttonProps.className || ""}`}
        type={type}
      />
    </div>
  );
};

export default MultiStateButton;
