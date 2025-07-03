import { useOne } from "@refinedev/core";

const ShowBoat = () => {
  const { data, isLoading } = useOne({ resource: "boats", id: 1 });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log(data);
  return <div>Boat name: {data?.data.name}</div>;
};

export { ShowBoat }