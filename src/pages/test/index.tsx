// // import Model from '../../@core/components/holocruxe-model/index'

import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'


// import { useDispatch, useSelector } from "react-redux";
// import { fetchProvincias, fetchMunicipios, setSelectedProvinciaId } from "src/store/apps/countries";
// import { useEffect } from "react";

const Test = () => {

//   const dispatch = useDispatch();
//   const provincias = useSelector(state => state.countries.provincias);
//   const municipios = useSelector(state => state.countries.municipios);
//   const selectedProvinciaId = useSelector(state => state.countries.selectedProvinciaId);

//   // console.log(countriesState.map(b => b.nombre) )


//   const handleProvinciaChange = (event) => {
//     const selectedId = event.target.value;
//     dispatch(setSelectedProvinciaId(selectedId));
//     dispatch(fetchMunicipios(selectedId));
//   };


//   useEffect(() => {
//     dispatch(fetchProvincias());
//   }, [dispatch]);

  return (
    <div>
      {/* <UserViewLeft/>
      <UserViewOverview/> */}
    </div>
  );
}

Test.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Test.guestGuard = true

export default Test;
