import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface Provincias {
  id: string
  nombre: string
}



const status = ["loading", "error", "succeeded"] as const
type statusType = (typeof status) [number]

export interface CountriesReducer {
  provincias: Provincias[]
  municipios: string[]
  selectedProvinciaId: string
  status: statusType
}

export const EmptyState = {
    provincias: [],
    municipios: [],
    selectedProvinciaId: "",
    status: "loading"
  } as CountriesReducer;


  // fetch de todos las provincias
  export const fetchProvincias = createAsyncThunk(
    "provincias/fetchProvincias", async () => {
      try {
        const response = await fetch("https://apis.datos.gob.ar/georef/api/provincias");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data;

      } catch (error) {
        console.log(error);
      }
    }
  );

  export const fetchMunicipios = createAsyncThunk(
    'municipios/fetchMunicipios', async (provinciaId) => {
    try {
      const response = await fetch(`https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinciaId}&campos=id,nombre&max=500`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      const municipios = data.municipios
        .map(m => m.nombre)
        .sort((a, b) => a.localeCompare(b));

      return {...data, munis: municipios};
    } catch (error) {
      console.error("Error fetching municipios:", error);
      throw error;
    }
  });



  export const countriesSlice = createSlice({
    name: "countries",
    initialState: EmptyState,
    reducers: {
      setSelectedProvinciaId: (state, action) => {
        state.selectedProvinciaId = action.payload;
      },
    },
    extraReducers(builder) {
      builder
        .addCase(fetchProvincias.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchProvincias.rejected, (state, action) => {
          state.status = "error";
        })
        .addCase(fetchProvincias.fulfilled, (state, action) => {
          state.status = "succeeded";

          const data  = action.payload;
          state.provincias = data.provincias;

          if (data.errors === "There is not data") {
            state.provincias = [];
          }

        })
        .addCase(fetchMunicipios.pending, (state, action) => {
          state.status = "loading";
        })
        .addCase(fetchMunicipios.rejected, (state, action) => {
          state.status = "error";
        })
        .addCase(fetchMunicipios.fulfilled, (state, action) => {
          state.status = "succeeded";

          const data  = action.payload;
          console.log("🚀 ~ file: index.ts:104 ~ .addCase ~ data:", data)
          state.municipios = data.munis;

          if (data.errors === "There is not data") {
            state.municipios = [];
          }

        })

    },
  });

  export const { setSelectedProvinciaId } = countriesSlice.actions;


export default countriesSlice.reducer;
