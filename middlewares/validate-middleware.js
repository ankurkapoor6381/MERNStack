//const { ZodError } = require("zod");

const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const message = "Fill The Input Field Properly";
    const extraDetails = err.issues[0].message || "Backend Error";
    const status = 422;

    const errorPass = {
        status,
        message,
        extraDetails
      }

    next(errorPass);
  }
};

module.exports = validate;