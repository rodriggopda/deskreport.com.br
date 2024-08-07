import useSWR from 'swr';
import { Page } from '../../components/layout/page';
import { Topbar } from '../../components/layout/topbar';
import { api } from '../../api/fetcher';

export default function Settings() {
  const session = '259F4592E1A3BC98DF72DAE9210C66C2'
  const { data:qrcode, isLoading } = useSWR(`http://localhost:5600/api/${session}/qrcode/scan`, api.get)
  console.log(qrcode);
  return (
    <Page navigation={[]}>
      <Topbar title='Configurações' inputSearch='off' />
      <div className='flex px-10'>
        {!isLoading && <div className='mt-4 bg-white p-4 rounded-xl'>
          <img src={qrcode?.base64Img} />
        </div>}
      </div>
    </Page>
  );
}
