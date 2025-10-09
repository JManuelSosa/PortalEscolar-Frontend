import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSchoolStore = create(

    persist(
        (set, get) => ({
            currentSchoolId: null,
            currentRole: null,

            changeSchool: (schoolId, role = null) => {
                set({
                    currentSchoolId: schoolId,
                    currentRole: role
                })
            },

            // Obtener datos actuales
            getCurrentSchool: () => ({
                schoolId: get().currentSchoolId,
                role: get().currentRole,
            }),

            // Reset (por ejemplo, al cerrar sesión)
            clearSchool: () => {
                set({
                    currentSchoolId: null,
                    currentRole: null,
                });
            }

        }),
        { 
            name: 'school-storage',
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