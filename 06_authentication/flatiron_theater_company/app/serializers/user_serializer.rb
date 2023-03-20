class UserSerializer < ActiveModel::Serializer
  attributes :name, :id
  has_many :tickets, serializer: UserTicketSerializer
  has_many :productions
end
