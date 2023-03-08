class UsersController < ApplicationController

  def create
    byebug
    render json: User.create(user_params)
  end

  private

  def user_params
    params.permit(:name, :email)
  end
end

# note that this won't actually work if you try to create a user because we only have a controller. no model, no table (yet)!!
