import { useTranslation } from '@refinedev/core';
import { Select } from 'antd';
import type { FC } from 'react';

const boatSystemKeys = [
  'hull_and_deck',
  'sails_and_rigging',
  'engine_and_propulsion',
  'plumbing',
  'electrical',
  'electronics_and_navigation',
  'safety',
  'comfort_and_interior',
  'anchor_and_mooring',
  'miscellaneous',
];

interface BoatSystemSelectProps {
  value?: string;
  name?: string;
  onChange?: (value: string) => void;
}

const BoatSystemSelect: FC<BoatSystemSelectProps> = ({ value, onChange }) => {
  const { translate } = useTranslation();

  const options = boatSystemKeys.map((key) => ({
    value: key,
    label: translate(`boats.systems.list.${key}.name`),
  }));

  return (
    <Select
      showSearch
      placeholder={translate('boats.systems.select.placeholder')}
      optionFilterProp="label"
      value={value}
      onChange={onChange}
      options={options}
    />
  );
};

export { BoatSystemSelect };
