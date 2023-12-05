import escpos from "escpos";
import Network from "escpos-network";

const getDeviceAndPrinter = (ip: string) => {
  escpos.Network = Network;
  const device = new escpos.Network(ip, 9100);
  const printer = new escpos.Printer(device);

  return {
    device,
    printer,
  };
};

export const print = (event: any, data: any) => {
  const { device, printer } = getDeviceAndPrinter(data.ip);
  device.open(async (err: any) => {
    if (err instanceof Error) {
      console.error(err);
      console.error("error!!");
      return;
    }

    printer.font("a").size(1, 1).text(data.text).cut().close();
  });
};
