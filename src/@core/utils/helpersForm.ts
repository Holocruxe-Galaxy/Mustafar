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
};


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
