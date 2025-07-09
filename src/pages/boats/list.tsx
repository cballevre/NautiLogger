import { Link, useList, useTranslation } from '@refinedev/core';

const ListBoat = () => {
  const { data: boats } = useList({
    resource: 'boats',
  });

  const { translate } = useTranslation();

  return (
    <div>
      <h1>{translate('ListBoat.title')}</h1>
      <Link to="/boats/add">{translate('ListBoat.add')}</Link>
      <ul>
        {boats?.data?.map((boat) => (
          <li key={boat.id}>
            <Link to={`/boats/${boat.id}`}>{boat.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export { ListBoat };
