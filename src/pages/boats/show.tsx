import { useOne } from '@refinedev/core';
import { useParams } from 'react-router';

const ShowBoat = () => {
  const { id } = useParams();
  const { data, isLoading } = useOne({ resource: 'boats', id });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return <div>Boat name: {data?.data.name}</div>;
};

export { ShowBoat };
