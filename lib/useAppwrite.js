import { useEffect, useState } from "react";

export const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Moved fetchData function here to be in the same scope as refetch
    const fetchData = async () => {
        setIsLoading(true);

        try {
            const result = await fn();
            setData(result);
        } catch (error) {
            Alert.alert("Error", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Call fetchData within useEffect
    }, []);

    const refetch = async () => {
        await fetchData(); // You can now call fetchData since it's in the same scope
    };

    return { data, isLoading, refetch }
}
