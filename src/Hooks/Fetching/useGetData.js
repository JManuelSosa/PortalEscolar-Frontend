import { useQuery } from "@tanstack/react-query";

//* Archivos para querys
import queryGetService from "../../Services/queryGetService";
import { queryKeys } from "../../Js/Utilities/QueryKeys";

export const useGetEmployees = () => {
    return useQuery({
        queryKey: queryKeys.employees, 
        queryFn: queryGetService.getEmployees,
        staleTime: 15 * (60 * 1000), 
        gcTime: 20 * (60 * 1000),
    });
}