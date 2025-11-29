
module.exports.success = (res, data=null, msg="Success", status=200) => {
  return res.status(status).json({
    success: true,
    message: msg,
    data: data
  })
}

module.exports.error = (res, err, msg="Error", status=500) => {
  return res.status(status).json({
    success: false,
    message: msg,
    err: err
  })
}