import { useState, useEffect } from "react";
import { useUser, fetchPermissionSingleData } from "./helpers"; 

export const usePermissions = () => {
    const currentUser = useUser(); // Get logged-in user from Redux
    const [permissionSingle, setPermissions] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPermissions = async () => {
            if (currentUser?.id) {
                setLoading(true);
                const data = await fetchPermissionSingleData(currentUser.id);
                setPermissions(data);
                setLoading(false);
            }
        };

        fetchPermissions();
    }, [currentUser]);

    return { permissionSingle, loading };
};
