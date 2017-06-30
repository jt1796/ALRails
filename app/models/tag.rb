class Tag < ApplicationRecord
  has_many :question_to_tag_junctions
  has_many :questions, through: :question_to_tag_junctions

  def to_s
    self.tag
  end
end
