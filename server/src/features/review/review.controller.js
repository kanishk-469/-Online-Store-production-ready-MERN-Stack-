import ReviewRepository from "./review.repository.js";

export default class ReviewController {
  constructor() {
    this.reviewRepository = new ReviewRepository();
  }
  async rateProduct(req, res, next) {
    try {
      const userId = req.userId; // from JWT
      // console.log(userID);
      const productId = req.body.productId;
      const ratings = req.body.ratings;
      const comment = req.body.comment;

      await this.reviewRepository.rate(userId, productId, ratings, comment);
      return res.status(200).send("Rating has been added");
    } catch (err) {
      console.log(err);
      console.log("Passing error to middleware");
      next(err);
    }
  }
}
