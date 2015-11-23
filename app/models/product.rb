class Product < ActiveRecord::Base
  has_many :reviews
  mount_uploader :img_url, ImageUploader
  paginates_per 6
  
  def hello
    self.name += "でござる"
  end
end
