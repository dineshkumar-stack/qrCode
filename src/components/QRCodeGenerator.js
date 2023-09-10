import React, { useState } from 'react';
import QRCode from 'qrcode.react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "../App.css"

function QRCodeGenerator() {
  const [text, setText] = useState('');
  const [qrCodeValue, setQRCodeValue] = useState('');
  const [width, setWidth] = useState(128);
  const [height, setHeight] = useState(128);
  const [format, setFormat] = useState('png');
  const [qrColor, setQRColor] = useState('#000000');
  const [bgColor, setBGColor] = useState('#ffffff');

  const generateQRCode = () => {
    setQRCodeValue(text);

  };

  const downloadQRCode = () => {
    const canvas = document.querySelector("#qrcode-canvas" && "canvas");
    if (format === "svg") {
      const canvas = document.querySelector("#qrcode-canvas");
      const svgElement = canvas.querySelector("svg");
      const svgXml = new XMLSerializer().serializeToString(svgElement);
      const blob = new Blob([svgXml], { type: "image/svg+xml" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `qrcode.svg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } else {
      const qrCodeDataURL = canvas.toDataURL(`image/${format}`);
      const a = document.createElement('a');
      a.href = qrCodeDataURL;
      a.download = `qrcode.${format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  return (
    <Container>
      <Row className="mt-4">
        <h2>QR Code Generator</h2>
        <Form className='fw-bold'>
          <Button variant='dark' onClick={generateQRCode}>Generate QR Code</Button>{" "}
          {qrCodeValue && (
            <Button variant='success' onClick={downloadQRCode}>Download QR Code</Button>
          )}<br />


          <Form.Group controlId="data">
            <Form.Control
              type="text"
              placeholder="Enter data"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Form.Group>
          <Col>
            <Form.Group controlId="width">
              <Form.Label>Width : </Form.Label>
              <Form.Control
                type="number"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
                placeholder="Width"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="height">
              <Form.Label>Height :{" "}</Form.Label>
              <Form.Control
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                placeholder="Height"
              />
            </Form.Group>
          </Col>
          <Form.Group controlId="format">
            <Form.Label>QR Image Format</Form.Label>
            <Form.Control
              as="select"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            >
              <option value="png">PNG</option>
              <option value="jpg">JPG</option>
              <option value="svg">SVG</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="qrColor">
            <Form.Label>QR Code Color</Form.Label>

            <Form.Control
              type="color"
              value={qrColor}
              onChange={(e) => setQRColor(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="bgColor">
            <Form.Label>Background Color</Form.Label>
            <Form.Control

              type="color"
              value={bgColor}
              onChange={(e) => setBGColor(e.target.value)}
            />
          </Form.Group>
          <div className="mt-4 qrCodeReady">

            {qrCodeValue && <QRCode
              value={qrCodeValue}
              size={Number(width)}
              level="H"
              bgColor={bgColor}
              fgColor={qrColor}
              renderAs={format} />}<br />

            <canvas id="qrcode-canvas" width={width} height={height}>
              <QRCode
                value={qrCodeValue}
                size={Number(width)}
                level="H"
                bgColor={bgColor}
                fgColor={qrColor}
                renderAs={format}
              />
            </canvas>
          </div>
        </Form>
      </Row >
    </Container >
  );
}

export default QRCodeGenerator;
