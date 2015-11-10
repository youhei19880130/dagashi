class Product < ActiveRecord::Base
  mount_uploader :img_url, ImageUploader
  paginates_per 6
  
  def hello
    self.name += "でござる"
  end
end
