class UsersController < ApplicationController
    skip_before_action :authorized_user, only: [:create]

    
    def show 
        puts "calling auth aka check user session".yellow
        # user = User.find(session[:user_id])
        render json: current_user, status: :ok
    end 

    def create
        puts "calling sign up aka create user".yellow
        user = User.create!(user_params)
        render json: user, status: :created
    end 
    
    private 

    def user_params
        params.permit(:name, :email, :password)
    end 
end
