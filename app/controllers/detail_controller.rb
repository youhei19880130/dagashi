class DetailController < ApplicationController
  def index
    @index = Product.where(id: params[:id])
    @avg_score = Review.select("AVG(score) AS avg_score").select("count(*) AS count_score").where(:product_id => params[:id]).group(:product_id)
    @reviews = Review.where(:product_id => params["id"])
  end
end
