class DetailController < ApplicationController
  def index
    @index = Product.where(id: params[:id])
  end
end
