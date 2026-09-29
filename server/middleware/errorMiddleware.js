export function notFound(req, res) {
  res.status(404).json({ message: `Không tìm thấy API ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ message: "Lỗi máy chủ", detail: err.message });
}
