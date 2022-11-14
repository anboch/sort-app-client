/* Core */

import * as S from './BinListStyles';
import { Bin } from '../Bin/Bin';
import { useGetBins } from '../../hooks/useGetBins';
import { Typography, Link } from '@mui/material';
import { pageRoutes } from '../../routes';
import { Link as RouterLink } from 'react-router-dom';
/* Components */

/* Instruments */

export const BinList = (): JSX.Element => {
  // todo. request by one bin to prevent rerender of all bins when edit one
  const binsQ = useGetBins();

  if (!binsQ.data) {
    // todo add spinner
    return <>Error or loading</>;
  }
  if (binsQ.data.length === 0) {
    return (
      <S.BinList>
        <S.NoBinNotice>
          <Typography display="block" variant="h6" align="center">
            У вас пока нет корзин
          </Typography>
          <S.NoBinNoticeExplanation>
            <Typography variant="subtitle1">{'Воспользуйтесь '}</Typography>
            <Link component={RouterLink} to={pageRoutes.search}>
              поиском по материалам
            </Link>
            <Typography variant="subtitle1">
              {' и в зависимости от удобного пункта приёма создайте подходящую'}
            </Typography>
          </S.NoBinNoticeExplanation>
        </S.NoBinNotice>
      </S.BinList>
    );
  }
  return (
    <S.BinList>
      {binsQ.data.map((bin) => (
        <Bin key={bin._id} bin={bin} />
      ))}
    </S.BinList>
  );
};

// const [expanded, setExpanded] = React.useState<string | false>(false);
// const handleChange =
//   (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
//     setExpanded(isExpanded ? panel : false);
//   };

{
  /* <Accordion expanded={expanded === bin._id} onChange={handleChange(bin._id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        // aria-controls="panel1bh-content"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Type
          </Typography>
          {typeof bin.typeID === 'object' && bin.typeID.title &&
            <Typography sx={{ color: 'text.secondary' }}>{bin.typeID.title}</Typography>
          }
        </AccordionSummary>
        <AccordionDetails>
          {typeof bin.typeID === 'object' && bin.typeID.ruleSetIDs &&
            <Typography sx={{ color: 'text.secondary' }}>{bin.typeID.title}</Typography>
          }
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === bin._id} onChange={handleChange(bin._id)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
        // aria-controls="panel1bh-content"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Type
          </Typography>
          {typeof bin.typeID === 'object' && bin.typeID.title &&
            <Typography sx={{ color: 'text.secondary' }}>{bin.typeID.title}</Typography>
          }
        </AccordionSummary>
        <AccordionDetails>
          {typeof bin.typeID === 'object' && bin.typeID.ruleSetIDs &&
            <Typography sx={{ color: 'text.secondary' }}>{bin.typeID.title}</Typography>
          }
        </AccordionDetails>
      </Accordion> */
}
