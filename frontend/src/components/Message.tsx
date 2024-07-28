import { FC, PropsWithChildren } from "react";
import { Alert } from "react-bootstrap";

interface Props {
  variant?: string;
}

const Message: FC<PropsWithChildren<Props>> = ({
  variant = "info",
  children,
}) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
