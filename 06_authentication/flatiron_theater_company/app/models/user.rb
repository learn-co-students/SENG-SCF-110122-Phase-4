class User < ApplicationRecord
    has_many :tickets, dependent: :destroy
    has_many :productions, through: :tickets

    has_secure_password

    validates :name, uniqueness: true

end
