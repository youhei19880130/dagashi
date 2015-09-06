class Product < ActiveRecord::Base

  def hello
    self.name += "でござる"
  end
end
