import React, { useEffect } from 'react'
import CoresComponent from '../../../Components/Cores/CoresComponent'
import style from './UnityAndCores.module.css'
import { fetchCoresAndUnits } from '../../../Services/Slices/CoresAndUnitsSlice';
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../../../Components/Loading/Loading'

interface CoresAndUnits {
  id: number;
  core_name: string;
  units: Unit[];
}

interface Unit {
  id?: number;
  unit_name: string;
  observation?: string;
  description?: string;
  name_dp?: string;
  street?: string;
  district?: string;
  city?: string;
  state?: string;
  phone?: string;
  is_whatsapp?: boolean;
  email?: string;
  schedules?: string;
  area_of_duty?: string;
  contacts: any[];
  emails: any[];
  services: any[];
}

function UnityAndCores() {
    const dispatch = useDispatch();
    const coresAndUnitsData = useSelector((state: any) => state.CoresAndUnitsSlice || {});

    useEffect(() => {
        dispatch<any>(fetchCoresAndUnits("true"));
    }, [dispatch]);

    const isLoading = coresAndUnitsData.loading ?? false;
    const hasError = coresAndUnitsData.error ?? false;
    const cores: CoresAndUnits[] = coresAndUnitsData.data || [];

    if (isLoading) {
        return <Loading size={100} type="spin"/>;
    }

    if (hasError) {
        return <div>Erro ao carregar dados</div>;
    }

    return (
            <div className={style.container}>
                <div className={style.faqContainer}>
                    <h1 className={style.title}>Núcleos Regionais e Unidades</h1>
                    {cores.map((core: CoresAndUnits) => (
                        <CoresComponent 
                            key={core.id}
                            content={core.units} 
                            core_name={core.core_name}
                        />
                    ))}
                </div>
            </div>
    )
}

export default UnityAndCores;