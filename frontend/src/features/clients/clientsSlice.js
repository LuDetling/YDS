import { createSlice } from "@reduxjs/toolkit";

export const clientsSlice = createSlice({
    name: "clients",
    initialState: {
        clients: null,
    },
    reducers: {
        setClientsData: (state, { payload }) => {
            state.clients = payload.getClients;
        },
        newClientData: (state, { payload }) => {
            state.clients.push(payload.addClients)
        },
        deleteClientData: (state, { payload }) => {
            return {
                ...state,
                clients: [...state.clients].filter(client => client.id !== payload.id)
            }
        },
        updateClientData: (state, { payload }) => {
            return {
                ...state,
                clients: [...state.clients].map((client) => {
                    if (client.id === payload.id && payload.name) {
                        return {
                            ...client,
                            name: payload.name
                        };
                    };
                    return client;
                })
            }
        }
    }
})

export const { setClientsData, newClientData, deleteClientData, updateClientData } = clientsSlice.actions;
export default clientsSlice.reducer;