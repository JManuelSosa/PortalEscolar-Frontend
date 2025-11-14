import { create } from "zustand";
import { persist } from "zustand/middleware";

import { useSchoolStore } from "./schoolStore";
import { message } from "antd";


export const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            expiration: null,
            schools: [],
            loginStore: (userData) => {
                set({
                    user: userData.user,
                    token: userData.access_token,
                    expiration: userData.expiration,
                    schools: userData.schools,
                    userData: userData.personalData
                })
            },
            logoutStore: () => { 
                set({
                    user: null,
                    token: null,
                    expiration: null,
                    schools: [],
                    userData: null
                });

                useSchoolStore.getState().clearSchool();
            },

            checkExpiration: () => {
                const { expiration, logoutStore } = get();
                if (expiration && Date.now() > expiration) {
                    logoutStore();
                    message.info('Sesión expirada por inactividad');
                }
            },

            //? Helper para verificar autenticación
            isAuthenticated: () => {
                const { token, expiration } = get();
                return !!(token && expiration && Date.now() < expiration);
            }
        }), 
        { 
            name: 'auth-storage',
            storage: {
                getItem: (name) => {
                    const item = sessionStorage.getItem(name);
                    return item ? JSON.parse(item) : null;
                },
                setItem: (name, value) => sessionStorage.setItem(name, JSON.stringify(value)),
                removeItem: (name) => sessionStorage.removeItem(name),
            },
        }
    )
);



