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

    printer
      .font("b")
      .align("ct")
      .size(1, 1)
      .style("normal")
      .text("--------------------------------")
      .text("Bottle Description")
      .text("--------------------------------")
      .font("a")
      .align("lt")
      .style("normal")
      .size(0, 0)
      .text(data.bottleName)
      .text(data.userName)
      .text(data.phoneNumber)
      .text("GR: " + data.gram + " / ML: " + data.miliLiter)
      .text("Exp Date:" + data.expirationDate)
      .font("b")
      .align("ct")
      .size(1, 1)
      .style("normal")
      .text("--------------------------------")
      .qrimage(data.uniqueCode, function (err: any) {
        this.cut();
        this.close();
      });
  });
};
