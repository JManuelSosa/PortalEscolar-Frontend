// React
import { useState } from "react";

// Componentes
import SchoolPeriodForm from "./SchoolPeriodForm";
import ListaPeriodosEscolares from "../../Components/Layout/Admin/ListaPeriodosEscolares";

// Ant
import { Drawer, Button, Form, Tooltip, Tabs, List } from "antd";

// Iconos
import { IconPlus } from "@tabler/icons-react";

// Hooks
import { usePeriodTemplates } from "../../Hooks/Fetching/usePeriodTemplates";
import { usePeriodTemplateFormData } from "../../Hooks/Fetching/usePublicData";
import { usePeriodTemplateMutations } from "../../Hooks/Fetching/usePeriodTemplateMutations";

// Css
import css from '@css/Views/admin/PeriodTemplateView.module.css';



export default function PeriodTemplateView() {

    const [open, setOpen] = useState(false);
    const { data, isLoading: isLoadingTemplates, isError: isErrorTemplates } = usePeriodTemplates();
    const { cycleForSelect, periodosForSelect, subperiodosForSelect, isLoading: isLoadingForm, isError: isErrorForm } = usePeriodTemplateFormData();
    const { postNewSchoolPeriod, isPending, isSucess } = usePeriodTemplateMutations();
    const [form] = Form.useForm();

    if(isLoadingTemplates) return <h1> Cargando ...</h1>

    console.log(data);

    const periodActive = data.filter( el => el.estado === 'activo');
    const periodInactive = data.filter( el => el.estado === 'finalizado');
    const periodFuture = data.filter( el => el.estado === 'futuro');

    console.log(periodActive);

    console

    const openDrawer = () => {
        setOpen(true);
    }

    const closeDrawer = () => {
        form.resetFields();
        setOpen(false);
    }

    const onFinish = (values) => {
        const payload = {
            ...values,
            periodoEscolar: {
                ...values.periodoEscolar
            },
            subperiodosEscolares: values.subperiodosEscolares?.map(sub => ({
                ...sub
            }))
        };

        postNewSchoolPeriod(payload,{ 
            onSuccess: () => {
                closeDrawer()
            }
        });
    };

    const dataList = [periodActive];

    const items = [
        {
            key: '1',
            label: 'Periodo Activo',
            children: <ListaPeriodosEscolares periodosData={periodActive}/>
        },
        {
            key: '2',
            label: 'Periodos finalizados',
            children: <ListaPeriodosEscolares periodosData={periodInactive}/>
        },
        {
            key: '3',
            label: 'Periodos próximos',
            children: <ListaPeriodosEscolares periodosData={periodFuture}/>
        }
    ];

    return (
        <>
            <h1 className={css['title-view']}>Periodos Escolares de la escuela</h1>

            <div className={css['controls-button']}>
                <Tooltip title="Añadir periodo escolar">
                    <Button className={css['btn-control']} onClick={openDrawer} disabled={isLoadingForm} shape="circle" type="primary">
                        <IconPlus size={28}/>
                    </Button>
                </Tooltip>
            </div>

            <Tabs className={css['custom-tabs']} items={items}></Tabs>

            <Drawer open={open} onClose={closeDrawer} width={768} title="Agregar nuevo periodo escolar" loading={isLoadingForm}>
                <div>
                    <SchoolPeriodForm 
                        onFinish={onFinish} 
                        form={form} 
                        dataSelectCycle={cycleForSelect}
                        dataSelectPeriods={periodosForSelect}
                        dataSelectSubperiods={subperiodosForSelect}
                        isPending = { isPending }
                    ></SchoolPeriodForm>
                </div>
            </Drawer>
        </>
    )
}