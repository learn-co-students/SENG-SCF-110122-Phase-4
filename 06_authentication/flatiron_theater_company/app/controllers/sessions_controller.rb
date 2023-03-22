class SessionsController < ApplicationController

  def create
    #create session that will send user information to the client

    #look for our user using find_by(name: params[:name]), use the #authenticate method
    user = User.find_by(name: params[:name])
    if user && user.authenticate(params[:password])
      # session[:pizza] = "pizza"
      render json: user, status: :ok
    else
      render json: {errors: "Yeah... that didn't work"}, status: :unauthorized
    end
    # if password is a match, send the user. otherwise send an error
    
  end

end
