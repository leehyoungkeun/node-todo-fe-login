import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
  headers: {
    "Content-Type": "application/json",
    authorization: "Bearer " + localStorage.getItem("token"),
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log("Response:", response);
    return response;
  },
  function (error) {
    // 원래 error 객체를 유지하면서 처리
    if (error.response) {
      // 서버가 응답했지만 에러 상태 코드
      console.log("RESPONSE ERROR", error.response.data);
      // 원래 error 객체를 그대로 반환 (response.data만 추가로 접근 가능)
      return Promise.reject(error);
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못함
      console.log("REQUEST ERROR - No response", error.request);
      return Promise.reject(error);
    } else {
      // 요청 설정 중 에러
      console.log("ERROR", error.message);
      return Promise.reject(error);
    }
  }
);

export default api;
