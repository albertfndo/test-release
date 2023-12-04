import escpos from "escpos"
import Network from "escpos-network"


const getDeviceAndPrinter = (ip) => {
  escpos.Network = Network;
  const device = new escpos.Network(ip, 9100)
  const printer = new escpos.Printer(device);

  return {
    device, printer
  }
}

export const test = (event, data) => {
  console.log('tesasfasdft');
  console.log(event);
  console.log(data);
}

export const print = (event, data) => {
  const { device, printer } = getDeviceAndPrinter(data.ip)
  device.open(async (err) => {
    if (err instanceof Error) {
      console.error(err)
      console.error("error!!");
      return;
    }

    printer.font('a')
      .size(1, 1)
      .text('testing bos')
      .cut()
      .close()
  })
}
