class AddImgUrlToProducts < ActiveRecord::Migration
  def change
    add_column :products, :img_url, :string, :after => :description
  end
end
