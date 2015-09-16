class ProductController < ApplicationController

  def index
    @products = Product.page(params[:page])
  end

  def create
    @products = Product.new(product_params)
  end

  def product_params
    params.require(:product).permit(:name, :description)
  end
end
