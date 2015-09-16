class Product < ActiveRecord::Base
  paginates_per 6
  
  def hello
    self.name += "でござる"
  end
end
