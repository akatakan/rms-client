import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { tableService } from "../services/tableService"


export const useTables = () => {
    return useQuery({
        queryKey: ['tables'],
        queryFn: tableService.getTables,
    })
}

export const useUpdateTableStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id,status} : {id:string,status:string})=>
            tableService.updateStatus(id,status),

        onSuccess: () => {
            queryClient.invalidateQueries({queryKey:['tables']});
        }
    })
}