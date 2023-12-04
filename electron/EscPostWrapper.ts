// import escpos from "escpos"

export class EscPostWrapper {
  // private printer;
  // private device;
  constructor() {
    // const ip = "192.168.1.1";
    // this.device = new escpos.Network(ip)
    // this.printer = new escpos.Printer(this.device);
  }

  public test(event, data) {
    console.log('tesasfasdft');
    console.log(event);
    console.log(data);
  }

  // public print(event, data) {
  //   console.log(event)
  //   console.log(data)
  //   this.device.open((err) => {
  //     this.printer.font('a')
  //       .align('STAR_CA')
  //       .style('bu')
  //       .size(1, 1)
  //       .text('testing bos')
  //   })
  // }
}
