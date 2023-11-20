import { defineStore } from 'pinia';

type Callback = () => void;

type ErrorParameters = {
  title: string;
  message?: string;
  callback?: Callback | null;
  cancellable?: boolean;
};

export const useSnackbar = defineStore("snackbar", {
  state: () => ({
    isShown: <boolean>false,
    isSuccess: <boolean>false,
    message: <string>"",
    title: <string>"",
    buttonText: <string>"OK",
    cancellable: <boolean>true,
    callback: <Callback | null>null
  }),

  actions: {
    tapExit() {
      this.callback?.();
      this.isShown = false;
    },
    setCallback(callback: () => void) {
      this.callback = callback;
    },
    resetButton() {
      this.buttonText = "OK";
    },
    success(
      title = "Success",
      message = "Success Message",
      buttonText = "Continue",
      callback: Callback | null = null,
    ) {
      this.resetButton();

      this.isSuccess = true;
      this.isShown = true;
      this.title = title;
      this.message = message;
      this.buttonText = buttonText;
      this.setCallback(() => {
        return;
      });

      if(callback) {
        this.setCallback(callback);
      }
    },
    failed(
      title = "Failed",
      message = "Failed Message",
      buttonText = "Try Again"
    ) {
      this.resetButton();

      this.isSuccess = false;
      this.isShown = true;
      this.title = title;
      this.message = message;
      this.buttonText = buttonText;
      this.setCallback(() => {
        return;
      });
    },
    error({
      title = "Error",
      message = "Failed Message",
      callback = null,
      cancellable = true,
    }: ErrorParameters) {
      this.resetButton();
      this.setCallback(() => {
        return;
      });

      if(callback) {
        this.setCallback(callback);
      }

      this.isSuccess = false;
      this.isShown = true;
      this.title = title;
      this.message = message;
      this.cancellable = cancellable;
    }
  }
});