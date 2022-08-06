import styled from "styled-components";

export const StyledMaterialsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  border: 1px solid #cdd2d7;
`;

export const MaterialItem = styled.div`
  border: 1px solid #cdd2d7;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px 0;
  border-radius: 10px;
`;

export const MaterialTitles = styled.div`
  padding: 10px;
`;

export const MaterialInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0 10px;
`;

export const TagsList = styled.div`
  & > * {
    margin: 0 1px;
  }
`;
