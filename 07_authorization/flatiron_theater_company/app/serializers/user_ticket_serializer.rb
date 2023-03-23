class UserTicketSerializer < ActiveModel::Serializer
  attributes :id, :formatted_price, :production_name
  belongs_to :user

  def production_name
    self.object.production.title
  end

  def formatted_price
    "$%0.2f" % [self.object.price]
  end
end
