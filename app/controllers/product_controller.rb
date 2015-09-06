class ProductController < ApplicationController

  def index
    @product = Product.all
  end

  def create
    @product = Product.new(product_params)
  end

  def product_params
    params.require(:product).permit(:name, :description)
  end
end
