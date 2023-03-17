class UserTicketSerializer < ActiveModel::Serializer
  attributes :id, :production_name, :price_as_currency

  def production_name
    self.object.production.title
    # object.production.title
  end

  def price_as_currency
    "$%.2f" % [self.object.price]
  end
end
