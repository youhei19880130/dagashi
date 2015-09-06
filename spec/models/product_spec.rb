require 'rails_helper'

describe Product do
  describe "hello method" do
    before do
      item = Product.new
      item.name = "駄菓子"
      item.description = "とても甘いお菓子です。"
      item.save
      @item = Product.first
    end
    context "normal case." do
      it "not null" do
        expect(@item.hello).not_to eq(be_nil)
      end
    end
  end
end
