class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.integer :product_id, null: false
      t.integer :score, default: 0, null:false
      t.string  :comment, null: false
      t.timestamps null: false
    end
  end
end
