class AddPriceToProducts < ActiveRecord::Migration
  def change
    add_column :products, :price, :decimal, :precision => 11, :scale => 5, :default => 0.0, :null => false, :after => :description
  end
end
