class Production < ApplicationRecord
    validates :title, :genre, :budget, :director, presence: true
    validates :title, uniqueness: true
    validates :budget, numericality: { greater_than: 0 }
    validates :description, length: { in: 5..250, message: "Please submit a description between 5 and 250 characters" }
    # new validation using regex
    validates :image, allow_blank: true, format: { with: /\.(png|jpg|jpeg)\z/, message: "Please submit a jpeg/jpg or png file." }

    # validates :title, exclusion: { within: %w(Miserables), message: "We don't do Les Miz here"}

    validate :title, :no_les_miz

    def no_les_miz
        #if self is a musical AND the title .include? "Miserables" then add to my error array errors.add(attribute, message)
        if self.genre == "Musical" && self.title.include?("Miserables")
            errors.add(:title, "We don't do Les Miz here")
        end
    end

  
end
