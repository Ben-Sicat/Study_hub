import React from "react";
import { QRCodeSVG } from "qrcode.react";

interface QRProps {
  data: string;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: "L" | "M" | "Q" | "H";
  includeMargin?: boolean;
}

const QR: React.FC<QRProps> = ({
  data,
  size,
  bgColor = "#ffffff",
  fgColor = "#000000",
  level = "M",
  includeMargin = false,
}) => {
  return (
    <div className="text-center text-qr mt-7 mb-5">
      <QRCodeSVG
        value={data}
        size={size}
        bgColor={bgColor}
        fgColor={fgColor}
        level={level}
        includeMargin={includeMargin}
      />
    </div>
  );
};

export default QR;
