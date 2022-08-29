import styled from "styled-components";

export const StyledMaterialList = styled.div`
  display: flex;
  align-items: center;
  /* justify-content: center; */
  width: 100%;
  flex-direction: column;
  /* border: 1px solid #cdd2d7; */
`;

// export const MaterialItem = styled.div`
//   border: 1px solid #cdd2d7;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
//   width: 100%;
//   padding: 10px 0;
//   border-radius: 10px;
// `;

export const MaterialPreview = styled.div`
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  justify-content: space-between;
  & > * {
    width: 30%;
    min-width: 230px;
  }
`;

export const MaterialTitles = styled.div`
  /* min-width: 230px; */
`;

export const MaterialAcceptInfo = styled.div`
  /* padding: 10px; */
`;

export const Tags = styled.div`
  /* padding: 3px 0 0 0; */
  & > * {
    margin: 0 1px;
  }
`;

export const MaterialInfo = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-wrap: wrap;
  & > * {
    width: 30%;
    min-width: 250px;
  }
  /* padding: 0 10px; */
`;

export const SimilarMaterialAndDescription = styled.div`
  /* width: 30%;
  min-width: 300px; */
`;

export const MaterialDescription = styled.div``;

export const SimilarMaterial = styled.div``;

export const MaterialRules = styled.div`
  /* width: 30%;
  min-width: 300px; */
`;
export const MaterialImages = styled.div`
  /* width: 30%;
  min-width: 300px; */
`;
export const Buttons = styled.div`
  text-align: end;
  padding-top: 5px;
`;
