class Production < ApplicationRecord
    has_many :tickets
    has_many :users, through: :tickets
    has_many :cast_members

    validates :title, :genre, :budget, :director, presence: true
    validates :title, uniqueness: true
    validates :budget, numericality: { greater_than: 0 }
    validates :description, length: { in: 5..250, message: "Please submit a description between 5 and 250 characters" }
    validates :image, allow_blank: true, format: { with: /\.(png|jpg|jpeg)\z/, message: "Please submit a jpeg/jpg or png file." }

    validate :title, :no_les_miz

    def no_les_miz
        if self.genre == "Musical" && self.title.include?("Miserables")
            #adding to the errors hash
            errors.add(:title, "Sorry we don't do Les Miz here.")
        end
    end
end
