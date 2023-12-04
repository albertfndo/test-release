import { EscPostWrapper } from "./EscPostWrapper"

console.log("============Routes loaded============")
const wrapper = new EscPostWrapper;

export const routes = {
  "_test": wrapper.test
}
