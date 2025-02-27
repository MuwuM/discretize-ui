import clsx from 'clsx';
import { CSSProperties, ReactElement } from 'react';
import { ProfessionTypes } from '../../data/professions';
import GW2ApiSkill from '../../gw2api/types/skills/skill';
import AbilityDetails from '../AbilityDetails/AbilityDetails';
import IconWithText from '../IconWithText/IconWithText';
import professioncss from '../Profession/professions.module.css';
import Tooltip, { TooltipProps } from '../Tooltip/Tooltip';
import WikiLink, { WikiLinkProps } from '../WikiLink/WikiLink';

/**
 * Allows supplying custom data in the data props
 */
export interface CustomComponentProps {
  type: 'Skill' | 'Trait';
  data: unknown;
  text?: string;
  disableIcon?: boolean;
  disableText?: boolean;
  disableLink?: boolean;
  disableTooltip?: boolean;
  tooltipProps?: TooltipProps;
  wikiLinkProps?: WikiLinkProps;
  style?: CSSProperties;
  className?: string;
}

const CustomComponent = (props: CustomComponentProps): ReactElement => {
  const {
    disableLink,
    disableTooltip,
    wikiLinkProps,
    tooltipProps,
    text,
    data,
    type,
  } = props;

  if (type === 'Skill' || type === 'Trait') {
    const { name, icon, professions } = data as GW2ApiSkill;
    const profession: ProfessionTypes | undefined = professions?.[0];

    return (
      <Tooltip
        content={<AbilityDetails data={data as GW2ApiSkill} />}
        disabled={disableTooltip}
        {...tooltipProps}
      >
        <IconWithText
          {...props}
          icon={icon}
          text={
            disableLink ? (
              text || name
            ) : (
              <WikiLink
                to={name}
                text={text}
                {...wikiLinkProps}
                className={clsx(
                  profession && professioncss[`coloredProfession${profession}`],
                  wikiLinkProps?.className,
                )}
              />
            )
          }
          className={clsx(
            props.className,
            profession && professioncss[`coloredProfession${profession}`],
          )}
        />
      </Tooltip>
    );
  }

  return <></>;
};

export default CustomComponent;
