import { defineStore } from "pinia";

type DialogCallback = {
  onTapBack: () => void | null;
  onTapConfirm: () => void;
};

type SuccessDialog = {
  confirmText: string | null;
  backText: string | null;
  showBack: boolean;
  callback: DialogCallback;
  title: string;
  content: string;
};

export const useDialog = defineStore("dialog", {
  state: () => ({
    isShown: <boolean>false,
    showBack: <boolean>true,
    backText: <string>"",
    confirmText: <string>"",
    title: <string>"",
    content: <string>"",
    callback: <DialogCallback>{},
  }),

  actions: {
    getDefaultCallback() {
      return {
        onTapBack: () => {
          this.hideDialog();
        },
        onTapConfirm: () => {
          this.hideDialog();
        },
      };
    },

    showDialog() {
      this.isShown = true;
    },

    hideDialog() {
      this.isShown = false;
    },

    setCallback(callback: DialogCallback | null = null) {
      this.callback = this.getDefaultCallback();
      if (callback) {
        this.callback = callback;
      }
    },

    show({
      title,
      content,
      callback,
      confirmText = "OK",
      backText = "Cancel",
      showBack = true,
    }: SuccessDialog) {
      this.showBack = showBack;
      if (backText) {
        this.backText = backText;
      }

      if (confirmText) {
        this.confirmText = confirmText;
      }

      if (!callback) {
        callback = {
          onTapBack: () => {
            this.hideDialog();
          },
          onTapConfirm: () => {
            this.hideDialog();
          },
        };
      }

      this.title = title;
      this.content = content;

      this.setCallback(callback);
      this.showDialog();
    },
  },
});
