class TicketSerializer < ActiveModel::Serializer
  attributes :id, :price, :production_name
  belongs_to :production
  has_one :user

  def production_name
    self.object.production.title
  end

  
end
