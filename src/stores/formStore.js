import { create } from "zustand";

export const useFormStore = create((set, get) => ({

    forms: {},

    registerForm: (formName, formInstance) => { 
        set((state) => {
            const newState = {
                forms: {
                    ...state.forms,
                    [formName]: {
                        instance: formInstance,
                        values: state.forms[formName]?.values || {},
                        isValid: state.forms[formName]?.isValid || false,
                        isTouched: false
                    }
                }
            }
            return newState;
        })
    },

    unregisterForm: (formName) => {
        set((state) => {
            const forms = {...state.forms};
            if (forms[formName]) {
                const { values, isValid, isTouched } = forms[formName];
                forms[formName] = { values, isValid, isTouched, instance: null };
            }
            return { forms };
        });
    },

    updateFormState: (formName, data) => {
        set((state) => {
            const newState = {
                forms: {
                    ...state.forms,
                    [formName]: { ...state.forms[formName], ...data },
                },
            };
            return newState;
        });
    },

    getFormValues: (formName) => get().forms[formName]?.values || {},
    isFormValid: (formName) => get().forms[formName]?.isValid || false,

    validateAllForms: async () => {
        const forms = get().forms;
        const names = Object.keys(forms);

        for(let name of names){
            const instance = forms[name].instance;

            if(!instance) continue;

            try{
                await forms[name].instance.validateFields();
            }catch{
                return false;
            }
        }
        
        return true; //Si todas las validaciones pasaron exitosamente
    }

}))