class Production < ApplicationRecord
    validates :title, :genre, :budget, :director, presence: true
    validates :title, uniqueness: true
    validates :budget, numericality: { greater_than: 0 }
    validates :description, length: { in: 5..250, message: "Please submit a description between 5 and 250 characters" }
end
