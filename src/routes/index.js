import { Router } from "express";
import { authenticator } from "otplib";
import createError from "http-errors";

const router = Router();

router.post("/generate", function (req, res) {
  const { label, salt } = req.body;
  if (!label || !salt) return req.send(createError(404));

  const otpauthString = `otpauth://totp/${label}?secret=${salt}`;
  res.send(
    `<img src="https://chart.googleapis.com/chart?chs=200x200&chld=M|0&cht=qr&chl=${otpauthString}" />`
  );
});

router.post("/verify", function (req, res) {
  const { code, salt } = req.body;
  if (!code || !salt) return req.send(createError(404));

  const isValid = authenticator.check(code, salt);

  res.send({
    isValid,
    message: isValid ? "success" : "invalid code",
  });
});

router.get("/generate-secert", function (req, res) {
  const { numByte } = req.query;

  res.send(authenticator.generateSecret(Number.parseInt(numByte, 10) || 16));
});

export default router;
