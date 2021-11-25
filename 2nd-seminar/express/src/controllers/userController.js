export const getLogin = (req, res) => {
    const result = {
        status: 200,
        message: "login에 접근합니다.",
    };
    res.status(200).send(result);
};
export const postLogin = (req, res) => {
    const result = {
        status: 200,
        message: "login 되었습니다.",
    };
    res.status(200).send(result);
};
export const getSignup = (req, res) => {
    const result = {
        status: 200,
        message: "signup에 접근합니다.",
    };
    res.status(200).send(result);
};

