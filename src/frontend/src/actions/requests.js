import { api } from "../services/api"


export const getHistoryData = async () => {
    const {
        data: {
            history = []
        }
    } = await api.get("/report/list");

    return {
        history
    }
}