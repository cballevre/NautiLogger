import { useCurrentBoat } from '../../hooks/use-current-boat';

const BoatDashboard = () => {
  const { data, isLoading } = useCurrentBoat();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return <div>Boat name: {data?.data.name}</div>;
};

export { BoatDashboard };
