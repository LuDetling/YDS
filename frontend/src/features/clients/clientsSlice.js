import { createSlice } from "@reduxjs/toolkit";

export const clientsSlice = createSlice({
    name: "clients",
    initialState: {
        clients: null,
        clientSelected: null,
        indexClientSelected: null,
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
            console.log(payload);
            state.clientSelected = payload[0];
            state.indexClientSelected = payload[1];

        }
    }
})

export const { setClientsData, newClientData, deleteClientData, updateClientData, selectClient } = clientsSlice.actions;
export default clientsSlice.reducer;