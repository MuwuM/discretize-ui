import { CreateItem, Item } from '@discretize/gw2-ui-new';
import { useDefaultStyles } from '../../styles/defaultStyles';

type Affix = React.ComponentProps<typeof Item>['stat'];

function createUpgrades(
  array: (number | [number, number] | undefined)[],
): (number | [number, number])[] {
  return (
    array &&
    (array.filter(
      (elem: [number, number] | number | undefined) =>
        typeof elem === 'number' || Array.isArray(elem),
    ) as (number | [number, number])[])
  );
}

const DynamicItem = ({
  id,
  affix,
  upgrades,
  type,
  weight,
}: {
  id?: number;
  affix?: Affix;
  upgrades?: (number | undefined | [number, number])[];
  type?: string;
  weight?: React.ComponentProps<typeof CreateItem>['weight'];
}) => {
  const defaultStyles = useDefaultStyles();
  const { gw2Item } = defaultStyles.classes;

  const sharedProps = {
    disableText: true,
    className: gw2Item,
    upgrades: upgrades ? createUpgrades(upgrades) : [],
    stat: affix || '',
  };

  return (
    <>
      {id ? (
        <Item id={id} {...sharedProps} />
      ) : (
        <CreateItem type={type || ''} weight={weight} {...sharedProps} />
      )}
    </>
  );
};
export default DynamicItem;
