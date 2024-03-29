class User < ApplicationRecord
    has_many :tickets
    has_many :productions, through: :tickets

    validates :name, uniqueness: true

    has_secure_password

end
