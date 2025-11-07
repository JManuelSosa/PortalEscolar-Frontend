import { useQuery } from "@tanstack/react-query";
import publicDataService from "../../Services/publicDataService";
import { queryKeys } from "../../Js/Utilities/QueryKeys";

//* Acl
import { transformRegisterFormData } from "../../Js/AnticorruptionLayer/registerFormData";
import { transformOnBoardEmployeeFormData } from "../../Js/AnticorruptionLayer/onBoardEmployeeFormData";


export const useRegisterFormData =  () => {

    const { data, isLoading, isError } = useQuery({ 
        queryKey: queryKeys.registerFormData, 
        queryFn: publicDataService.getRegisterFormData, 
        staleTime: 1000 * 60 * 60, 
        gcTime: 1000 * 60 * 70,
        select: transformRegisterFormData
    });

    return {
        statesForSelect: data?.statesForSelect ?? [],
        gendersForSelect: data?.gendersForSelect ?? [],
        statesById: data?.statesById ?? {},
        isLoading,
        isError
    };
}

export const useOnBoardEmployeeFormData = () => {

    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.onBoardEmployeeFormData,
        queryFn: publicDataService.getOnBoardEmployeeFormData,
        staleTime: 120 * (60 * 1000),
        gcTime: 140 * (60 * 1000),
        select: transformOnBoardEmployeeFormData
    });

    return {
        statesForSelect: data?.statesForSelect ?? [], 
        gendersForSelect: data?.gendersForSelect ?? [], 
        statesById: data?.statesById ?? {}, 
        rolesForSelect: data?.rolesForSelect ?? [], 
        academicDegreesForSelect: data?.academicDegreesForSelect ?? [],
        isLoading,
        isError
    }

}



