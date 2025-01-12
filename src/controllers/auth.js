import * as authServices from '../services/auth.js';

const setupSession = (res, session) => {
  res.cookie('refreshToken', session.refreshToken, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });

  res.cookie('sessionId', session.id, {
    httpOnly: true,
    expires: session.refreshTokenValidUntil,
  });
};

export const registerController = async (req, res) => {
  const { name, email, _id, createdAt, updatedAt } =
    await authServices.register(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user',
    data: {
      name,
      email,
      _id,
      createdAt,
      updatedAt,
    },
  });
};

export const sendEmailController = async (req, res) => {
  const { email } = req.body;
  await authServices.sendResetEmail(email);
  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPWDController = async (req, res) => {
  await authServices.resetPassword(req.body);
  res.status(201).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};

export const loginController = async (req, res) => {
  const session = await authServices.login(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshTokenController = async (req, res) => {
  const { refreshToken, sessionId } = req.cookies;
  const session = await authServices.refreshToken({ refreshToken, sessionId });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refresh a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authServices.logout(req.cookies.sessionId);
  }
  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};
