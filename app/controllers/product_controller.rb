class ProductController < ApplicationController

  def index
    @products = Product.page(params[:page])
  end

  def new
    @product = Product.new
  end

  def create
    product = Product.create do |p|
      p.name = params[:product][:name]
      p.description = params[:product][:description]
      p.img_url = params[:product][:img_url]
    end
    redirect_to(action: 'index')
  end

  private
  def product_params
    params.require(:product).permit(:name, :description, :img_url)
  end
end
