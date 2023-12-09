import {
  Box,
  Button,
  Grid,
  Input,
  Skeleton,
  Typography,
  makeStyles,
  useTheme,
} from "@mui/material";
import React from "react";
import { tokens } from "../theme";
import { Token } from "../pools/page";
import Image from "next/image";

// interface Token {
//   name: string;
//   icon: string;
//   usdValue: number;
//   amount: number;
//   category: string;
// }

interface TokenBoxProps {
  token: Token;
  onAssetClick?: () => void;
  onChange: (value: string) => void;
  hideDropdownButton?: boolean;
  value: string | undefined;
  disabled?: boolean;
  loadingValues?: boolean;
}

const AssetButton = ({
  token,
  onClick,
  hideDropdownButton = false,
}: {
  token: Token;
  onClick?: () => void;
  hideDropdownButton?: boolean;
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Button
      onClick={onClick}
      sx={{
        fontSize: "14px",
        padding: "4px",
        borderRadius: "8px",
        background: hideDropdownButton
          ? "none"
          : "linear-gradient(180deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.03) 100%)",
        display: "inline-flex",
        color: "white",
        "&:hover": {
          background: hideDropdownButton ? "none" : "rgba(226, 87, 28, 0.08)",
        },
        cursor: hideDropdownButton ? "auto" : "pointer",
        pointerEvents: hideDropdownButton ? "none" : "auto",
      }}
    >
      <Image
        src={token?.icon as string}
        width={24}
        height={24}
        alt={token?.name}
      />
      {token?.name}
    </Button>
  );
};

const TokenBox = ({
  token,
  onAssetClick,
  onChange,
  value,
  hideDropdownButton = false,
  disabled = false,
  loadingValues = false,
}: TokenBoxProps) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [usdPrice, setUsdPrice] = React.useState(
    Number(value) * Number(token?.usdValue) || 0
  );

  return (
    <Box
      sx={{
        background: `${
          theme.palette.mode == "dark"
            ? `${colors.primary[400]}`
            : `${colors.primary[700]}`
        } !important`,
        padding: "10px 16px",
        borderRadius: "16px",
        border: `1px solid ${colors.blueAccent[400]}`,
      }}
    >
      <Grid container>
        <Grid item xs={6}>
          {loadingValues ? (
            <Skeleton variant="text" width="80" animation="wave" />
          ) : (
            <Input
              disabled={disabled}
              value={value}
              onChange={e => {
                onChange(e.target.value);
                setUsdPrice(Number(e.target.value) * Number(token?.usdValue));
              }}
              inputProps={{ min: 0, max: token?.amount }}
              type="number"
              placeholder="0.00"
              sx={{
                color: "#FFF",
                fontSize: "24px",
                fontWeight: 700,
                lineHeight: "140%",
                "&:before": {
                  content: "none",
                },
                "&:after": {
                  content: "none",
                },
                "&:hover fieldset": {
                  border: `1px solid ${colors.blueAccent[400]} !important`,
                },
                "&:focus-within fieldset, &:focus-visible fieldset": {
                  border: `1px solid ${colors.blueAccent[400]} !important`,
                  color: "white!important",
                },
                "& input[type=number]": {
                  "-moz-appearance": "textfield",
                },
                "& input[type=number]::-webkit-outer-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                "& input[type=number]::-webkit-inner-spin-button": {
                  "-webkit-appearance": "none",
                  margin: 0,
                },
                width: "100%",
              }}
            />
          )}
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AssetButton
            hideDropdownButton={hideDropdownButton}
            token={token}
            onClick={onAssetClick}
          />
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            fontSize: "14px",
            color: "var(--content-medium-emphasis, rgba(255, 255, 255, 0.70));",
          }}
        >
          {loadingValues ? (
            <Skeleton variant="text" width="80" animation="wave" />
          ) : (
            usdPrice.toFixed(2)
          )}
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <Typography
            sx={{
              fontSize: "12px",
              lineHeight: "140%",
              color:
                "var(--content-medium-emphasis, rgba(255, 255, 255, 0.70));",
            }}
          >
            Balance {token?.amount}
          </Typography>
          <Button
            onClick={() => {
              onChange(token?.amount.toString());
              setUsdPrice(token?.amount * Number(token.usdValue));
            }}
            sx={{
              color: "white",
              fontSize: "12px",
              lineHeight: "140%",
              minWidth: "unset",
              padding: 0,
              marginLeft: 1,
              "&:hover": {
                background: "transparent",
              },
            }}
          >
            Max
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export { TokenBox };
