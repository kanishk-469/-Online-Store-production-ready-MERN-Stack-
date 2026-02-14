//Simple sellerOnly Middleware
export const sellerOnly = (req, res, next) => {
  if (req.role !== "seller") {
    return res.status(403).json({
      message: "Access denied: Seller only",
    });
  }

  next();
};

//Simple customerOnly Middleware
export const customerOnly = (req, res, next) => {
  if (req.role !== "customer") {
    return res.status(403).json({
      message: "Access denied: Customer only",
    });
  }

  next();
};
