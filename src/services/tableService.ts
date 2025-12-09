import { api } from "../api/axiosClient"
import type { Tables } from "../types/tableType"



export const tableService = {
    getTables: async () => {
        const response = await api.get<Tables[]>("/tables");
        return response.data;
    },

    updateStatus: async(id:string,status:string) => {
        const response = await api.patch(`/tables/updateStatus/${id}`,{status})
        return response.data;
    }
}