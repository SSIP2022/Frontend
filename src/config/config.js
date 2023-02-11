import toast from "react-hot-toast";
import store from "../store/index";
import { setToken, setUserLogout } from "../store/userReducer";

const production = false;
export const baseURL = production
  ? "https://web-production-64bbc.up.railway.app"
  : "http://localhost:7000";

// const dispatch= useDispatch();
export const queryfn = async ({
  endpoint,
  reqMethod,
  body,
  successMsg,
  failMsg,
}) => {
  //get accesstoken from localstorage

  // console.log(store.getState().user.token);

  // const root = document.getElementById("root");
  // const loading = document.createElement("div");
  // loading.classList.add("loadingBgStyle");
  // loading.id = "loadingSection";
  // loading.innerHTML = `<h3 class="loadingModelStyle"> <img alt="loading gif" class="loadingImgStyle" src="/other/loading.gif" /> Loading...</h3>`;
  // root.appendChild(loading);

  console.log(body);

  let response = await fetch(endpoint, {
    method: reqMethod,
    credentials: "include",
    headers: {
      "Content-type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${store.getState().user.token}`,
    },
    body: body ? body : undefined,
  });

  // console.log("response:", response);
  let data = await response.json();

  console.log("First" + JSON.stringify(data), response.status);
  // root.removeChild(loading);
  if (!data.success && response.status !== 403) {
    toast.error(failMsg);
    return data;
  } else {
    if (response.status === 403) {
      //use refreshtoken generate new access Token
      console.log("requesting for New Access Token!!");
      // root.appendChild(loading);
      const refreshResult = await fetch(baseURL + "/user/refresh", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      });
      const refreshJson = await refreshResult.json();
      // root.removeChild(loading);
      if (refreshJson.success) {
        //set access token in state
        console.log("setting up new accesstoken", refreshJson);
        const newAccessToken = refreshJson.accessToken;
        console.log("newAccessToken:", newAccessToken);
        store.dispatch(setToken(newAccessToken));
      } else if (refreshResult.status === 403) {
        toast.error("session expired Login again!!");
        store.dispatch(setUserLogout());
        window.location.href = window.location.origin + "/";

        return;
      }

      //finally again send req
      console.log("", store.getState().user.token);
      // root.appendChild(loading);
      response = await fetch(endpoint, {
        method: reqMethod,
        credentials: "include",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${store.getState().user.token}`,
        },
        body: body ? body : undefined,
      });
      data = await response.json();
      // root.removeChild(loading);
    }
  }
  // console.log("Second" + JSON.stringify(data), response.status);
  // set in localstorage

  return data;
};

export const fileQueryfn = async ({
  endpoint,
  reqMethod,
  body,
  successMsg,
  failMsg,
}) => {
  //get accesstoken from localstorage

  // const root = document.getElementById("root");
  // const loading = document.createElement("div");
  // loading.classList.add("loadingBgStyle");
  // loading.id = "loadingSection";
  // loading.innerHTML = `<h3 class="loadingModelStyle"> <img alt="loading gif" class="loadingImgStyle" src="/other/loading.gif" /> Loading...</h3>`;
  // root.appendChild(loading);

  // console.log(store.getState().user.token);

  let response = await fetch(endpoint, {
    method: reqMethod,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${store.getState().user.token}`,
    },
    body: body ? body : undefined,
  });

  // console.log("response:", response);
  let data = await response.json();

  // console.log("First" + JSON.stringify(data), response.status);
  // root.removeChild(loading);

  if (!data.success && response.status !== 403) {
    toast.error(failMsg);
    return data;
  } else {
    if (response.status === 403) {
      //use refreshtoken generate new access Token
      // console.log("requesting for New Access Token!!");
      // root.appendChild(loading);
      const refreshResult = await fetch(baseURL + "/user/refresh", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-type": "application/json;charset=UTF-8",
        },
      });
      const refreshJson = await refreshResult.json();
      // root.removeChild(loading);

      if (refreshJson.success) {
        //set access token in state
        console.log("setting up new accesstoken", refreshJson);
        const newAccessToken = refreshJson.accessToken;
        console.log("newAccessToken:", newAccessToken);
        store.dispatch(setToken(newAccessToken));
      } else if (refreshResult.status === 403) {
        toast.error("session expired Login again!!");

        window.location.href = window.location.origin + "/sign-in";
        return;
      }

      //finally again send req
      console.log(store.getState().user.token);
      // root.appendChild(loading);
      response = await fetch(endpoint, {
        method: reqMethod,
        credentials: "include",
        headers: {
          Authorization: `Bearer ${store.getState().user.token}`,
        },
        body: body ? body : undefined,
      });
      data = await response.json();
      // root.removeChild(loading);
    }
  }
  // console.log("Second" + data, response.status);
  // set in localstorage

  return data;
};
