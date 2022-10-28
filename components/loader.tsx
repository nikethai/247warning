import { Skeleton } from "@mantine/core";

const Loader = () => {
    return (
        <>
            <Skeleton height={8} radius="xl" mt={6} />
            <Skeleton height={8} radius="xl" mt={6} />
            <Skeleton height={8} radius="xl" mt={6} />
            <Skeleton height={8} radius="xl" mt={6} width="90%" />
            <Skeleton height={8} radius="xl" mt={6} width="80%" />
            <Skeleton height={8} radius="xl" mt={6} width="70%" />
            <Skeleton height={8} radius="xl" mt={6} width="60%" />
            <Skeleton height={8} radius="xl" mt={6} width="50%" />
        </>
    )
}

export default Loader;