import { useQuery } from "@tanstack/react-query";

//* Archivos para querys
import queryGetService from "../../Services/queryGetService";
import { queryKeys } from "../../Js/Utilities/QueryKeys";

//* Obtención del scope
import { useSchoolStore } from "../../stores/schoolStore";

export const useGroups = () => {

    const schoolId = useSchoolStore((state) => state.currentSchoolId);

    return useQuery({
        queryKey: queryKeys.groups(schoolId),
        queryFn: queryGetService.getGroups,
        staleTime: 15 * (60 * 1000), 
        gcTime: 20 * (60 * 1000),
        enabled: !!schoolId
    });
}