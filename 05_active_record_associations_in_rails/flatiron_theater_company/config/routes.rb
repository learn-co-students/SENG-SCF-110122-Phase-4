Rails.application.routes.draw do
 
  resources :tickets
  resources :users
  resources :cast_members
  resources :productions, only: [ :index, :show, :create, :update, :destroy]
  # Custome Route 
 
  

end
