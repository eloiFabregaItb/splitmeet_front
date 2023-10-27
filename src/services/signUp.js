import axios from "../api/axios";

export const signUp = async (name, email, password) => {
  let response;
  /*     options.method = "POST";
    options.headers = {
        accept: "application/json",
    };
    const controller = new AbortController();
    options.signal = controller.signal;
    options.body = JSON.stringify(options.body);

    setTimeout(() => controller.abort(), 1000); */

  try {
    response = await axios.post("/auth/signup", {
      usr_name: name,
      usr_mail: email,
      usr_pass: password,
    });

    if (response.data) {
      console.log(response.data);
      return response.data;
    }

    /* 
        let response = await fetch(endpoint, options);
        if (!response.success) {
            throw {
                success: false,
                error_code: response.error_code,
                msg: response.msg,
            };
        } else {
            data = response.data;
        } */
  } catch (e) {
    response.error = e;
    console.log(e);
  }
};
