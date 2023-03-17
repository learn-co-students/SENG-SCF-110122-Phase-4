class ProductionExtendedSerializer < ActiveModel::Serializer
  attributes :id, :title, :genre, :description, :budget, :image, :director, :ongoing, :cast_list, :patron_list

  # has_many :cast_members
  # has_many :users

  def cast_list
    self.object.cast_members.map do |cm|
      cm.name
    end
  end

  def patron_list
    self.object.users.map do |patron|
      patron.name
    end
  end
end
