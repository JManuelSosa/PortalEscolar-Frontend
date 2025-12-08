import { useQuery } from "@tanstack/react-query";
import { useCallback, useMemo } from "react";
import publicDataService from "../../Services/publicDataService";
import { queryKeys } from "../../Js/Utilities/QueryKeys";

//* Acl
import { transformRegisterFormData } from "../../Js/AnticorruptionLayer/registerFormData";
import { transformOnBoardEmployeeFormData } from "../../Js/AnticorruptionLayer/onBoardEmployeeFormData";
import { transformSystemEmployees } from "../../Js/AnticorruptionLayer/SystemEmployees";
import { periodTemplateFormData } from "../../Js/AnticorruptionLayer/periodTemplateFormData";


export const useRegisterFormData =  () => {

    const selectData = useCallback(transformRegisterFormData, []);

    const { data, isLoading, isError } = useQuery({ 
        queryKey: queryKeys.registerFormData, 
        queryFn: publicDataService.getRegisterFormData, 
        staleTime: 1000 * 60 * 60, 
        gcTime: 1000 * 60 * 70,
        select: selectData
    });

    return useMemo( () => ({
        statesForSelect: data?.statesForSelect ?? [],
        gendersForSelect: data?.gendersForSelect ?? [],
        statesById: data?.statesById ?? {},
        isLoading,
        isError
    }), [data, isLoading, isError]);
}

export const useOnBoardEmployeeFormData = () => {

    const selectData = useCallback(transformOnBoardEmployeeFormData, []);

    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.onBoardEmployeeFormData,
        queryFn: publicDataService.getOnBoardEmployeeFormData,
        staleTime: 120 * (60 * 1000),
        gcTime: 140 * (60 * 1000),
        select: selectData
    });

    return useMemo( () => ({
        statesForSelect: data?.statesForSelect ?? [], 
        gendersForSelect: data?.gendersForSelect ?? [], 
        statesById: data?.statesById ?? {}, 
        rolesForSelect: data?.rolesForSelect ?? [], 
        academicDegreesForSelect: data?.academicDegreesForSelect ?? [],
        rawRoles: data?.rawRoles ?? [],
        isLoading,
        isError
    }), [data, isLoading, isError]);

}

export const useSystemEmployees = () => {

    const selectData = useCallback(transformSystemEmployees, []);

    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.systemEmployees,
        queryFn: publicDataService.getSystemEmployees,
        staleTime: 120 * (60 * 1000),
        gcTime: 140 * (60 * 1000),
        select: selectData
    });

    return useMemo( () => ({ 
        data: data ?? [],
        isLoading, 
        isError 
    }), [data, isLoading, isError]);
}

export const usePeriodTemplateFormData = () => {

    const selectData = useCallback(periodTemplateFormData, []);
    const minutosStale = 120;
    const minutosFresh = 130;

    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.newTemplateFormData,
        queryFn: publicDataService.getPeriodTemplateFormData,
        staleTime: minutosStale * (60 * 1000),
        gcTime: minutosFresh * ( 60 * 1000),
        select: selectData
    });

    return useMemo( () => ({ 
        cycleForSelect: data?.cycleForSelect ?? [], 
        periodosForSelect: data?.periodosForSelect ?? [],
        subperiodosForSelect: data?.subperiodosForSelect ?? [],
        isLoading, 
        isError 
    }), [data, isLoading, isError]);

}

export const useNewGroupFormData = () => {
    
    const minutosStale = 120;
    const minutosFresh = 130;

    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.newGroupFormData,
        queryFn: publicDataService.getNewGroupFormData,
        staleTime: minutosStale * (60 * 1000),
        gcTime: minutosFresh * ( 60 * 1000)
    });

    return useMemo( () => ({
        data,
        isLoading, 
        isError 
    }), [data, isLoading, isError]);

}

export const useNewEnrollmentFormData = () => {

    const selectData = useCallback(transformOnBoardEmployeeFormData, []);

    const { data, isLoading, isError } = useQuery({
        queryKey: queryKeys.onBoardEmployeeFormData,
        queryFn: publicDataService.getOnBoardEmployeeFormData,
        staleTime: 120 * (60 * 1000),
        gcTime: 140 * (60 * 1000),
        select: selectData
    });

    return useMemo( () => ({
        statesForSelect: data?.statesForSelect ?? [], 
        gendersForSelect: data?.gendersForSelect ?? [], 
        statesById: data?.statesById ?? {}, 
        rolesForSelect: data?.rolesForSelect ?? [], 
        academicDegreesForSelect: data?.academicDegreesForSelect ?? [],
        rawRoles: data?.rawRoles ?? [],
        isLoading,
        isError
    }), [data, isLoading, isError]);

}




