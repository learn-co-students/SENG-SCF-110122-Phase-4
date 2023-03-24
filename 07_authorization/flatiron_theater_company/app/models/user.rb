class User < ApplicationRecord
    has_many :tickets
    has_many :productions, through: :tickets

    validates :name, uniqueness: true
    validates :name, :email, :password, presence: true

    has_secure_password

end
