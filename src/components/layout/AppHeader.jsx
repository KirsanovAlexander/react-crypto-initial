import React, { useState, useEffect } from 'react'; // Импортируем React
import { Layout, Select, Space, Button, Modal, Drawer} from 'antd';
import { useCrypto } from '../../context/crypto-context';
import CoinInfoModal  from '../CryptoInfoModal';
import AddAssetForm from '../AddAssetForm';

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1 rem',
  display: 'flex',
  background: 'white',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function AppHeader() {
  const [select, setSelect] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);
  const [drawer, setDrawer] = useState(true);
  const { crypto } = useCrypto();


  useEffect(() => {
    const keypress = (event) => {
      if (event.key === '/') {
        setSelect((prev) => !prev);
      }
    };
    document.addEventListener('keypress', keypress);
    return () => document.removeEventListener('keypress', keypress);
  }, []);

  function handleSelect(value) {
    console.log(value);
    setCoin(crypto.find((c)=> c.id ===value))
    setModal(true);
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        style={{ width: 250 }}
        open={select}
        onSelect={handleSelect}
        onClick={() => setSelect((prev) => !prev)}
        value="press / to open"
        options={crypto.map((coin) => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={(option) => (
          <Space>
            <img style={{ width: 20 }} alt={option.data.label} /> {option.data.label}
          </Space>
        )}
      />
      <Button type="primary" onClick={()=>setDrawer(true)}>Добавить актив</Button>

      <Modal open={modal} onOk={()=>setModal(false)} onCancel={()=>setModal(false)} footer={null}>
        <CoinInfoModal coin={coin}/>
      </Modal>
      <Drawer width={600} title="Basic Drawer" onClose={()=> setDrawer(false)} open={drawer} destroyOnClose>
      <AddAssetForm onClose={()=> setDrawer(false)}/>
      </Drawer>

    </Layout.Header>
  );
}
