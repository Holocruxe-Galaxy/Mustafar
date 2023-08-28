import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "src/store/apps/countries";
import { useEffect } from "react";

const SelectList = ({title, url, handleChange}) => {

  

  const dispatch = useDispatch();

  const countriesState = useSelector((state) => state.countries.countries);
  console.log(countriesState.map(b => b.nombre) )

  useEffect(() => {
    dispatch(fetchCountries());
  }, [dispatch]);

  return (
    <section>
      <select name="" id="" onChange={handleChange}>
        <option value="">{title}</option>
        <option value="">

        {countriesState.map(n =>
          (
            n.name
          ))}
        </option>
      </select>
    </section>
  );
}

export default SelectList;
