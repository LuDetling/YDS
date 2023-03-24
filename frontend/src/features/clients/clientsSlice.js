import { createSlice } from "@reduxjs/toolkit";

export const clientsSlice = createSlice({
    name: "clients",
    initialState: {
        clients: null,
        clientSelected: null,
        hoursDay: null,
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
                            name: payload.name,
                            workdates: payload.workdates,
                        };
                    };
                    return client;
                })
            }
        },
        selectClient: (state, { payload }) => {
            state.clientSelected = payload[0];
            state.hoursDay = payload[1];
        },
        resetClient: (state, { payload }) => {
            state.clientSelected = null;
            state.hoursDay = null;
        }
    }
})

export const { setClientsData, newClientData, deleteClientData, updateClientData, selectClient, resetClient } = clientsSlice.actions;
export default clientsSlice.reducer;