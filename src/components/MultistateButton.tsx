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
          className: "bg-green-500 hover:bg-green-600 text-white",
          disabled: true,
          children: (
            <>
              <BsCheck2 className="mr-2 h-4 w-4" /> Success
            </>
          ),
        };
      case "failed":
        return {
          variant: "outline-warning",
          className: "bg-red-500 hover:bg-red-600 text-white",
          onClick,
          children: (
            <>
              <BsXLg className="mr-2 h-4 w-4" /> Failed - Retry
            </>
          ),
        };
      case "loading":
        return {
          variant: "outline-primary",
          className: "bg-blue-500 text-white",
          disabled: true,
          children: (
            <>
              <Spinner /> Loading...
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
        className={`w-full ${buttonProps.className || ""}`}
        type={type}
      />
    </div>
  );
};

export default MultiStateButton;
