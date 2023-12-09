import React from "react";
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
  useTheme,
} from "@mui/material";
import { tokens } from "../theme";
import { Modify } from "../helpers";

interface ButtonProps
  extends Modify<
    MuiButtonProps,
    {
      type?: "primary" | "secondary";
      size?: "medium" | "small";
      label: string;
    }
  > {}

const Button = ({
  type = "primary",
  size = "medium",
  label,
  ...props
}: ButtonProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const styles = {
    wrapper: {
      display: "inline-block",
      padding: "1px", // This is the border witdh
      borderRadius: "16px",
    },
    button: {
      background:
        type === "primary"
          ? `${colors.greenAccent[500]}`
          : `${colors.greenAccent[100]}`,
      border: "none",
      padding:
        size === "medium" ? "18px 40px 18px 40px" : "12px 40px 12px 40px",
      borderRadius: "15px", // Slighter less then the wrapper to show the border
      fontSize: "14px",
      fontWeight: "700",
      lineHeight: "20px",
      textTransform: "none",
      color: `${colors.greenAccent[900]}`,
      width: "100%",
      "&:hover": {
        background:
          type === "primary"
            ? `${colors.greenAccent[600]}`
            : `${colors.greenAccent[200]}`,
      },
    },
  };

  const { sx, ...otherProps } = props;

  return (
    <div style={type === "secondary" ? styles.wrapper : {}}>
      <MuiButton
        size={size}
        disabled={props.disabled}
        //  @ts-ignore
        sx={{
          ...styles.button,
          ...props.sx,
        }}
        {...otherProps}
      >
        {props.children || label}
      </MuiButton>
    </div>
  );
};

export { Button };
