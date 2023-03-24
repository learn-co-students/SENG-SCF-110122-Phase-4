class SessionsController < ApplicationController
skip_before_action :authorized_user, only: [:create]


  #let's re-write our create action
  def create
    puts "calling login aka create user session".yellow
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      #add id to session => {user_id: 2}
      session[:user_id] = user.id
      render json: user, status: :ok
    else
      render json: {errors: "Username or Password Invalid. Oops, pls try again."}, status: :unauthorized
    end
  end

  def delete
    puts "calling logout aka delete user session".yellow
    session.delete :user_id
    head :no_content
  end



end
