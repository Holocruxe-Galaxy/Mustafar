interface Step {
  [key: number]: string;
}

export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

const stepsForm: Step = {
  0: 'contactInfo',
  1: 'personal',
  2: 'professional',
  3: 'generalInterests',
};


export function isNumber(val: unknown): number | null {
  if (val == null) return null;
  if (!isNaN(Number(val))) {
    return Number(val);
  };
  throw new Error("Please don't play around with the local storage.");
}


export const stepManager = (num: number, data: any, country: CountryType | undefined) => {
  const property = stepsForm[num];

  if(property === 'contactInfo' && country){
    const phone = country.code + '+' + country.phone + data.phone;
    const newData = {...data, phone };
    if(!data.altEmail.length){
      delete newData['altEmail'];
    }
    console.log({ [property]: newData })

    return { [property]: newData }
  }

  return { [property]: data }
}


export const onChecked = (e: any) =>{
  console.log(e.target.checked)
  console.log(e.target.value)
}
