import { useUserData } from "./useUserData";

type Request = {
  url: string;
  params?: Record<string, any>;
};

type Response = {
  data: any;
  response: any;
};

export const useApi = definePiniaStore("api", () => {
  const config = useRuntimeConfig();
  const baseUrl = config.public.baseUrl;
  const userData = useUserData();

  function getHeaders() {
    const headers = {
      Accept: "application/json",
      ContentType: "application/json",
    };

    const token =
      userData.value.token == null
        ? useUserData().value.token
        : userData.value.token;

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    return headers;
  }

  function get({ url, params = {} }: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
      useFetch(`${baseUrl}/${url}`, {
        method: "GET",
        headers: getHeaders(),
        params,
      })
        .then((response) => {
          resolve({ data: response.data, response });
        })
        .catch((error) => reject(error));
    });
  }

  function post({ url, params = {} }: Request): Promise<Response> {
    return new Promise((resolve, reject) => {
      useFetch(`${baseUrl}/${url}`, {
        method: "POST",
        headers: getHeaders(),
        params,
      })
        .then((response) => {
          resolve({ data: response.data.value, response });
        })
        .catch((error) => reject(error));
    });
  }

  // function download({ url, params = {} }: Request): Promise<Response> {
  //   setHeader();
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .get(url, { params, responseType: "blob" })
  //       .then((response) => resolve({ data: response.data.data, response }))
  //       .catch((error) => reject(error));
  //   });
  // }

  // function put({ url, params = {} }: Request): Promise<any> {
  //   setHeader();
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .put(url, params)
  //       .then((response) => resolve({ data: response.data.data, response }))
  //       .catch((error) => reject(error));
  //   });
  // }

  // function uploadFile({ url, params = {} }: Request) {
  //   const formData = new FormData();
  //   const keys = Object.keys(params);

  //   for (let i = 0; i < keys.length; i++) {
  //     formData.append(keys[i], params![keys[i]]);
  //   }

  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post(url, formData, {
  //         headers: {
  //           Accept: "application/json",
  //           ContentType: "multipart/form-data",
  //         },
  //       })
  //       .then((response) => {
  //         resolve({ data: response.data.data, response });
  //       })
  //       .catch((error) => {
  //         reject(error);
  //       });
  //   });
  // }

  function handleError(error: any): boolean {
    let handled = false;
    const snackbar = useSnackbar();
    const auth = useAuth();
    console.error(error);

    if (!error.response) {
      snackbar.error({
        title: "Error",
        message: "Failed to fetch data",
        autoClose: true,
      });

      return true;
    }
    if (error.response?.status == 422) {
      const errors = error.response.data.errors ?? error.response.data;
      const message: string[] = [];

      Object.keys(errors).forEach((key) => {
        if (errors[key] instanceof Array) {
          message.push(errors[key][0]);
        }
      });
      snackbar.error({
        title: "Error",
        message: message.join("<br>"),
        autoClose: true,
      });

      handled = true;
    } else if (error.response?.status == 503) {
      throw createError({
        statusCode: 503,
        statusMessage: "Server under maintenance. Please try again later.",
        fatal: true,
      });

      handled = true;
    } else if (error.response?.status >= 500) {
      snackbar.error({
        title: "Error",
        message: "Server error. Please try again later.",
        autoClose: true,
      });

      handled = true;
    } else if (error.response?.status == 401) {
      snackbar.error({
        title: "Session Expired",
        message: "Try to login again.",
        cancellable: false,
        callback: () => {
          auth.logout({
            callback() {
              navigateTo("/");
            },
          });
        },
        autoClose: true,
      });

      handled = true;
    } else if (error.response?.status == 400) {
      const code = error.response.data.data.code;
      if (code == "refresh_required") {
        window.location.reload();
        return true;
      } else {
        snackbar.error({
          title: "Error",
          message: error.response.data.data.message,
          autoClose: true,
        });

        handled = true;
      }
    } else {
      // Handle other error
    }

    return handled;
  }

  return {
    get,
    post,
    // download,
    // put,
    handleError,
    // uploadFile,
  };
});
