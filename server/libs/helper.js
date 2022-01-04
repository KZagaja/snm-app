const UserDevice = require('../models/userdevice');
const Mailer = require('./mailer');
const geoip = require('geoip-lite');

module.exports = {
  checkUserDevice: async function (req, user) {
    // console.log('USER HEADERS', req.headers)
    // console.log('USER CONNECTION', req.connection.remoteAddress)

    let userIp =
      req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      (req.connection.socket ? req.connection.socket.remoteAddress : null);

    if (userIp.indexOf(',') > -1) {
      userIp = userIp.substring(0, userIp.indexOf(','));
    }

    // let userDevice = req.headers['x-forwarded-for'] ||
    //   req.connection.remoteAddress ||
    //   req.socket.remoteAddress ||
    //   (req.connection.socket ? req.connection.socket.remoteAddress : null);

    // userIp = "207.97.227.239";

    // first log in check
    const firstLoginCheck = await UserDevice.findOne({ userId: user._id });
    if (!firstLoginCheck) {
      //Add Device
      let device = new UserDevice({
        userId: user._id,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : '',
        device: req.body.device,
        ipAddress: userIp,
        geolocation: geoip.lookup(userIp),
      });
      device = await device.save();

      return true;
    }

    const ipCheck = await UserDevice.findOne({
      userId: user._id,
      ipAddress: userIp,
    });
    if (!ipCheck) {
      //Add Device
      let device = new UserDevice({
        userId: user._id,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : '',
        device: req.body.device,
        ipAddress: userIp,
        geolocation: geoip.lookup(userIp),
      });
      device = await device.save();

      // Mailer.sendNewDeviceLocationMail(user.email, device)
      // Mailer.sendNewDeviceLocationMail('kuba@click5interactive.com', device)
      // Mailer.sendNewDeviceLocationMail('piotr@click5interactive.com', device)

      return true;
    }

    const deviceCheck = await UserDevice.findOne({
      userId: user._id,
      userAgent: req.headers['user-agent'],
    });
    if (!deviceCheck) {
      //Add Device
      let device = new UserDevice({
        userId: user._id,
        userAgent: req.headers['user-agent'] ? req.headers['user-agent'] : '',
        device: req.body.device,
        ipAddress: userIp,
        geolocation: geoip.lookup(userIp),
      });
      device = await device.save();

      // Mailer.sendNewDeviceMail(user.email, device)
      // Mailer.sendNewDeviceMail('kuba@click5interactive.com', device)
      // Mailer.sendNewDeviceMail('piotr@click5interactive.com', device)

      return true;
    }

    return true;
  },
};
