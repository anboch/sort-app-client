import { ValueOf } from '../common/types';
import { browserTypes } from '../../hooks/useCheckBrowser';
import { Divider, Typography } from '@mui/material';

const PostScriptum = (): JSX.Element => {
  return (
    <>
      <Divider variant="middle" />
      <Typography>
        Если возникнут трудности - напишите по контактам внизу страницы и мы поможем!
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
        <Typography>
          - Зайдите в меню браузера, нажав на <b>три точки</b> в углу экрана
        </Typography>
        <Typography>
          - Нажмите &quot;<b>установить приложение</b>&quot;
        </Typography>
        <Typography>
          - Подтвердите установку кнопкой &quot;<b>установить</b>&quot;
        </Typography>
        <PostScriptum />
      </>
    );
  } else if (browserType === browserTypes.SAFARI) {
    return (
      <>
        <Typography>
          - Нажмите на значок &quot;<b>поделиться</b>&quot; в нижней или верхней части экрана
        </Typography>
        <Typography>
          - Нажмите &quot;<b>На экран домой</b>&quot;
        </Typography>
        <Typography>
          - Подтвердите установку кнопкой &quot;<b>добавить</b>&quot;
        </Typography>
        <PostScriptum />
      </>
    );
  } else if (browserType === browserTypes.YANDEX) {
    return (
      <>
        <Typography>
          - Зайдите в меню браузера, нажав на <b>три точки</b> в углу экрана
        </Typography>
        <Typography>
          - Нажмите &quot;<b>добавить ярлык</b>&quot;
        </Typography>
        <PostScriptum />
      </>
    );
  } else if (browserType === browserTypes.SAMSUNG) {
    return (
      <>
        <Typography>
          - Зайдите в меню браузера, нажав на <b>три полоски</b> в углу экрана
        </Typography>
        <Typography>
          - Нажмите &quot;<b>добавить страницу в</b>&quot;
        </Typography>
        <Typography>
          - Нажмите &quot;<b>домашний экран</b>&quot;
        </Typography>
        <PostScriptum />
      </>
    );
  } else if (browserType === browserTypes.OPERA) {
    return (
      <>
        <Typography>
          - Зайдите в меню браузера, нажав на <b>три точки</b> в углу экрана
        </Typography>
        <Typography>
          - Нажмите &quot;<b>домашний экран</b>&quot;
        </Typography>
        <Typography>
          - Подтвердите установку кнопкой &quot;<b>добавить</b>&quot;
        </Typography>
        <PostScriptum />
      </>
    );
  } else if (browserType === browserTypes.FIREFOX) {
    return (
      <>
        <Typography>
          - Зайдите в меню браузера, нажав на <b>три точки</b> в углу экрана
        </Typography>
        <Typography>
          - Нажмите &quot;<b>установить</b>&quot;
        </Typography>
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
