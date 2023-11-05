// pages/your-reservation-page.tsx
import React from 'react';
import Teste from '../components/account';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import QR from '../components/QR';

function Page() {
  
  const reservationData = {
    reservationId: '12345',
    name: 'John Doe',
    checkInDate: '2023-11-05',
    tableNumber: '1',
    reservedTime: '12:00',
    duration: '2 hours',
    paymentDetails: 'GCash',

  };

  
  const qrCodeData = JSON.stringify(reservationData);

  return (
    <div className="flex min-h-full flex-col bg-backcolor">
      <Teste
        backButtonIcon={<ArrowBackIosIcon style={{ fontSize: 20 }} />}
        title="Reserved Successfully"
        subTitle1="Simply scan the QR Code, and our friendly staff will be delighted to assist you with any inquiries or requests you may have during your time with us."
      />

      
      <div className="text-center text-qr mt-7 mb-5">
      <QR data={qrCodeData} />
      </div>

       {/* <Butt title="View Transaction" Bgcolor="#FFF1E4" /> */}
      

     
    </div>
  );
}

export default Page;
