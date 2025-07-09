import { useList } from "@refinedev/core";

const ListBoat = () => {

    const { data: boats } = useList({
        resource: "boats",
    });
    return (
        <div>
            <h1>Boat List</h1>
            <p> Showing {boats?.total} records in total. </p>
            <ul>
                {boats?.data?.map((boat) => (
                    <li key={boat.id}>
                        <a href={`/boats/${boat.id}`}>
                            {boat.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export { ListBoat };