export interface CountryType {
  code: string;
  label: string;
  phone: string;
  suggested?: boolean;
}

export function isNumber(val: unknown): number | null {
  if (val == null) return null;
  if (!isNaN(Number(val))) {
    return Number(val);
  };
  throw new Error("Please don't play around with the local storage.");
}


export const stepManager = (num: number, data: any, country: CountryType | undefined) => {
  if(data.contactInfo && country){
    const phone = country.code + '+' + country.phone + data.contactInfo.phone;
    const newData = { ...data.contactInfo, phone };
    if(!data.contactInfo.altEmail.length){
      delete newData['altEmail'];
    }

    return { ...data, contactInfo: newData }
  }

  return data
}


export const onChecked = (e: any) =>{
  console.log(e.target.checked)
  console.log(e.target.value)
}
