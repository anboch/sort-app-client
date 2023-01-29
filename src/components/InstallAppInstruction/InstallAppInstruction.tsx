import { ValueOf } from '../common/types';
import { browserTypes } from '../../hooks/useCheckBrowser';
import { Divider, Typography } from '@mui/material';

const PostScriptum = (): JSX.Element => {
  return (
    <>
      <Divider variant="middle" />
      <Typography>
        Если не получается установить - напишите по контактам внизу страницы и мы поможем!
      </Typography>
    </>
  );
};

interface IInstallAppInstructionProps {
  browserType: ValueOf<typeof browserTypes>;
}

export const InstallAppInstruction = ({
  browserType,
}: IInstallAppInstructionProps): JSX.Element => {
  if (browserType === browserTypes.CHROME) {
    return (
      <>
        <Typography>- Зайдите в меню браузера, нажав на три точки в углу экрана</Typography>
        <Typography>- Нажмите &quot;установить приложение&quot;</Typography>
        <Typography>- Подтвердите установку кнопкой &quot;установить&quot;</Typography>
        <PostScriptum />
      </>
    );
  } else if (browserType === browserTypes.SAFARI) {
    return (
      <>
        <Typography>
          - Нажмите на значок &quot;поделиться&quot; в нижней или верхней части экрана
        </Typography>
        <Typography>- Нажмите &quot;На экран домой&quot;</Typography>
        <Typography>- Подтвердите установку кнопкой &quot;добавить&quot;</Typography>
        <PostScriptum />
      </>
    );
  } else if (browserType === browserTypes.YANDEX) {
    return (
      <>
        <Typography>- Зайдите в меню браузера, нажав на три точки в углу экрана</Typography>
        <Typography>- Нажмите &quot;добавить ярлык&quot;</Typography>
        <PostScriptum />
      </>
    );
  } else if (browserType === browserTypes.SAMSUNG) {
    return (
      <>
        <Typography>- Зайдите в меню браузера, нажав на три полоски в углу экрана</Typography>
        <Typography>- Нажмите &quot;добавить страницу в&quot;</Typography>
        <Typography>- Нажмите &quot;домашний экран&quot;</Typography>
        <PostScriptum />
      </>
    );
  } else if (browserType === browserTypes.OPERA) {
    return (
      <>
        <Typography>- Зайдите в меню браузера, нажав на три точки в углу экрана</Typography>
        <Typography>- Нажмите &quot;домашний экран&quot;</Typography>
        <Typography>- Подтвердите установку кнопкой &quot;добавить&quot;</Typography>
        <PostScriptum />
      </>
    );
  } else if (browserType === browserTypes.FIREFOX) {
    return (
      <>
        <Typography>- Зайдите в меню браузера, нажав на три точки в углу экрана</Typography>
        <Typography>- Нажмите &quot;установить&quot;</Typography>
        <PostScriptum />
      </>
    );
  }
  return (
    <>
      <Typography>
        - Не удается определить браузер - напишите по контактам внизу страницы и мы поможем!
      </Typography>
    </>
  );
};
