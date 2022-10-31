const mode: "dev" | "prod" = "dev";

const devUrl = "http://127.0.0.1:5000";
const prodUrl = "https://ece461l-2022.herokuapp.com/";

export const rootUrl = mode == "dev" ? devUrl : prodUrl;
