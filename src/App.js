import './App.css';
import { InputTextarea } from 'primereact/inputtextarea';  
import { useState } from 'react';
import { Button } from 'primereact/button';
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import QRCode from 'qrcode';     
import { Card } from 'primereact/card';   

function App() {
  const [query, setQuery] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  const generateQrCode = async () => {
    if (!query) {
      alert('Please enter text to generate QR Code');
      return;
    }

    try {
      const dataUrl = await QRCode.toDataURL(query);
      setQrUrl(dataUrl);
    } catch (e) {
      console.error(e);
      alert('Failed to generate QR Code');
    }
  }

  const downloadQrCode = () => {
    if (!qrUrl) {
      alert('No QR Code to download');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = qrUrl;
      link.download = encodeURIComponent('qr_code.png');
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
      alert('Failed to download QR Code');
    }
  }

  return (
    <div className="App">
      <h1>QR Code Generator</h1>
      <InputTextarea 
        autoResize 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        rows={5} 
        cols={30} 
        placeholder="Enter text here"
      />
      <br />
      <Button label="Generate QR Code" onClick={generateQrCode} />
      
      {qrUrl && (
        <Card title="QR Code" style={{minWidth: '20vw', width: 'fit-content', margin: '10vh auto'}}>
          <img src={qrUrl} alt='QR Code' width={250}/>
          <br />
          <Button label="Download" onClick={downloadQrCode} />
        </Card>
      )}
    </div>
  );
}

export default App;
