export const logApi = () => {
  return (req, res, next) => {
    const method = req.method;
    const url = req.originalUrl;
    let ip = req.ip;

    if (ip === "::1") {
      ip = "127.0.0.1";
    }

    const messApi = `${new Date().toLocaleString()} \t ${method} \t ${url} \t ${ip}`;
    console.log(messApi);
    next();
  };
};
