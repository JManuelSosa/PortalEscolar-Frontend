import { useQuery } from "@tanstack/react-query";
import publicDataService from "../../Services/publicDataService";

//* Acl
import { transformRegisterFormData } from "../../Js/AnticorruptionLayer/registerFormData";

const queryKeys = { 
    registerFormData: ["registerFormData"]
};


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

