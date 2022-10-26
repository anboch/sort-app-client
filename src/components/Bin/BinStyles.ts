import { Paper, Typography } from "@mui/material";
import styled from "styled-components";

export const BinActions = styled.div`
  display: flex;
  justify-content: end;
`;
export const BinTitle = styled.div``;

export const Bin = styled(Paper)(({ theme }) => ({
  // ...theme.typography.body2,
  // textAlign: "center",
  // color: theme.palette.text.secondary,
  // height: 60,
  // lineHeight: "60px",
  padding: "10px",
  marginBottom: "10px",
}));

export const BinRule = styled(Typography)<{ selected: boolean }>`
  ${({ selected }) => !selected && `text-decoration-line: line-through;`};
`;
