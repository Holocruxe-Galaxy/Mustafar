// import Model from '../../@core/components/holocruxe-model/index'

import { ReactNode } from 'react'
import BlankLayout from 'src/@core/layouts/BlankLayout'



const Test = () => {
  return (
    <>
      {/* <Model/> */}
      <p>holis</p>
    </>
  );
}

Test.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>

Test.guestGuard = true

export default Test;
